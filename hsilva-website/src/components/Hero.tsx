import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import LazyVideo from './LazyVideo'

const ROLES = ['software', 'mobile', 'fintech', 'digital']
const VIDEO  = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4'

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0)
  const nameRef   = useRef<HTMLHeadingElement>(null)

  /* Role cycling */
  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(id)
  }, [])

  /* GSAP entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 56 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        0.05,
      )
      tl.fromTo(
        '.hero-blur-in',
        { opacity: 0, filter: 'blur(12px)', y: 24 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 0.9, stagger: 0.1, ease: 'power2.out' },
        0.3,
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex flex-col overflow-hidden bg-bg"
    >
      {/* Video background */}
      <LazyVideo
        src={VIDEO}
        eager
        wrapperClassName="absolute top-1/2 left-1/2 min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 opacity-60"
        mediaClassName="object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">

        {/* Eyebrow */}
        <p className="hero-blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 select-none">
          HUAMBO, ANGOLA
        </p>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-[clamp(3.5rem,12vw,8rem)] font-display italic leading-[0.9] tracking-tight text-text-primary mb-6 select-none"
          style={{ opacity: 0 }}
        >
          H.SILVA
        </h1>

        {/* Role line */}
        <p className="hero-blur-in text-base md:text-xl text-muted mb-4 select-none">
          Estúdio de{' '}
          <span
            key={roleIdx}
            className="font-display italic text-text-primary inline-block animate-role-fade-in"
          >
            {ROLES[roleIdx]}
          </span>.
        </p>

        {/* Description */}
        <p className="hero-blur-in text-sm md:text-base text-muted max-w-md mb-12 leading-relaxed">
          Criamos plataformas digitais para empresas angolanas: web, mobile,
          fintech e automação empresarial.
        </p>

        {/* CTAs */}
        <div className="hero-blur-in flex flex-wrap items-center justify-center gap-4">
          {/* Primary */}
          <a
            href="#work"
            className="group relative inline-flex items-center rounded-full text-sm font-medium px-7 py-3.5 bg-text-primary text-bg transition-all duration-200 hover:scale-105 hover:shadow-lg"
          >
            Ver projetos
          </a>

          {/* Secondary */}
          <a
            href="mailto:geral@hsilva.ao"
            className="group relative inline-flex rounded-full text-sm"
          >
            <span
              className="absolute inset-[-1.5px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: 'linear-gradient(90deg, #89aacc, #4e85bf)' }}
            />
            <span className="relative inline-flex items-center gap-1.5 border border-stroke bg-bg text-text-primary rounded-full px-7 py-3.5 font-medium text-sm group-hover:border-transparent transition-all duration-200 hover:scale-105">
              Falar connosco <span className="text-muted">↗</span>
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 hero-blur-in">
        <span className="text-[10px] text-muted uppercase tracking-[0.3em] select-none">Descer</span>
        <div className="w-px h-10 bg-stroke overflow-hidden relative">
          <div
            className="absolute top-0 left-0 right-0 h-full accent-gradient animate-scroll-down"
          />
        </div>
      </div>
    </section>
  )
}
