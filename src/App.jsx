import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Hand, Camera, Volume2, ArrowRight, Moon, Sun, Play, Check, Shield,
  ArrowLeft, Code2, Wrench, Search, Star, Users, Linkedin, Github, Mail,
} from 'lucide-react';
import SignZoneCamera from './components/SignZoneCamera';

/* ─── Google Fonts: inject Playfair Display + Inter ─── */
if (!document.getElementById('google-fonts-link')) {
  const link = document.createElement('link');
  link.id = 'google-fonts-link';
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(link);
}

const SERIF = "'Playfair Display', Georgia, 'Times New Roman', serif";
const SANS = "'Inter', system-ui, -apple-system, sans-serif";

/* ─── PAGES ─── */
const PAGE_LANDING = 'landing';
const PAGE_TEAM = 'team';
const PAGE_CAMERA = 'camera';

export default function App() {
  const [page, setPage] = useState(PAGE_LANDING);
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((p) => !p);

  return (
    <div
      style={{
        minHeight: '100vh',
        fontFamily: SANS,
        transition: 'background 0.3s, color 0.3s',
        background: isDark ? '#0a0a0f' : '#f6f4f0',
        color: isDark ? '#e4e0f8' : '#1a1030',
      }}
    >
      <AnimatePresence mode="wait">
        {page === PAGE_LANDING && (
          <LandingPage
            key="landing"
            isDark={isDark}
            toggleDark={toggleDark}
            onStart={() => setPage(PAGE_CAMERA)}
            onTeam={() => setPage(PAGE_TEAM)}
          />
        )}

        {page === PAGE_TEAM && (
          <TeamPage
            key="team"
            isDark={isDark}
            toggleDark={toggleDark}
            onBack={() => setPage(PAGE_LANDING)}
            onStart={() => setPage(PAGE_CAMERA)}
          />
        )}

        {page === PAGE_CAMERA && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col"
          >
            <SignZoneCamera
              onExit={() => setPage(PAGE_LANDING)}
              isDark={isDark}
              toggleDark={toggleDark}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHARED NAVBAR
══════════════════════════════════════════════════════════════ */
function Navbar({ isDark, toggleDark, onStart, onTeam, scrollToHow, onLogoClick }) {
  return (
    <nav
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
        borderBottom: isDark
          ? '1px solid rgba(139,92,246,0.12)'
          : '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo */}
      <div
        style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer' }}
        onClick={onLogoClick}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: isDark
              ? 'linear-gradient(135deg,#4c1d95,#6d28d9)'
              : 'linear-gradient(135deg,#7c3aed,#6d28d9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <Hand size={18} strokeWidth={2.2} />
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: '1.05rem',
            letterSpacing: '-0.02em',
            color: isDark ? '#f0ecff' : '#1a1030',
          }}
        >
          SignSync
        </span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        {['How it works', 'Accessibility', 'For Organizations'].map((t) => (
          <button
            key={t}
            onClick={
              t === 'How it works'
                ? scrollToHow
                : t === 'For Organizations'
                  ? onTeam
                  : undefined
            }
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
            onMouseEnter={(e) => (e.target.style.color = isDark ? '#c4b5fd' : '#7c3aed')}
            onMouseLeave={(e) =>
              (e.target.style.color = isDark ? '#9d8ec8' : '#6b6080')
            }
          >
            {t}
          </button>
        ))}
      </div>

      {/* Right: dark toggle + CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={toggleDark}
          aria-label="Toggle dark mode"
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
            color: isDark ? '#a78bfa' : '#6b6080',
            transition: 'all 0.2s',
          }}
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={onStart}
          style={{
            padding: '0.55rem 1.25rem',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.85rem',
            background: isDark ? '#7c3aed' : '#1a1030',
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
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   LANDING PAGE — full multi-section layout
══════════════════════════════════════════════════════════════ */
function LandingPage({ isDark, toggleDark, onStart, onTeam }) {
  const howItWorksRef = useRef(null);

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
        isDark={isDark}
        toggleDark={toggleDark}
        onStart={onStart}
        onTeam={onTeam}
        scrollToHow={scrollToHow}
        onLogoClick={() => {}}
      />

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
        {/* Soft gradient blob behind hero */}
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

        {/* Badge */}
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
            border: isDark
              ? '1px solid rgba(139,92,246,0.25)'
              : '1px solid rgba(139,92,246,0.18)',
            marginBottom: '2rem',
          }}
        >
          <span style={{ fontSize: '0.6rem' }}>✦</span>
          AI-Powered Sign Language
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            textAlign: 'center',
            maxWidth: 700,
            marginBottom: '1.5rem',
            color: isDark ? '#f0ecff' : '#1a1030',
          }}
        >
          Bridging the
          <br />
          <span
            style={{
              fontStyle: 'italic',
              color: '#7c3aed',
              position: 'relative',
              display: 'inline-block',
            }}
          >
            gap
            {/* Decorative underline */}
            <svg
              viewBox="0 0 120 12"
              fill="none"
              style={{
                position: 'absolute',
                bottom: '-4px',
                left: '0',
                width: '100%',
                height: '12px',
              }}
            >
              <path
                d="M2 8 C30 2, 90 2, 118 8"
                stroke="#f97316"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.7"
              />
            </svg>
          </span>{' '}
          in communication
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            textAlign: 'center',
            maxWidth: 520,
            color: isDark ? '#7c6fa0' : '#7a7088',
            marginBottom: '2.5rem',
          }}
        >
          Real-time sign language translation that lets you speak fluently without words — designed
          for service counters, hospitals, and everyday life.
        </motion.p>

        {/* Two CTA buttons */}
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
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.85rem 2rem',
              borderRadius: '14px',
              fontWeight: 600,
              fontSize: '0.95rem',
              background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(109,40,217,0.3)',
              fontFamily: SANS,
            }}
          >
            Start Signing
            <ArrowRight size={17} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={scrollToHow}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.85rem 1.8rem',
              borderRadius: '14px',
              fontWeight: 600,
              fontSize: '0.95rem',
              background: 'transparent',
              color: isDark ? '#c4b5fd' : '#1a1030',
              border: isDark
                ? '1.5px solid rgba(139,92,246,0.35)'
                : '1.5px solid rgba(26,16,48,0.2)',
              cursor: 'pointer',
              fontFamily: SANS,
            }}
          >
            <Play size={14} fill="currentColor" />
            See a demo
          </motion.button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '3rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            'No video stored',
            'Works offline',
            'ADA compliant',
            'All data stays on device',
          ].map((text, i) => (
            <span key={text} style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
              {i > 0 && (
                <span
                  style={{
                    width: 1,
                    height: 16,
                    background: isDark ? 'rgba(139,92,246,0.2)' : 'rgba(0,0,0,0.12)',
                    margin: '0 0.75rem',
                  }}
                />
              )}
              <Check
                size={14}
                strokeWidth={2.5}
                style={{ color: isDark ? '#34d399' : '#22c55e', marginRight: '0.35rem' }}
              />
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  color: isDark ? '#7c6fa0' : '#8a8296',
                }}
              >
                {text}
              </span>
            </span>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section
        ref={howItWorksRef}
        style={{
          padding: '5rem 2rem 4rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#7c3aed',
            marginBottom: '1rem',
          }}
        >
          How It Works
        </span>
        <h2
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1.15,
            textAlign: 'center',
            maxWidth: 520,
            marginBottom: '3.5rem',
            color: isDark ? '#f0ecff' : '#1a1030',
          }}
        >
          Three steps to seamless understanding
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
            maxWidth: 900,
            width: '100%',
          }}
        >
          <StepCard isDark={isDark} step={1} icon={<Camera size={20} />} title="Camera Access" desc="We'll need your camera to see your hand signs. No video is ever stored or transmitted — everything is processed locally, in real time." featured={false} />
          <StepCard isDark={isDark} step={2} icon={<Hand size={20} />} title="Position Your Hands" desc="Stand about 2 feet from the screen. Keep your hands at chest height for the most accurate recognition." featured={true} />
          <StepCard isDark={isDark} step={3} icon={<Volume2 size={20} />} title="Audio Translation" desc="Recognized signs are spoken aloud so the service officer can understand you — naturally, instantly, and without any extra steps." featured={false} />
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{ padding: '2rem 2rem 4rem' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #7c3aed 0%, #6d28d9 40%, #5b21b6 100%)',
            padding: '3.5rem 3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: '-40%', right: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30%', left: '-5%', width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 2, maxWidth: 400 }}>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 400, lineHeight: 1.2, color: '#fff', marginBottom: '0.75rem' }}>
              Ready to communicate without barriers?
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Join thousands already using SignSync across clinics, banks, and counters.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', position: 'relative', zIndex: 2, flexWrap: 'wrap' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onStart}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.6rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', background: 'rgba(255,255,255,0.15)', color: '#fff', border: '1.5px solid rgba(255,255,255,0.3)', cursor: 'pointer', backdropFilter: 'blur(8px)', fontFamily: SANS }}>
              Get Started <ArrowRight size={16} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }} onClick={onTeam}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.75rem 1.6rem', borderRadius: '12px', fontWeight: 600, fontSize: '0.9rem', background: '#fff', color: '#6d28d9', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
              Learn more
            </motion.button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 2rem 2.5rem',
          gap: '0.5rem',
          borderTop: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <p style={{ fontSize: '0.78rem', color: isDark ? '#5a4d7a' : '#9d95b4', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Shield size={13} style={{ opacity: 0.6 }} />
          Camera access is required. Your privacy is protected — no data leaves this device.
        </p>
        <p style={{ fontSize: '0.72rem', color: isDark ? '#3d3560' : '#b8b2c8', margin: 0 }}>
          © 2026 SignSync. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TEAM PAGE — "For Organizations"
══════════════════════════════════════════════════════════════ */
const TEAM_MEMBERS = [
  {
    name: 'Adrian Justin Salinas',
    role: 'Project Lead & Backend',
    icon: <Code2 size={16} />,
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #7c3aed, #4c1d95)',
    description:
      'Leads the technical vision of SignSync and architects the backend infrastructure — from the AI gesture pipeline to the real-time translation API.',
    skills: ['Python', 'FastAPI', 'MediaPipe', 'System Design'],
    image: '/ajpic.jpg',
    quote: '"Building the bridge between AI and human connection."'
  },
  {
    name: 'Alexander Michael Tolosa',
    role: 'Front End Developer',
    icon: <Wrench size={16} />,
    color: '#f97316',
    gradient: 'linear-gradient(135deg, #f97316, #c2410c)',
    description:
      'Crafts the user-facing experience — building polished, accessible interfaces that make sign language translation feel effortless and intuitive.',
    skills: ['React', 'Tailwind CSS', 'Framer Motion', 'UI/UX'],
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Alexander&backgroundColor=f97316',
    quote: '"Design is intelligence made visible."'
  },
  {
    name: 'Matthew Tabat',
    role: 'Quality Assurance',
    icon: <Search size={16} />,
    color: '#0d9488',
    gradient: 'linear-gradient(135deg, #0d9488, #0f766e)',
    description:
      'Ensures every interaction in SignSync is reliable and bug-free — from camera detection edge cases to translation accuracy across devices.',
    skills: ['Testing', 'Cypress', 'Edge Cases', 'Automation'],
    image: '/matthewpic.jpg',
    quote: '"Quality is not an act, it is a habit."'
  },
  {
    name: 'Jan Louis Simundo',
    role: 'Quality Assurance',
    icon: <Shield size={16} />,
    color: '#4f46e5',
    gradient: 'linear-gradient(135deg, #4f46e5, #3730a3)',
    description:
      'Validates accessibility compliance and performance standards — making sure SignSync meets ADA requirements and works smoothly for all users.',
    skills: ['ADA Compliance', 'WCAG', 'Performance', 'A11y'],
    image: 'https://api.dicebear.com/7.x/notionists/svg?seed=Jan&backgroundColor=4f46e5',
    quote: '"Inclusion is the ultimate measure of success."'
  },
];

function TeamPage({ isDark, toggleDark, onBack, onStart }) {
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
        isDark={isDark}
        toggleDark={toggleDark}
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
        {/* Subtle radial glow backend the hero */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '120%',
            height: '100%',
            background: isDark
              ? 'radial-gradient(ellipse at 50% 20%, rgba(139,92,246,0.12) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 50% 20%, rgba(139,92,246,0.08) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        {/* Back button */}
        <motion.button
          whileHover={{ x: -3 }}
          onClick={onBack}
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: isDark ? '#9d8ec8' : '#7a7088',
            fontFamily: SANS,
            transition: 'color 0.2s',
          }}
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        {/* Section badge */}
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
            border: isDark
              ? '1px solid rgba(139,92,246,0.25)'
              : '1px solid rgba(139,92,246,0.18)',
            marginBottom: '1.5rem',
          }}
        >
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }}
          />
          Meet the Team
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: SERIF,
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 400,
            lineHeight: 1.1,
            textAlign: 'center',
            maxWidth: 650,
            marginBottom: '1.25rem',
            color: isDark ? '#f0ecff' : '#1a1030',
          }}
        >
          The people behind{' '}
          <span style={{ fontStyle: 'italic', color: '#7c3aed' }}>SignSync</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: '1.05rem',
            lineHeight: 1.65,
            textAlign: 'center',
            maxWidth: 520,
            color: isDark ? '#7c6fa0' : '#7a7088',
            marginBottom: '1rem',
          }}
        >
          A dedicated team building accessible technology — one sign at a time.
        </motion.p>
      </section>

      {/* ═══════════ TEAM GRID ═══════════ */}
      <section
        style={{
          padding: '0 2rem 5rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.5rem',
            maxWidth: 900,
            width: '100%',
          }}
        >
          {TEAM_MEMBERS.map((member, i) => (
            <TeamCard key={member.name} member={member} isDark={isDark} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '2rem 2rem 2.5rem',
          gap: '0.5rem',
          borderTop: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <p style={{ fontSize: '0.78rem', color: isDark ? '#5a4d7a' : '#9d95b4', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Shield size={13} style={{ opacity: 0.6 }} />
          Camera access is required. Your privacy is protected — no data leaves this device.
        </p>
        <p style={{ fontSize: '0.72rem', color: isDark ? '#3d3560' : '#b8b2c8', margin: 0 }}>
          © 2026 SignSync. All rights reserved.
        </p>
      </footer>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   TEAM CARD
══════════════════════════════════════════════════════════════ */
function TeamCard({ member, isDark, index }) {
  const { name, role, icon, color, gradient, description, skills, image, quote } = member;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.45 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
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
              <p style={{ fontFamily: SERIF, fontSize: '1rem', fontStyle: 'italic', color: '#e2d8f0', margin: 0, opacity: 0.95 }}>{quote}</p>
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
            <img src={image} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
}

/* ══════════════════════════════════════════════════════════════
   STEP CARD — numbered card for "How It Works" section
══════════════════════════════════════════════════════════════ */
function StepCard({ icon, title, desc, isDark, featured, step }) {
  const lightBg = featured ? '#1a1030' : isDark ? '#141020' : '#fff';
  const darkBg = featured ? '#1a1030' : '#0f0a1e';
  const bg = isDark ? darkBg : lightBg;
  const textColor = featured || isDark ? '#fff' : '#1a1030';
  const descColor = featured
    ? 'rgba(255,255,255,0.7)'
    : isDark
      ? '#7c6fa0'
      : '#7a7088';

  return (
    <motion.div
      whileHover={{
        y: -4,
        boxShadow: featured
          ? '0 16px 48px rgba(109,40,217,0.35)'
          : isDark
            ? '0 12px 36px rgba(0,0,0,0.5)'
            : '0 12px 36px rgba(0,0,0,0.08)',
      }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'relative',
        borderRadius: '20px',
        padding: '1.75rem 1.5rem 1.5rem',
        background: bg,
        border: featured
          ? 'none'
          : isDark
            ? '1px solid rgba(139,92,246,0.15)'
            : '1px solid rgba(0,0,0,0.08)',
        boxShadow: featured
          ? '0 8px 32px rgba(109,40,217,0.25)'
          : isDark
            ? '0 2px 12px rgba(0,0,0,0.3)'
            : '0 2px 12px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '0.6rem',
          right: '1rem',
          fontFamily: SERIF,
          fontSize: '5rem',
          fontWeight: 400,
          lineHeight: 1,
          color: featured
            ? 'rgba(255,255,255,0.06)'
            : isDark
              ? 'rgba(139,92,246,0.08)'
              : 'rgba(0,0,0,0.04)',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {step}
      </span>
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 13,
          background: featured
            ? 'rgba(255,255,255,0.12)'
            : isDark
              ? 'rgba(109,40,217,0.18)'
              : 'rgba(139,92,246,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: featured ? '#fff' : isDark ? '#a78bfa' : '#7c3aed',
          marginBottom: '1.25rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontWeight: 700,
          fontSize: '1rem',
          marginBottom: '0.5rem',
          color: textColor,
          letterSpacing: '-0.01em',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: '0.85rem',
          lineHeight: 1.6,
          color: descColor,
          margin: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {desc}
      </p>
    </motion.div>
  );
}
