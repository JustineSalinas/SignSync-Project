import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useMotionValue, useSpring } from 'framer-motion';
import {
  Hand, Camera, Volume2, ArrowRight, Moon, Sun, Play, Check, Shield,
  ArrowLeft, Code2, Wrench, Search, Star, Users, Linkedin, Github, Mail,
  X, MapPin, Activity, Lock, BarChart3, PieChart, Zap, PlayCircle, ChevronRight, MonitorSmartphone, Building2, Landmark, GraduationCap
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
        style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
        onClick={onLogoClick}
      >
        <div style={{ display: 'flex', alignItems: 'center', height: 26 }}>
          <img 
            src="/signsync.png" 
            alt="SignSync Logo" 
            style={{ 
              height: '100%', 
              width: 'auto', 
              objectFit: 'contain',
              // Use CSS filter to turn black/white into a prominent violet color (#7c3aed)
              filter: isDark 
                ? 'brightness(0) saturate(100%) invert(69%) sepia(18%) saturate(1142%) hue-rotate(218deg) brightness(101%) contrast(97%)' 
                : 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(5832%) hue-rotate(256deg) brightness(96%) contrast(92%)' 
            }} 
          />
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
            lineHeight: 1,
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
   SHARED UTILITY COMPONENTS
══════════════════════════════════════════════════════════════ */
function VideoModal({ isDark, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', padding: '2rem'
        }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative', width: '100%', maxWidth: 900, aspectRatio: '16/9',
            background: isDark ? '#0f0a1e' : '#1a1030', borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: 20, right: 20, zIndex: 10, background: 'rgba(255,255,255,0.1)',
              border: 'none', color: '#fff', width: 40, height: 40, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              backdropFilter: 'blur(4px)'
            }}
          >
            <X size={20} />
          </button>
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff' }}>
            <PlayCircle size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <p style={{ fontFamily: SANS, opacity: 0.7, fontWeight: 500 }}>Demo Video Coming Soon</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CountingNumber({ value, suffix = '', prefix = '', isDark }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const count = useMotionValue(0);
  const springValue = useSpring(count, { damping: 30, stiffness: 100, mass: 1 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  return <span ref={ref}>{prefix}{displayValue}{suffix}</span>;
}

function DashboardMockup({ isDark }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6 }}
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

/* ══════════════════════════════════════════════════════════════
   LANDING PAGE — full multi-section layout
══════════════════════════════════════════════════════════════ */
function LandingPage({ isDark, toggleDark, onStart, onTeam }) {
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
        isDark={isDark}
        toggleDark={toggleDark}
        onStart={onStart}
        onTeam={onTeam}
        scrollToHow={scrollToHow}
        onLogoClick={() => {}}
      />
      {showVideo && <VideoModal isDark={isDark} onClose={() => setShowVideo(false)} />}

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
            overflow: 'visible',
            paddingTop: '1.5rem',
          }}
        >
          Bridging the
          <br />
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
              padding: '0 1.2rem',
              overflow: 'visible',
            }}
          >
            <span style={{ position: 'absolute', top: -5, right: -5, opacity: 0.5, WebkitTextStroke: isDark ? '1px rgba(244,114,182,0.4)' : '1px rgba(244,114,182,0.3)', color: 'transparent', fontStyle: 'italic', zIndex: -1, userSelect: 'none', pointerEvents: 'none' }}>gap</span>
            <span style={{ position: 'absolute', top: -10, right: -10, opacity: 0.3, WebkitTextStroke: isDark ? '1px rgba(217,70,239,0.3)' : '1px rgba(217,70,239,0.2)', color: 'transparent', fontStyle: 'italic', zIndex: -2, userSelect: 'none', pointerEvents: 'none' }}>gap</span>
            <span style={{ position: 'absolute', top: -15, right: -15, opacity: 0.15, WebkitTextStroke: isDark ? '1px rgba(124,58,237,0.2)' : '1px rgba(124,58,237,0.1)', color: 'transparent', fontStyle: 'italic', zIndex: -3, userSelect: 'none', pointerEvents: 'none' }}>gap</span>
            <span
              style={{
                fontStyle: 'italic',
                background: 'linear-gradient(135deg, #f472b6 0%, #d946ef 30%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
                zIndex: 1,
              }}
            >
              gap
            </span>
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
              border: isDark
                ? '1.5px solid rgba(139,92,246,0.35)'
                : '1.5px solid rgba(26,16,48,0.2)',
              cursor: 'pointer',
              fontFamily: SANS,
            }}
          >
            <Play size={15} strokeWidth={2.5} fill="currentColor" />
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
        
        {/* Dashboard Mockup Component */}
        <DashboardMockup isDark={isDark} />
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section
        style={{
          borderTop: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)',
          borderBottom: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: isDark ? '#0a0a0f' : '#fff',
        }}
      >
        {[
          { num: 97, pref: '', suff: '%', text: 'Gesture accuracy', color: '#7c3aed' },
          { num: 80, pref: '<', suff: 'ms', text: 'Translation latency', color: '#10b981' },
          { num: 500, pref: '', suff: '+', text: 'Signs recognized', color: '#f59e0b' },
          { num: 0, pref: '', suff: 'kb', text: 'Data sent to servers', color: '#f472b6' },
        ].map((stat, i) => (
          <div key={stat.text} style={{ padding: '3rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: i < 3 ? (isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)') : 'none' }}>
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
        style={{
          padding: '6rem 2rem 5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ maxWidth: 900, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ maxWidth: 450 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ height: 1, width: 30, background: '#7c3aed' }} />
              <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>
                How It Works
              </span>
            </div>
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? '#f0ecff' : '#1a1030', margin: 0 }}>
              Three steps to seamless understanding
            </h2>
          </div>
          <p style={{ maxWidth: 350, fontSize: '0.9rem', lineHeight: 1.6, color: isDark ? '#7a7088' : '#6b7280', margin: 0 }}>
            Everything runs locally on your device. No account required. No data leaves the room.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.25rem',
            maxWidth: 900,
            width: '100%',
          }}
        >
          <StepCard isDark={isDark} step="01" icon={<Camera size={20} />} title="Camera Access" desc="We need your camera to see hand signs. No video is ever stored or transmitted — everything is processed locally, in real time." badgeText="ON-DEVICE ONLY" badgeIcon={<Lock size={12} />} badgeColor="#10b981" />
          <StepCard isDark={isDark} step="02" icon={<Hand size={20} />} title="Position Your Hands" desc="Stand about 2 feet from the screen. Keep hands at chest height for the most accurate gesture recognition." badgeText="AI-POWERED DETECTION" badgeIcon={<Zap size={12} />} badgeColor="#7c3aed" />
          <StepCard isDark={isDark} step="03" icon={<Volume2 size={20} />} title="Audio Translation" desc="Recognized signs are spoken aloud so the service officer can understand you — naturally, instantly, and without any extra steps." badgeText="UNDER 80MS LATENCY" badgeIcon={<Zap size={12} />} badgeColor="#f59e0b" />
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section style={{ padding: '2rem 2rem 4rem' }}>
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            borderRadius: '24px',
            background: isDark ? '#0f0a1e' : '#f8f7fa',
            border: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(139,92,246,0.2)',
            padding: '4rem 3.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '3rem',
          }}
        >
          <div style={{ maxWidth: 450 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: 1, width: 30, background: '#7c3aed' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>
                GET STARTED TODAY
              </span>
            </div>
            <h3 style={{ fontFamily: SERIF, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? '#f0ecff' : '#1a1030', marginBottom: '1.25rem' }}>
              Ready to communicate without barriers?
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: isDark ? '#7a7088' : '#6b7280', margin: 0 }}>
              Join clinics, banks, and service counters already using SignSync. No installation, no login, no friction.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', minWidth: 160 }}>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onStart}
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', gap: '0.65rem', padding: '0.85rem 2rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.95rem', background: 'linear-gradient(135deg, #d946ef, #7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
              Get Started <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} onClick={onTeam}
              style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', padding: '0.85rem 1.5rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.95rem', background: 'transparent', color: isDark ? '#9d8ec8' : '#6b7280', border: isDark ? '1px solid rgba(139,92,246,0.2)' : '1px solid rgba(0,0,0,0.1)', cursor: 'pointer', fontFamily: SANS }}>
              Learn more
            </motion.button>
          </div>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer
        style={{
          padding: '4rem 2rem 2rem',
          borderTop: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)',
          background: isDark ? '#0a0a0f' : '#f8f7fa'
        }}
      >
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', justifyContent: 'space-between', marginBottom: '4rem' }}>
          {/* Logo & Desc */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <img src="/signsync.png" alt="SignSync" style={{ height: 24, width: 'auto', filter: isDark ? 'brightness(0) saturate(100%) invert(69%) sepia(18%) saturate(1142%) hue-rotate(218deg) brightness(101%) contrast(97%)' : 'brightness(0) saturate(100%) invert(26%) sepia(87%) saturate(5832%) hue-rotate(256deg) brightness(96%) contrast(92%)' }} />
              <span style={{ fontWeight: 700, fontSize: '1rem', color: isDark ? '#f0ecff' : '#1a1030' }}>SignSync</span>
            </div>
            <p style={{ fontSize: '0.8rem', lineHeight: 1.6, color: isDark ? '#7a7088' : '#6b7280' }}>
              Building accessible technology for the Deaf community and service industries worldwide — one sign at a time.
            </p>
          </div>

          {/* Links Grid */}
          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
            <div>
              <h4 style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: isDark ? '#5a4d7a' : '#9ca3af', marginBottom: '1.5rem' }}>Product</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {['How it works', 'Accessibility', 'For Organizations', 'Pricing'].map(link => (
                  <li key={link}><a href="#" style={{ fontSize: '0.8rem', color: isDark ? '#9d8ec8' : '#6b7280', textDecoration: 'none' }}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: isDark ? '#5a4d7a' : '#9ca3af', marginBottom: '1.5rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {['About', 'Meet the team', 'Blog', 'Contact'].map(link => (
                  <li key={link}><a href="#" style={{ fontSize: '0.8rem', color: isDark ? '#9d8ec8' : '#6b7280', textDecoration: 'none' }}>{link}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: isDark ? '#5a4d7a' : '#9ca3af', marginBottom: '1.5rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {['Privacy Policy', 'Terms of Service', 'ADA Statement'].map(link => (
                  <li key={link}><a href="#" style={{ fontSize: '0.8rem', color: isDark ? '#9d8ec8' : '#6b7280', textDecoration: 'none' }}>{link}</a></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ maxWidth: 1000, margin: '0 auto', paddingTop: '2rem', borderTop: isDark ? '1px solid rgba(139,92,246,0.1)' : '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#5a4d7a' : '#9ca3af', margin: 0 }}>
            © 2026 SignSync. All rights reserved.
          </p>
          <p style={{ fontSize: '0.75rem', color: isDark ? '#7a7088' : '#6b7280', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: 0 }}>
            <Shield size={14} style={{ color: '#10b981' }} />
            Camera access is required. No data leaves this device.
          </p>
        </div>
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
    image: '/alexpic.png',
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
    image: '/janpic.png',
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
          <span 
            style={{ 
              fontStyle: 'italic', 
              background: 'linear-gradient(135deg, #f472b6 0%, #d946ef 30%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            SignSync
          </span>
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

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.4 }}
           style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isDark ? '#7a7088' : '#6b7280', fontSize: '0.85rem', fontWeight: 600, marginTop: '2rem' }}
        >
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(244,114,182,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <MapPin size={12} color="#f472b6" />
          </div>
          Iloilo City, Philippines
        </motion.div>
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

      {/* ═══════════ DEPLOYMENT SECTION ═══════════ */}
      <section style={{ padding: '6rem 2rem 8rem', display: 'flex', justifyContent: 'center', borderTop: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)', background: isDark ? '#0f0a1e' : '#faf9fc' }}>
        <div style={{ maxWidth: 1100, width: '100%', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'flex-start' }}>
          
          {/* Left Column */}
          <div style={{ flex: '1 1 400px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={{ height: 1, width: 30, background: '#7c3aed' }} />
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#7c3aed' }}>
                For Organizations
              </span>
            </div>
            
            <h2 style={{ fontFamily: SERIF, fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 400, lineHeight: 1.1, color: isDark ? '#f0ecff' : '#1a1030', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
              Deploy SignSync <br />across your <br />
              <span style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #f472b6 0%, #d946ef 30%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>entire operation</span>
            </h2>
            
            <p style={{ fontSize: '0.95rem', lineHeight: 1.65, color: isDark ? '#7a7088' : '#6b7280', marginBottom: '2.5rem', maxWidth: 460 }}>
              From hospital reception desks to government service counters — SignSync integrates in minutes, runs on existing hardware, and requires zero staff training.
            </p>
            
            {/* Feature Stack */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a78bfa' }}><MonitorSmartphone size={18} /></div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: isDark ? '#e4e0f8' : '#1a1030', marginBottom: '0.2rem' }}>Plug-and-play setup</h4>
                  <p style={{ fontSize: '0.8rem', color: isDark ? '#7a7088' : '#6b7280', margin: 0 }}>Works on any browser-enabled display. No app installation, no IT overhead required.</p>
                </div>
              </div>
              <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(16,185,129,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34d399' }}><Lock size={18} /></div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: isDark ? '#e4e0f8' : '#1a1030', marginBottom: '0.2rem' }}>100% on-device processing</h4>
                  <p style={{ fontSize: '0.8rem', color: isDark ? '#7a7088' : '#6b7280', margin: 0 }}>Patient and visitor data never leaves the room — fully HIPAA and GDPR aligned.</p>
                </div>
              </div>
              <div style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#fff', border: isDark ? '1px solid rgba(255,255,255,0.06)' : '1px solid rgba(0,0,0,0.05)', boxShadow: isDark ? 'none' : '0 4px 20px rgba(0,0,0,0.03)', borderRadius: 16, padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbf24' }}><BarChart3 size={18} /></div>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.95rem', color: isDark ? '#e4e0f8' : '#1a1030', marginBottom: '0.2rem' }}>Usage analytics dashboard</h4>
                  <p style={{ fontSize: '0.8rem', color: isDark ? '#7a7088' : '#6b7280', margin: 0 }}>Track interaction volume and language coverage across all your locations.</p>
                </div>
              </div>
            </div>
            
            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem', borderRadius: '40px', fontWeight: 600, fontSize: '0.9rem', background: 'linear-gradient(135deg, #d946ef, #7c3aed)', color: '#fff', border: 'none', cursor: 'pointer', fontFamily: SANS }}>
                Request a demo <ArrowRight size={16} />
              </motion.button>
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} style={{ padding: '0.9rem 2rem', borderRadius: '40px', fontWeight: 600, fontSize: '0.9rem', background: 'transparent', color: isDark ? '#9d8ec8' : '#6b7280', border: isDark ? '1px solid rgba(139,92,246,0.3)' : '1px solid rgba(0,0,0,0.15)', cursor: 'pointer', fontFamily: SANS }}>
                Contact our team
              </motion.button>
            </div>
          </div>
          
          {/* Right Column Database Mockup */}
          <div style={{ flex: '1 1 480px', background: isDark ? '#080510' : '#1a1030', borderRadius: 24, padding: '3.5rem 3rem', border: isDark ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.08)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#7a7088', textTransform: 'uppercase' }}>Live Deployments</span>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(16,185,129,0.1)', padding: '0.35rem 0.9rem', borderRadius: 999, color: '#10b981', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} /> ACTIVE NOW
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.5rem', marginBottom: '4.5rem' }}>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#d946ef', lineHeight: 1, marginBottom: '0.75rem' }}>24+</div>
                <div style={{ fontSize: '0.75rem', color: '#7a7088' }}>Institutions using SignSync</div>
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#10b981', lineHeight: 1, marginBottom: '0.75rem' }}>97%</div>
                <div style={{ fontSize: '0.75rem', color: '#7a7088' }}>Gesture accuracy rate</div>
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#f59e0b', lineHeight: 1, marginBottom: '0.75rem' }}><CountingNumber value={80} prefix="<" suffix="ms" /></div>
                <div style={{ fontSize: '0.75rem', color: '#7a7088' }}>Real-time latency</div>
              </div>
              <div>
                <div style={{ fontFamily: SERIF, fontSize: '2.5rem', color: '#8b5cf6', lineHeight: 1, marginBottom: '0.75rem' }}>0kb</div>
                <div style={{ fontSize: '0.75rem', color: '#7a7088' }}>Data sent to servers</div>
              </div>
            </div>
            
            <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', color: '#5a4d7a', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem' }}>Deployment Types</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d8ec8' }}><Building2 size={14} /></div>
                  <span style={{ fontSize: '0.85rem', color: '#e4e0f8', fontWeight: 500 }}>Hospitals & Clinics</span>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.05em' }}>LIVE</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d8ec8' }}><Landmark size={14} /></div>
                  <span style={{ fontSize: '0.85rem', color: '#e4e0f8', fontWeight: 500 }}>Government Counters</span>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#10b981', letterSpacing: '0.05em' }}>LIVE</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d8ec8' }}><BarChart3 size={14} /></div>
                  <span style={{ fontSize: '0.85rem', color: '#e4e0f8', fontWeight: 500 }}>Banks & Financial Services</span>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.05em' }}>PILOT</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9d8ec8' }}><GraduationCap size={14} /></div>
                  <span style={{ fontSize: '0.85rem', color: '#e4e0f8', fontWeight: 500 }}>Educational Institutions</span>
                </div>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#f59e0b', letterSpacing: '0.05em' }}>PILOT</span>
              </div>
            </div>
            
          </div>
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
   STEP CARD — for "How It Works"
══════════════════════════════════════════════════════════════ */
function StepCard({ icon, title, desc, isDark, step, badgeIcon, badgeText, badgeColor }) {
  const bg = isDark ? '#0a0a0f' : '#fff';
  const textColor = isDark ? '#fff' : '#1a1030';
  const descColor = isDark ? '#7c6fa0' : '#7a7088';

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: isDark ? '0 12px 36px rgba(0,0,0,0.5)' : '0 12px 36px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.25 }}
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
}
