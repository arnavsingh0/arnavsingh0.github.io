/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#D5DAE1"
        },
        black: {
          DEFAULT: "#000",
          500: "#1D2235"
        },
        blue: {
          500: "#2b77e7"
        },
        // Add galaxy-themed colors here
        'deep-space-blue': '#1a1a2e', // Deep Space Blue
        'galaxy-purple': '#6a0572', // Galaxy Purple
        'cosmic-teal': '#2ed2c6', // Cosmic Teal
        'nebula-pink': '#f78da7',
        'starry-gold': '#f9d76e',
        'midnight-blue': '#003366',
        'lunar-silver': '#c0c0c0',
        'aurora-green': '#4caf50',
        'meteorite-grey': '#606060',
        'cosmic-coral': '#ff6f61',
        'violet-nebula': '#9b59b6',
        'celestial-teal': '#009688'
      },
      fontFamily: {
        worksans: ["Work Sans", "sans-serif"],
        poppins: ['Poppins', "sans-serif"]
      },
      boxShadow: {
        card: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)'
      }
    },
  },
  plugins: [],
}