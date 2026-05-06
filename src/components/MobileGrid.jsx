import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { asset } from '../lib/asset.js';

const COMING_SOON = [
  'Project 11',
  'Project 12',
  'Project 13',
  'Project 14',
];

export default function MobileGrid() {
  return (
    <section className="container-page pb-16 pt-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xs:grid-cols-1">
        {projects.map((p) => (
          <Link
            key={p.slug}
            to={`/project/${p.slug}`}
            className="card group relative block overflow-hidden transition active:scale-[0.99]"
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={asset(p.images[0])}
                alt={p.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <div className="rounded-xl bg-black/60 p-3 backdrop-blur-md">
                <span className="chip mb-2">{p.tag}</span>
                <h3 className="text-sm font-semibold leading-tight text-white sm:text-base">
                  {p.title}
                </h3>
              </div>
            </div>
            {p.featured && (
              <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-cupra-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-cupra-400 ring-1 ring-cupra-500/40">
                Featured
              </span>
            )}
          </Link>
        ))}

        {COMING_SOON.map((label) => (
          <div
            key={label}
            aria-disabled
            className="card relative block overflow-hidden opacity-40"
          >
            <div className="flex aspect-[4/5] w-full items-center justify-center">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-zinc-500">{label}</div>
                <div className="mt-2 font-mono text-zinc-400">Coming Soon</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
