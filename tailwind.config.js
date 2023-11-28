/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      spacing: {
        'main-nav': '57px',
      },
      fontFamily: {
        'sans': ['Poppins', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  // darkMode: "class",
  plugins: [require("tw-elements/dist/plugin.cjs")],
}

