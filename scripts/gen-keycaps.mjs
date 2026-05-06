// Generates one square keycap SVG per project, each visually echoing the
// brand or aesthetic of the project. SVGs are 512×512 and painted directly
// onto the top face of the 3D keycap as a texture.
//
// Run: node scripts/gen-keycaps.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const out = resolve(__dirname, '..', 'public', 'images', 'keycaps');
mkdirSync(out, { recursive: true });

const SIZE = 512;

// Helper: a recurring "PORTFOLIO_" micro-engraving on every cap.
const microMark = (color) => `
  <text x="32" y="${SIZE - 28}" font-family="JetBrains Mono, ui-monospace, monospace"
        font-size="14" letter-spacing="2" fill="${color}" opacity="0.45">PORTFOLIO_</text>
`;

const wrap = (body, bg) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">
  <rect width="${SIZE}" height="${SIZE}" fill="${bg}"/>
  ${body}
</svg>
`;

// 1. CUPRA — copper triangle mark + wordmark
const cupra = wrap(`
  <defs>
    <linearGradient id="cgrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#c75a2a"/>
      <stop offset="1" stop-color="#7a2f10"/>
    </linearGradient>
  </defs>
  <!-- Stylised CUPRA-style triangular C mark, centred -->
  <g transform="translate(${SIZE / 2}, ${SIZE / 2 - 30})">
    <path d="M -90 -70 L 90 -70 L 50 0 L 90 70 L -90 70 L -50 0 Z"
          fill="none" stroke="url(#cgrad)" stroke-width="14" stroke-linejoin="round"/>
    <path d="M -50 0 L 50 0" stroke="url(#cgrad)" stroke-width="14" stroke-linecap="round"/>
  </g>
  <text x="${SIZE / 2}" y="${SIZE - 80}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="44"
        font-weight="800" letter-spacing="14" fill="#e8caa8">CUPRA</text>
  ${microMark('#c75a2a')}
`, '#1a0d07');

// 2. Car Sketches — pencil-line car silhouette
const carSketches = wrap(`
  <g stroke="#e8c890" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="0.95">
    <!-- Loose 3/4-front car silhouette -->
    <path d="M 70 320 C 110 240, 180 200, 270 200 L 360 200 C 410 200, 440 230, 450 270 L 460 320"/>
    <path d="M 80 320 L 460 320"/>
    <circle cx="160" cy="330" r="34"/>
    <circle cx="380" cy="330" r="34"/>
    <path d="M 200 240 L 270 230 L 350 240" opacity="0.6"/>
    <!-- A few sketchy under-strokes -->
    <path d="M 60 360 L 470 360" opacity="0.25"/>
    <path d="M 100 380 L 440 380" opacity="0.18"/>
  </g>
  <text x="${SIZE / 2}" y="120" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="34"
        font-weight="700" letter-spacing="6" fill="#e8c890">SKETCHES</text>
  ${microMark('#d6a874')}
`, '#26221b');

// 3. Microplastics Filter — concentric mesh + droplet
const microplastics = wrap(`
  <g stroke="#4dd2c2" stroke-width="2" fill="none" opacity="0.85">
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="40"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="80"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="120"/>
    <circle cx="${SIZE / 2}" cy="${SIZE / 2 - 10}" r="160"/>
  </g>
  <!-- Mesh hatch -->
  <g stroke="#4dd2c2" stroke-width="1.2" opacity="0.3">
    <path d="M 100 ${SIZE / 2 - 10} L 412 ${SIZE / 2 - 10}"/>
    <path d="M ${SIZE / 2} 100 L ${SIZE / 2} 410"/>
    <path d="M 130 130 L 382 382"/>
    <path d="M 382 130 L 130 382"/>
  </g>
  <!-- Water droplet -->
  <path d="M ${SIZE / 2} 150
           C ${SIZE / 2 + 36} 200, ${SIZE / 2 + 36} 240, ${SIZE / 2} 250
           C ${SIZE / 2 - 36} 240, ${SIZE / 2 - 36} 200, ${SIZE / 2} 150 Z"
        fill="#4dd2c2" opacity="0.85"/>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="28"
        font-weight="700" letter-spacing="6" fill="#bdf6ee">μFIBER · 50 μm</text>
  ${microMark('#4dd2c2')}
