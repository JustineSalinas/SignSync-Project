import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMediaPipe } from '../hooks/useMediaPipe';
import { detectGesture } from '../utils/gestureRecognizer';

export default function SignZoneCamera() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoElement, setVideoElement] = useState(null);
  
  const [currentWord, setCurrentWord] = useState(""); 
  const [wordStream, setWordStream] = useState([]); 
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [finalSentence, setFinalSentence] = useState(""); // Holds the AI output

  useEffect(() => {
    if (videoRef.current) setVideoElement(videoRef.current);
  }, []);

  const { isDetecting, landmarks } = useMediaPipe(videoElement);

  // --- HCI LATENCY BUFFERING & API CALL ---
  useEffect(() => {
    if (!currentWord || currentWord === "SIGNING...") return;

    const timer = setTimeout(async () => {
      if (currentWord === "FIST") {
        if (wordStream.length === 0) return; // Don't send empty requests
        
        setIsFinalizing(true);
        setFinalSentence(""); // Clear previous sentence
        
        try {
          // 1. Send the raw signs to Alexander's Python backend
          const response = await fetch('http://localhost:8000/api/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ words: wordStream })
          });
          
          if (!response.ok) throw new Error("Backend connection failed");
          
          const data = await response.json();
          
          if (data.status === 'success') {
            const aiSentence = data.refined_sentence;
            setFinalSentence(aiSentence);
            
            // 2. Trigger Web Speech API to read it aloud
            const utterance = new SpeechSynthesisUtterance(aiSentence);
            utterance.rate = 0.9; // Slightly slower for clarity
            window.speechSynthesis.speak(utterance);
          }
        } catch (error) {
          console.error("Translation Error:", error);
          setFinalSentence("Error: Could not reach translation server.");
        } finally {
          // 3. Reset the UI for the next user
          setWordStream([]);
          setIsFinalizing(false);
          setCurrentWord("");
        }

      } else {
        // Lock in the recognized word
        setWordStream((prev) => {
          if (prev[prev.length - 1] !== currentWord) {
            return [...prev, currentWord];
          }
          return prev;
        });
      }
    }, 1500); 

    return () => clearTimeout(timer);
  }, [currentWord, wordStream]);

  // --- DRAWING LOOP ---
  useEffect(() => {
    if (!landmarks || !canvasRef.current || !videoRef.current) return;

    const canvasCtx = canvasRef.current.getContext('2d');
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    const drawConnectors = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;
    const HAND_CONNECTIONS = window.HAND_CONNECTIONS;
    const POSE_CONNECTIONS = window.POSE_CONNECTIONS;

    if (landmarks.rightHand) {
      const detected = detectGesture(landmarks.rightHand);
      setCurrentWord(detected || "");
      drawConnectors(canvasCtx, landmarks.rightHand, HAND_CONNECTIONS, { color: '#00FFFF', lineWidth: 5 });
      drawLandmarks(canvasCtx, landmarks.rightHand, { color: '#FFFFFF', lineWidth: 2, radius: 3 });
    } else if (landmarks.leftHand) {
      const detected = detectGesture(landmarks.leftHand);
      setCurrentWord(detected || "");
      drawConnectors(canvasCtx, landmarks.leftHand, HAND_CONNECTIONS, { color: '#FF00FF', lineWidth: 5 });
      drawLandmarks(canvasCtx, landmarks.leftHand, { color: '#FFFFFF', lineWidth: 2, radius: 3 });
    } else {
      setCurrentWord(""); 
    }

    if (landmarks.pose) {
      drawConnectors(canvasCtx, landmarks.pose, POSE_CONNECTIONS, { color: '#ffffff40', lineWidth: 2 });
    }
    canvasCtx.restore();
  }, [landmarks]);

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border-4 border-slate-800 flex flex-col">
      
      {/* Top Status Bar & Live Word Stream */}
      <div className="absolute top-0 left-0 w-full p-6 z-20 flex flex-col gap-4 bg-gradient-to-b from-black/95 via-black/80 to-transparent">
        <div className="flex justify-between items-center">
          <h2 className="text-white font-semibold tracking-wide">SignSync Kiosk</h2>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDetecting ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
            <span className="text-white text-sm font-medium">
              {isDetecting ? 'User Detected' : 'Waiting for User...'}
            </span>
          </div>
        </div>

        {/* The Accumulated Sentence */}
        <div className="min-h-[3rem] flex items-center gap-2 flex-wrap">
          <AnimatePresence>
            {wordStream.map((word, index) => (
              <motion.span 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-blue-600/80 text-white px-4 py-1 rounded-full text-lg font-bold shadow-lg border border-blue-400/30"
              >
                {word}
              </motion.span>
            ))}
          </AnimatePresence>
          {isFinalizing && (
            <motion.span 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-yellow-400 font-medium ml-2 animate-pulse"
            >
              Translating with AI...
            </motion.span>
          )}
        </div>

        {/* The Final Refined Output */}
        <AnimatePresence>
          {finalSentence && !isFinalizing && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="w-full bg-emerald-500/20 border border-emerald-500/50 p-4 rounded-xl backdrop-blur-sm"
            >
              <p className="text-emerald-100 text-2xl font-medium">"{finalSentence}"</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <video ref={videoRef} className="w-full h-auto object-cover transform -scale-x-100" playsInline muted></video>
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none transform -scale-x-100"></canvas>

      {/* Real-time Dwell Timer Feedback */}
      <AnimatePresence>
        {currentWord && currentWord !== "SIGNING..." && !isFinalizing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center"
          >
            <div className="bg-black/80 backdrop-blur-md border border-white/20 px-8 py-3 rounded-t-2xl shadow-2xl">
              <p className="text-white text-3xl font-bold tracking-wider">{currentWord}</p>
            </div>
            <div className="w-full h-2 bg-slate-800 rounded-b-2xl overflow-hidden">
              <motion.div 
                key={currentWord} 
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, ease: "linear" }}
                className={`h-full ${currentWord === "FIST" ? "bg-red-500" : "bg-green-500"}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isDetecting && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none opacity-30">
           <div className="w-64 h-80 border-4 border-dashed border-white rounded-3xl flex items-center justify-center">
             <p className="text-white font-bold text-center">Stand Here</p>
           </div>
        </div>
      )}
    </div>
  );
}