import type { Config } from 'tailwindcss'

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Figtree', 'system-ui', 'sans-serif'],
        sans: ['"Noto Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        page: token('page'),
        card: token('card'),
        ink: token('ink'),
        body: token('body'),
        muted: token('muted'),
        line: token('line'),
        brand: token('brand'),
        panel: token('panel'),
        tint: token('tint'),
        'tint-line': token('tint-line'),
        accent: token('accent'),
        cta: { DEFAULT: '#FBBF24', hover: '#FCD34D', ink: '#1F1300' },
      },
      boxShadow: {
        soft: '0 1px 2px rgb(4 47 46 / .05), 0 12px 32px -16px rgb(4 47 46 / .18)',
        lift: '0 24px 60px -24px rgb(4 47 46 / .45)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        rise: 'rise .55s cubic-bezier(.2,.7,.3,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
