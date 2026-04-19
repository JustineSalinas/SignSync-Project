import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, Check, Camera, Hand, Volume2, Shield, Lock, Zap, MapPin, X, VideoOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { SERIF, SANS, darkTheme, lightTheme } from '../theme';

import Navbar from '../components/Navbar';
import VideoModal from '../components/VideoModal';
import GradientText from '../components/GradientText';
import DashboardMockup from '../components/DashboardMockup';
import CountingNumber from '../components/CountingNumber';
import StepCard from '../components/StepCard';

export default function LandingPage({ onStart, onTeam }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const howItWorksRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [showCameraConfirm, setShowCameraConfirm] = useState(false);

  const scrollToHow = () => {
    howItWorksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetStarted = () => setShowCameraConfirm(true);
  const handleConfirmCamera = () => { setShowCameraConfirm(false); onStart(); };
  const handleDeclineCamera = () => setShowCameraConfirm(false);

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
          {t('hero_badge')}
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
          {t('hero_title_1')}
          <br />
          <GradientText text={t('hero_title_2')} animate={true} />
          {t('hero_title_3')}
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
          {t('hero_subtitle')}
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
            onClick={handleGetStarted}
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()}
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
            {t('get_started')}
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
            {t('see_demo')}
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {[t('feature_1'), t('feature_2'), t('feature_3'), t('feature_4')].map((text, i) => (
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
          { num: 97, pref: '', suff: '%', text: t('stat_1'), color: '#7c3aed' },
          { num: 80, pref: '<', suff: 'ms', text: t('stat_2'), color: '#10b981' },
          { num: 500, pref: '', suff: '+', text: t('stat_3'), color: '#f59e0b' },
          { num: 0, pref: '', suff: 'kb', text: t('stat_4'), color: '#f472b6' },
        ].map((stat, i) => (
          <div key={stat.text} style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justify-center: 'center', borderRight: i < 3 ? `1px solid ${isDark ? darkTheme.border : lightTheme.border}` : 'none' }}>
            <span style={{ fontFamily: SERIF, fontSize: '2.5rem', fontWeight: 400, color: stat.color, lineHeight: 1, marginBottom: '0.5rem' }}>
              <CountingNumber value={stat.num} suffix={stat.suff} prefix={stat.pref} />
            </span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: isDark ? '#7a7088' : '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'center' }}>{stat.text}</span>
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
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>{t('how_label')}</span>
            </div>
            {/* Semantic change from h2 to h2 */}
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? darkTheme.text : lightTheme.text, margin: 0 }}>
              {t('how_title')}
            </h2>
          </div>
          <p style={{ maxWidth: 350, fontSize: '0.9rem', lineHeight: 1.6, color: isDark ? darkTheme.textMuted : lightTheme.textMuted, margin: 0 }}>
            {t('how_sub')}
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: 900, width: '100%' }}>
          <StepCard step="01" icon={<Camera size={20} />} title={t('step_1_title')} desc={t('step_1_desc')} badgeText={t('step_1_badge')} badgeIcon={<Lock size={12} />} badgeColor="#10b981" />
          <StepCard step="02" icon={<Hand size={20} />} title={t('step_2_title')} desc={t('step_2_desc')} badgeText={t('step_2_badge')} badgeIcon={<Zap size={12} />} badgeColor="#7c3aed" />
          <StepCard step="03" icon={<Volume2 size={20} />} title={t('step_3_title')} desc={t('step_3_desc')} badgeText={t('step_3_badge')} badgeIcon={<Zap size={12} />} badgeColor="#f59e0b" />
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{ padding: '2rem 2rem 4rem' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', borderRadius: '24px', background: isDark ? '#0f0a1e' : '#f8f7fa', border: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`, padding: '4rem 3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
          <div style={{ maxWidth: 450 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: 1, width: 30, background: '#7c3aed' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>{t('cta_label')}</span>
            </div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? darkTheme.text : lightTheme.text, marginBottom: '1.25rem' }}>{t('cta_title')}</h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: isDark ? darkTheme.textMuted : lightTheme.textMuted, margin: 0 }}>{t('cta_desc')}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: 160 }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={handleGetStarted} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleGetStarted()} style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.65rem', padding: '0.85rem 2rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.95rem', background: 'linear-gradient(135deg, #d946ef, #7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
              {t('get_started')} <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onTeam} tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onTeam()} style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '0.85rem 1.5rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.95rem', background: 'transparent', color: isDark ? '#9d8ec8' : '#6b7280', border: `1px solid ${isDark ? 'rgba(139,92,246,0.2)' : 'rgba(0,0,0,0.1)'}`, cursor: 'pointer', fontFamily: SANS }}>
              {t('learn_more')}
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
              {t('footer_desc')}
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
          <p style={{ fontSize: '0.75rem', color: isDark ? '#5a4d7a' : '#9ca3af', margin: 0 }}>{t('footer_rights')}</p>
          <p style={{ fontSize: '0.75rem', color: isDark ? darkTheme.textMuted : '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}><Shield size={14} style={{ color: '#10b981' }} />{t('footer_privacy')}</p>
        </div>
      </footer>

      {/* ═══════════════ CAMERA CONFIRM MODAL ═══════════════ */}
      <AnimatePresence>
        {showCameraConfirm && (
          <motion.div
            key="camera-confirm-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={handleDeclineCamera}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <motion.div
              key="camera-confirm-card"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cam-confirm-title"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 460,
                borderRadius: 24,
                padding: 'clamp(1.5rem, 6vw, 2.5rem) clamp(1.25rem, 6vw, 2.25rem) clamp(1.5rem, 5vw, 2rem)',
                background: isDark
                  ? 'linear-gradient(145deg, #0f0a1e 0%, #130d24 100%)'
                  : 'linear-gradient(145deg, #ffffff 0%, #f8f5ff 100%)',
                border: `1px solid ${isDark ? 'rgba(139,92,246,0.22)' : 'rgba(139,92,246,0.18)'}`,
                boxShadow: isDark
                  ? '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.08)'
                  : '0 32px 80px rgba(109,40,217,0.14), 0 0 0 1px rgba(139,92,246,0.06)',
                fontFamily: SANS,
              }}
            >
              {/* Close button */}
              <button
                onClick={handleDeclineCamera}
                aria-label="Close dialog"
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: isDark ? '#5a4d7a' : '#9ca3af',
                  padding: '0.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  position: 'relative',
                  width: 'clamp(60px, 15vw, 76px)',
                  height: 'clamp(60px, 15vw, 76px)',
                  borderRadius: '50%',
                  background: isDark
                    ? 'radial-gradient(circle, rgba(139,92,246,0.22) 0%, rgba(109,40,217,0.08) 100%)'
                    : 'radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(109,40,217,0.04) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `1.5px solid ${isDark ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'}`,
                  boxShadow: '0 8px 32px rgba(109,40,217,0.2)',
                }}>
                  <Camera size={34} style={{ color: isDark ? '#a78bfa' : '#7c3aed' }} />
                </div>
              </div>

              {/* Heading */}
              <h2
                id="cam-confirm-title"
                style={{
                  fontFamily: SERIF,
                  fontSize: 'clamp(1.25rem, 5vw, 1.55rem)',
                  fontWeight: 500,
                  textAlign: 'center',
                  color: isDark ? '#e4e0f8' : '#1a1030',
                  marginBottom: '0.75rem',
                  lineHeight: 1.25,
                }}
              >
                {t('cam_title')}
              </h2>

              {/* Description */}
              <p style={{
                fontSize: 'clamp(0.8rem, 3.5vw, 0.88rem)',
                lineHeight: 1.65,
                textAlign: 'center',
                color: isDark ? '#7c6fa0' : '#6b6080',
                marginBottom: '1.75rem',
                maxWidth: 340,
                margin: '0 auto 1.75rem',
              }}>
                {t('cam_desc_1')}
                <strong style={{ color: isDark ? '#a78bfa' : '#7c3aed', fontWeight: 600 }}>{t('cam_desc_bold')}</strong>
                {t('cam_desc_2')}
              </p>

              {/* Privacy pills */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '1.75rem' }}>
                {[
                  { icon: <Shield size={12} />, text: t('cam_p1'), color: '#10b981' },
                  { icon: <VideoOff size={12} />, text: t('cam_p2'), color: '#f472b6' },
                  { icon: <Lock size={12} />, text: t('cam_p3'), color: '#f59e0b' },
                ].map(({ icon, text, color }) => (
                  <span key={text} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: 'clamp(0.25rem, 1vw, 0.3rem) clamp(0.5rem, 2vw, 0.75rem)',
                    borderRadius: 999,
                    fontSize: 'clamp(0.65rem, 2.5vw, 0.72rem)',
                    fontWeight: 600,
                    background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                    color,
                  }}>
                    {icon} {text}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 28px rgba(109,40,217,0.45)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleConfirmCamera}
                  id="allow-camera-btn"
                  aria-label="Allow camera and launch SignSync"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6rem',
                    padding: 'clamp(0.75rem, 3vw, 0.85rem) 1.5rem',
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 'clamp(0.85rem, 3vw, 0.95rem)',
                    background: 'linear-gradient(135deg, #d946ef, #7c3aed)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: SANS,
                    boxShadow: '0 4px 20px rgba(109,40,217,0.35)',
                    letterSpacing: '0.01em',
                  }}
                >
                  <Camera size={17} strokeWidth={2.5} />
                  {t('cam_btn_allow')}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleDeclineCamera}
                  id="decline-camera-btn"
                  aria-label="Cancel camera access"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'clamp(0.65rem, 3vw, 0.75rem) 1.5rem',
                    borderRadius: 999,
                    fontWeight: 500,
                    fontSize: 'clamp(0.8rem, 3vw, 0.88rem)',
                    background: 'transparent',
                    color: isDark ? '#5a4d7a' : '#9ca3af',
                    border: `1px solid ${isDark ? 'rgba(139,92,246,0.14)' : 'rgba(0,0,0,0.08)'}`,
                    cursor: 'pointer',
                    fontFamily: SANS,
                    transition: 'color 0.2s',
                  }}
                >
                  {t('cam_btn_cancel')}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
