// Per-project visual styling for the 3D keycaps.
// `body`     — keycap body color. Unified navy across all projects so the
//              keyboard reads as a single console that visually integrates
//              with the dark navy hero background. The unique colour comes
//              from the cap face engraving and the emissive accent.
// `accent`   — vibrant hue per project. Used for emissive glow on hover,
//              the under-cap rim, and the engraved cap face graphic.
// `cap`      — texture path for the top face (in /public, no leading slash).
//
// Coming-Soon keys ignore all of this and keep the generic graphite look.

// Shared deep-navy body so the keyboard sits inside the hero gradient
// without looking like a separate floating slab of pure black plastic.
export const NAVY_BODY = '#0e1a2e';

export const keyStyles = {
  cupra: {
    body: NAVY_BODY,
    accent: '#f97316', // orange — CUPRA copper energy
    cap: 'images/keycaps/cupra.svg',
  },
  'car-sketches': {
    body: NAVY_BODY,
    accent: '#ec4899', // pink — creative / sketch ink
    cap: 'images/keycaps/car-sketches.svg',
  },
  'microplastics-filter': {
    body: NAVY_BODY,
    accent: '#14b8a6', // teal — water / filtration
    cap: 'images/keycaps/microplastics-filter.svg',
  },
  aparcat: {
    body: NAVY_BODY,
    accent: '#22c55e', // emerald — urban / parking
    cap: 'images/keycaps/aparcat.svg',
  },
  'uab-hackathon': {
    body: NAVY_BODY,
    accent: '#ef4444', // red — UAB
    cap: 'images/keycaps/uab-hackathon.svg',
  },
  'university-sheets': {
    body: NAVY_BODY,
    accent: '#f59e0b', // amber — paper / academic
    cap: 'images/keycaps/university-sheets.svg',
  },
  'technical-drawings': {
    body: NAVY_BODY,
    accent: '#0ea5e9', // sky — blueprint
    cap: 'images/keycaps/technical-drawings.svg',
  },
  'intercom-study': {
    body: NAVY_BODY,
    accent: '#a78bfa', // violet — audio / electronic
    cap: 'images/keycaps/intercom-study.svg',
  },
  'urn-packaging': {
    body: NAVY_BODY,
    accent: '#94a3b8', // slate — memorial / cork-stone
    cap: 'images/keycaps/urn-packaging.svg',
  },
  'dam-beverage': {
    body: NAVY_BODY,
    accent: '#eab308', // yellow — gold beverage
    cap: 'images/keycaps/dam-beverage.svg',
  },
};
