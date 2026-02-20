/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spectro-bg': '#0B0C10',
        'spectro-card': '#1A1C2E',
        'spectro-sidebar': '#13141F',
        'spectro-purple': '#A855F7',
        'spectro-teal': '#2DD4BF',
        'spectro-border': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.025em', fontWeight: '700' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.025em', fontWeight: '700' }],
      },
      boxShadow: {
        'spectro': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
        'glow-teal': '0 0 20px rgba(45, 212, 191, 0.3)',
      },
      backdropBlur: {
        'spectro': '16px',
      }
    },
  },
  plugins: [],
}
