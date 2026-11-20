import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
      },
      colors: {
        teal: '#0B3B38',
        deep: '#062624',
        amber: '#F5B544',
        'amber-dark': '#B07A12',
        cream: '#F7F2E8',
        ink: '#0E1F1D',
        muted: '#5B6B68',
        mint: '#E3F1EB',
      },
      maxWidth: {
        content: '1312px',
      },
      opacity: {
        7: '0.07',
        12: '0.12',
        14: '0.14',
        28: '0.28',
        42: '0.42',
        55: '0.55',
        65: '0.65',
        72: '0.72',
        82: '0.82',
        88: '0.88',
        97: '0.97',
      },
      borderRadius: {
        '2xl-card': '28px',
        '3xl-card': '36px',
        '4xl-card': '44px',
      },
      keyframes: {
        reveal: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        reveal: 'reveal .7s cubic-bezier(.2,.7,.3,1) both',
      },
    },
  },
  plugins: [],
} satisfies Config
