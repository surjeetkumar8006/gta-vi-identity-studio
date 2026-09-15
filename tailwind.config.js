/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vice: {
          pink: '#ff007f',
          pinkGlow: '#ff1493',
          cyan: '#00f0ff',
          cyanGlow: '#00e5ff',
          orange: '#ff8a00',
          purple: '#9d4edd',
          gold: '#ffd700',
          dark: '#090714',
          cardBg: '#120e29',
          border: 'rgba(255, 0, 127, 0.3)',
        }
      },
      fontFamily: {
        heading: ['Pricedown', 'Impact', 'Trebuchet MS', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace']
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pink': 'glowPink 2s ease-in-out infinite alternate',
        'glow-cyan': 'glowCyan 2s ease-in-out infinite alternate',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        glowPink: {
          '0%': { boxShadow: '0 0 10px #ff007f, 0 0 20px #ff007f' },
          '100%': { boxShadow: '0 0 20px #ff007f, 0 0 40px #ff007f' },
        },
        glowCyan: {
          '0%': { boxShadow: '0 0 10px #00f0ff, 0 0 20px #00f0ff' },
          '100%': { boxShadow: '0 0 20px #00f0ff, 0 0 40px #00f0ff' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
