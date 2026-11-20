import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const fraunces = localFont({
  src: [
    { path: '../fonts/fraunces-normal.woff2', weight: '400 600', style: 'normal' },
    { path: '../fonts/fraunces-italic.woff2', weight: '400 600', style: 'italic' },
  ],
  variable: '--font-fraunces',
  display: 'swap',
})

const plusJakarta = localFont({
  src: [{ path: '../fonts/plus-jakarta-sans.woff2', weight: '400 800', style: 'normal' }],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const siteUrl = 'https://hsilva.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'SilvaGo — Táxi do Huambo e Corrida Solidária gratuita',
  description:
    'O táxi do Huambo que leva quem precisa ao hospital, de graça. Grávidas, idosos e pessoas sem condições ligam e são levados ao hospital sem pagar. Sem aplicação. Sem internet.',
  openGraph: {
    title: 'SilvaGo — Táxi do Huambo e Corrida Solidária gratuita',
    description:
      'O táxi do Huambo que leva quem precisa ao hospital, de graça. Ligue 945 786 313.',
    url: siteUrl,
    siteName: 'SilvaGo',
    locale: 'pt_AO',
    type: 'website',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'SilvaGo — táxi do Huambo e Corrida Solidária gratuita',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SilvaGo — Táxi do Huambo e Corrida Solidária gratuita',
    description: 'O táxi do Huambo que leva quem precisa ao hospital, de graça.',
    images: ['/images/og-image.webp'],
  },
  icons: {
    icon: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#062624',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-AO" className={`${fraunces.variable} ${plusJakarta.variable}`}>
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="/motion.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
