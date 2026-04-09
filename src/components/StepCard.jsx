import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const StepCard = React.memo(function StepCard({ icon, title, desc, step, badgeIcon, badgeText, badgeColor }) {
  const { isDark } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const bg = isDark ? '#0a0a0f' : '#fff';
  const textColor = isDark ? '#fff' : '#1a1030';
  const descColor = isDark ? '#7c6fa0' : '#7a7088';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: parseInt(step) * 0.1 }}
      whileHover={{ y: -4, boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.5)' : '0 12px 36px rgba(0,0,0,0.08)' }}
      style={{
        position: 'relative', borderRadius: '20px', padding: '2rem', background: bg,
        border: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column'
      }}
    >
      <div
        style={{
          width: 44, height: 44, borderRadius: 12, background: isDark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDark ? '#a78bfa' : '#7c3aed',
          marginBottom: '2rem'
        }}
      >
        {icon}
      </div>

      <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', color: isDark ? '#5a4d7a' : '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
        STEP {step}
      </span>

      <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.75rem', color: textColor, letterSpacing: '-0.02em' }}>
        {title}
      </h3>

      <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: descColor, margin: '0 0 2rem 0', flexGrow: 1 }}>
        {desc}
      </p>

      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 0.8rem', borderRadius: 999, fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em', color: badgeColor, border: `1px solid ${badgeColor}30`, background: `${badgeColor}10` }}>
        {badgeIcon}
        {badgeText}
      </div>
    </motion.div>
  );
});

export default StepCard;