`, '#08151a');

// 4. Aparca't — bold "P" with parking corner marks
const aparcat = wrap(`
  <g>
    <rect x="120" y="100" width="272" height="312" rx="44"
          fill="none" stroke="#52d27e" stroke-width="6" opacity="0.6"/>
    <text x="${SIZE / 2}" y="${SIZE / 2 + 60}" text-anchor="middle"
          font-family="Inter, system-ui, sans-serif" font-size="320"
          font-weight="800" fill="#52d27e">P</text>
  </g>
  <!-- Corner brackets -->
  <g stroke="#52d27e" stroke-width="4" fill="none" opacity="0.85">
    <path d="M 50 50 L 90 50 M 50 50 L 50 90"/>
    <path d="M 462 50 L 422 50 M 462 50 L 462 90"/>
    <path d="M 50 462 L 90 462 M 50 462 L 50 422"/>
    <path d="M 462 462 L 422 462 M 462 462 L 462 422"/>
  </g>
  <text x="${SIZE / 2}" y="${SIZE - 60}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="28"
        font-weight="700" letter-spacing="8" fill="#9becba">APARCA'T</text>
  ${microMark('#52d27e')}
`, '#0c1a13');

// 5. UAB Hackathon — angular "UAB" + hash
const uab = wrap(`
  <text x="${SIZE / 2}" y="${SIZE / 2 + 30}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="180"
        font-weight="900" letter-spacing="-4" fill="#e63946">UAB</text>
  <g stroke="#e63946" stroke-width="6" stroke-linecap="round" opacity="0.9">
    <!-- Hash mark -->
    <path d="M 110 ${SIZE / 2 + 90} L 90 ${SIZE / 2 + 150}"/>
    <path d="M 160 ${SIZE / 2 + 90} L 140 ${SIZE / 2 + 150}"/>
    <path d="M 80 ${SIZE / 2 + 110} L 170 ${SIZE / 2 + 110}"/>
    <path d="M 80 ${SIZE / 2 + 130} L 170 ${SIZE / 2 + 130}"/>
  </g>
  <text x="${SIZE - 32}" y="${SIZE / 2 + 150}" text-anchor="end"
        font-family="JetBrains Mono, monospace" font-size="22"
        letter-spacing="3" fill="#ffb3b9" opacity="0.9">HACK 23 · 24</text>
  ${microMark('#e63946')}
`, '#1a0d10');

// 6. University Sheets — ruled paper
const sheets = wrap(`
  <g stroke="#f1e3c2" stroke-width="1.5" opacity="0.55">
    ${Array.from({ length: 18 }, (_, i) => {
      const y = 80 + i * 22;
      return `<path d="M 60 ${y} L ${SIZE - 60} ${y}"/>`;
    }).join('\n')}
  </g>
  <line x1="92" y1="40" x2="92" y2="${SIZE - 60}" stroke="#e89090" stroke-width="2" opacity="0.7"/>
  <text x="${SIZE / 2 + 30}" y="${SIZE - 80}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="34"
        font-weight="700" letter-spacing="6" fill="#f1e3c2">SHEETS · A3</text>
  ${microMark('#f1e3c2')}
