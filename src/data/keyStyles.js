// Per-project visual styling for the 3D keycaps.
// `body`     — keycap body color (dark, brand-tinted)
// `accent`   — emissive glow & highlight color
// `cap`      — texture path for the top face (in /public, no leading slash)
// `wordmark` — optional fallback text rendered if the texture is missing
//
// Coming-Soon keys ignore all of this and keep the generic graphite look.

export const keyStyles = {
  cupra: {
    body: '#1a0d07',
    accent: '#c75a2a',
    cap: 'images/keycaps/cupra.svg',
  },
  'car-sketches': {
    body: '#26221b',
    accent: '#d6a874',
    cap: 'images/keycaps/car-sketches.svg',
  },
  'microplastics-filter': {
    body: '#08151a',
    accent: '#4dd2c2',
    cap: 'images/keycaps/microplastics-filter.svg',
  },
  aparcat: {
    body: '#0c1a13',
    accent: '#52d27e',
    cap: 'images/keycaps/aparcat.svg',
  },
  'uab-hackathon': {
    body: '#1a0d10',
    accent: '#e63946',
    cap: 'images/keycaps/uab-hackathon.svg',
  },
  'university-sheets': {
    body: '#1a1814',
    accent: '#f1e3c2',
    cap: 'images/keycaps/university-sheets.svg',
  },
  'technical-drawings': {
    body: '#0a1220',
    accent: '#5b9eff',
    cap: 'images/keycaps/technical-drawings.svg',
  },
  'intercom-study': {
    body: '#16181c',
    accent: '#9bb0c2',
    cap: 'images/keycaps/intercom-study.svg',
  },
  'urn-packaging': {
    body: '#1a1612',
    accent: '#c9a872',
    cap: 'images/keycaps/urn-packaging.svg',
  },
  'dam-beverage': {
    body: '#14090a',
    accent: '#d4af37',
    cap: 'images/keycaps/dam-beverage.svg',
  },
};
