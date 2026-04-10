import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunMedium, Moon, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SERIF, SANS, colors, darkTheme, lightTheme } from '../theme';

export default function Navbar({ onStart, onTeam, scrollToHow, onLogoClick }) {
  const { isDark, toggleDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: 'How it works', action: scrollToHow },
    { label: 'For Organizations', action: onTeam },
  ];

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.85rem 2.5rem',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: isDark ? 'rgba(10,10,15,0.85)' : 'rgba(246,244,240,0.85)',
        borderBottom: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`,
      }}
    >
      {/* Logo */}
      <button
        type="button"
        style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
        onClick={onLogoClick}
        aria-label="Go to homepage"
      >
        <div style={{ display: 'flex', alignItems: 'center', height: 38 }}>
          <img
            src="/signsync.png"
            alt="SignSync Logo"
            style={{
              height: '100%',
              width: 'auto',
              objectFit: 'contain',
              filter: isDark
                ? 'brightness(0) saturate(100%) invert(69%) sepia(18%) saturate(1142%) hue-rotate(218deg) brightness(101%) contrast(97%)'
                : 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(5832%) hue-rotate(256deg) brightness(96%) contrast(92%)'
            }}
          />
        </div>
        <span
          style={{
            fontFamily: SERIF,
            fontWeight: 700,
            fontSize: '1.15rem',
            lineHeight: 1,
            color: isDark ? darkTheme.text : lightTheme.text,
            marginTop: '0.1rem',
          }}
        >
          SignSync
        </span>
      </button>

      {/* Desktop Nav links */}
      <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2rem' }}>
        {navLinks.map((link) => (
          <button
            key={link.label}
            onClick={link.action}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.88rem',
              fontWeight: 500,
              color: isDark ? '#9d8ec8' : '#6b6080',
              transition: 'color 0.2s',
              fontFamily: SANS,
            }}
            onMouseEnter={(e) => (e.target.style.color = isDark ? colors.violet[400] : colors.violet[600])}
            onMouseLeave={(e) => (e.target.style.color = isDark ? '#9d8ec8' : '#6b6080')}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right: toggle + CTA (Desktop) */}
      <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={toggleDark}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(0,0,0,0.04)',
            border: 'none',
            cursor: 'pointer',
            color: isDark ? colors.violet[400] : '#6b6080',
            transition: 'all 0.2s',
          }}
        >
          {isDark ? <SunMedium size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={onStart}
          style={{
            padding: '0.55rem 1.25rem',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.85rem',
            background: isDark ? colors.violet[600] : lightTheme.text,
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.2s',
            fontFamily: SANS,
          }}
        >
          Get Started
        </button>
      </div>

      <button
        className="md:hidden flex items-center justify-center p-2 rounded-lg"
        onClick={() => setIsMobileMenuOpen(true)}
        aria-label="Open mobile menu"
        style={{ color: isDark ? darkTheme.text : lightTheme.text, background: 'none', border: 'none', cursor: 'pointer' }}
      >
        <Menu size={24} />
      </button>
    </nav>

    {/* Mobile Drawer */}
    <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 101 }}
            />
            <motion.div
              role="dialog"
              aria-label="Mobile navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                background: isDark ? darkTheme.bg : lightTheme.bg,
                zIndex: 102,
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', height: 32 }}>
                  <img src="/signsync.png" alt="Logo" style={{ height: '100%', filter: isDark ? 'brightness(0) saturate(100%) invert(69%) sepia(18%) saturate(1142%) hue-rotate(218deg) brightness(101%) contrast(97%)' : 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(5832%) hue-rotate(256deg) brightness(96%) contrast(92%)' }} />
                  <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.1rem', color: isDark ? darkTheme.text : lightTheme.text, marginLeft: '0.4rem', marginTop: '0.1rem' }}>SignSync</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close mobile menu"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? darkTheme.text : lightTheme.text, padding: 0 }}
                >
                  <X size={28} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', marginTop: '2rem' }}>
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      if (link.action) link.action();
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.35rem',
                      fontWeight: 600,
                      textAlign: 'center',
                      color: isDark ? darkTheme.text : lightTheme.text,
                      fontFamily: SANS,
                      padding: '0.5rem 0',
                      width: '100%'
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onStart();
                  }}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    background: isDark ? colors.violet[600] : colors.violet[600],
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: SANS,
                  }}
                >
                  Get Started
                </button>
                
                <button
                  onClick={toggleDark}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontWeight: 500,
                    fontSize: '1rem',
                    background: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? colors.violet[400] : '#6b6080',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: SANS,
                  }}
                >
                  {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
