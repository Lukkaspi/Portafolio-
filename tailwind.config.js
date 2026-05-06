/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: {
          950: '#07090d',
          900: '#0a0c10',
          800: '#11141a',
          700: '#1a1d22',
          600: '#262a31',
          500: '#3a3f48',
        },
        accent: {
          500: '#7c5cff',
          400: '#9b82ff',
        },
        cupra: {
          500: '#c75a2a',
          400: '#e07a48',
        },
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(124,92,255,0.55)',
        'glow-cupra': '0 0 28px -4px rgba(199,90,42,0.6)',
      },
    },
  },
  plugins: [],
};
