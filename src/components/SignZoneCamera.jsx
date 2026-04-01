import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Repeat, RotateCcw, Camera as CameraIcon, Moon, SunMedium } from 'lucide-react';
import { useMediaPipe } from '../hooks/useMediaPipe';
import { detectGesture } from '../utils/gestureRecognizer';

const GESTURE_GUIDE = ["Hello", "Help", "Appointment", "Yes", "No"];

export default function SignZoneCamera({ onExit, isDark, toggleDark }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoElement, setVideoElement] = useState(null);

  const [currentWord, setCurrentWord] = useState("");
  const [wordStream, setWordStream] = useState([]);
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [finalSentence, setFinalSentence] = useState("");

  useEffect(() => {
    if (videoRef.current) setVideoElement(videoRef.current);
  }, []);

  const { isDetecting, landmarks } = useMediaPipe(videoElement);

  // --- HCI LATENCY BUFFERING & API CALL ---
  useEffect(() => {
    if (!currentWord || currentWord === "SIGNING...") return;

    const timer = setTimeout(async () => {
      if (currentWord === "FIST") {
        if (wordStream.length === 0) return;
        setIsFinalizing(true);
        setFinalSentence("");
        try {
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
            const utterance = new SpeechSynthesisUtterance(aiSentence);
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
          }
        } catch (error) {
          console.error("Translation Error:", error);
          setFinalSentence("Error: Could not reach translation server.");
        } finally {
          setWordStream([]);
          setIsFinalizing(false);
          setCurrentWord("");
        }
      } else {
        setWordStream((prev) => {
          if (prev[prev.length - 1] !== currentWord) return [...prev, currentWord];
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

    if (landmarks.rightHand) {
      const detected = detectGesture(landmarks.rightHand);
      setCurrentWord(detected || "");
      drawConnectors(canvasCtx, landmarks.rightHand, HAND_CONNECTIONS, { color: '#7c3aed', lineWidth: 4 });
      drawLandmarks(canvasCtx, landmarks.rightHand, { color: '#ffffff', lineWidth: 2, radius: 3 });
    } else if (landmarks.leftHand) {
      const detected = detectGesture(landmarks.leftHand);
      setCurrentWord(detected || "");
      drawConnectors(canvasCtx, landmarks.leftHand, HAND_CONNECTIONS, { color: '#a78bfa', lineWidth: 4 });
      drawLandmarks(canvasCtx, landmarks.leftHand, { color: '#ffffff', lineWidth: 2, radius: 3 });
    } else {
      setCurrentWord("");
    }
    canvasCtx.restore();
  }, [landmarks]);

  const repeatAudio = () => {
    if (finalSentence) {
      const utterance = new SpeechSynthesisUtterance(finalSentence);
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const clearTranslation = () => {
    setWordStream([]);
    setFinalSentence("");
    setCurrentWord("");
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300 ${isDark ? 'bg-purple-950' : 'bg-slate-50'}`}>
      {/* Top Navbar */}
      <header className={`h-16 flex items-center justify-between px-6 shrink-0 shadow-sm z-20 border-b ${isDark ? 'bg-purple-900 border-purple-800' : 'bg-white border-slate-200'}`}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={onExit}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDark ? 'bg-purple-800 text-purple-300' : 'bg-purple-100 text-violet-700'}`}>
            <CameraIcon size={18} />
          </div>
          <h1 className={`font-bold text-xl tracking-tight ${isDark ? 'text-purple-50' : 'text-slate-900'}`}>SignSync</h1>
          <span className={`text-sm font-medium hidden sm:inline-block ml-2 border-l pl-3 ${isDark ? 'text-purple-400 border-purple-700' : 'text-slate-400 border-slate-300'}`}>
            AI Sign Language Translator
          </span>
        </div>
        <button
          onClick={toggleDark}
          className={`p-2 rounded-full transition-colors ${isDark ? 'text-purple-300 hover:bg-purple-800' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
        >
          {isDark ? <SunMedium size={20} /> : <Moon size={20} />}
        </button>
      </header>

      {/* Main Split-Screen Content */}
      <main className={`flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0`}>

        {/* LEFT COLUMN: Camera Feed */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-lg flex flex-col h-full min-h-[400px]">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" playsInline muted></video>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none transform -scale-x-100"></canvas>

          {/* User Guide Ghost */}
          {!isDetecting && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-sm transition-opacity">
              <div className="w-64 h-80 border-2 border-dashed border-white/50 rounded-3xl flex items-center justify-center mb-4">
              </div>
              <p className="text-white font-medium bg-black/50 px-4 py-2 rounded-full">Please step into the frame</p>
            </div>
          )}

          {/* Bottom Gesture Guide (Pills) */}
          <div className="absolute bottom-4 w-full flex justify-center px-4 z-20 pointer-events-none">
            <div className="flex flex-wrap justify-center gap-2">
              {GESTURE_GUIDE.map((guide, idx) => (
                <span key={idx} className="bg-white/80 backdrop-blur-md text-slate-800 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full shadow-sm">
                  {guide}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Translation Panel */}
        <div className={`flex flex-col rounded-2xl shadow-lg border overflow-hidden h-full transition-colors duration-300 ${isDark ? 'bg-purple-900 border-purple-800' : 'bg-white border-slate-200'}`}>

          {/* Panel Header */}
          <div className={`p-4 border-b flex items-center justify-between shrink-0 ${isDark ? 'border-purple-800' : 'border-slate-100'}`}>
            <h2 className={`font-semibold text-lg ${isDark ? 'text-purple-100' : 'text-slate-800'}`}>Translation</h2>
            <div className="flex gap-2">
              <button
                onClick={repeatAudio}
                disabled={!finalSentence}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${isDark ? 'text-purple-300 hover:bg-purple-800 hover:text-purple-100' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
              >
                <Repeat size={16} /> Repeat
              </button>
              <button
                onClick={clearTranslation}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isDark ? 'text-purple-300 hover:bg-red-900/40 hover:text-red-300' : 'text-slate-600 hover:bg-red-50 hover:text-red-600'}`}
              >
                <RotateCcw size={16} /> Clear
              </button>
            </div>
          </div>

          {/* Main Translation Display Area */}
          <div className={`flex-1 p-8 flex flex-col items-center justify-center relative overflow-y-auto ${isDark ? 'bg-purple-950/50' : 'bg-slate-50/50'}`}>
            <AnimatePresence mode="wait">
              {/* State 1: Empty / Waiting */}
              {wordStream.length === 0 && !finalSentence && !isFinalizing && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className={`flex flex-col items-center text-center ${isDark ? 'text-purple-400' : 'text-slate-400'}`}
                >
                  <Hand size={48} className="mb-4 opacity-50" />
                  <h3 className={`text-xl font-medium mb-1 ${isDark ? 'text-purple-300' : 'text-slate-600'}`}>Show a sign to begin</h3>
                  <p>Hold your hand steady in the camera</p>
                </motion.div>
              )}

              {/* State 2: Translating in Progress */}
              {wordStream.length > 0 && !finalSentence && (
                <motion.div key="streaming" className="w-full flex flex-col items-start justify-end h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {wordStream.map((word, index) => (
                      <span key={index} className={`px-4 py-2 rounded-xl text-xl font-medium ${isDark ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-violet-700'}`}>
                        {word}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* State 3: AI Finalizing */}
              {isFinalizing && (
                <motion.div key="finalizing" className="flex flex-col items-center">
                  <div className={`w-8 h-8 border-4 rounded-full animate-spin mb-4 ${isDark ? 'border-purple-700 border-t-purple-300' : 'border-purple-200 border-t-violet-600'}`}></div>
                  <p className={`font-medium animate-pulse ${isDark ? 'text-purple-300' : 'text-violet-600'}`}>Processing with AI...</p>
                </motion.div>
              )}

              {/* State 4: Final AI Sentence */}
              {finalSentence && !isFinalizing && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex items-center justify-center text-center"
                >
                  <p className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight ${isDark ? 'text-purple-50' : 'text-slate-800'}`}>
                    {finalSentence}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dwell Timer Progress Bar (Footer) */}
          <div className={`p-6 border-t shrink-0 ${isDark ? 'border-purple-800 bg-purple-900' : 'border-slate-100 bg-white'}`}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium ${isDark ? 'text-purple-400' : 'text-slate-500'}`}>
                {currentWord && currentWord !== "SIGNING..." ? `Detecting: ${currentWord}` : "Detecting..."}
              </span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-purple-800' : 'bg-slate-100'}`}>
              <motion.div
                key={currentWord}
                initial={{ width: "0%" }}
                animate={{ width: currentWord && currentWord !== "SIGNING..." ? "100%" : "0%" }}
                transition={{ duration: currentWord && currentWord !== "SIGNING..." ? 1.5 : 0, ease: "linear" }}
                className={`h-full ${currentWord === "FIST" ? "bg-red-500" : isDark ? "bg-violet-500" : "bg-violet-700"}`}
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}