// Tiny runtime colour helpers. Used to derive translucent fills from a
// project's accent hex so chips/labels can pick up the per-project hue
// without a separate Tailwind safelist.

export function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(124, 92, 255, ${alpha})`; // fallback to default accent
  const cleaned = hex.replace('#', '');
  const v =
    cleaned.length === 3
      ? cleaned
          .split('')
          .map((c) => c + c)
          .join('')
      : cleaned;
  const n = parseInt(v, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Returns the inline style for an accent-tinted chip (subtle fill, accent
// border, accent text). Pass the project accent hex.
export function accentChipStyle(hex) {
  return {
    backgroundColor: hexToRgba(hex, 0.1),
    border: `1px solid ${hexToRgba(hex, 0.4)}`,
    color: hex,
  };
}
