
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: 'selector',
  theme: {
    extend: {
      transitionProperty: {
        'all' : 'all',
        'opacity': 'opacity',
        'top': 'top',
        'border': 'border',
        'height': 'height'
      }
    },
  },
  plugins: [],
}

