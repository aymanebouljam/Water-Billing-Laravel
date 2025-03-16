/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors : {
          primaryBlue : "#2c7cbc",
          secondaryBlue : "#8acde8"
      }
    },
  },
  plugins: [],
}

