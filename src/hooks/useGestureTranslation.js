import { useState, useEffect } from 'react';

export function useGestureTranslation(currentWord) {
  const [wordStream, setWordStream] = useState([]);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [finalSentence, setFinalSentence] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!currentWord || currentWord === "SIGNING...") return;

    const timer = setTimeout(async () => {
      // FIST signals completion
      if (currentWord === "FIST") {
        if (wordStream.length === 0) return;
        
        setIsFinalizing(true);
        setFinalSentence("");
        setError(null);
        
        try {
          const response = await fetch('/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ words: wordStream })
          });
          
          if (!response.ok) throw new Error("Backend connection failed");
          
          const data = await response.json();
          if (data.status === 'success') {
            setFinalSentence(data.refined_sentence);
          } else {
            setError("Translation failed. Please try again.");
          }
        } catch (err) {
          console.error("Translation Error:", err);
          setError("Network error: Could not reach translation server.");
        } finally {
          // Clear internal buffer
          setWordStream([]);
          setIsFinalizing(false);
        }
      } else {
        // Collect gestures if not fist
        setWordStream((prev) => {
          if (prev[prev.length - 1] !== currentWord) return [...prev, currentWord];
          return prev;
        });
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [currentWord, wordStream]);

  const clearTranslation = () => {
    setWordStream([]);
    setFinalSentence("");
    setError(null);
  };

  return {
    wordStream,
    isFinalizing,
    finalSentence,
    error,
    clearTranslation
  };
}
