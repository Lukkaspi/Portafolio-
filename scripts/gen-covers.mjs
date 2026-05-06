// One-shot generator for placeholder cover SVGs.
// Run: node scripts/gen-covers.mjs
//
// SVGs are 4:5 portrait so they fit the mobile-grid card aspect-ratio
// without clipping. Title is rendered with auto line-break helper that
// splits long titles across two lines.
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const projects = [
  { slug: 'cupra', title: 'CUPRA Concept Car', tag: 'Automotive · Concept', accent: '#c75a2a' },
  { slug: 'car-sketches', title: 'Car Sketches', tag: 'Sketching', accent: '#7c5cff' },
  { slug: 'microplastics-filter', title: 'Microplastics Filter', tag: 'Sustainability · Product', accent: '#7c5cff' },
  { slug: 'aparcat', title: "Aparca't", tag: 'IoT · Urban', accent: '#7c5cff' },
  { slug: 'uab-hackathon', title: 'UAB Hackathon', tag: 'Hackathon · Innovation', accent: '#7c5cff' },
  { slug: 'university-sheets', title: 'University Sheets', tag: 'Academic · Documentation', accent: '#7c5cff' },
  { slug: 'technical-drawings', title: 'Technical Drawings', tag: 'CAD · Mechanical', accent: '#7c5cff' },
  { slug: 'intercom-study', title: 'Intercom Study', tag: 'UX · Hardware', accent: '#7c5cff' },
  { slug: 'urn-packaging', title: 'Urn Packaging', tag: 'Packaging · Memorial', accent: '#7c5cff' },
  { slug: 'dam-beverage', title: 'DAM Beverage', tag: 'Beverage · Packaging', accent: '#7c5cff' },
];

// Split a title into max two roughly-balanced lines if it is long.
function splitTitle(title, maxLineChars = 14) {
  if (title.length <= maxLineChars) return [title];
  const words = title.split(' ');
  if (words.length === 1) return [title];
  // greedy two-line split that balances length
  let best = { a: words[0], b: words.slice(1).join(' ') };
  let bestDiff = Math.abs(best.a.length - best.b.length);
  for (let i = 2; i < words.length; i++) {
    const a = words.slice(0, i).join(' ');
    const b = words.slice(i).join(' ');
    const d = Math.abs(a.length - b.length);
    if (d < bestDiff) {
      best = { a, b };
      bestDiff = d;
    }
  }
  return [best.a, best.b];
}

const svg = ({ title, tag, accent }) => {
  const lines = splitTitle(title);
  // title font size adapts to longest line so it always fits
  const longest = Math.max(...lines.map((l) => l.length));
  // viewBox is 1000x1250 (4:5). Available text width ≈ 880 (80 padding each side).
  // tune so the longest line fits horizontally.
  const fontSize = Math.min(150, Math.floor((880 / longest) * 1.6));
  const lineHeight = fontSize * 1.05;
  const totalH = lines.length * lineHeight;
  const startY = 1250 / 2 - totalH / 2 + fontSize * 0.85;

  const tspans = lines
    .map((line, i) => `<tspan x="80" dy="${i === 0 ? 0 : lineHeight}">${line}</tspan>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1250" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0c10"/>
      <stop offset="1" stop-color="#11141a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.12" r="0.7">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.1" cy="0.95" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.18"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0V44" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1000" height="1250" fill="url(#bg)"/>
  <rect width="1000" height="1250" fill="url(#grid)"/>
  <rect width="1000" height="1250" fill="url(#glow)"/>
  <rect width="1000" height="1250" fill="url(#glow2)"/>
  <g font-family="Inter, system-ui, sans-serif" fill="#f5f5f7">
    <text x="80" y="160" font-size="26" letter-spacing="6" fill="rgba(255,255,255,0.55)" font-weight="500">${tag.toUpperCase()}</text>
    <line x1="80" y1="195" x2="280" y2="195" stroke="${accent}" stroke-width="2" opacity="0.8"/>
    <text x="80" y="${startY}" font-size="${fontSize}" font-weight="700" letter-spacing="-2">${tspans}</text>
    <text x="80" y="1170" font-size="20" letter-spacing="3" fill="rgba(255,255,255,0.4)" font-weight="500">PORTFOLIO · INDUSTRIAL DESIGN</text>
  </g>
</svg>
`;
};

for (const p of projects) {
  const dir = resolve(root, 'public/images/projects', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'cover.svg'), svg(p));
  console.log('wrote', p.slug);
}
