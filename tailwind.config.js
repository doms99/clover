
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,jsx,js}"],
  theme: {
    extend: {
      fontSize: {
        'title': ['6rem', '6.05rem'],
        'title-lg': ['4.5rem', '4.55rem'],
        'title-md': ['2.5rem', '2.55rem']
      },
      keyframes: {
        grow: {
          '0%': { top: '8px', height: '64px' },
          '50%, 100%': { top: '24px', height: '32px' },
        }
      },
      animation: {
        grow: 'grow 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite',
      }
    },
  },
  plugins: [],
}
