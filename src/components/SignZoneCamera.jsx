import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Repeat, RotateCcw, Camera as CameraIcon, Moon, SunMedium, AlertTriangle, ChevronDown } from 'lucide-react';
import { useMediaPipe } from '../hooks/useMediaPipe';
import { detectGesture } from '../utils/gestureRecognizer';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { darkTheme, lightTheme, colors } from '../theme';

import { useGestureTranslation } from '../hooks/useGestureTranslation';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

const GESTURE_GUIDE = ["Hello", "Help", "Appointment", "Yes", "No"];

export default function SignZoneCamera({ onExit }) {
  const { isDark, toggleDark } = useTheme();
  const { language, setLanguage, LANGUAGES, t } = useLanguage();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langBtnRef = useRef(null);

  // Close language dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (langBtnRef.current && !langBtnRef.current.contains(e.target)) setIsLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [videoElement, setVideoElement] = useState(null);
  const [currentWord, setCurrentWord] = useState("");

  const themeVars = isDark ? darkTheme : lightTheme;

  // 1. Mount Video Element
  useEffect(() => {
    if (videoRef.current) setVideoElement(videoRef.current);
  }, []);

  // 2. Initialize MediaPipe via robust custom hook
  const { isDetecting, landmarks, cameraError } = useMediaPipe(videoElement);

  // 3. API Translation Hook — pass selected language so Gemini responds in the right language
  const {
    wordStream,
    isFinalizing,
    finalSentence,
    error,
    clearTranslation
  } = useGestureTranslation(currentWord, language);

  // 4. TTS Hook
  const { repeatAudio } = useSpeechSynthesis(finalSentence);

  // 5. Drawing Loop (Canvas overlay) — runs on every new landmarks update
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (video.videoWidth === 0) return;

    // Only resize canvas when video dimensions actually change (avoids GPU flush every frame)
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);

    if (!landmarks) return;

    const drawConnectors = window.drawConnectors;
    const drawLandmarks = window.drawLandmarks;
    const HAND_CONNECTIONS = window.HAND_CONNECTIONS;

    if (landmarks.rightHand) {
      const detected = detectGesture(landmarks.rightHand);
      setCurrentWord(detected || "");
      if (drawConnectors && drawLandmarks) {
        drawConnectors(canvasCtx, landmarks.rightHand, HAND_CONNECTIONS, { color: colors.violet[600], lineWidth: 3 });
        drawLandmarks(canvasCtx, landmarks.rightHand, { color: '#ffffff', lineWidth: 1, radius: 4 });
      }
    } else if (landmarks.leftHand) {
      const detected = detectGesture(landmarks.leftHand);
      setCurrentWord(detected || "");
      if (drawConnectors && drawLandmarks) {
        drawConnectors(canvasCtx, landmarks.leftHand, HAND_CONNECTIONS, { color: colors.violet[400], lineWidth: 3 });
        drawLandmarks(canvasCtx, landmarks.leftHand, { color: '#ffffff', lineWidth: 1, radius: 4 });
      }
    } else {
      setCurrentWord("");
    }
  }, [landmarks]);

  const handleClear = () => {
    clearTranslation();
    setCurrentWord("");
  };

  return (
    <div className={`flex flex-col h-screen transition-colors duration-300`} style={{ background: themeVars.bg, color: themeVars.text }}>
      {/* Top Navbar */}
      <header role="banner" className={`h-16 flex items-center justify-between px-4 sm:px-6 shrink-0 shadow-sm z-20 border-b`} style={{ background: themeVars.surface, borderColor: themeVars.border }}>
        {/* Left: Logo / Back */}
        <button tabIndex={0} className="flex items-center gap-2 cursor-pointer bg-transparent border-none" onClick={onExit} aria-label="Exit Camera Mode">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center`} style={{ background: isDark ? colors.violet.darkBg : colors.violet.lightBg, color: isDark ? colors.violet[400] : colors.violet[600] }}>
            <CameraIcon size={18} />
          </div>
          <h1 className="font-bold text-xl tracking-tight" style={{ color: themeVars.text }}>{t('team_title_2')}</h1>
          <span className="text-sm font-medium hidden sm:inline-block ml-2 border-l pl-3" style={{ color: themeVars.textMuted, borderColor: themeVars.border }}>
            {t('cam_header_sub')}
          </span>
        </button>

        {/* Right: Language + Theme toggle */}
        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div ref={langBtnRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsLangOpen((p) => !p)}
              aria-label={t('output_lang')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.08)',
                border: `1px solid ${isDark ? 'rgba(139,92,246,0.35)' : 'rgba(139,92,246,0.22)'}`,
                color: isDark ? colors.violet[400] : colors.violet[600],
                cursor: 'pointer',
              }}
            >
              <img src={language.flag} alt="flag" width="18" height="13" style={{ borderRadius: '2px', objectFit: 'cover' }} />
              <span className="hidden xs:inline">{language.short}</span>
              <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: isLangOpen ? 'rotate(180deg)' : 'none' }} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ duration: 0.14 }}
                  className="absolute right-0 mt-2 rounded-2xl overflow-hidden shadow-2xl"
                  style={{
                    minWidth: 158,
                    background: isDark ? '#0f0a1e' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(139,92,246,0.22)' : 'rgba(139,92,246,0.18)'}`,
                    zIndex: 300,
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                      className="flex items-center gap-2.5 w-full text-left transition-all"
                      style={{
                        padding: '0.6rem 1rem',
                        border: 'none', cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: language.code === lang.code ? 700 : 500,
                        background: language.code === lang.code
                          ? (isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.08)')
                          : 'transparent',
                        color: language.code === lang.code
                          ? (isDark ? colors.violet[400] : colors.violet[600])
                          : (isDark ? '#9d8ec8' : '#6b6080'),
                      }}
                    >
                      <img src={lang.flag} alt="flag" width="18" height="13" style={{ borderRadius: '2px', objectFit: 'cover' }} />
                      <span>{lang.label}</span>
                      {language.code === lang.code && (
                        <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: isDark ? colors.violet[400] : colors.violet[600], flexShrink: 0 }} />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleDark}
            aria-label={isDark ? t('light_mode') : t('dark_mode')}
            className="p-2 rounded-full transition-colors"
            style={{ color: isDark ? colors.violet[400] : colors.slate[400], background: 'transparent', border: 'none', cursor: 'pointer' }}
          >
            {isDark ? <SunMedium size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      {/* Main Split-Screen Content */}
      <main role="main" className={`flex-1 max-w-[1600px] w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0`}>

        {/* LEFT COLUMN: Camera Feed */}
        <section aria-label="Camera view" className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-lg flex flex-col h-full min-h-[400px]">
          <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover transform -scale-x-100" playsInline muted></video>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none transform -scale-x-100"></canvas>

          {/* Camera Error State — Full-page helpful guide */}
          {cameraError && (
            <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 p-6 text-center overflow-y-auto">
              {/* Icon */}
              <div className="w-20 h-20 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400 mb-5 shrink-0">
                <AlertTriangle size={36} />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">{t('cam_err_title')}</h3>
              <p className="text-slate-400 max-w-sm mb-6 text-sm leading-relaxed">
                {t('cam_err_desc')}
              </p>

              {/* Step-by-step instructions */}
              <div className="w-full max-w-sm space-y-3 mb-6 text-left">
                {/* Chrome / Brave */}
                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                  <p className="text-violet-400 font-semibold text-xs uppercase tracking-widest mb-2">Chrome / Brave</p>
                  <ol className="text-slate-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Tap the <span className="text-white font-medium">🔒 lock icon</span> in the address bar</li>
                    <li>Tap <span className="text-white font-medium">"Site settings"</span></li>
                    <li>Set <span className="text-white font-medium">Camera → Allow</span></li>
                    <li>Come back and tap <span className="text-white font-medium">"Try Again"</span> below</li>
                  </ol>
                </div>

                {/* Safari */}
                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl p-4">
                  <p className="text-violet-400 font-semibold text-xs uppercase tracking-widest mb-2">Safari (iPhone / iPad)</p>
                  <ol className="text-slate-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Open <span className="text-white font-medium">Settings → Safari</span></li>
                    <li>Tap <span className="text-white font-medium">Camera</span></li>
                    <li>Select <span className="text-white font-medium">"Allow"</span></li>
                    <li>Return to this page and tap <span className="text-white font-medium">"Try Again"</span></li>
                  </ol>
                </div>
              </div>

              {/* Retry button — reloads the page to re-trigger permission prompt */}
              <button
                onClick={() => window.location.reload()}
                className="flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 active:scale-95"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', boxShadow: '0 0 24px rgba(124,58,237,0.5)' }}
              >
                <RotateCcw size={16} />
                {t('cam_err_try')}
              </button>

              <p className="text-slate-600 text-xs mt-4 max-w-xs">
                {t('cam_err_note')}
              </p>
            </div>
          )}


          {/* User Guide Ghost (When no hands are found) */}
          {!isDetecting && !cameraError && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none bg-black/40 backdrop-blur-[2px] transition-all duration-500 pb-16 sm:pb-0">
              <div className="w-[50%] max-w-[200px] sm:w-64 aspect-[3/4] sm:aspect-auto sm:h-80 border-2 border-dashed border-white/40 rounded-[2rem] flex flex-col items-center justify-center mb-4 sm:mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)] relative">
                <div className="absolute -top-3 px-3 bg-slate-900 border border-white/20 rounded-full text-white/70 text-[10px] sm:text-xs font-semibold tracking-widest uppercase">{t('cam_align')}</div>
              </div>
              <div className="bg-black/60 backdrop-blur-xl border border-white/20 px-4 py-2 sm:px-6 sm:py-3 rounded-full flex items-center gap-2 sm:gap-3 shadow-2xl transform hover:scale-105 transition-transform">
                <CameraIcon className="text-violet-400" size={16} />
                <p className="text-white text-xs sm:text-base font-medium tracking-wide">{t('cam_step_in')}</p>
              </div>
            </div>
          )}

          {/* Bottom Gesture Guide (Pills) - Scrollable Dock */}
          <div className="absolute bottom-3 sm:bottom-5 left-0 right-0 z-20 flex justify-center px-2 sm:px-4 pointer-events-auto">
            <div 
              className="flex items-center overflow-x-auto gap-1.5 sm:gap-3 py-2.5 px-2.5 sm:px-2 rounded-[1.25rem] sm:rounded-full bg-slate-900/60 sm:bg-transparent backdrop-blur-xl sm:backdrop-blur-none border border-white/10 sm:border-none shadow-2xl sm:shadow-none w-full sm:w-auto max-w-full"
              style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
            >
              <div className="flex sm:flex-wrap items-center gap-1.5 sm:gap-3 justify-start sm:justify-center min-w-max sm:min-w-0 mx-auto px-1">
                {[t('hello'), t('help'), t('appointment'), t('yes'), t('no')].map((guide, idx) => (
                  <span 
                    key={idx} 
                    className="shrink-0 text-[10px] sm:text-sm font-bold tracking-widest px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-300 hover:scale-105 cursor-default uppercase"
                    style={{ 
                      background: isDark ? 'linear-gradient(135deg, rgba(20, 15, 35, 0.95), rgba(15, 10, 25, 0.95))' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(248, 245, 255, 0.98))',
                      color: isDark ? colors.violet[300] : colors.violet[800],
                      borderColor: isDark ? 'rgba(139, 92, 246, 0.3)' : 'rgba(139, 92, 246, 0.25)',
                      boxShadow: isDark ? '0 4px 12px rgba(90, 30, 200, 0.4)' : '0 4px 15px rgba(139, 92, 246, 0.15)'
                    }}
                  >
                    {guide}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </section>

        {/* RIGHT COLUMN: Translation Panel */}
        <section aria-label="Translation output" className={`flex flex-col rounded-2xl shadow-lg overflow-hidden h-full transition-colors duration-300`} style={{ background: themeVars.surface, border: `1px solid ${themeVars.border}` }}>

          {/* Panel Header */}
          <div className={`p-4 border-b flex items-center justify-between shrink-0`} style={{ borderColor: themeVars.border }}>
            <h2 className="font-semibold text-lg" style={{ color: themeVars.text }}>{t('cam_trans_title')}</h2>
            <div className="flex gap-2">
              <button
                tabIndex={0}
                onClick={repeatAudio}
                disabled={!finalSentence || error}
                aria-label={t('cam_trans_rep')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-transparent border-none" 
                style={{ color: isDark ? colors.violet[400] : colors.slate[800] }}
              >
                <Repeat size={16} /> {t('cam_trans_rep')}
              </button>
              <button
                tabIndex={0}
                onClick={handleClear}
                aria-label={t('cam_trans_clr')}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors bg-transparent border-none cursor-pointer" 
                style={{ color: isDark ? colors.violet[400] : colors.slate[800] }}
              >
                <RotateCcw size={16} /> {t('cam_trans_clr')}
              </button>
            </div>
          </div>

          {/* Main Translation Display Area */}
          <div className={`flex-1 p-8 flex flex-col items-center justify-center relative overflow-y-auto`} style={{ background: isDark ? 'rgba(5,2,15,0.6)' : 'rgba(248,247,255,0.5)' }}>
            <AnimatePresence mode="wait">
              
              {/* Error State */}
              {error && (
                <motion.div
                  key="error"
                  role="alert"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center max-w-md"
                >
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4">
                    <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-red-500 mb-2">{t('cam_trans_err')}</h3>
                  <p className="text-base" style={{ color: themeVars.textMuted }}>{error}</p>
                </motion.div>
              )}

              {/* State 1: Empty / Waiting */}
              {wordStream.length === 0 && !finalSentence && !isFinalizing && !error && (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center" style={{ color: themeVars.textMuted }}
                >
                  <Hand size={48} className="mb-4 opacity-50" />
                  <h3 className="text-xl font-medium mb-1" style={{ color: themeVars.textSubtle }}>{t('cam_trans_wait1')}</h3>
                  <p>{t('cam_trans_wait2')}</p>
                </motion.div>
              )}

              {/* State 2: Translating in Progress */}
              {wordStream.length > 0 && !finalSentence && !error && (
                <motion.div key="streaming" className="w-full flex flex-col items-start justify-end h-full">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {wordStream.map((word, index) => (
                      <span key={index} className="px-4 py-2 rounded-xl text-xl font-medium" style={{ background: isDark ? colors.violet.darkBg : colors.violet.lightBg, color: isDark ? '#c4b5fd' : colors.violet[600] }}>
                        {word}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* State 3: AI Finalizing */}
              {isFinalizing && !error && (
                <motion.div key="finalizing" className="flex flex-col items-center">
                  <div className="w-8 h-8 border-4 rounded-full animate-spin mb-4" style={{ borderColor: isDark ? 'rgba(109,40,217,0.3)' : '#ddd6fe', borderTopColor: isDark ? colors.violet[400] : colors.violet[600] }} />
                  <p className="font-medium animate-pulse" style={{ color: isDark ? colors.violet[400] : colors.violet[600] }}>{t('cam_trans_proc')}</p>
                </motion.div>
              )}

              {/* State 4: Final AI Sentence */}
              {finalSentence && !isFinalizing && !error && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="w-full h-full flex items-center justify-center text-center"
                >
                  <p role="status" aria-live="polite" className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: themeVars.text }}>
                    {finalSentence}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dwell Timer Progress Bar (Footer) */}
          <div className="p-6 border-t shrink-0" style={{ borderColor: themeVars.border, background: themeVars.surface }}>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium" style={{ color: themeVars.textMuted }}>
                {currentWord && currentWord !== "SIGNING..." ? `${t('cam_det')}${currentWord}` : t('cam_det_wait')}
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: isDark ? 'rgba(109,40,217,0.2)' : '#f1f5f9' }}>
              <motion.div
                key={currentWord}
                initial={{ width: "0%" }}
                animate={{ width: currentWord && currentWord !== "SIGNING..." ? "100%" : "0%" }}
                transition={{ duration: currentWord && currentWord !== "SIGNING..." ? 1.5 : 0, ease: "linear" }}
                className={`h-full ${currentWord === "FIST" ? "bg-red-500" : isDark ? "bg-violet-500" : "bg-violet-700"}`}
              />
            </div>
          </div>

        </section>
      </main>
    </div>
  );
}