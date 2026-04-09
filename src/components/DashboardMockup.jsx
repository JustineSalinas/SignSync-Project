import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Hand, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function DashboardMockup() {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.6 }}
      style={{
        width: '100%', maxWidth: 880, marginTop: '4rem', borderRadius: 24,
        background: isDark ? '#141022' : '#fff',
        border: isDark ? '1px solid rgba(139,92,246,0.15)' : '1px solid rgba(0,0,0,0.08)',
        boxShadow: isDark ? '0 20px 40px rgba(0,0,0,0.4)' : '0 20px 40px rgba(0,0,0,0.05)',
        padding: '1.5rem', overflow: 'hidden', position: 'relative'
      }}
    >
      {/* Top Bar */}
      <div style={{ display: 'flex', gap: 6, marginBottom: '2rem' }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#f59e0b' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#10b981' }} />
      </div>

      {/* Content Area */}
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        {/* Camera placeholder */}
        <div style={{ flex: '1 1 340px', background: isDark ? '#0a0a0f' : '#f8f7fa', borderRadius: 16, border: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.05)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 240 }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', color: isDark ? '#5a4d7a' : '#9ca3af', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Live Camera</span>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 64, height: 64, borderRadius: '50%', background: isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', border: '1px solid rgba(139,92,246,0.3)' }}
          >
            <Hand size={24} color="#f59e0b" />
          </motion.div>
          <span style={{ fontSize: '0.85rem', color: isDark ? '#7c6fa0' : '#6b7280' }}>Detecting gesture...</span>
        </div>

        {/* Translation Output Area */}
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', justifyItems: 'center', paddingTop: '1rem' }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.12em', color: isDark ? '#5a4d7a' : '#9ca3af', textTransform: 'uppercase', marginBottom: '1.5rem', alignSelf: 'center' }}>Translation Output</span>

          <div style={{ background: isDark ? 'rgba(139,92,246,0.08)' : '#f3f0ff', borderRadius: 16, padding: '1.25rem', border: isDark ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(139,92,246,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 500, color: isDark ? '#e4e0f8' : '#4c1d95' }}>Hello — nice to meet you</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#10b981' }}>97% conf.</span>
          </div>

          <p style={{ fontSize: '0.85rem', color: isDark ? '#7a7088' : '#6b7280', textAlign: 'center', lineHeight: 1.6, marginBottom: '2rem', padding: '0 1rem' }}>
            Recognized sign: greeting + introduction sequence detected in real time.
          </p>

          <div style={{ alignSelf: 'center', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: isDark ? 'rgba(16,185,129,0.1)' : '#dcfce7', color: '#10b981', padding: '0.4rem 1.2rem', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Activity size={14} />
            Speaking aloud
          </div>
        </div>
      </div>
    </motion.div>
  );
}
