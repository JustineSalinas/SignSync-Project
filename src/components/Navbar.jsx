import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunMedium, Moon, Menu, X, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { SERIF, SANS, colors, darkTheme, lightTheme } from '../theme';

export default function Navbar({ onStart, onTeam, scrollToHow, onLogoClick }) {
  const { isDark, toggleDark } = useTheme();
  const { language, setLanguage, LANGUAGES, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);

  // Close lang dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setIsLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { label: t('nav_how'), action: scrollToHow },
    { label: t('nav_org'), action: onTeam },
  ];

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'sticky', top: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.85rem 2.5rem',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          background: isDark ? 'rgba(10,10,15,0.85)' : 'rgba(246,244,240,0.85)',
          borderBottom: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`,
        }}
      >
        {/* Logo */}
        <button type="button" onClick={onLogoClick} aria-label="Go to homepage"
          style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', height: 38 }}>
            <img src="/signsync.png" alt="SignSync Logo" style={{
              height: '100%', width: 'auto', objectFit: 'contain',
              filter: isDark
                ? 'brightness(0) saturate(100%) invert(69%) sepia(18%) saturate(1142%) hue-rotate(218deg) brightness(101%) contrast(97%)'
                : 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(5832%) hue-rotate(256deg) brightness(96%) contrast(92%)'
            }} />
          </div>
          <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.15rem', lineHeight: 1, color: isDark ? darkTheme.text : lightTheme.text, marginTop: '0.1rem' }}>
            SignSync
          </span>
        </button>

        {/* Desktop Nav links - Absolute Centered */}
        <div className="hidden md:flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => (
            <button key={link.label} onClick={link.action}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, color: isDark ? '#9d8ec8' : '#6b6080', transition: 'color 0.2s', fontFamily: SANS }}
              onMouseEnter={(e) => (e.target.style.color = isDark ? colors.violet[400] : colors.violet[600])}
              onMouseLeave={(e) => (e.target.style.color = isDark ? '#9d8ec8' : '#6b6080')}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: Language + theme toggle + CTA (Desktop) */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '0.75rem' }}>

          {/* Language Dropdown */}
          <div ref={langRef} style={{ position: 'relative' }}>
            <button onClick={() => setIsLangOpen((p) => !p)} aria-label="Select output language"
              style={{
                display: 'flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.4rem 0.7rem 0.4rem 0.6rem', borderRadius: 999,
                fontFamily: SANS, fontWeight: 600, fontSize: '0.8rem', cursor: 'pointer',
                transition: 'all 0.2s',
                background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)',
                border: `1px solid ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'}`,
                color: isDark ? colors.violet[400] : colors.violet[600],
              }}>
              <img src={language.flag} alt={`${language.label} flag`} width="20" height="15" style={{ borderRadius: '2px', objectFit: 'cover' }} />
              <span>{language.short}</span>
              <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: isLangOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 8px)', right: 0, minWidth: 160,
                    borderRadius: 14, overflow: 'hidden',
                    background: isDark ? '#0f0a1e' : '#ffffff',
                    border: `1px solid ${isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.15)'}`,
                    boxShadow: isDark ? '0 16px 40px rgba(0,0,0,0.5)' : '0 16px 40px rgba(109,40,217,0.12)',
                    zIndex: 200,
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button key={lang.code} onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.6rem',
                        width: '100%', padding: '0.65rem 1rem', border: 'none', cursor: 'pointer',
                        fontFamily: SANS, fontSize: '0.85rem', textAlign: 'left',
                        fontWeight: language.code === lang.code ? 700 : 500,
                        background: language.code === lang.code ? (isDark ? 'rgba(139,92,246,0.18)' : 'rgba(139,92,246,0.08)') : 'transparent',
                        color: language.code === lang.code ? (isDark ? colors.violet[400] : colors.violet[600]) : (isDark ? '#9d8ec8' : '#6b6080'),
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={(e) => { if (language.code !== lang.code) e.currentTarget.style.background = isDark ? 'rgba(139,92,246,0.08)' : 'rgba(139,92,246,0.04)'; }}
                      onMouseLeave={(e) => { if (language.code !== lang.code) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <img src={lang.flag} alt={`${lang.label} flag`} width="20" height="15" style={{ borderRadius: '2px', objectFit: 'cover' }} />
                      <span>{lang.label}</span>
                      {language.code === lang.code && (
                        <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: isDark ? colors.violet[400] : colors.violet[600] }} />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button onClick={toggleDark} aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{
              width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(0,0,0,0.04)', border: 'none', cursor: 'pointer',
              color: isDark ? colors.violet[400] : '#6b6080', transition: 'all 0.2s',
            }}>
            {isDark ? <SunMedium size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={onStart}
            style={{
              padding: '0.55rem 1.25rem', borderRadius: '10px', fontWeight: 600, fontSize: '0.85rem',
              background: isDark ? colors.violet[600] : lightTheme.text, color: '#fff',
              border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontFamily: SANS,
            }}>
            {t('get_started')}
          </button>
        </div>

        <button className="md:hidden flex items-center justify-center p-2 rounded-lg"
          onClick={() => setIsMobileMenuOpen(true)} aria-label="Open mobile menu"
          style={{ color: isDark ? darkTheme.text : lightTheme.text, background: 'none', border: 'none', cursor: 'pointer' }}>
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 101 }} />
            <motion.div
              role="dialog" aria-label="Mobile navigation"
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
              style={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100%',
                background: isDark ? darkTheme.bg : lightTheme.bg,
                zIndex: 102, padding: '2rem', display: 'flex', flexDirection: 'column', overflowY: 'auto',
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', height: 32 }}>
                  <img src="/signsync.png" alt="Logo" style={{ height: '100%', filter: isDark ? 'brightness(0) saturate(100%) invert(69%) sepia(18%) saturate(1142%) hue-rotate(218deg) brightness(101%) contrast(97%)' : 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(5832%) hue-rotate(256deg) brightness(96%) contrast(92%)' }} />
                  <span style={{ fontFamily: SERIF, fontWeight: 700, fontSize: '1.1rem', color: isDark ? darkTheme.text : lightTheme.text, marginLeft: '0.4rem', marginTop: '0.1rem' }}>SignSync</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close mobile menu"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: isDark ? darkTheme.text : lightTheme.text, padding: 0 }}>
                  <X size={28} />
                </button>
              </div>

              {/* Nav Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
                {navLinks.map((link) => (
                  <button key={link.label}
                    onClick={() => { setIsMobileMenuOpen(false); if (link.action) link.action(); }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.35rem',
                      fontWeight: 600, textAlign: 'center', color: isDark ? darkTheme.text : lightTheme.text,
                      fontFamily: SANS, padding: '0.5rem 0', width: '100%'
                    }}>
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Language Selector Cards */}
              <div style={{ marginTop: '2.5rem' }}>
                <p style={{
                  fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em',
                  textTransform: 'uppercase', color: isDark ? '#5a4d7a' : '#9ca3af',
                  textAlign: 'center', marginBottom: '0.85rem', fontFamily: SANS,
                }}>
                  {t('output_lang')}
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem' }}>
                  {LANGUAGES.map((lang) => {
                    const isSelected = language.code === lang.code;
                    return (
                      <button key={lang.code} onClick={() => setLanguage(lang)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
                          padding: '0.9rem 0.5rem', borderRadius: 14, cursor: 'pointer',
                          fontFamily: SANS, transition: 'all 0.2s',
                          border: `1.5px solid ${isSelected ? (isDark ? colors.violet[400] : colors.violet[600]) : (isDark ? 'rgba(139,92,246,0.15)' : 'rgba(139,92,246,0.12)')}`,
                          background: isSelected ? (isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.08)') : (isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'),
                          boxShadow: isSelected ? `0 0 0 3px ${isDark ? 'rgba(139,92,246,0.2)' : 'rgba(139,92,246,0.1)'}` : 'none',
                        }}>
                        <img src={lang.flag} alt={`${lang.label} flag`} width="28" height="21" style={{ borderRadius: '3px', objectFit: 'cover', marginBottom: '4px' }} />
                        <span style={{
                          fontSize: '0.72rem', fontWeight: isSelected ? 700 : 500,
                          color: isSelected ? (isDark ? colors.violet[400] : colors.violet[600]) : (isDark ? '#9d8ec8' : '#6b6080'),
                        }}>
                          {lang.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button onClick={() => { setIsMobileMenuOpen(false); onStart(); }}
                  style={{ padding: '0.85rem', borderRadius: '10px', fontWeight: 600, fontSize: '1rem', background: colors.violet[600], color: '#fff', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
                  {t('get_started')}
                </button>
                <button onClick={toggleDark}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                    padding: '0.85rem', borderRadius: '10px', fontWeight: 500, fontSize: '1rem',
                    background: isDark ? 'rgba(139,92,246,0.1)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? colors.violet[400] : '#6b6080', border: 'none', cursor: 'pointer', fontFamily: SANS,
                  }}>
                  {isDark ? <SunMedium size={18} /> : <Moon size={18} />}
                  {isDark ? t('light_mode') : t('dark_mode')}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
