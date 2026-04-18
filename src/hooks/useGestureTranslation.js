import { useState, useEffect } from 'react';

// Calling Gemini directly from the frontend avoids needing a local Python server
const GEMINI_API_KEY = "AIzaSyAh0yc4H0LUHZe6GFqwpINfRus_AR9XA1U";
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `You are an expert Sign Language to English interpreter operating in a public service kiosk. 
The user will provide a stream of raw, fragmented words translated from hand gestures. 
Your job is to infer their intent and restructure these fragments into a single, polite, 
grammatically correct, and natural-sounding sentence. 
Do not add extra conversational filler. Just output the refined sentence.`;

async function callGemini(words) {
  const rawSigns = words.join(" ");
  const response = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{ parts: [{ text: `Raw signs: ${rawSigns}` }] }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 100 },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err?.error?.message || "Gemini API error");
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? words.join(" ");
}

export function useGestureTranslation(currentWord) {
  const [wordStream, setWordStream] = useState([]);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [finalSentence, setFinalSentence] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentWord || currentWord === "SIGNING...") return;

    const timer = setTimeout(async () => {
      // FIST signals completion — trigger Gemini translation
      if (currentWord === "FIST") {
        if (wordStream.length === 0) return;

        setIsFinalizing(true);
        setFinalSentence("");
        setError(null);

        try {
          const sentence = await callGemini(wordStream);
          setFinalSentence(sentence);
        } catch (err) {
          console.error("Gemini Translation Error:", err);
          // Graceful fallback: just show the raw words instead of an error
          setFinalSentence(wordStream.join(" "));
        } finally {
          setWordStream([]);
          setIsFinalizing(false);
        }
      } else {
        // Collect gestures if not fist — deduplicate consecutive repeats
        setWordStream((prev) => {
          if (prev[prev.length - 1] !== currentWord) return [...prev, currentWord];
          return prev;
        });
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [currentWord, wordStream]);

  const clearTranslation = () => {
    setWordStream([]);
    setFinalSentence("");
    setError(null);
  };

  return { wordStream, isFinalizing, finalSentence, error, clearTranslation };
}
