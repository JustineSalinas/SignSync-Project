import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SANS } from '../theme';

export default function VideoModal({ onClose }) {
  const { isDark } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Demo Video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', padding: '2rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative', width: '100%', maxWidth: 900, aspectRatio: '16/9',
            background: isDark ? '#0f0a1e' : '#1a1030', borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
        >
          <button
            onClick={onClose}
            aria-label="Close video modal"
            style={{
              position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
          >
            <X size={20} />
          </button>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
            <PlayCircle size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <p style={{ fontFamily: SANS, opacity: 0.7, fontWeight: 500 }}>Demo Video Coming Soon</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
