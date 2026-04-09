import { useEffect } from 'react';

export function useSpeechSynthesis(textToSpeak, rate = 0.9) {
  useEffect(() => {
    if (textToSpeak) {
      // Small delay prevents cutting off right as state updates
      const timeout = setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = rate;
        window.speechSynthesis.speak(utterance);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [textToSpeak, rate]);

  const repeatAudio = () => {
    if (textToSpeak) {
      window.speechSynthesis.cancel(); // Stop playing if currently playing
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = rate;
      window.speechSynthesis.speak(utterance);
    }
  };

  return { repeatAudio };
}
