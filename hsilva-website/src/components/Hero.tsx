import { useEffect, useState } from 'react'
import { AnimatedText } from '@/components/ui/animated-shiny-text'

type FadeInProps = {
  delay: number
  duration: number
  className?: string
  children: React.ReactNode
}

function FadeIn({ delay, duration, className = '', children }: FadeInProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), delay)
    return () => window.clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`transition-opacity ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

const NAV_LINKS = ['Serviços', 'Projetos', 'Empresa', 'Contacto']
const NAV_HREFS: Record<string, string> = {
  'Serviços': '#services',
  'Projetos': '#work',
  'Empresa': '#about',
  'Contacto': '#contact',
}

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      <video
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />

      <div className="relative z-10 flex min-h-screen flex-col justify-between">
        {/* Navbar */}
        <header className="px-6 pt-6 md:px-12 lg:px-16">
          <nav className="liquid-glass flex items-center justify-between rounded-xl px-5 py-2.5">
            <a href="#" className="flex items-center gap-2.5">
              <img
                src="/hsilva-logo.jpg"
                alt="H.SILVA"
                className="h-8 w-8 rounded-lg object-cover"
              />
              <span className="text-lg font-semibold tracking-tight">H.SILVA</span>
            </a>

            <div className="hidden items-center gap-8 text-sm text-white/75 md:flex">
              {NAV_LINKS.map((l) => (
                <a key={l} href={NAV_HREFS[l]} className="transition hover:text-white">
                  {l}
                </a>
              ))}
            </div>

            <a href="mailto:geral@hsilva.ao">
              <button
                type="button"
                className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-gray-100"
              >
                Fala connosco
              </button>
            </a>
          </nav>
        </header>

        {/* Hero content */}
        <div className="px-6 pb-16 md:px-12 lg:px-16 lg:pb-20">
          <div className="mx-auto max-w-4xl">
            <FadeIn delay={0} duration={600}>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-lime">
                Consultoria · HSE · ESMS · Software
              </p>
            </FadeIn>

            <AnimatedText
              text="Sistemas, estratégia e conformidade para empresas que operam em Angola."
              gradientColors="linear-gradient(90deg, #ffffff 0%, #d7ff00 40%, #ffffff 65%, #a8c7a0 100%)"
              gradientAnimationDuration={4}
              hoverEffect
              className="justify-start py-0"
              textClassName="font-normal tracking-[-0.04em] leading-tight"
            />

            <FadeIn delay={600} duration={900} className="mt-6 max-w-2xl text-base leading-8 text-white/75 md:text-lg">
              H.SILVA combina consultoria ESG/ESMS, auditorias HSE e desenvolvimento
              de software para equipas que não podem depender do improviso.
            </FadeIn>

            <FadeIn delay={1000} duration={900}>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="mailto:geral@hsilva.ao">
                  <button className="rounded-lg bg-lime px-8 py-3 text-sm font-semibold text-black transition hover:bg-lime/90">
                    Fala connosco
                  </button>
                </a>
                <a href="#services">
                  <button className="liquid-glass rounded-lg border border-white/20 px-8 py-3 text-sm font-medium text-white transition hover:bg-white/10">
                    Ver serviços
                  </button>
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={1400} duration={900}>
              <div className="mt-10 flex flex-wrap gap-3">
                {['IFC / Banco Mundial', 'ISO 14001', 'NEBOSH IGC', 'NIF 5001495852'].map((b) => (
                  <span
                    key={b}
                    className="rounded-full border border-white/15 px-4 py-1.5 text-xs font-medium text-white/55"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
