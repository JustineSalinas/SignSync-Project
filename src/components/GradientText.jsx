import React from 'react';
import { motion } from 'framer-motion';
import { SERIF } from '../theme';

export default function GradientText({ text, fontSize = 'inherit', animate = false }) {
  const containerStyle = {
    position: 'relative',
    display: 'inline-block',
    fontFamily: SERIF,
    fontSize: fontSize,
    lineHeight: 1.2,
    paddingLeft: '0.15rem',
    paddingTop: '0.2rem',
    overflow: 'visible',
    verticalAlign: 'baseline',
  };

  const spanContent = (
    <motion.span
      style={{
        display: 'inline-block',
        fontWeight: 'bold',
        background: 'linear-gradient(135deg, #f472b6 0%, #7c3aed 40%, #d946ef 60%, #f472b6 100%)',
        backgroundSize: animate ? '200% auto' : '100% 100%',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        position: 'relative',
        paddingBottom: '0.15em',
        marginBottom: '-0.15em',
        paddingRight: '0.05em',
        marginRight: '-0.05em',
        zIndex: 1,
      }}
      animate={animate ? {
        backgroundPosition: ['200% center', '-200% center'],
      } : {}}
      transition={animate ? { duration: 6, repeat: Infinity, ease: 'linear' } : {}}
    >
      {text}
    </motion.span>
  );

  return (
    <span style={containerStyle}>
      {spanContent}
    </span>
  );
}
