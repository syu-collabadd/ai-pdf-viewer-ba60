/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0b0f',
          subtle: '#10121a',
          card: '#13151f',
          elev: '#1a1d29',
        },
        border: {
          DEFAULT: '#1f2333',
          strong: '#2a2f44',
        },
        ink: {
          DEFAULT: '#e7e9ee',
          dim: '#9ca3b3',
          mute: '#6b7080',
        },
        brand: {
          50: '#eaf2ff',
          100: '#d5e5ff',
          200: '#a8c8ff',
          300: '#7ba8ff',
          400: '#4d87ff',
          500: '#2563ff',
          600: '#1d4ed8',
          700: '#1e40af',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(37, 99, 255, 0.4), 0 8px 32px -8px rgba(37, 99, 255, 0.3)',
        card: '0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.04)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,255,0.18), transparent 60%)',
      },
    },
  },
  plugins: [],
};
