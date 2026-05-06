import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { asset } from '../lib/asset.js';

const COMING_SOON = ['Project 11', 'Project 12', 'Project 13', 'Project 14'];

// Track mouse position for the hover-glow effect on each card.
function handleMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - r.left) / r.width) * 100;
  const y = ((e.clientY - r.top) / r.height) * 100;
  e.currentTarget.style.setProperty('--mx', `${x}%`);
  e.currentTarget.style.setProperty('--my', `${y}%`);
}

export default function MobileGrid() {
  return (
    <section className="container-page pb-20 pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {projects.map((p, i) => (
          <Link
            key={p.slug}
            to={`/project/${p.slug}`}
            onMouseMove={handleMove}
            className="card-interactive anim-fade-up group"
            style={{ animationDelay: `${i * 70}ms` }}
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={asset(p.images[0])}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>

            {/* gradient bottom shade so the title chip reads on any cover */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 z-10 p-4">
              <span className="chip mb-2 backdrop-blur-md">{p.tag}</span>
              <h3 className="text-base font-semibold leading-tight text-white sm:text-lg">
                {p.title}
              </h3>
              <p className="mt-1 line-clamp-2 text-xs text-zinc-300/80">{p.summary}</p>
            </div>

            {p.featured && (
              <span
                className="anim-pulse-glow absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-cupra-500/20 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cupra-400 ring-1 ring-cupra-500/40"
              >
                <span className="anim-blink inline-block h-1.5 w-1.5 rounded-full bg-cupra-400" />
                Featured
              </span>
            )}
          </Link>
        ))}

        {COMING_SOON.map((label, i) => (
          <div
            key={label}
            aria-disabled
            className="card anim-fade-up relative block overflow-hidden opacity-50"
            style={{ animationDelay: `${(projects.length + i) * 70}ms` }}
          >
            <div className="flex aspect-[4/5] w-full items-center justify-center">
              <div className="text-center">
                <div className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  {label}
                </div>
                <div className="mt-2 font-mono text-sm text-zinc-400">Coming Soon</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
