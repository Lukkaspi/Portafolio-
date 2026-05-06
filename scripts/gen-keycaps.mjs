// Generates one square keycap SVG per project. Each cap echoes the project's
// theme using a single vibrant accent on a unified deep-navy ground that
// matches the dark hero background and keyboard body color.
//
// Run: node scripts/gen-keycaps.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'images', 'keycaps');
mkdirSync(out, { recursive: true });

const SIZE = 512;

// Shared cap background — same deep navy as the keyboard body and hero base.
const BG = '#0e1a2e';

// Recurring "PORTFOLIO_" micro-engraving on every cap, in the cap's accent.
const microMark = (color) => `
  <text x="32" y="${SIZE - 28}" font-family="JetBrains Mono, ui-monospace, monospace"
        font-size="14" letter-spacing="2" fill="${color}" opacity="0.5">PORTFOLIO_</text>
`;

// A subtle accent glow in the upper-right corner of every cap, ties the
// engraving back to the body emissive when keys are hovered.
const cornerGlow = (color) => `
  <radialGradient id="g-${color.replace('#', '')}" cx="0.85" cy="0.15" r="0.55">
    <stop offset="0" stop-color="${color}" stop-opacity="0.32"/>
    <stop offset="1" stop-color="${color}" stop-opacity="0"/>
  </radialGradient>
`;

const wrap = (body, accent) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <defs>
    ${cornerGlow(accent)}
  </defs>
  <rect width="${SIZE}" height="${SIZE}" fill="${BG}"/>
  <rect width="${SIZE}" height="${SIZE}" fill="url(#g-${accent.replace('#', '')})"/>
  ${body}
</svg>
`;

// Tonal helpers
const fade = (hex, alpha) => {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

// =============== Cap designs ===============

// 1. CUPRA — orange-copper. Triangular C-mark + wordmark.
const ACC_CUPRA = '#f97316';
const cupra = wrap(`
  <g transform="translate(${SIZE / 2}, ${SIZE / 2 - 30})">
    <path d="M -90 -70 L 90 -70 L 50 0 L 90 70 L -90 70 L -50 0 Z"
          fill="none" stroke="${ACC_CUPRA}" stroke-width="14" stroke-linejoin="round"/>
    <path d="M -50 0 L 50 0" stroke="${ACC_CUPRA}" stroke-width="14" stroke-linecap="round"/>
  </g>
  <text x="${SIZE / 2}" y="${SIZE - 80}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="44"
        font-weight="800" letter-spacing="14" fill="${ACC_CUPRA}">CUPRA</text>
  ${microMark(ACC_CUPRA)}
`, ACC_CUPRA);

// 2. Car Sketches — pink. Loose car silhouette in pencil-style strokes.
const ACC_SKETCH = '#ec4899';
const carSketches = wrap(`
  <g stroke="${ACC_SKETCH}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <path d="M 70 320 C 110 240, 180 200, 270 200 L 360 200 C 410 200, 440 230, 450 270 L 460 320"/>
    <path d="M 80 320 L 460 320"/>
    <circle cx="160" cy="330" r="34"/>
    <circle cx="380" cy="330" r="34"/>
    <path d="M 200 240 L 270 230 L 350 240" opacity="0.6"/>
    <path d="M 60 360 L 470 360" opacity="0.25"/>
    <path d="M 100 380 L 440 380" opacity="0.18"/>
  </g>
  <text x="${SIZE / 2}" y="120" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="34"
        font-weight="700" letter-spacing="6" fill="${ACC_SKETCH}">SKETCHES</text>
  ${microMark(ACC_SKETCH)}
`, ACC_SKETCH);

// 3. Microplastics Filter — teal. Concentric mesh + droplet.
const ACC_FILTER = '#14b8a6';
const microplastics = wrap(`
  <g stroke="${ACC_FILTER}" stroke-width="2" fill="none" opacity="0.85">
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="40"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="80"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="120"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="160"/>
  </g>
  <g stroke="${ACC_FILTER}" stroke-width="1.2" opacity="0.3">
    <path d="M 100 ${SIZE / 2 - 10} L 412 ${SIZE / 2 - 10}"/>
    <path d="M ${SIZE / 2} 100 L ${SIZE / 2} 410"/>
    <path d="M 130 130 L 382 382"/>
    <path d="M 382 130 L 130 382"/>
  </g>
  <path d="M ${SIZE / 2} 150
           C ${SIZE / 2 + 36} 200, ${SIZE / 2 + 36} 240, ${SIZE / 2} 250
           C ${SIZE / 2 - 36} 240, ${SIZE / 2 - 36} 200, ${SIZE / 2} 150 Z"
        fill="${ACC_FILTER}" opacity="0.9"/>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="28"
        font-weight="700" letter-spacing="6" fill="${ACC_FILTER}">μFIBER · 50 μm</text>
  ${microMark(ACC_FILTER)}
