import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Check, Camera, Hand, Volume2, Shield, Lock, Zap, MapPin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { SERIF, SANS, darkTheme, lightTheme } from '../theme';

import Navbar from '../components/Navbar';
import VideoModal from '../components/VideoModal';
import GradientText from '../components/GradientText';
import DashboardMockup from '../components/DashboardMockup';
import CountingNumber from '../components/CountingNumber';
import StepCard from '../components/StepCard';

export default function LandingPage({ onStart, onTeam }) {
  const { isDark } = useTheme();
  const howItWorksRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);

  const scrollToHow = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      key="landing"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.45 }}
      style={{ minHeight: '100vh', overflow: 'hidden' }}
    >
      <Navbar
        onStart={onStart}
        onTeam={onTeam}
        scrollToHow={scrollToHow}
        onLogoClick={() => window.scrollTo(0, 0)}
      />
      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 60px)',
          padding: '4rem 2rem 2rem',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            height: '55%',
            background: isDark
              ? 'radial-gradient(ellipse at center, rgba(109,40,217,0.12) 0%, transparent 70%)'
              : 'radial-gradient(ellipse at center, rgba(199,180,255,0.35) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 1.1rem',
            borderRadius: '999px',
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)',
            color: isDark ? '#a78bfa' : '#7c3aed',
            border: `1px solid ${isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.18)'}`,
            marginBottom: '2rem',
          }}
        >
          <span style={{ fontSize: '0.6rem' }}>✦</span>
          AI-Powered Sign Language
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.3,
            textAlign: 'center',
            maxWidth: 700,
            marginBottom: '1.5rem',
            color: isDark ? darkTheme.text : lightTheme.text,
            paddingTop: '1.5rem',
          }}
        >
          Bridging the
          <br />
          <GradientText text="gap" animate={true} />
          {' in communication'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            textAlign: 'center',
            maxWidth: 520,
            color: isDark ? darkTheme.textMuted : lightTheme.textMuted,
            marginBottom: '2.5rem',
          }}
        >
          Real-time sign language translation that lets you speak fluently without words — designed
          for service counters, hospitals, and everyday life.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(109,40,217,0.4)' }}
            whileTap={{ scale: 0.97 }}
            onClick={onStart}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && onStart()}
            aria-label="Get Started with Camera"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.65rem',
              padding: '0.85rem 2.2rem',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #d946ef, #7c3aed)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(109,40,217,0.3)',
              fontFamily: SANS,
            }}
          >
            Get Started
            <ArrowRight size={18} strokeWidth={2.5} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowVideo(true)}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setShowVideo(true)}
            aria-label="Watch Demo Video"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.6rem',
              padding: '0.85rem 2rem',
              borderRadius: '999px',
              fontWeight: 600,
              fontSize: '0.95rem',
              background: 'transparent',
              color: isDark ? '#c4b5fd' : '#1a1030',
              border: `1.5px solid ${isDark ? 'rgba(139,92,246,0.35)' : 'rgba(26,16,48,0.2)'}`,
              cursor: 'pointer',
              fontFamily: SANS,
            }}
          >
            <Play size={15} strokeWidth={2.5} fill="currentColor" />
            See a demo
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {['No video stored', 'Works offline', 'ADA compliant', 'All data stays on device'].map((text, i) => (
            <span key={text} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {i > 0 && <span style={{ width: 1, height: 16, background: isDark ? 'rgba(139,92,246,0.2)' : 'rgba(0,0,0,0.12)', margin: '0 0.75rem' }} />}
              <Check size={14} strokeWidth={2.5} style={{ color: isDark ? '#34d399' : '#22c55e', marginRight: '0.35rem' }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 500, color: isDark ? '#7c6fa0' : '#8a8296' }}>{text}</span>
            </span>
          ))}
        </motion.div>

        <DashboardMockup />
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section
        aria-label="Platform statistics"
        style={{
          borderTop: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`,
          borderBottom: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          background: isDark ? '#0a0a0f' : '#fff',
        }}
      >
        {[
          { num: 97, pref: '', suff: '%', text: 'Gesture accuracy', color: '#7c3aed' },
          { num: 80, pref: '<', suff: 'ms', text: 'Translation latency', color: '#10b981' },
          { num: 500, pref: '', suff: '+', text: 'Signs recognized', color: '#f59e0b' },
          { num: 0, pref: '', suff: 'kb', text: 'Data sent to servers', color: '#f472b6' },
        ].map((stat, i) => (
          <div key={stat.text} style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: i < 3 ? `1px solid ${isDark ? darkTheme.border : lightTheme.border}` : 'none' }}>
            <span style={{ fontFamily: SERIF, fontSize: '2.5rem', fontWeight: 400, color: stat.color, lineHeight: 1, marginBottom: '0.5rem' }}>
              <CountingNumber value={stat.num} suffix={stat.suff} prefix={stat.pref} />
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isDark ? '#7a7088' : '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.text}</span>
          </div>
        ))}
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section
        ref={howItWorksRef}
        aria-label="How it works"
        style={{ padding: '6rem 2rem 5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <div style={{ maxWidth: 900, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: 450 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ height: 1, width: 30, background: '#7c3aed' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>How It Works</span>
            </div>
            {/* Semantic change from h2 to h2 */}
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? darkTheme.text : lightTheme.text, margin: 0 }}>
              Three steps to seamless understanding
            </h2>
          </div>
          <p style={{ maxWidth: 350, fontSize: '0.9rem', lineHeight: 1.6, color: isDark ? darkTheme.textMuted : lightTheme.textMuted, margin: 0 }}>
            Everything runs locally on your device. No account required. No data leaves the room.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: 900, width: '100%' }}>
          <StepCard step="01" icon={<Camera size={20} />} title="Camera Access" desc="We need your camera to see hand signs. No video is ever stored or transmitted — everything is processed locally, in real time." badgeText="ON-DEVICE ONLY" badgeIcon={<Lock size={12} />} badgeColor="#10b981" />
          <StepCard step="02" icon={<Hand size={20} />} title="Position Your Hands" desc="Stand about 2 feet from the screen. Keep hands at chest height for the most accurate gesture recognition." badgeText="AI-POWERED DETECTION" badgeIcon={<Zap size={12} />} badgeColor="#7c3aed" />
          <StepCard step="03" icon={<Volume2 size={20} />} title="Audio Translation" desc="Recognized signs are spoken aloud so the service officer can understand you — naturally, instantly, and without any extra steps." badgeText="UNDER 80MS LATENCY" badgeIcon={<Zap size={12} />} badgeColor="#f59e0b" />
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{ padding: '2rem 2rem 4rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: '24px', background: isDark ? '#0f0a1e' : '#f8f7fa', border: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`, padding: '4rem 3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          <div style={{ maxWidth: 450 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: 1, width: 30, background: '#7c3aed' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>GET STARTED TODAY</span>
            </div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? darkTheme.text : lightTheme.text, marginBottom: '1.25rem' }}>Ready to communicate without barriers?</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: isDark ? darkTheme.textMuted : lightTheme.textMuted, margin: 0 }}>Join clinics, banks, and service counters already using SignSync. No installation, no login, no friction.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: 160 }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onStart} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onStart()} style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.65rem', padding: '0.85rem 2rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.95rem', background: 'linear-gradient(135deg, #d946ef, #7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
              Get Started <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onTeam} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onTeam()} style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '0.85rem 1.5rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.95rem', background: 'transparent', color: isDark ? '#9d8ec8' : '#6b7280', border: `1px solid ${isDark ? 'rgba(139,92,246,0.2)' : 'rgba(0,0,0,0.1)'}`, cursor: 'pointer', fontFamily: SANS }}>
              Learn more
            </motion.button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer role="contentinfo" style={{ padding: '4rem 2rem 2rem', borderTop: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`, background: isDark ? '#0a0a0f' : '#f8f7fa' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', marginBottom: '4rem' }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img src="/signsync.png" alt="SignSync" style={{ height: 24, width: 'auto', filter: isDark ? 'brightness(0) saturate(100%) invert(69%) sepia(18%) saturate(1142%) hue-rotate(218deg) brightness(101%) contrast(97%)' : 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(5832%) hue-rotate(256deg) brightness(96%) contrast(92%)' }} />
              <span style={{ fontWeight: 700, fontSize: '1rem', color: isDark ? darkTheme.text : lightTheme.text }}>SignSync</span>
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: isDark ? darkTheme.textMuted : '#6b7280' }}>
              Building accessible technology for the Deaf community and service industries worldwide — one sign at a time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            {['Product', 'Company', 'Legal'].map((category) => (
              <div key={category}>
                <h4 style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: isDark ? '#5a4d7a' : '#9ca3af', marginBottom: '1.5rem' }}>{category}</h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {category === 'Product' && ['How it works', 'Accessibility', 'For Organizations', 'Pricing'].map(link => <li key={link}><a href="#" onMouseEnter={(e) => (e.target.style.color = isDark ? '#c4b5fd' : '#7c3aed')} onMouseLeave={(e) => (e.target.style.color = isDark ? '#9d8ec8' : '#6b7280')} style={{ fontSize: '0.8rem', color: isDark ? '#9d8ec8' : '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a></li>)}
                  {category === 'Company' && ['About', 'Meet the team', 'Blog', 'Contact'].map(link => <li key={link}><a href="#" onMouseEnter={(e) => (e.target.style.color = isDark ? '#c4b5fd' : '#7c3aed')} onMouseLeave={(e) => (e.target.style.color = isDark ? '#9d8ec8' : '#6b7280')} style={{ fontSize: '0.8rem', color: isDark ? '#9d8ec8' : '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a></li>)}
                  {category === 'Legal' && ['Privacy Policy', 'Terms of Service', 'ADA Statement'].map(link => <li key={link}><a href="#" onMouseEnter={(e) => (e.target.style.color = isDark ? '#c4b5fd' : '#7c3aed')} onMouseLeave={(e) => (e.target.style.color = isDark ? '#9d8ec8' : '#6b7280')} style={{ fontSize: '0.8rem', color: isDark ? '#9d8ec8' : '#6b7280', textDecoration: 'none', transition: 'color 0.2s' }}>{link}</a></li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingTop: '2rem', borderTop: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#5a4d7a' : '#9ca3af', margin: 0 }}>© 2026 SignSync, Philippines. All rights reserved.</p>
          <p style={{ fontSize: '0.75rem', color: isDark ? darkTheme.textMuted : '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}><Shield size={14} style={{ color: '#10b981' }} />Camera access is required. No data leaves this device.</p>
        </div>
      </footer>
    </motion.div>
  );
}
