import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load the API key from the backend/.env file
env_path = Path(__file__).parent.parent / "backend" / ".env"
load_dotenv(dotenv_path=env_path)

# Initialize the Gemini Client (new SDK uses a Client object)
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI(title="SignSync NLP Backend (Gemini Powered)")

# --- CORS Configuration ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslationRequest(BaseModel):
    words: list[str]

# --- The System Prompt ---
SYSTEM_INSTRUCTION = (
    "You are an expert Sign Language to English interpreter operating in a public service kiosk. "
    "The user will provide a stream of raw, fragmented words translated from hand gestures. "
    "Your job is to infer their intent and restructure these fragments into a single, polite, "
    "grammatically correct, and natural-sounding sentence. "
    "Do not add extra conversational filler. Just output the refined sentence."
)

@app.post("/translate")
async def translate_signs(request: TranslationRequest):
    if not request.words:
        raise HTTPException(status_code=400, detail="Word stream is empty.")

    raw_signs = " ".join(request.words)

    try:
        response = client.models.generate_content(
            model="gemini-1.5-flash",
            contents=f"Raw signs: {raw_signs}",
            config=types.GenerateContentConfig(
                system_instruction=SYSTEM_INSTRUCTION,
                temperature=0.4,
                max_output_tokens=100,
            ),
        )

        refined_sentence = response.text.strip()

        return {
            "status": "success",
            "original_stream": request.words,
            "refined_sentence": refined_sentence,
        }

    except Exception as e:
        print(f"Gemini API Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error communicating with Gemini service: {str(e)}")
