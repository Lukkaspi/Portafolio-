import { asset } from '../lib/asset.js';

// Premium dark-cinematic gallery for project case studies. Each item
// alternates between left-aligned and right-aligned, with a large
// floating sketch card and an editorial caption block beside it.
//
// Items shape:
//   {
//     src: 'images/.../01-name.jpg',
//     tag: 'Hypercar Exploration',
//     title: 'Sketch title',
//     caption: 'Long-form description.',
//   }
//
// The gallery preserves the raw paper-and-pencil feel of the sketches
// by mounting them on a soft pearl card so the white paper doesn't
// fight the dark hero ground.

export default function ProjectGallery({ items, accent = '#7c5cff' }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="space-y-20 md:space-y-28">
      {items.map((item, i) => {
        const reversed = i % 2 === 1;
        return (
          <article
            key={item.src}
            className={`group flex flex-col items-center gap-6 md:gap-10 ${
              reversed ? 'md:flex-row-reverse' : 'md:flex-row'
            }`}
          >
            <figure
              className="relative w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-zinc-100 via-white to-zinc-200 p-4 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.65)] transition-all duration-500 ease-out md:w-[58%] md:p-6"
              style={{
                // Subtle accent rim that intensifies on hover.
                boxShadow:
                  '0 30px 80px -30px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06) inset',
              }}
            >
              {/* Accent halo — fades in on hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-1 -z-10 rounded-[28px] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                style={{ backgroundColor: accent }}
              />

              <img
                src={asset(item.src)}
                alt={item.title}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full select-none transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                draggable={false}
              />

              {/* Index marker, top-right */}
              <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/85 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-200 backdrop-blur-md">
                <span
                  className="inline-block h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </figure>

            <div className="md:w-[42%] md:px-2">
              <div
                className="text-[10px] font-semibold uppercase tracking-[0.3em]"
                style={{ color: accent }}
              >
                {item.tag}
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
                {item.caption}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
