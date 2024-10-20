/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1",
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235",
        },
        blue: {
          500: "#2b77e7",
        },
        // Space and galaxy-themed colors
        'deep-space-blue': '#1a1a2e', // Deep Space Blue
        'galaxy-purple': '#6a0572', // Galaxy Purple
        'cosmic-teal': '#2ed2c6', // Cosmic Teal
        'nebula-pink': '#f78da7', // Nebula Pink
        'starry-gold': '#f9d76e', // Starry Gold
        'midnight-blue': '#003366', // Midnight Blue
        'lunar-silver': '#c0c0c0', // Lunar Silver
        'aurora-green': '#4caf50', // Aurora Green
        'meteorite-grey': '#606060', // Meteorite Grey
        'cosmic-coral': '#ff6f61', // Cosmic Coral
        'violet-nebula': '#9b59b6', // Violet Nebula
        'celestial-teal': '#009688', // Celestial Teal
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"], // Set Roboto as the main font
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"],
        orbitron: ['Orbitron', 'sans-serif'], // Space-themed font for headings or key elements
      },
      backgroundImage: {
        // Space-themed background with stars
        'space-stars': "url('/src/assets/backgrounds/space-stars.png')",
      },
      backgroundSize: {
        '50%': '50%',
        '100%': '100%',
        '200%': '200%',
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)', // Subtle card shadow
      },
      animation: {
        'slow-pulse': 'pulse 5s ease-in-out infinite', // Slower pulsating animation effect
      },
    },
  },
  plugins: [],
}