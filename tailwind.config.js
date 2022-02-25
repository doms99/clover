const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,tsx,ts,jsx,js}"],
  safelist: [
    'lg:grid-rows-5',
    '2xl:grid-rows-5',
    'lg:grid-rows-4',
    '2xl:grid-rows-4',
    'lg:grid-rows-3',
    '2xl:grid-rows-3',
    'scale-0',
    'scale-100',
    'before:opacity-0',
    'before:opacity-60'
  ],
  theme: {
    extend: {
      fontFamily: {
        'filler': ['Flow Block'],
        'sans': ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      fontSize: {
        'title': ['6rem', '6.1rem'],
        'title-lg': ['4.5rem', '4.6rem'],
        'title-md': ['2.5rem', '2.6rem']
      }
    },
  },
  plugins: [],
}
