/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        great: ["'Great Vibes'", "cursive"],
        open: ["'Open Sans'", "sans-serif"],
      },
    },
  },
  plugins: [],
}

