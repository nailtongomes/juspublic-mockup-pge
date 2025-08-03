/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pge-blue': '#1e40af',
        'pge-green': '#059669',
        'pge-gray': '#6b7280'
      }
    },
  },
  plugins: [],
}