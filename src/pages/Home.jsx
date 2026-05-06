import { lazy, Suspense } from 'react';
import useIsMobile from '../hooks/useIsMobile.js';
import Hero from '../components/Hero.jsx';
import Stars from '../components/Stars.jsx';
import MobileGrid from '../components/MobileGrid.jsx';

// Lazy-load the 3D scene so mobile bundles don't pay for Three.js.
const ProjectKeyboard = lazy(() => import('../components/ProjectKeyboard.jsx'));

export default function Home() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <main className="relative min-h-screen overflow-hidden">
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
      <Stars />

      <section className="container-page relative z-10 grid min-h-screen grid-cols-12 items-center gap-8 pb-12 pt-28 lg:gap-12">
        {/* Left: Name + intro */}
        <div className="col-span-12 lg:col-span-5 xl:col-span-5">
          <Hero />
        </div>

        {/* Right: 3D project keyboard */}
        <div className="col-span-12 h-[60vh] min-h-[420px] lg:col-span-7 lg:h-[78vh] xl:col-span-7">
          <Suspense fallback={<SceneFallback />}>
            <ProjectKeyboard />
          </Suspense>
        </div>
      </section>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 hidden justify-center lg:flex">
        <span className="chip">Drag · Hover a key · Click to open</span>
      </div>
    </main>
  );
}

function SceneFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="text-xs uppercase tracking-widest text-zinc-400">
        Loading scene…
      </div>
    </div>
  );
}
