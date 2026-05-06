import { asset } from '../lib/asset.js';
import { accentChipStyle } from '../lib/colors.js';

// Premium dark-cinematic gallery for project case studies. Each item
// alternates between left-aligned and right-aligned, with a large
// floating sketch card and an editorial caption block beside it.
//
// Items shape:
//   {
//     src: 'media/01-name.jpg',
//     tag: 'Hypercar Exploration',
//     title: 'Sketch title',
//     caption: 'Long-form description.',
//   }

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

              {/* Index marker, top-right — accent-tinted */}
              <span
                className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-md"
                style={accentChipStyle(accent)}
              >
                <span
                  className="inline-block h-1 w-1 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                {String(i + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </span>
            </figure>

            <div className="md:w-[42%] md:px-2">
              {/* Compact accent-tinted tag chip — same colour as the project key */}
              <span
                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.22em]"
                style={accentChipStyle(accent)}
              >
                {item.tag}
              </span>
              {/* Title — sized between the hero and the secondary copy */}
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white sm:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-300/90">
                {item.caption}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
