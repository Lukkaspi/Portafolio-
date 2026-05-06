import { useMemo } from 'react';

// A deterministic-feeling random; uses Math.random once at module init so
// React StrictMode double-renders don't reshuffle the field.
const STARS = Array.from({ length: 140 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() * 1.3 + 0.3,
  o: Math.random() * 0.65 + 0.2,
  d: Math.random() * 6 + 1,
}));

// A second sparse layer of bigger, dimmer stars for depth.
const FAR_STARS = Array.from({ length: 28 }, () => ({
  x: Math.random() * 100,
  y: Math.random() * 100,
  r: Math.random() * 0.8 + 1.4,
  o: Math.random() * 0.35 + 0.15,
  d: Math.random() * 8 + 4,
}));

export default function Stars() {
  const layers = useMemo(() => ({ stars: STARS, far: FAR_STARS }), []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Cinematic background gradients */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% -20%, rgba(124,92,255,0.18) 0%, transparent 60%),' +
            'radial-gradient(80% 60% at 90% 110%, rgba(199,90,42,0.12) 0%, transparent 55%),' +
            'radial-gradient(100% 60% at 0% 100%, rgba(40,80,180,0.10) 0%, transparent 60%),' +
            'linear-gradient(180deg, #050609 0%, #07090d 60%, #050609 100%)',
        }}
      />

      {/* Star fields */}
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        {layers.far.map((s, i) => (
          <circle
            key={`f-${i}`}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#cdd6e0"
            opacity={s.o}
            style={{
              animation: `twinkle ${s.d}s ease-in-out ${i * 0.2}s infinite alternate`,
            }}
          />
        ))}
        {layers.stars.map((s, i) => (
          <circle
            key={`s-${i}`}
            cx={`${s.x}%`}
            cy={`${s.y}%`}
            r={s.r}
            fill="#ffffff"
            opacity={s.o}
            style={{
              animation: `twinkle ${s.d}s ease-in-out ${i * 0.07}s infinite alternate`,
            }}
          />
        ))}
      </svg>

      {/* Subtle vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(140% 100% at 50% 50%, transparent 50%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Top→bottom film grain edge */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/40 to-transparent" />
    </div>
  );
}
