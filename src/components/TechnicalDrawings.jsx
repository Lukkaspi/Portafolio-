import { useState } from 'react';
import { asset } from '../lib/asset.js';
import { hexToRgba } from '../lib/colors.js';

// Premium technical-drawing viewer for the Technical Drawings project.
// Renders a series of grouped engineering plates as inline PDF panels —
// each panel has a CAD-inspired header bar with monospace label, a
// "expand" toggle that swaps between a compact preview height and a
// near-full-screen viewer, and an "Open ↗" link that opens the original
// PDF in a new tab for native zoom / print / save.
//
// Data shape:
//   project.drawings = {
//     groups: [
//       {
//         key, title, kicker, description?,
//         items: [
//           { title, subtitle?, file: 'media/.../foo.pdf' }
//         ]
//       }
//     ]
//   }

export default function TechnicalDrawings({ groups, accent = '#0ea5e9' }) {
  if (!groups || groups.length === 0) return null;
  return (
    <div className="space-y-20 md:space-y-24">
      {groups.map((g, gi) => (
        <Group key={g.key} group={g} index={gi} accent={accent} />
      ))}
    </div>
  );
}

function Group({ group, index, accent }) {
  const showHeader = !!group.title;
  const itemKicker = group.itemKicker ?? 'Plan';

  return (
    <section className="anim-fade-up">
      {showHeader && (
        <header className="md:max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase leading-none tracking-[0.3em] text-zinc-500">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <span
              className="h-px w-10"
              style={{ background: hexToRgba(accent, 0.55) }}
            />
            {group.kicker && <span style={{ color: accent }}>{group.kicker}</span>}
            <span className="text-zinc-600">·</span>
            <span>
              {String(group.items.length).padStart(2, '0')}{' '}
              {group.items.length === 1 ? 'document' : 'plans'}
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.02em] text-white sm:text-4xl">
            {group.title}
          </h2>
          {group.description && (
            <p className="mt-3 text-sm leading-relaxed text-zinc-300/85 sm:text-base">
              {group.description}
            </p>
          )}
        </header>
      )}

      <div className={`${showHeader ? 'mt-8' : ''} grid grid-cols-1 gap-5 md:gap-7`}>
        {group.items.map((item, ii) => (
          <DrawingPanel
            key={item.file}
            item={item}
            index={ii + 1}
            accent={accent}
            kicker={itemKicker}
            stamp={group.stamp ?? 'DIRT · DRAWING'}
          />
        ))}
      </div>
    </section>
  );
}

function DrawingPanel({ item, index, accent, kicker = 'Plan', stamp = 'DIRT · DRAWING' }) {
  const [expanded, setExpanded] = useState(false);
  const url = asset(item.file);

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/60 backdrop-blur-md"
      style={{
        // Subtle CAD grid behind the header — reads as engineering paper.
        backgroundImage:
          `linear-gradient(180deg, ${hexToRgba(accent, 0.04)} 0%, transparent 8%),` +
          `repeating-linear-gradient(0deg, transparent 0, transparent 11px, ${hexToRgba(
            accent,
            0.03
          )} 12px, transparent 13px)`,
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/5 bg-ink-900/70 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3 overflow-hidden">
          <span
            className="font-mono text-[10px] font-medium uppercase leading-none tracking-[0.3em]"
            style={{ color: accent }}
          >
            {kicker} · {String(index).padStart(2, '0')}
          </span>
          <span
            className="h-3 w-px"
            style={{ background: hexToRgba(accent, 0.4) }}
          />
          <span className="truncate text-[13px] font-medium leading-none text-white">
            {item.title}
          </span>
          {item.subtitle && (
            <span className="hidden truncate font-mono text-[10px] uppercase leading-none tracking-[0.22em] text-zinc-500 sm:inline">
              · {item.subtitle}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="hidden items-center gap-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.22em] text-zinc-400 transition hover:text-white sm:inline-flex"
          >
            {expanded ? 'Collapse' : 'Expand'}
            <span aria-hidden>{expanded ? '−' : '+'}</span>
          </button>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase leading-none tracking-[0.22em] text-zinc-400 transition hover:text-white"
          >
            Open
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      {/* PDF viewer */}
      <div className="bg-zinc-200/95">
        <iframe
          src={`${url}#view=FitH&toolbar=1&navpanes=0&statusbar=0`}
          title={item.title}
          loading="lazy"
          className="block w-full border-0 transition-[height] duration-500 ease-out"
          style={{ height: expanded ? '92vh' : '70vh' }}
        />
      </div>

      {/* Subtle bottom corner detail */}
      <div className="absolute bottom-3 right-4 font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-500/60">
        {stamp}
      </div>
    </article>
  );
}
