/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand: {
          sumi: '#0D0D0D',
          washi: '#F5F2ED',
          vermilion: '#D94032',
          ink: '#1A1A1A',
          warm: '#E8E4DF',
          matcha: '#5B8C5A',
          amber: '#D4A03C',
          stone: '#6B6560',
          tatami: '#2A2725',
          rice: '#EDE8E0',
          // Semantic aliases (used in TranscriptView & VoiceButton)
          accent: '#D94032',    // = vermilion
          surface: '#2A2725',   // = tatami  — AI bubble background
          bg: '#0D0D0D',        // = sumi    — user bubble background
          text: '#E8E4DF',      // = warm
          glow: '#D94032',      // pulse ring colour
          'text-secondary': '#6B6560', // = stone
        },
      },
      fontFamily: {
        sans: ['NotoSansJP_400Regular', 'NotoSansJP_500Medium', 'NotoSansJP_700Bold', 'System'],
        mono: ['IBMPlexMono_400Regular', 'Courier'],
      },
    },
  },
  plugins: [],
};
