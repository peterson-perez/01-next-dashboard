/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/anjrot-components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
};