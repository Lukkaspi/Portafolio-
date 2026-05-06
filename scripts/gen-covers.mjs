// One-shot generator for placeholder cover SVGs.
// Run: node scripts/gen-covers.mjs
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

const svg = ({ title, tag, accent }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0c10"/>
      <stop offset="1" stop-color="#11141a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.78" cy="0.18" r="0.6">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.55"/>
      <stop offset="1" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#grid)"/>
  <rect width="1600" height="1000" fill="url(#glow)"/>
  <g font-family="Inter, system-ui, sans-serif" fill="#f5f5f7">
    <text x="80" y="160" font-size="28" letter-spacing="6" fill="rgba(255,255,255,0.55)" font-weight="500">${tag.toUpperCase()}</text>
    <text x="80" y="320" font-size="120" font-weight="700" letter-spacing="-3">${title}</text>
    <text x="80" y="940" font-size="22" letter-spacing="3" fill="rgba(255,255,255,0.4)" font-weight="500">PORTFOLIO · INDUSTRIAL DESIGN</text>
  </g>
  <g stroke="${accent}" stroke-width="2" fill="none" opacity="0.7">
    <line x1="80" y1="380" x2="320" y2="380"/>
  </g>
</svg>
`;

for (const p of projects) {
  const dir = resolve(root, 'public/images/projects', p.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(resolve(dir, 'cover.svg'), svg(p));
  console.log('wrote', p.slug);
}
