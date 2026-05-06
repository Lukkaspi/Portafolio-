import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves this repo at /Portafolio-/.
// Override with VITE_BASE=/ for local dev or alt hosts (Vercel/Netlify).
const base = process.env.VITE_BASE ?? '/Portafolio-/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    target: 'es2020',
    sourcemap: false,
  },
});
