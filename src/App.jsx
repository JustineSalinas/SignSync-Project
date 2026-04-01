import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Hand, Camera, Volume2, ArrowRight, Moon, SunMedium } from 'lucide-react';
import SignZoneCamera from './components/SignZoneCamera';

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((prev) => !prev);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'dark bg-purple-950 text-purple-50' : 'bg-slate-50 text-slate-900'}`}>
      <AnimatePresence mode="wait">
        {!hasStarted ? (
          // --- LANDING PAGE ---
          <motion.div
            key="landing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="min-h-screen flex flex-col items-center justify-center p-6 relative"
          >
            {/* Dark mode toggle — top right */}
            <button
              onClick={toggleDark}
              className={`absolute top-6 right-6 p-2 rounded-full transition-colors ${isDark ? 'text-purple-300 hover:bg-purple-800' : 'text-slate-500 hover:bg-slate-200'}`}
            >
              {isDark ? <SunMedium size={20} /> : <Moon size={20} />}
            </button>

            <div className="max-w-xl w-full flex flex-col items-center">

              {/* Header */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${isDark ? 'bg-purple-800 text-purple-300' : 'bg-purple-100 text-violet-700'}`}>
                <Hand size={32} strokeWidth={2.5} />
              </div>
              <h1 className={`text-4xl font-bold tracking-tight mb-3 ${isDark ? 'text-purple-50' : 'text-slate-900'}`}>SignSync</h1>
              <p className={`text-center mb-10 text-lg ${isDark ? 'text-purple-300' : 'text-slate-500'}`}>
                AI-powered sign language translation for seamless communication.
              </p>

              {/* Instruction Cards */}
              <div className="w-full space-y-4 mb-10">
                <InstructionCard
                  isDark={isDark}
                  icon={<Camera className={isDark ? 'text-purple-400' : 'text-violet-700'} size={24} />}
                  title="Camera Access"
                  desc="We'll need your camera to see your hand signs. No video is stored or transmitted."
                />
                <InstructionCard
                  isDark={isDark}
                  icon={<Hand className={isDark ? 'text-purple-400' : 'text-violet-700'} size={24} />}
                  title="Position Your Hands"
                  desc="Stand about 2 feet from the screen. Keep your hands in the camera frame at chest height."
                />
                <InstructionCard
                  isDark={isDark}
                  icon={<Volume2 className={isDark ? 'text-purple-400' : 'text-violet-700'} size={24} />}
                  title="Audio Translation"
                  desc="Recognized signs will be spoken aloud so the service officer can understand you."
                />
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setHasStarted(true)}
                className={`group relative flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg active:scale-95 w-full sm:w-auto ${isDark ? 'bg-violet-700 hover:bg-violet-600 text-white hover:shadow-violet-700/30' : 'bg-violet-700 hover:bg-violet-800 text-white hover:shadow-violet-500/30'}`}
              >
                Get Started
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <p className={`mt-6 text-sm text-center ${isDark ? 'text-purple-400' : 'text-slate-400'}`}>
                Camera access is required. Your privacy is protected — no data leaves this device.
              </p>
            </div>
          </motion.div>
        ) : (
          // --- MAIN DASHBOARD ---
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex flex-col"
          >
            <SignZoneCamera
              onExit={() => setHasStarted(false)}
              isDark={isDark}
              toggleDark={toggleDark}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Reusable UI Component for Landing Page Cards
function InstructionCard({ icon, title, desc, isDark }) {
  return (
    <div className={`flex items-start p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow border ${isDark ? 'bg-purple-900 border-purple-800 hover:shadow-purple-900/50' : 'bg-white border-slate-200'}`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${isDark ? 'bg-purple-800' : 'bg-purple-50'}`}>
        {icon}
      </div>
      <div>
        <h3 className={`font-semibold text-lg ${isDark ? 'text-purple-100' : 'text-slate-900'}`}>{title}</h3>
        <p className={`mt-1 leading-relaxed ${isDark ? 'text-purple-300' : 'text-slate-500'}`}>{desc}</p>
      </div>
    </div>
  );
}
