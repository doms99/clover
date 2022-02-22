
module.exports = {
  content: ["./src/**/*.{html,tsx,ts,jsx,js}"],
  theme: {
    extend: {
      keyframes: {
        'scroll': {
          '0%, 100$': { transform: 'traslateX(0)' },
          '50%': { transform: 'translateX(-100%)' }
        }
      },
      animation: {
        'scroll': 'scroll 4s linear infinite'
      }
    },
  },
  plugins: [],
}
