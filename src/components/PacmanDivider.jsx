// Animated vertical separator: a Pac-Man chomps its way down a column of
// dots, then loops. Centring (translate -50%) is fixed in CSS — keyframes
// animate only `top` (Pac-Man) and `opacity` (dots) so there's no fight
// with Tailwind transform utilities at runtime.
//
// Geometry:
//   - Pac-Man is 36×36px, painted soft yellow with a chomp animation on
//     the SVG path itself.
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
  //   pos(t) = -5 + (t / DURATION) * 110         // from -5% to 105%
  // For dot i (top% = (i + 0.5) / DOTS * 100), Pac-Man arrives at:
  //   t_i = ((top_i + 5) / 110) * DURATION
  // We schedule the dot's "eat" keyframe to play at t_i.
  const dots = Array.from({ length: DOTS }, (_, i) => {
    const topPercent = ((i + 0.5) / DOTS) * 100;
    const tEat = ((topPercent + 5) / 110) * DURATION;
    // Animation runs `eat` over DURATION; we offset so the fade-out window
    // (centred at 5% of the keyframe) lands exactly at tEat seconds in.
    const fadeWindowAt = 0.05 * DURATION;
    const delay = tEat - fadeWindowAt;
    return { i, topPercent, delay };
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-1/2 z-30 hidden w-[42px] lg:block"
      style={{ transform: 'translateX(-50%)' }}
    >
      {/* Faint vertical track behind everything */}
      <div className="absolute inset-y-0 left-1/2 w-px bg-gradient-to-b from-transparent via-zinc-400/20 to-transparent" style={{ transform: 'translateX(-50%)' }} />

      {/* Dots (each fades out exactly when Pac-Man passes) */}
      {dots.map(({ i, topPercent, delay }) => (
        <span
          key={i}
          className="pacman-dot"
          style={{
            top: `${topPercent}%`,
            animationDelay: `${delay}s`,
          }}
        />
      ))}

      {/* Pac-Man itself — the runner div drives the vertical animation,
          the inner SVG handles the chomp via SMIL. */}
      <div className="pacman-runner">
        <svg width="36" height="36" viewBox="0 0 36 36" style={{ display: 'block' }}>
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
    </div>
  );
}
