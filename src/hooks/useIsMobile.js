import { useEffect, useState } from 'react';

// "Mobile" = narrow viewport (phones). Tablets & desktops get the 3D scene.
// iPads in landscape report ≥1024 CSS px and handle Three.js fine.
const QUERY = '(max-width: 900px)';

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(QUERY).matches;
  });

  useEffect(() => {
    const mq = window.matchMedia(QUERY);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.('change', handler);
    return () => mq.removeEventListener?.('change', handler);
  }, []);

  return isMobile;
}
