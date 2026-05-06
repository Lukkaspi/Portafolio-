// Resolve a public-folder asset path against Vite's configured base.
// Use for any string asset path stored in data files (e.g. project images).
export function asset(path) {
  if (!path) return path;
  const base = import.meta.env.BASE_URL || '/';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const trimmed = path.replace(/^\/+/, '');
  return `${base}${trimmed}`;
}