`, '#1a1814');

// 7. Technical Drawings — blueprint crosshair + dimension lines
const technical = wrap(`
  <!-- Blueprint grid -->
  <g stroke="#5b9eff" stroke-width="1" opacity="0.18">
    ${Array.from({ length: 12 }, (_, i) => {
      const v = (i + 1) * 40;
      return `<path d="M ${v} 0 L ${v} ${SIZE}"/><path d="M 0 ${v} L ${SIZE} ${v}"/>`;
    }).join('\n')}
  </g>
  <!-- Centered crosshair / view -->
  <g stroke="#5b9eff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity="0.95">
    <circle cx="${SIZE / 2}" cy="${SIZE / 2}" r="100"/>
    <path d="M ${SIZE / 2 - 130} ${SIZE / 2} L ${SIZE / 2 + 130} ${SIZE / 2}"/>
    <path d="M ${SIZE / 2} ${SIZE / 2 - 130} L ${SIZE / 2} ${SIZE / 2 + 130}"/>
    <!-- Dimension lines top -->
    <path d="M ${SIZE / 2 - 100} 110 L ${SIZE / 2 + 100} 110"/>
    <path d="M ${SIZE / 2 - 100} 100 L ${SIZE / 2 - 100} 120"/>
    <path d="M ${SIZE / 2 + 100} 100 L ${SIZE / 2 + 100} 120"/>
  </g>
  <text x="${SIZE / 2}" y="92" text-anchor="middle"
        font-family="JetBrains Mono, monospace" font-size="22"
        letter-spacing="3" fill="#bcd5ff">200.0 ±0.05</text>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="26"
        font-weight="700" letter-spacing="6" fill="#bcd5ff">ISO · GD&amp;T</text>
  ${microMark('#5b9eff')}
`, '#0a1220');

// 8. Intercom Study — speaker grille + control dot
const intercom = wrap(`
  <g fill="#9bb0c2">
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
  <!-- Push-to-call button -->
  <circle cx="${SIZE / 2}" cy="${SIZE - 110}" r="36" fill="#9bb0c2" opacity="0.95"/>
  <circle cx="${SIZE / 2}" cy="${SIZE - 110}" r="36" fill="none" stroke="#cfdce8" stroke-width="2"/>
  <text x="${SIZE / 2}" y="${SIZE - 50}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="22"
        font-weight="700" letter-spacing="6" fill="#cfdce8">CALL</text>
  ${microMark('#9bb0c2')}
`, '#16181c');

// 9. Urn Packaging — soft leaf / cork ring
const urn = wrap(`
  <g fill="none" stroke="#c9a872" stroke-width="2.5" opacity="0.85">
    <ellipse cx="${SIZE / 2}" cy="${SIZE / 2}" rx="150" ry="90"/>
    <ellipse cx="${SIZE / 2}" cy="${SIZE / 2}" rx="120" ry="72" opacity="0.55"/>
    <ellipse cx="${SIZE / 2}" cy="${SIZE / 2}" rx="90" ry="54" opacity="0.35"/>
  </g>
  <!-- Centred leaf -->
  <path d="M ${SIZE / 2} ${SIZE / 2 - 50}
           C ${SIZE / 2 + 50} ${SIZE / 2 - 30}, ${SIZE / 2 + 30} ${SIZE / 2 + 40}, ${SIZE / 2} ${SIZE / 2 + 50}
           C ${SIZE / 2 - 30} ${SIZE / 2 + 40}, ${SIZE / 2 - 50} ${SIZE / 2 - 30}, ${SIZE / 2} ${SIZE / 2 - 50} Z"
        fill="#c9a872" opacity="0.85"/>
  <path d="M ${SIZE / 2} ${SIZE / 2 - 40} L ${SIZE / 2} ${SIZE / 2 + 40}" stroke="#1a1612" stroke-width="2"/>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="24"
        font-weight="700" letter-spacing="6" fill="#e8d2a6">COMPOSTABLE</text>
  ${microMark('#c9a872')}
`, '#1a1612');

// 10. DAM Beverage — gold bottle silhouette + DAMM-ish wordmark
const dam = wrap(`
  <!-- Bottle silhouette -->
  <g fill="#d4af37">
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
  <rect x="${SIZE / 2 - 50}" y="240" width="100" height="100" fill="#1a0c08" opacity="0.92"/>
  <text x="${SIZE / 2}" y="305" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="38"
        font-weight="900" letter-spacing="6" fill="#d4af37">DAM</text>
  <text x="${SIZE / 2}" y="${SIZE - 70}" text-anchor="middle"
        font-family="Inter, system-ui, sans-serif" font-size="20"
        font-weight="700" letter-spacing="8" fill="#f0d790">SESSIONABLE 0.0</text>
  ${microMark('#d4af37')}
`, '#14090a');

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
