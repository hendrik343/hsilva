import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { label: 'Início',   href: '#hero' },
  { label: 'Projetos', href: '#work' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('Início')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-5 px-4 pointer-events-none"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <nav
        className={`pointer-events-auto inline-flex items-center gap-1 rounded-full backdrop-blur-md border border-white/10 bg-surface/80 px-2 py-1.5 transition-shadow duration-300 ${
          scrolled ? 'shadow-xl shadow-black/30' : ''
        }`}
      >
        {/* Logo */}
        <a href="#hero" className="group mr-1" aria-label="Ir para início">
          <div
            className="w-8 h-8 rounded-full p-[1.5px] transition-transform duration-300 group-hover:scale-110"
            style={{ background: 'linear-gradient(135deg, #89aacc, #4e85bf)' }}
          >
            <div className="w-full h-full rounded-full bg-bg overflow-hidden">
              <img src="/hsilva-logo.jpg" alt="H.SILVA" className="w-full h-full object-cover" />
            </div>
          </div>
        </a>

        <div className="hidden sm:block w-px h-4 bg-stroke mx-0.5" />

        {/* Nav links */}
        {LINKS.map(link => (
          <a
            key={link.label}
            href={link.href}
            onClick={() => setActive(link.label)}
            className={`relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200 ${
              active === link.label
                ? 'text-text-primary bg-stroke/60'
                : 'text-muted hover:text-text-primary hover:bg-stroke/40'
            }`}
          >
            {link.label}
          </a>
        ))}

        <div className="hidden sm:block w-px h-4 bg-stroke mx-0.5" />

        {/* Say hi button */}
        <a
          href="mailto:geral@hsilva.ao"
          className="group relative inline-flex rounded-full text-xs sm:text-sm"
        >
          <span
            className="absolute inset-[-1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: 'linear-gradient(90deg, #89aacc, #4e85bf)' }}
          />
          <span className="relative inline-flex items-center gap-1.5 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted group-hover:text-text-primary transition-colors duration-200">
            Falar <span className="text-[10px]">↗</span>
          </span>
        </a>
      </nav>
    </motion.header>
  )
}
