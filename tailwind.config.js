/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
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
        button: `
                0px 7px 6px -3px rgba(0, 0, 0, 0.05),
                0px 6px 4px -2px rgba(0, 0, 0, 0.05),
                0px 5px 1px -1px rgba(0, 0, 0, 0.05),
                0px 5px 4px -1px rgba(0, 0, 0, 0.05),
                0px 5px 2px -1px rgba(0, 0, 0, 0.05),
                0px 5px 2px rgba(0, 0, 0, 0.05),
                0px 3px 0px #15803D;
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
