/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kabod: {
          50: '#fbf8f2',
          100: '#f5edd9',
          200: '#edd9b0',
          300: '#e3bf82',
          400: '#d7a151',
          500: '#c5832a', // Glorious Gold / Amber
          600: '#a66420',
          700: '#83491c',
          800: '#6d3c1d',
          900: '#5c331d',
          950: '#34190c',
        },
        navy: {
          850: '#111827',
          900: '#0c1322',
          950: '#070b14',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(215, 161, 81, 0.3)',
        'glow-lg': '0 0 35px -5px rgba(215, 161, 81, 0.45)',
      }
    },
  },
  plugins: [],
}
