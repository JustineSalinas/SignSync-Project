import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, MonitorSmartphone, Lock, BarChart3, Building2, Landmark, GraduationCap, Shield, Code2, Wrench, Search } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { SERIF, SANS, darkTheme, lightTheme } from '../theme';

import Navbar from '../components/Navbar';
import GradientText from '../components/GradientText';
import CountingNumber from '../components/CountingNumber';
import TeamCard from '../components/TeamCard';

const TEAM_MEMBERS = [
  {
    name: 'Adrian Justin Salinas',
    role: 'Project Lead & Backend',
    icon: <Code2 size={16} />,
    color: '#7c3aed',
    description: 'Leads the technical vision of SignSync and architects the backend infrastructure — from the AI gesture pipeline to the real-time translation API.',
    skills: ['Python', 'FastAPI', 'MediaPipe', 'System Design'],
    image: '/ajpic.jpg',
    quote: '"Building the bridge between AI and human connection."',
    github: 'https://github.com/JustineSalinas'
  },
  {
    name: 'Alexander Michael Tolosa',
    role: 'Front End Developer',
    icon: <Wrench size={16} />,
    color: '#f97316',
    description: 'Crafts the user-facing experience — building polished, accessible interfaces that make sign language translation feel effortless and intuitive.',
    skills: ['React', 'Tailwind CSS', 'Framer Motion', 'UI/UX'],
    image: '/alexpic.png',
    quote: '"Design is intelligence made visible."',
    github: 'https://github.com/Alexander-Tolosa'
  },
  {
    name: 'Matthew Tabat',
    role: 'Quality Assurance',
    icon: <Search size={16} />,
    color: '#0d9488',
    description: 'Ensures every interaction in SignSync is reliable and bug-free — from camera detection edge cases to translation accuracy across devices.',
    skills: ['Testing', 'Cypress', 'Edge Cases', 'Automation'],
    image: '/matthewpic.jpg',
    quote: '"Quality is not an act, it is a habit."',
    github: 'https://github.com/mtabat-cutie'
  },
  {
    name: 'Jan Louis Simundo',
    role: 'Quality Assurance',
    icon: <Shield size={16} />,
    color: '#4f46e5',
    description: 'Validates accessibility compliance and performance standards — making sure SignSync meets ADA requirements and works smoothly for all users.',
    skills: ['ADA Compliance', 'WCAG', 'Performance', 'A11y'],
    image: '/janpic.png',
    quote: '"Inclusion is the ultimate measure of success."'
  },
];

