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
          const response = await fetch('/api/translate', {
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
    <div className={`flex flex-col h-screen transition-colors duration-300`} style={{ background: isDark ? '#0a0a0f' : '#f8f7ff', color: isDark ? '#e4e0f8' : '#1a1030' }}>
      {/* Top Navbar */}
      <header className={`h-16 flex items-center justify-between px-6 shrink-0 shadow-sm z-20 border-b`} style={{ background: isDark ? '#0f0a1e' : '#ffffff', borderColor: isDark ? 'rgba(139,92,246,0.2)' : '#e2e8f0' }}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={onExit}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={{ background: isDark ? 'rgba(109,40,217,0.25)' : '#ede9fe', color: isDark ? '#a78bfa' : '#7c3aed' }}>
            <CameraIcon size={18} />
          </div>
          <h1 className={`font-bold text-xl tracking-tight`} style={{ color: isDark ? '#f3f0ff' : '#1a1030' }}>SignSync</h1>
          <span className={`text-sm font-medium hidden sm:inline-block ml-2 border-l pl-3`} style={{ color: isDark ? '#7c6fa0' : '#94a3b8', borderColor: isDark ? 'rgba(139,92,246,0.25)' : '#cbd5e1' }}>
            AI Sign Language Translator
          </span>
        </div>
        <button
          onClick={toggleDark}
          className={`p-2 rounded-full transition-colors`} style={{ color: isDark ? '#a78bfa' : '#94a3b8' }}
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
        <div className={`flex flex-col rounded-2xl shadow-lg overflow-hidden h-full transition-colors duration-300`} style={{ background: isDark ? '#0f0a1e' : '#ffffff', border: isDark ? '1px solid rgba(139,92,246,0.2)' : '1px solid #e2e8f0' }}>

          {/* Panel Header */}
          <div className={`p-4 border-b flex items-center justify-between shrink-0`} style={{ borderColor: isDark ? 'rgba(139,92,246,0.18)' : '#f1f5f9' }}>
            <h2 className={`font-semibold text-lg`} style={{ color: isDark ? '#e9e3ff' : '#1e293b' }}>Translation</h2>
            <div className="flex gap-2">
              <button
                onClick={repeatAudio}
                disabled={!finalSentence}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed`} style={{ color: isDark ? '#a78bfa' : '#475569' }}
              >
                <Repeat size={16} /> Repeat
              </button>
              <button
                onClick={clearTranslation}
                className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors`} style={{ color: isDark ? '#a78bfa' : '#475569' }}
              >
                <RotateCcw size={16} /> Clear
              </button>
            </div>
          </div>

          {/* Main Translation Display Area */}
          <div className={`flex-1 p-8 flex flex-col items-center justify-center relative overflow-y-auto`} style={{ background: isDark ? 'rgba(5,2,15,0.6)' : 'rgba(248,247,255,0.5)' }}>
            <AnimatePresence mode="wait">
              {/* State 1: Empty / Waiting */}
              {wordStream.length === 0 && !finalSentence && !isFinalizing && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className={`flex flex-col items-center text-center`} style={{ color: isDark ? '#7c6fa0' : '#94a3b8' }}
                >
                  <Hand size={48} className="mb-4 opacity-50" />
                  <h3 className={`text-xl font-medium mb-1`} style={{ color: isDark ? '#9d8ec8' : '#64748b' }}>Show a sign to begin</h3>
                  <p>Hold your hand steady in the camera</p>
                </motion.div>
              )}

              {/* State 2: Translating in Progress */}
              {wordStream.length > 0 && !finalSentence && (
                <motion.div key="streaming" className="w-full flex flex-col items-start justify-end h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {wordStream.map((word, index) => (
                      <span key={index} className={`px-4 py-2 rounded-xl text-xl font-medium`} style={{ background: isDark ? 'rgba(109,40,217,0.3)' : '#ede9fe', color: isDark ? '#c4b5fd' : '#7c3aed' }}>
                        {word}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* State 3: AI Finalizing */}
              {isFinalizing && (
                <motion.div key="finalizing" className="flex flex-col items-center">
                  <div className={`w-8 h-8 border-4 rounded-full animate-spin mb-4`} style={{ borderColor: isDark ? 'rgba(109,40,217,0.3)' : '#ddd6fe', borderTopColor: isDark ? '#a78bfa' : '#7c3aed' }}></div>
                  <p className={`font-medium animate-pulse`} style={{ color: isDark ? '#a78bfa' : '#7c3aed' }}>Processing with AI...</p>
                </motion.div>
              )}

              {/* State 4: Final AI Sentence */}
              {finalSentence && !isFinalizing && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex items-center justify-center text-center"
                >
                  <p className={`text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight`} style={{ color: isDark ? '#f0ecff' : '#1e293b' }}>
                    {finalSentence}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dwell Timer Progress Bar (Footer) */}
          <div className={`p-6 border-t shrink-0`} style={{ borderColor: isDark ? 'rgba(139,92,246,0.18)' : '#f1f5f9', background: isDark ? '#0f0a1e' : '#ffffff' }}>
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm font-medium`} style={{ color: isDark ? '#7c6fa0' : '#64748b' }}>
                {currentWord && currentWord !== "SIGNING..." ? `Detecting: ${currentWord}` : "Detecting..."}
              </span>
            </div>
            <div className={`w-full h-2 rounded-full overflow-hidden`} style={{ background: isDark ? 'rgba(109,40,217,0.2)' : '#f1f5f9' }}>
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