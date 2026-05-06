import { lazy, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile.js';
import HeroOverlay from '../components/HeroOverlay.jsx';
import MobileGrid from '../components/MobileGrid.jsx';

// Lazy-load the 3D scene so mobile bundles don't pay for Three.js.
const KeyboardScene = lazy(() => import('../components/KeyboardScene.jsx'));

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
          <KeyboardScene />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="chip">Drag to orbit · click a lit key</span>
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
