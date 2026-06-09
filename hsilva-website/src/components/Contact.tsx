import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import LazyVideo from './LazyVideo'

const VIDEO    = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260505_101331_74f9b798-3f00-4e86-8a01-377aa16ffeaa.mp4'
const MARQUEE  = 'A CONSTRUIR O FUTURO DIGITAL DE ANGOLA • '
const CONTACT_LINKS  = [
  { label: 'Email', href: 'mailto:geral@hsilva.ao' },
]

export default function Contact() {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const year = new Date().getFullYear()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!marqueeRef.current) return
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: 'none',
        duration: 28,
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="contact" className="relative bg-bg pt-20 pb-10 overflow-hidden">

      {/* Background video (flipped) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <LazyVideo
          src={VIDEO}
          wrapperClassName="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 scale-y-[-1] opacity-30"
          mediaClassName="object-cover"
        />
        <div className="absolute inset-0 bg-bg/70" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col">

        {/* Header */}
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Contacto</span>
          </div>

          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display italic leading-[0.95] text-text-primary mb-8 max-w-3xl">
            Vamos criar algo grande.
          </h2>

          <p className="text-base text-muted max-w-md leading-relaxed mb-10">
            Pronto para transformar uma ideia em produto digital? Respondemos em até 24 horas.
          </p>

          {/* Email CTA */}
          <a
            href="mailto:geral@hsilva.ao"
            className="group relative inline-flex rounded-full text-sm"
          >
            <span
              className="absolute inset-[-1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'linear-gradient(90deg,#89aacc,#4e85bf)' }}
            />
            <span className="relative inline-flex items-center gap-3 border border-stroke bg-bg text-text-primary rounded-full px-8 py-4 font-medium text-sm group-hover:border-transparent transition-all duration-200">
              geral@hsilva.ao
              <span
                className="w-7 h-7 rounded-full flex items-center justify-center text-bg"
                style={{ background: 'linear-gradient(90deg,#89aacc,#4e85bf)' }}
              >
                ↗
              </span>
            </span>
          </a>
        </motion.div>

        {/* Marquee */}
        <div className="overflow-hidden -mx-6 md:-mx-10 lg:-mx-16 mb-16 border-t border-b border-stroke py-5">
          <div ref={marqueeRef} className="inline-flex whitespace-nowrap">
            <span className="text-2xl md:text-3xl font-display italic text-muted select-none">
              {MARQUEE.repeat(10)}
            </span>
          </div>
        </div>

        {/* Footer bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-4">

          {/* Logo + copy */}
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full p-[1.5px] flex-shrink-0"
              style={{ background: 'linear-gradient(135deg,#89aacc,#4e85bf)' }}
            >
              <div className="w-full h-full rounded-full bg-bg overflow-hidden">
                <img src="/hsilva-logo.jpg" alt="H.SILVA" className="w-full h-full object-cover" />
              </div>
            </div>
            <span className="text-xs text-muted">© {year} H.SILVA Lda · Huambo, Angola</span>
          </div>

          {/* Right side: status + socials */}
          <div className="flex items-center gap-6">
            {/* Available indicator */}
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"
                style={{ boxShadow: '0 0 6px rgba(16,185,129,0.6)', animation: 'pulse 2s infinite' }}
              />
              <span className="text-xs text-muted">Disponível para projetos</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              {CONTACT_LINKS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  className="text-xs text-muted hover:text-text-primary transition-colors duration-200"
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
