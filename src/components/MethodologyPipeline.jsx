import { hexToRgba } from '../lib/colors.js';

// R&D / engineering pipeline. Renders a vertical timeline of methodology
// cards connected by a hairline rail in the project accent. Each card
// has a mono index, a title and a short paragraph — designed to read as
// a real industrial-design development workflow rather than a checklist.
//
// Data shape:
//   project.methodologies = [
//     { name: 'Briefing', body: '...' },
//     { name: 'Functional Analysis', body: '...' },
//     ...
//   ]

export default function MethodologyPipeline({ items, accent = '#7c5cff', label }) {
  if (!items || items.length === 0) return null;
  const total = items.length;

  return (
    <section className="anim-fade-up">
      <header className="md:max-w-3xl">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase leading-none tracking-[0.3em] text-zinc-500">
          <span style={{ color: accent }}>{label ?? 'Pipeline'}</span>
          <span
            className="h-px flex-1"
            style={{
              background: `linear-gradient(90deg, ${hexToRgba(accent, 0.55)} 0%, transparent 100%)`,
            }}
          />
          <span>
            {String(total).padStart(2, '0')} {total === 1 ? 'phase' : 'phases'}
          </span>
        </div>
        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
          Development Methodology
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-300/85 sm:text-base">
          The professional product-development workflow already running on the
          project. Each phase feeds the next — from brief through structured
          delivery.
        </p>
      </header>

      <ol className="relative mt-10 grid grid-cols-1 gap-4 md:gap-5">
        {/* Vertical rail — accent gradient line down the left side. */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-[19px] top-2 bottom-2 w-px"
          style={{
            background: `linear-gradient(180deg, ${hexToRgba(accent, 0.45)} 0%, ${hexToRgba(
              accent,
              0.05
            )} 100%)`,
          }}
        />

        {items.map((item, i) => (
          <li
            key={item.name}
            className="group relative pl-12"
          >
            {/* Connector dot */}
            <span
              aria-hidden
              className="absolute left-[14px] top-[18px] inline-block h-[10px] w-[10px] rounded-full ring-4 ring-ink-900"
              style={{
                background: accent,
                boxShadow: `0 0 12px ${hexToRgba(accent, 0.6)}`,
              }}
            />

            <article
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25 md:p-6"
              style={{
                backgroundImage: `linear-gradient(135deg, ${hexToRgba(accent, 0.05)} 0%, transparent 60%)`,
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.3em]"
                    style={{ color: accent }}
                  >
                    Phase · {String(i + 1).padStart(2, '0')}
                  </span>
                  {item.tag && (
                    <span className="font-mono text-[10px] uppercase leading-none tracking-[0.22em] text-zinc-500">
                      · {item.tag}
                    </span>
                  )}
                </div>
                <span
                  className="font-mono text-[9px] uppercase leading-none tracking-[0.3em] text-zinc-500/70"
                >
                  {String(i + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
              <h3 className="mt-3 text-lg font-semibold tracking-tight text-white sm:text-xl">
                {item.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300/85">
                {item.body}
              </p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
