/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A0A0A',
          surface: '#141414',
          border: '#1F1F1F',
          accent: '#4ADE80',
          muted: '#6B7280',
          text: '#F9FAFB',
          'text-secondary': '#9CA3AF',
        },
      },
      fontFamily: {
        sans: ['System'],
        mono: ['Courier'],
      },
    },
  },
  plugins: [],
};
