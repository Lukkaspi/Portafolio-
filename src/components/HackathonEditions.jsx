import { hexToRgba, accentChipStyle } from '../lib/colors.js';

// Cyber-tech editorial section for the UAB Hackathon project. Renders:
//   1. Two glassmorphism edition cards (Caixa d'Enginyers · Deloitte) side
//      by side on desktop, stacked on mobile.
//   2. A technical stack block below — terminal-style tiles for each tech.
//
// The visual code: thin scanlines + corner-grid bg, monospaced kicker /
// status pulse / terminal cursor, accent-tinted hairlines and tags. Aimed
// at "real engineering challenge" rather than "student project page".

export default function HackathonEditions({ editions, stack, accent = '#ef4444' }) {
  return (
    <div className="space-y-12 md:space-y-16">
      {editions && editions.length > 0 && (
        <section>
          <SectionHeader
            kicker="Editions"
            value={`${String(editions.length).padStart(2, '0')} Partners`}
            accent={accent}
          />
          <div className="mt-7 grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            {editions.map((ed) => (
              <EditionCard key={ed.id} edition={ed} accent={accent} />
            ))}
          </div>
        </section>
      )}

      {stack && stack.length > 0 && (
        <section>
          <SectionHeader
            kicker="Stack"
            value={`${String(stack.length).padStart(2, '0')} Technologies`}
            accent={accent}
          />
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
            {stack.map((tech) => (
              <StackTile key={tech.name} tech={tech} accent={accent} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// --- Header ---------------------------------------------------------

function SectionHeader({ kicker, value, accent }) {
  return (
    <header className="flex items-center gap-4 font-mono text-[10px] uppercase leading-none tracking-[0.3em] text-zinc-500">
      <span>{kicker}</span>
      <span
        className="h-px flex-1"
        style={{ background: `linear-gradient(90deg, ${hexToRgba(accent, 0.55)} 0%, transparent 100%)` }}
      />
      <span style={{ color: accent }}>{value}</span>
    </header>
  );
}

// --- Edition card ---------------------------------------------------

function EditionCard({ edition, accent }) {
  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-800/40 p-6 backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/25 md:p-8"
      style={{
        backgroundImage:
          // Thin scanlines + diagonal accent glow in the top-left corner.
          `radial-gradient(120% 80% at 0% 0%, ${hexToRgba(accent, 0.10)} 0%, transparent 55%),` +
          `repeating-linear-gradient(0deg, transparent 0, transparent 31px, ${hexToRgba(
            accent,
            0.05
          )} 32px, transparent 33px)`,
      }}
    >
      {/* Soft glow halo on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-2xl opacity-0 blur-md transition-opacity duration-500 group-hover:opacity-50"
        style={{ background: hexToRgba(accent, 0.45) }}
      />

      {/* Top row: edition number + status pulse */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] uppercase leading-none tracking-[0.3em] text-zinc-500">
            Edition
          </div>
          <div className="mt-2 font-mono text-4xl font-semibold leading-none text-white">
            {edition.id}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="anim-blink inline-block h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 8px ${hexToRgba(accent, 0.7)}` }}
          />
          <span
            className="font-mono text-[10px] uppercase leading-none tracking-[0.3em]"
            style={{ color: accent }}
          >
            {edition.year}
          </span>
        </div>
      </div>

      {/* Industry partner */}
      <div className="mt-7 font-mono text-[10px] uppercase leading-none tracking-[0.3em] text-zinc-500">
        Industry Partner
      </div>
      <div className="mt-2 text-base font-semibold text-zinc-100 sm:text-lg">
        {edition.partner}
      </div>

      {/* Domain chip */}
      {edition.domain && (
        <div className="mt-2">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-[3px] text-[10px] font-medium uppercase leading-none tracking-[0.22em]"
            style={accentChipStyle(accent)}
          >
            {edition.domain}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="mt-6 text-xl font-semibold tracking-[-0.02em] text-white sm:text-2xl">
        {edition.title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-zinc-300/85">
        {edition.description}
      </p>

      {/* Tags row */}
      {edition.tags?.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-1.5">
          {edition.tags.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-md border px-2 py-[3px] font-mono text-[10px] uppercase leading-none tracking-[0.18em]"
              style={{
                borderColor: hexToRgba(accent, 0.35),
                backgroundColor: hexToRgba(accent, 0.05),
                color: hexToRgba(accent, 0.9),
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Scope hairline + terminal cursor */}
      {edition.scope?.length > 0 && (
        <div
          className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500"
          style={{ borderColor: hexToRgba(accent, 0.18) }}
        >
          {edition.scope.map((s, i) => (
            <span key={s} className="flex items-center gap-2">
              {i > 0 && <span className="opacity-30">·</span>}
              {s}
            </span>
          ))}
        </div>
      )}

      {/* Bottom-right terminal label */}
      <div
        className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.2em] text-zinc-500/70 opacity-60 transition-opacity group-hover:opacity-100"
      >
        [ chal_{edition.id} ]
      </div>
    </article>
  );
}

// --- Tech stack tile ------------------------------------------------

function StackTile({ tech, accent }) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-ink-800/40 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/25"
      style={{
        backgroundImage:
          `linear-gradient(135deg, ${hexToRgba(accent, 0.06)} 0%, transparent 60%)`,
      }}
    >
      <div className="flex items-center gap-2 font-mono text-[10px] uppercase leading-none tracking-[0.3em] text-zinc-500">
        <span style={{ color: accent }}>›</span>
        {tech.kind}
      </div>
      <div className="mt-3 text-2xl font-semibold leading-none tracking-[-0.02em] text-white">
        {tech.name}
      </div>
      {/* Corner notch */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 h-2 w-2 rounded-full opacity-50"
        style={{ background: hexToRgba(accent, 0.7), boxShadow: `0 0 6px ${hexToRgba(accent, 0.6)}` }}
      />
    </div>
  );
}
