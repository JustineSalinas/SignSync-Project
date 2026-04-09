import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SERIF } from '../theme';

const TeamCard = React.memo(function TeamCard({ member, index }) {
  const { isDark } = useTheme();
  const { name, role, icon, color, gradient, description, skills, image, quote, github } = member;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      tabIndex={0}
      role="article"
      aria-labelledby={`team-name-${index}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.45 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      whileHover={{
        y: -6,
        boxShadow: isDark
          ? `0 20px 60px rgba(0,0,0,0.6), 0 0 0 1.5px ${color}50`
          : `0 20px 60px rgba(0,0,0,0.08), 0 0 0 1.5px ${color}40`,
      }}
      style={{
        position: 'relative',
        borderRadius: '24px',
        padding: '2rem',
        background: isDark ? '#0f0a1e' : '#fff',
        border: isDark ? '1px solid rgba(139,92,246,0.12)' : '1px solid rgba(0,0,0,0.06)',
        boxShadow: isDark
          ? '0 4px 24px rgba(0,0,0,0.4)'
          : '0 4px 24px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}
          >
            {/* Background Image Layer */}
            <div style={{ position: 'absolute', inset: 0, background: isDark ? '#1a1030' : '#f0ecff', backgroundImage: `url(${image})`, backgroundSize: 'cover', backgroundPosition: 'center', opacity: isDark ? 0.8 : 1 }} />

            {/* Gradient Overlay for Text Readability */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)' }} />

            {/* Hover Text Content */}
            <div style={{ position: 'relative', zIndex: 11, padding: '2rem' }}>
              <h3 style={{ fontFamily: SERIF, fontSize: '1.6rem', fontWeight: 600, color: '#f0ecff', marginBottom: '0.5rem', lineHeight: 1.1 }}>{name}</h3>
              <p style={{ fontFamily: SERIF, fontSize: '1rem', fontStyle: 'italic', color: '#e2d8f0', margin: 0, opacity: 0.95, marginBottom: '1rem' }}>{quote}</p>
              
              {/* Social Links inside Hover */}
              {github && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name}'s GitHub profile`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      padding: '0.4rem 0.9rem',
                      borderRadius: '999px',
                      background: 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      border: '1px solid rgba(255,255,255,0.3)',
                      backdropFilter: 'blur(4px)',
                      textDecoration: 'none',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      letterSpacing: '0.02em',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.28)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
                  >
                    <Github size={15} />
                    GitHub Profile
                  </a>
                </div>
              )}
            </div>

            {/* Colored bottom glow line */}
            <div style={{ position: 'absolute', bottom: 0, left: '2rem', right: '2rem', height: 4, borderRadius: '4px 4px 0 0', background: color, boxShadow: `0 -4px 12px ${color}60` }} />
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ opacity: isHovered ? 0 : 1, transition: 'opacity 0.2s', position: 'relative', zIndex: 2 }}>
        {/* Top row: Avatar + role badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          {/* Avatar Area */}
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 16,
              background: isDark ? `${color}15` : `${color}15`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            <img src={image} alt={`Photo of ${name}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* Refined Role badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.35rem 0.9rem',
              borderRadius: '999px',
              fontSize: '0.65rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              background: isDark ? 'rgba(0,0,0,0.2)' : 'transparent',
              color: color,
              border: `1px solid ${color}40`,
            }}
          >
            {icon}
            {role}
          </div>
        </div>

        {/* Name */}
        <h3
          id={`team-name-${index}`}
          style={{
            fontFamily: SERIF,
            fontSize: '1.65rem',
            fontWeight: 600,
            lineHeight: 1.15,
            marginBottom: '0.65rem',
            color: isDark ? '#f0ecff' : '#1a1030',
          }}
        >
          {name}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '0.9rem',
            lineHeight: 1.65,
            color: isDark ? '#9d8ec8' : '#6b6080',
            marginBottom: '1.5rem',
          }}
        >
          {description}
        </p>

        {/* Skills pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {skills.map((skill) => (
            <span
              key={skill}
              style={{
                padding: '0.3rem 0.8rem',
                borderRadius: '8px',
                fontSize: '0.72rem',
                fontWeight: 500,
                background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
                color: isDark ? '#a78bfa' : '#6b6080',
                border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

export default TeamCard;
