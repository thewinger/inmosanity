/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-inter)',
      },
      backgroundImage: {
        heroImg: 'url("../public/hero-golf.jpg")',
        input: 'linear-gradient(to bottom, #fff, #f4f4f5)',
      },
      boxShadow: {
        input: `
                0px 1px 0px -1px rgb(0 0 0 / 0.15),
                0px 1px 1px -1px rgb(0 0 0 / 0.15),
                0px 1px 2px -1px rgb(0 0 0 / 0.15),
                0px 2px 4px -2px rgb(0 0 0 / 0.15),
                0px 3px 6px -3px rgb(0 0 0 / 0.15),
                inset 0px 0px 0px 1px rgb(255 255 255)
              `,
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
