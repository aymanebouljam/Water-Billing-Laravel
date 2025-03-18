/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors : {
          primaryBlue : "#58b7e7",
          secondaryBlue : "#76d0eb",
          darkBlue : "#2b619b"
      }
    },
  },
  plugins: [],
}

