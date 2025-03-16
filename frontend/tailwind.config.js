/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors : {
         waterBlue : "#1DA1F2",
      }
    },
  },
  plugins: [],
}

