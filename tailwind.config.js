/** @type {import('tailwindcss').Config} */
module.exports = {
  /* darkMode: ['class', '[data-theme="dark"]'], */
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        /* heroImg: 'url("../public/hero-golf.jpg")', */
        heroImg: 'url("../public/hero-golfball.jpeg")',
        footerBorder: 'url("../public/footer_border.svg")',
        input: 'linear-gradient(to bottom, #fff, #f4f4f5)',
      },
      gridTemplateColumns: {
        cards: 'repeat(auto-fill, minmax(min(18rem, 100%),  1fr))',
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
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/container-queries'),
    require('@tailwindcss/typography'),
  ],
}
