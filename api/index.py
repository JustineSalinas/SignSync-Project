import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

# Load the API key from the .env file
load_dotenv()

# Initialize the Gemini Client
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="SignSync NLP Backend (Gemini Powered)")

# --- CORS Configuration ---
# Note: In production (Vercel), usually same-origin is handled via URL rewrites, 
# but keeping this for local development and multi-port testing.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Simplified for serverless execution
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslationRequest(BaseModel):
    words: list[str]

# --- The System Prompt ---
system_instruction = """
You are an expert Sign Language to English interpreter operating in a public service kiosk.
The user will provide a stream of raw, fragmented words translated from hand gestures. 
Your job is to infer their intent and restructure these fragments into a single, polite, grammatically correct, and natural-sounding sentence.
Do not add extra conversational filler. Just output the refined sentence.
"""

# Gemini 1.5 Flash - optimized for speed/real-time
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=system_instruction
)

@app.post("/translate")
async def translate_signs(request: TranslationRequest):
    if not request.words:
        raise HTTPException(status_code=400, detail="Word stream is empty.")

    raw_signs = " ".join(request.words)

    try:
        response = model.generate_content(
            f"Raw signs: {raw_signs}",
            generation_config=genai.types.GenerationConfig(
                temperature=0.4, # Slightly higher for more fluid sentence restructuring
                max_output_tokens=100
            )
        )
        
        refined_sentence = response.text.strip()
        
        return {
            "status": "success",
            "original_stream": request.words,
            "refined_sentence": refined_sentence
        }

    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail="Error communicating with Gemini service.")