export default function TeamPage({ onBack, onStart }) {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  return (
    <motion.div
      key="team"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4 }}
      style={{ minHeight: '100vh' }}
    >
      <Navbar
        onStart={onStart}
        onTeam={() => {}}
        scrollToHow={onBack}
        onLogoClick={onBack}
      />

      {/* ═══════════ HERO ═══════════ */}
      <section
        style={{
          position: 'relative',
          padding: '5rem 2rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '0%', left: '50%', transform: 'translateX(-50%)',
            width: '120%', height: '100%',
            background: isDark
              ? 'radial-gradient(ellipse at 50% 20%, rgba(139,92,246,0.12) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 50% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <motion.button
          whileHover={{ x: -3 }}
          onClick={onBack}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onBack()}
          aria-label="Back to home"
          style={{
            position: 'absolute', top: '2rem', left: '2.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, color: isDark ? '#9d8ec8' : '#7a7088', fontFamily: SANS, transition: 'color 0.2s',
          }}
        >
          <ArrowLeft size={16} /> {t('team_back')}
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 1.1rem', borderRadius: '999px', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', background: isDark ? 'rgba(139,92,246,0.12)' : 'rgba(139,92,246,0.08)', color: isDark ? '#a78bfa' : '#7c3aed', border: `1px solid ${isDark ? 'rgba(139,92,246,0.25)' : 'rgba(139,92,246,0.18)'}`, marginBottom: '1.5rem', }}
        >
          <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
          {t('team_badge')}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          style={{ fontFamily: SERIF, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 400, lineHeight: 1.1, textAlign: 'center', maxWidth: 650, marginBottom: '1.25rem', color: isDark ? darkTheme.text : lightTheme.text, }}
        >
          {t('team_title_1')}<GradientText text={t('team_title_2')} animate={true} />
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          style={{ fontSize: '1.05rem', lineHeight: 1.65, textAlign: 'center', maxWidth: 520, color: isDark ? darkTheme.textMuted : lightTheme.textMuted, marginBottom: '1rem', }}
        >
          {t('team_sub')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isDark ? darkTheme.textMuted : '#6b7280', fontSize: '0.85rem', fontWeight: 600, marginTop: '2rem' }}
        >
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(244,114,182,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={12} color="#f472b6" />
          </div>
          {t('team_location')}
        </motion.div>
      </section>

      {/* ═══════════ TEAM GRID ═══════════ */}
      <section style={{ padding: '0 2rem 5rem', display: 'flex', justifyContent: 'center' }} aria-label="Team Members">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: 900, width: '100%' }}>
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.name} member={member} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════ DEPLOYMENT SECTION ═══════════ */}
      <section aria-label="Deployment details" style={{ padding: '6rem 2rem 8rem', display: 'flex', justifyContent: 'center', borderTop: `1px solid ${isDark ? darkTheme.border : lightTheme.border}`, background: isDark ? '#0f0a1e' : '#faf9fc' }}>
        <div style={{ maxWidth: 1100, width: '100%', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Left Column */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ height: 1, width: 30, background: '#7c3aed' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>{t('dep_label')}</span>
            </div>

            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? darkTheme.text : lightTheme.text, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              {t('dep_title_1')}<br />
              <GradientText text={t('dep_title_2')} fontSize="inherit" animate={true} />
            </h2>

            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: isDark ? darkTheme.textMuted : lightTheme.textMuted, marginBottom: '2.5rem', maxWidth: 460 }}>
              {t('dep_sub')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {[
                { icon: <MonitorSmartphone size={18} />, color: '#a78bfa', bg: 'rgba(139,92,246,0.1)', title: t('dep_b1_title'), desc: t('dep_b1_desc') },
                { icon: <Lock size={18} />, color: '#34d399', bg: 'rgba(16,185,129,0.1)', title: t('dep_b2_title'), desc: t('dep_b2_desc') },
                { icon: <BarChart3 size={18} />, color: '#fbbf24', bg: 'rgba(245,158,11,0.1)', title: t('dep_b3_title'), desc: t('dep_b3_desc') }
              ].map((feature, i) => (
                <div key={i} style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)'}`, boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: feature.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: feature.color }}>{feature.icon}</div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '0.95rem', color: isDark ? darkTheme.text : lightTheme.text, margin: '0 0 0.2rem 0' }}>{feature.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: isDark ? darkTheme.textMuted : lightTheme.textMuted, margin: 0 }}>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column Database Mockup */}
          <div style={{ flex: '1 1 480px', background: isDark ? '#080510' : '#1a1030', borderRadius: 24, padding: '3.5rem 3rem', border: `1px solid ${isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'}`, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#7a7088', textTransform: 'uppercase' }}>{t('dep_live')}</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', padding: '0.35rem 0.9rem', borderRadius: 999, color: '#10b981', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> {t('dep_active')}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', marginBottom: '4.5rem' }}>
              <div><div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#d946ef', lineHeight: 1, marginBottom: '0.75rem' }}>24+</div><div style={{ fontSize: '0.75rem', color: '#7a7088' }}>{t('dep_stat1')}</div></div>
              <div><div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#10b981', lineHeight: 1, marginBottom: '0.75rem' }}>97%</div><div style={{ fontSize: '0.75rem', color: '#7a7088' }}>{t('dep_stat2')}</div></div>
              <div><div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#f59e0b', lineHeight: 1, marginBottom: '0.75rem' }}><CountingNumber value={80} prefix="<" suffix="ms" /></div><div style={{ fontSize: '0.75rem', color: '#7a7088' }}>{t('dep_stat3')}</div></div>
              <div><div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#8b5cf6', lineHeight: 1, marginBottom: '0.75rem' }}>0kb</div><div style={{ fontSize: '0.75rem', color: '#7a7088' }}>{t('dep_stat4')}</div></div>
            </div>

            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#5a4d7a', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>{t('dep_types')}</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: <Building2 size={14} />, name: t('dep_hosp'), badge: 'LIVE', badgeColor: '#10b981' },
                { icon: <Landmark size={14} />, name: t('dep_gov'), badge: 'LIVE', badgeColor: '#10b981' },
                { icon: <BarChart3 size={14} />, name: t('dep_bank'), badge: 'PILOT', badgeColor: '#f59e0b' },
                { icon: <GraduationCap size={14} />, name: t('dep_edu'), badge: 'PILOT', badgeColor: '#f59e0b' }
              ].map((type) => (
                <div key={type.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d8ec8' }}>{type.icon}</div>
                    <span style={{ fontSize: '0.85rem', color: '#e4e0f8', fontWeight: 500 }}>{type.name}</span>
                  </div>
                  <span style={{ fontSize: '0.65rem', fontWeight: 700, color: type.badgeColor, letterSpacing: '0.05em' }}>{type.badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem 2rem 2.5rem', gap: '0.5rem', borderTop: `1px solid ${isDark ? darkTheme.border : lightTheme.border}` }}>
        <p style={{ fontSize: '0.78rem', color: isDark ? darkTheme.textSubtle : '#9d95b4', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Shield size={13} style={{ opacity: 0.6 }} /> {t('dep_privacy')}
        </p>
        <p style={{ fontSize: '0.72rem', color: isDark ? '#3d3560' : '#b8b2c8', margin: 0 }}>© 2026 SignSync, Philippines. All rights reserved.</p>
      </footer>
    </motion.div>
  );
}
