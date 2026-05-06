import { lazy, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile.js';
import HeroOverlay from '../components/HeroOverlay.jsx';
import MobileGrid from '../components/MobileGrid.jsx';

// Lazy-load the Spline scene so mobile bundles don't pay for the runtime.
const SplineKeyboard = lazy(() => import('../components/SplineKeyboard.jsx'));

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <main className="min-h-screen">
        <HeroOverlay compact />
        <div className="mt-6">
          <MobileGrid />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <HeroOverlay />
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<SceneFallback />}>
          <SplineKeyboard />
        </Suspense>
      </div>
    </main>
  );
}

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-xs uppercase tracking-widest text-zinc-400">Loading scene…</div>
    </div>
  );
}
