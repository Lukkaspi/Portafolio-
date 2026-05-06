import { lazy, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile.js';
import Hero from '../components/Hero.jsx';
import Stars from '../components/Stars.jsx';
import MobileGrid from '../components/MobileGrid.jsx';
import PacmanDivider from '../components/PacmanDivider.jsx';

// Lazy-load the 3D scene so mobile bundles don't pay for Three.js.
const ProjectKeyboard = lazy(() => import('../components/ProjectKeyboard.jsx'));

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-ink-900 text-zinc-100">
        <Stars />
        <section className="container-page pb-4 pt-28">
          <Hero />
        </section>
        <section id="projects" className="relative z-10">
          <MobileGrid />
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="relative grid min-h-screen grid-cols-2">
        {/* LEFT — dark cinematic identity */}
        <section className="relative flex items-center overflow-hidden bg-ink-950 text-zinc-100">
          <Stars />
          <div className="relative z-10 w-full px-8 pt-24 pb-16 lg:px-14 xl:px-20">
            <Hero />
          </div>
        </section>

        {/* RIGHT — bright minimal project gallery */}
        <section className="relative flex items-center overflow-hidden bg-zinc-50 text-zinc-900">
          {/* Subtle light wash so the white isn't a flat slab */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 60% at 80% 20%, rgba(124,92,255,0.08) 0%, transparent 60%),' +
                'radial-gradient(60% 50% at 30% 90%, rgba(249,115,22,0.07) 0%, transparent 55%),' +
                'linear-gradient(180deg, #fafafa 0%, #f1f5f9 100%)',
            }}
          />

          {/* Section meta — top-right corner */}
          <div className="absolute right-8 top-8 z-10 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-zinc-500">
            <span className="inline-block h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.7)]" />
            10 Projects · One Console
          </div>

          {/* Keyboard */}
          <div className="relative z-10 h-[78vh] w-full">
            <Suspense fallback={<SceneFallback light />}>
              <ProjectKeyboard theme="light" />
            </Suspense>
          </div>

          {/* Bottom hint */}
          <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center">
            <span className="rounded-full border border-black/10 bg-white/60 px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-600 backdrop-blur">
              Hover · Click to open
            </span>
          </div>
        </section>

        {/* CENTER — animated Pac-Man divider */}
        <PacmanDivider />
      </div>
    </main>
  );
}

function SceneFallback({ light = false }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className={`text-xs uppercase tracking-widest ${
          light ? 'text-zinc-500' : 'text-zinc-400'
        }`}
      >
        Loading scene…
      </div>
    </div>
  );
}
