import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import LandingPage from './pages/LandingPage';
import TeamPage from './pages/TeamPage';

// Lazy load the camera page because it depends on heavy MediaPipe libraries
const SignZoneCamera = lazy(() => import('./components/SignZoneCamera'));

/* ─── PAGES ─── */
const PAGE_LANDING = 'landing';
const PAGE_TEAM = 'team';
const PAGE_CAMERA = 'camera';

export default function App() {
  const [page, setPage] = useState(PAGE_LANDING);

  // Navigate function automatically scrolls to top
  const navigateTo = (newPage) => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setPage(newPage);
  };

  return (
    <AnimatePresence mode="wait">
      {page === PAGE_LANDING && (
        <LandingPage
          key="landing"
          onStart={() => navigateTo(PAGE_CAMERA)}
          onTeam={() => navigateTo(PAGE_TEAM)}
        />
      )}

      {page === PAGE_TEAM && (
        <TeamPage
          key="team"
          onBack={() => navigateTo(PAGE_LANDING)}
          onStart={() => navigateTo(PAGE_CAMERA)}
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
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mb-4" />
                <p>Loading AI Engine...</p>
              </div>
            </div>
          }>
            <SignZoneCamera onExit={() => navigateTo(PAGE_LANDING)} />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