`, ACC_FILTER);

// 4. Aparca't — emerald. Bold "P" with parking corner brackets.
const ACC_APARCAT = '#22c55e';
const aparcat = wrap(`
  <g>
    <rect x="120" y="100" width="272" height="312" rx="44"
          fill="none" stroke="${ACC_APARCAT}" stroke-width="6" opacity="0.6"/>
    <text x="${SIZE / 2}" y="${SIZE / 2 + 60}" text-anchor="middle"
          font-family="Inter, system-ui, sans-serif" font-size="320"
          font-weight="800" fill="${ACC_APARCAT}">P</text>
  </g>
  <g stroke="${ACC_APARCAT}" stroke-width="4" fill="none" opacity="0.85">
    <path d="M 50 50 L 90 50 M 50 50 L 50 90"/>
    <path d="M 462 50 L 422 50 M 462 50 L 462 90"/>
    <path d="M 50 462 L 90 462 M 50 462 L 50 422"/>
    <path d="M 462 462 L 422 462 M 462 462 L 462 422"/>
  </g>
  <text x="${SIZE / 2}" y="${SIZE - 60}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="28"
        font-weight="700" letter-spacing="8" fill="${ACC_APARCAT}">APARCA'T</text>
  ${microMark(ACC_APARCAT)}
`, ACC_APARCAT);

// 5. UAB Hackathon — red. Big "UAB" + hash + edition mark.
const ACC_UAB = '#ef4444';
const uab = wrap(`
  <text x="${SIZE / 2}" y="${SIZE / 2 + 30}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="180"
        font-weight="900" letter-spacing="-4" fill="${ACC_UAB}">UAB</text>
  <g stroke="${ACC_UAB}" stroke-width="6" stroke-linecap="round" opacity="0.9">
    <path d="M 110 ${SIZE / 2 + 90} L 90 ${SIZE / 2 + 150}"/>
    <path d="M 160 ${SIZE / 2 + 90} L 140 ${SIZE / 2 + 150}"/>
    <path d="M 80 ${SIZE / 2 + 110} L 170 ${SIZE / 2 + 110}"/>
    <path d="M 80 ${SIZE / 2 + 130} L 170 ${SIZE / 2 + 130}"/>
  </g>
  <text x="${SIZE - 32}" y="${SIZE / 2 + 150}" text-anchor="end"
        font-family="JetBrains Mono, monospace" font-size="22"
        letter-spacing="3" fill="${ACC_UAB}" opacity="0.9">HACK 23 · 24</text>
  ${microMark(ACC_UAB)}
`, ACC_UAB);

// 6. University Sheets — amber. Ruled-paper engraving.
const ACC_SHEETS = '#f59e0b';
const sheets = wrap(`
  <g stroke="${ACC_SHEETS}" stroke-width="1.5" opacity="0.55">
    ${Array.from({ length: 18 }, (_, i) => {
      const y = 80 + i * 22;
      return `<path d="M 60 ${y} L ${SIZE - 60} ${y}"/>`;
    }).join('\n')}
  </g>
  <line x1="92" y1="40" x2="92" y2="${SIZE - 60}" stroke="${ACC_UAB}" stroke-width="2" opacity="0.55"/>
  <text x="${SIZE / 2 + 30}" y="${SIZE - 80}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="34"
        font-weight="700" letter-spacing="6" fill="${ACC_SHEETS}">SHEETS · A3</text>
  ${microMark(ACC_SHEETS)}
`, ACC_SHEETS);

// 7. Technical Drawings — sky. Blueprint crosshair + dimension lines.
const ACC_TECH = '#0ea5e9';
const technical = wrap(`
  <g stroke="${ACC_TECH}" stroke-width="1" opacity="0.18">
    ${Array.from({ length: 12 }, (_, i) => {
      const v = (i + 1) * 40;
      return `<path d="M ${v} 0 L ${v} ${SIZE}"/><path d="M 0 ${v} L ${SIZE} ${v}"/>`;
    }).join('\n')}
  </g>
  <g stroke="${ACC_TECH}" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.95">
    <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="100"/>
    <path d="M ${SIZE / 2 - 130} ${SIZE / 2} L ${SIZE / 2 + 130} ${SIZE / 2}"/>
    <path d="M ${SIZE / 2} ${SIZE / 2 - 130} L ${SIZE / 2} ${SIZE / 2 + 130}"/>
    <path d="M ${SIZE / 2 - 100} 110 L ${SIZE / 2 + 100} 110"/>
    <path d="M ${SIZE / 2 - 100} 100 L ${SIZE / 2 - 100} 120"/>
    <path d="M ${SIZE / 2 + 100} 100 L ${SIZE / 2 + 100} 120"/>
  </g>
  <text x="${SIZE / 2}" y="92" text-anchor="middle"
        font-family="JetBrains Mono, monospace" font-size="22"
        letter-spacing="3" fill="${ACC_TECH}">200.0 ±0.05</text>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="26"
        font-weight="700" letter-spacing="6" fill="${ACC_TECH}">ISO · GD&amp;T</text>
  ${microMark(ACC_TECH)}
