// Animated vertical separator: a Pac-Man chomps its way down a column of
// dots, then loops. CSS keyframes do the heavy lifting; SVG `<animate>`
// drives the mouth open/close so we get the iconic chomp without JS frames.
//
// Geometry:
//   - Pac-Man is 32×32px, painted soft yellow.
//   - Dots are 5×5px, evenly spaced down the column.
//   - The whole column is 1px wide, with a faint gradient line behind so
//     the dots/Pac-Man read as travelling along a track even at rest.

const DOTS = 12;
const DURATION = 5; // seconds for a full top→bottom loop

// Path values for the chomping mouth (60° open ↔ ~5° closed), pointing down.
const MOUTH_OPEN = 'M18 18 L27 33.59 A18 18 0 1 0 9 33.59 Z';
const MOUTH_HALF = 'M18 18 L23 35.30 A18 18 0 1 0 13 35.30 Z';
const MOUTH_CLOSED = 'M18 18 L18.6 35.99 A18 18 0 1 0 17.4 35.99 Z';

export default function PacmanDivider() {
  // Pac-Man's vertical position percent at time t:
  //   pos(t) = -10 + (t / DURATION) * 120         // from -10% to 110%
  // For dot i (top% = (i + 0.5) / DOTS * 100), Pac-Man arrives at:
  //   t_i = ((top_i + 10) / 120) * DURATION
  // We schedule the dot's "eat" keyframe to play at t_i.
  const dots = Array.from({ length: DOTS }, (_, i) => {
    const topPercent = ((i + 0.5) / DOTS) * 100;
    const tEat = ((topPercent + 10) / 120) * DURATION;
    // Animation runs `eat` over DURATION; we offset so the fade-out window
    // (centred at 5% of the keyframe) lands exactly at tEat seconds in.
    const fadeWindowAt = 0.05 * DURATION;
    const delay = tEat - fadeWindowAt;
    return { i, topPercent, delay };
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-30 hidden w-[42px] -translate-x-1/2 lg:block"
    >
      {/* Faint vertical track behind everything */}
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-zinc-400/20 to-transparent" />

      {/* Dots (each fades out exactly when Pac-Man passes) */}
      {dots.map(({ i, topPercent, delay }) => (
        <span
          key={i}
          className="pacman-dot absolute left-1/2 -translate-x-1/2"
          style={{
            top: `${topPercent}%`,
            animationDuration: `${DURATION}s`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      {/* Pac-Man itself */}
      <svg
        className="pacman absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          top: 0,
          animationDuration: `${DURATION}s`,
        }}
        width="36"
        height="36"
        viewBox="0 0 36 36"
      >
        <defs>
          <radialGradient id="pacman-glow" cx="0.4" cy="0.4" r="0.7">
            <stop offset="0" stopColor="#fde68a" />
            <stop offset="1" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
        <path fill="url(#pacman-glow)">
          <animate
            attributeName="d"
            dur="0.4s"
            repeatCount="indefinite"
            values={`${MOUTH_OPEN};${MOUTH_HALF};${MOUTH_CLOSED};${MOUTH_HALF};${MOUTH_OPEN}`}
          />
        </path>
        {/* Tiny eye */}
        <circle cx="18" cy="11" r="1.6" fill="#1c1917" />
      </svg>
    </div>
  );
}
