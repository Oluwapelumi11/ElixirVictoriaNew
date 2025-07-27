/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'serif': ['var(--font-playfair)', 'Playfair Display', 'serif'],
        'inter': ['var(--font-inter)', 'Inter', 'sans-serif'],
        'playfair': ['var(--font-playfair)', 'Playfair Display', 'serif'],
      },
      colors: {
        'luxury-black': '#0a0a0a',
        'charcoal': '#1a1a1a',
        'warm-black': '#111111',
        'champagne-gold': '#d4af37',
        'soft-gold': '#f4e4bc',
        'gold-shimmer': '#faf0e6',
        'pearl-white': '#fefefe',
        'warm-beige': '#f5f3f0',
        'subtle-gray': '#8a8a8a',
        'divider-gray': '#e5e5e5',
      },
      animation: {
        'luxury-fade': 'luxury-fade 0.8s ease-out',
        'luxury-slide': 'luxury-slide 0.6s ease-out',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        'luxury-fade': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'luxury-slide': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [],
} 