`, ACC_TECH);

// 8. Intercom Study — violet. Speaker grille + push-to-call button.
const ACC_INTERCOM = '#a78bfa';
const intercom = wrap(`
  <g fill="${ACC_INTERCOM}">
    ${(() => {
      const dots = [];
      const cx = SIZE / 2;
      const cy = SIZE / 2 - 40;
      for (let r = 0; r < 6; r++) {
        const radius = 30 + r * 30;
        const count = 6 + r * 6;
        for (let i = 0; i < count; i++) {
          const a = (i / count) * Math.PI * 2;
          const x = cx + Math.cos(a) * radius;
          const y = cy + Math.sin(a) * radius;
          dots.push(`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.4" opacity="${0.85 - r * 0.1}"/>`);
        }
      }
      return dots.join('');
    })()}
  </g>
  <circle cx="${SIZE / 2}" cy="${SIZE - 110}" r="36" fill="${ACC_INTERCOM}" opacity="0.95"/>
  <circle cx="${SIZE / 2}" cy="${SIZE - 110}" r="36" fill="none" stroke="${ACC_INTERCOM}" stroke-width="2"/>
  <text x="${SIZE / 2}" y="${SIZE - 50}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="22"
        font-weight="700" letter-spacing="6" fill="${ACC_INTERCOM}">CALL</text>
  ${microMark(ACC_INTERCOM)}
`, ACC_INTERCOM);

// 9. Urn Packaging — slate. Soft rings + leaf, respectful palette.
const ACC_URN = '#94a3b8';
const urn = wrap(`
  <g fill="none" stroke="${ACC_URN}" stroke-width="2.5" opacity="0.85">
    <ellipse cx="${SIZE / 2}" cy="${SIZE / 2}" rx="150" ry="90"/>
    <ellipse cx="${SIZE / 2}" cy="${SIZE / 2}" rx="120" ry="72" opacity="0.55"/>
    <ellipse cx="${SIZE / 2}" cy="${SIZE / 2}" rx="90" ry="54" opacity="0.35"/>
  </g>
  <path d="M ${SIZE / 2} ${SIZE / 2 - 50}
           C ${SIZE / 2 + 50} ${SIZE / 2 - 30}, ${SIZE / 2 + 30} ${SIZE / 2 + 40}, ${SIZE / 2} ${SIZE / 2 + 50}
           C ${SIZE / 2 - 30} ${SIZE / 2 + 40}, ${SIZE / 2 - 50} ${SIZE / 2 - 30}, ${SIZE / 2} ${SIZE / 2 - 50} Z"
        fill="${ACC_URN}" opacity="0.85"/>
  <path d="M ${SIZE / 2} ${SIZE / 2 - 40} L ${SIZE / 2} ${SIZE / 2 + 40}" stroke="${BG}" stroke-width="2"/>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="24"
        font-weight="700" letter-spacing="6" fill="${ACC_URN}">COMPOSTABLE</text>
  ${microMark(ACC_URN)}
`, ACC_URN);

// 10. DAM Beverage — gold yellow. Bottle silhouette + wordmark.
const ACC_DAM = '#eab308';
const dam = wrap(`
  <g fill="${ACC_DAM}">
    <path d="M ${SIZE / 2 - 22} 90
             L ${SIZE / 2 + 22} 90
             L ${SIZE / 2 + 22} 150
             C ${SIZE / 2 + 22} 170, ${SIZE / 2 + 60} 180, ${SIZE / 2 + 60} 230
             L ${SIZE / 2 + 60} 380
             C ${SIZE / 2 + 60} 410, ${SIZE / 2 + 40} 430, ${SIZE / 2} 430
             C ${SIZE / 2 - 40} 430, ${SIZE / 2 - 60} 410, ${SIZE / 2 - 60} 380
             L ${SIZE / 2 - 60} 230
             C ${SIZE / 2 - 60} 180, ${SIZE / 2 - 22} 170, ${SIZE / 2 - 22} 150 Z"
          opacity="0.9"/>
  </g>
  <rect x="${SIZE / 2 - 50}" y="240" width="100" height="100" fill="${BG}" opacity="0.92"/>
  <text x="${SIZE / 2}" y="305" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="38"
        font-weight="900" letter-spacing="6" fill="${ACC_DAM}">DAM</text>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="20"
        font-weight="700" letter-spacing="8" fill="${ACC_DAM}">SESSIONABLE 0.0</text>
  ${microMark(ACC_DAM)}
`, ACC_DAM);

const files = {
  'cupra.svg': cupra,
  'car-sketches.svg': carSketches,
  'microplastics-filter.svg': microplastics,
  'aparcat.svg': aparcat,
  'uab-hackathon.svg': uab,
  'university-sheets.svg': sheets,
  'technical-drawings.svg': technical,
  'intercom-study.svg': intercom,
  'urn-packaging.svg': urn,
  'dam-beverage.svg': dam,
};

for (const [name, content] of Object.entries(files)) {
  writeFileSync(resolve(out, name), content);
  console.log('wrote', name);
}
