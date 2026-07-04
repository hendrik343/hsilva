import { useState, useEffect } from 'react'
import {
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  Search,
  ClipboardCheck,
  ListChecks,
  FolderLock,
  BadgeCheck,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.25,0.1,0.25,1)'

function RollButton({
  label,
  variant = 'dark',
  href = '/sgas-pro.html',
}: {
  label: string
  variant?: 'dark' | 'orange'
  href?: string
}) {
  const bg = variant === 'orange' ? 'bg-[#F26522] hover:bg-[#e05a1a]' : 'bg-gray-900 hover:bg-gray-800'
  const arrowColor = variant === 'orange' ? 'text-[#F26522]' : 'text-gray-900'
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-3 sm:gap-4 ${bg} text-white text-[13px] sm:text-sm font-medium rounded-full pl-5 sm:pl-6 pr-2 py-2 transition-colors duration-300 w-fit`}
    >
      <span className="overflow-hidden h-[20px] relative">
        <span
          className="flex flex-col transition-transform duration-500"
          style={{ transitionTimingFunction: EASE }}
        >
          <span className="block h-[20px] leading-[20px] group-hover:-translate-y-full transition-transform duration-500" style={{ transitionTimingFunction: EASE }}>
            {label}
          </span>
        </span>
        <span
          className="absolute top-0 left-0 block h-[20px] leading-[20px] translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          style={{ transitionTimingFunction: EASE }}
        >
          {label}
        </span>
      </span>
      <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shrink-0">
        <ArrowRight
          size={14}
          className={`${arrowColor} transition-transform duration-500 group-hover:-rotate-45`}
          style={{ transitionTimingFunction: EASE }}
        />
      </span>
    </a>
  )
}

function SectionBadge({ n, label, border = 'border-gray-200' }: { n: string; label: string; border?: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 sm:mb-8">
      <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white text-[11px] sm:text-xs font-semibold flex items-center justify-center shrink-0">
        {n}
      </span>
      <span className={`text-xs sm:text-[13px] font-medium border ${border} rounded-full px-3 sm:px-4 py-1 sm:py-1.5`}>
        {label}
      </span>
    </div>
  )
}

const NAV_LINKS = [
  { label: 'Módulos', href: '#modulos' },
  { label: 'Preços', href: '#precos' },
  { label: 'Publicações IFC', href: '#fontes' },
]

const STEPS = [
  {
    icon: Search,
    title: 'Diagnóstico PS1–PS8',
    desc: 'Caracteriza o projecto (10 min) e recebe um mapa de gaps face às 8 Performance Standards da IFC — com referência ao parágrafo exacto.',
  },
  {
    icon: ClipboardCheck,
    title: 'Autoavaliação SGAS',
    desc: '42 perguntas oficiais, 9 elementos do sistema de gestão, cada um pontuado de 0–5 com critérios e dicas de melhoria.',
  },
  {
    icon: ListChecks,
    title: 'ESAP + GRM rastreáveis',
    desc: 'Plano de Acção com dono e prazo por medida. Mecanismo de reclamações com relógio de 15 dias e alerta antes de expirar.',
  },
  {
    icon: FolderLock,
    title: 'Sala de Auditoria',
    desc: 'Pacote lender-ready — evidências, fontes oficiais e histórico — organizado para quando a missão de supervisão chegar.',
  },
]

const SOURCES = [
  {
    tag: 'PS1–PS8',
    title: 'Performance Standards',
    detail: 'Política e Padrões de Desempenho de Sustentabilidade Social e Ambiental',
    meta: 'IFC · 30/04/2006',
  },
  {
    tag: 'Handbook',
    title: 'ESMS Implementation Handbook',
    detail: 'Guia conceptual de "porquê e como" para cada um dos 9 elementos do sistema de gestão',
    meta: 'IFC · v2.1 · Novembro 2015',
  },
  {
    tag: 'Autoavaliação',
    title: 'ESMS Self-Assessment and Improvement Guide',
    detail: 'As 42 perguntas oficiais e a matriz de maturidade 0–5 usadas na Autoavaliação SGAS',
    meta: 'IFC · v2.3 · Outubro 2015',
  },
  {
    tag: 'Toolkit',
    title: 'ESMS General Toolkit',
    detail: 'Formulários e checklists — o que preencher, elemento a elemento, para fechar cada gap',
    meta: 'IFC · v1.2 · Novembro 2015',
  },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Intl.DateTimeFormat('pt-PT', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: 'UTC',
        }).format(new Date())
      )
    }
    tick()
    const id = setInterval(tick, 1000 * 30)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Inter', ui-sans-serif, system-ui, sans-serif" }}>
      {/* ============ HERO ============ */}
      <section className="relative min-h-screen flex flex-col bg-[#EFEFEF] overflow-hidden">
        {/* Decorative animated background — CSS gradient blobs + grain, no external shader dependency */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div
            className="hero-blob absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full opacity-60 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(29,158,117,0.35), transparent 70%)' }}
          />
          <div
            className="hero-blob absolute -bottom-1/4 -right-1/4 w-[70%] h-[70%] rounded-full opacity-50 blur-3xl"
            style={{ background: 'radial-gradient(circle, rgba(242,101,34,0.28), transparent 70%)', animationDelay: '-9s' }}
          />
          <div className="absolute inset-0 bg-noise opacity-[0.08]" />
        </div>

        {/* Nav */}
        <div className="relative z-20 max-w-[1440px] w-full mx-auto p-2 sm:p-3">
          <nav className="bg-white rounded-full p-[5px] flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4 pl-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-900 flex items-center justify-center shrink-0">
                <span className="text-white text-[10px] sm:text-[11px] font-bold tracking-tight">SGAS</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} className="text-sm text-gray-900 hover:text-gray-500 transition-colors duration-300">
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4 pr-1">
              <span className="text-[13px] text-gray-600 hidden lg:inline">Fórmula de prontidão 100% divulgada</span>
              {time && <span className="text-[13px] text-gray-600">{time} UTC</span>}
              <a
                href="/sgas-pro.html"
                className="group inline-flex items-center gap-3 bg-gray-900 text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2"
              >
                <span className="overflow-hidden h-[18px] relative w-[124px] text-left">
                  <span className="block h-[18px] leading-[18px] transition-transform duration-500 group-hover:-translate-y-full" style={{ transitionTimingFunction: EASE }}>
                    Entrar na conta
                  </span>
                  <span
                    className="absolute top-0 left-0 block h-[18px] leading-[18px] translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                    style={{ transitionTimingFunction: EASE }}
                  >
                    Entrar na conta
                  </span>
                </span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-white shrink-0">
                  <ArrowRight size={12} className="text-gray-900 transition-transform duration-500 group-hover:-rotate-45" style={{ transitionTimingFunction: EASE }} />
                </span>
              </a>
            </div>

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white mr-1"
            >
              <Menu size={18} />
            </button>
          </nav>
        </div>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/60" onClick={() => setMenuOpen(false)} />
            <div className="absolute bottom-0 left-0 right-0 bg-white rounded-2xl mx-3 mb-3 p-6 translate-y-0 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.32,0.72,0,1)' }}>
              <div className="flex items-center justify-between mb-8">
                <span className="text-[13px] text-gray-500">{time} UTC</span>
                <button onClick={() => setMenuOpen(false)} className="w-9 h-9 rounded-full bg-gray-900 flex items-center justify-center text-white">
                  <X size={16} />
                </button>
              </div>
              <div className="flex flex-col gap-5 mb-8">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)} className="text-2xl font-medium text-gray-900">
                    {l.label}
                  </a>
                ))}
              </div>
              <a href="/sgas-pro.html" className="inline-flex items-center gap-3 bg-[#F26522] text-white text-sm font-medium rounded-full pl-5 pr-2 py-2 w-fit">
                Começar agora
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white">
                  <ArrowRight size={14} className="text-[#F26522]" />
                </span>
              </a>
            </div>
          </div>
        )}

        {/* Hero content */}
        <div className="relative z-20 flex-1 flex flex-col justify-end max-w-[1440px] w-full mx-auto px-5 sm:px-8 lg:px-12 pb-14 sm:pb-16 lg:pb-20">
          <p className="text-[13px] sm:text-sm text-gray-900 tracking-wide mb-5 sm:mb-8">SGAS Pro · Compliance IFC &amp; Banco Mundial</p>
          <h1
            className="font-medium text-gray-900"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
          >
            Prontidão para a missão do<br className="hidden sm:block" /><span className="sm:hidden"> </span>
            Banco Mundial.<br className="hidden sm:block" /><span className="sm:hidden"> </span>
            Sem caixa preta.
          </h1>
          <p className="mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-base text-gray-700 leading-relaxed">
            Diagnóstico PS1–PS8, ESAP rastreável, GRM com prazos e um score de prontidão cuja fórmula está{' '}
            <a href="#formula" className="underline decoration-dotted underline-offset-2">100% publicada</a> — não uma caixa preta de marketing.
          </p>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
            <RollButton label="Começar agora — 7 dias grátis" variant="orange" />

            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white rounded-[4px] px-3 sm:px-4 py-2 sm:py-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#1D9E75] shrink-0" />
              <span className="text-[13px] sm:text-sm font-medium">Baseado em 4 publicações oficiais IFC</span>
              <span className="text-[10px] sm:text-[11px] bg-gray-900 text-white px-1.5 sm:px-2 py-0.5 rounded shrink-0">Fontes citadas</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMO FUNCIONA ============ */}
      <section id="modulos" className="bg-white pt-16 sm:pt-20 lg:pt-32 pb-12 sm:pb-16 lg:pb-24 overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <div className="px-5 sm:px-8 lg:px-12">
            <SectionBadge n="1" label="Como funciona" />
            <h2
              className="font-medium text-gray-900 mb-10 sm:mb-14 lg:mb-20 max-w-3xl"
              style={{ fontSize: 'clamp(1.5rem, 4vw, 3.2rem)', lineHeight: 1.12, letterSpacing: '-0.02em' }}
            >
              Da preparação à missão de supervisão, numa só plataforma.
            </h2>
          </div>

          <div className="px-5 sm:px-8 lg:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon
              return (
                <div key={s.title} className="border border-gray-200 rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <span className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs text-gray-400 font-medium">0{i + 1}</span>
                  </div>
                  <h3 className="text-[15px] font-semibold text-gray-900">{s.title}</h3>
                  <p className="text-[13px] text-gray-600 leading-relaxed">{s.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ============ FONTES / CREDIBILIDADE ============ */}
      <section id="fontes" className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
          <SectionBadge n="2" label="Nada inventado. Tudo citado." border="border-gray-300" />
          <h2
            className="font-medium text-gray-900 mb-10 sm:mb-14 lg:mb-16 max-w-3xl"
            style={{ fontSize: 'clamp(1.75rem, 7vw, 4.2rem)', lineHeight: 1.08, letterSpacing: '-0.03em' }}
          >
            Construído sobre as publicações oficiais da IFC.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-7">
            {SOURCES.map(src => (
              <div key={src.title} className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <BadgeCheck size={16} className="text-[#1D9E75]" />
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-[#1D9E75]">{src.tag}</span>
                </div>
                <h3 className="text-[14px] sm:text-[15px] font-semibold text-gray-900 mb-1">{src.title}</h3>
                <p className="text-[13px] text-gray-600 leading-relaxed mb-3">{src.detail}</p>
                <p className="text-[11px] text-gray-400">{src.meta}</p>
              </div>
            ))}
          </div>

          <div id="precos" className="mt-16 sm:mt-20 lg:mt-24 bg-gray-900 rounded-3xl p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div>
              <h3 className="text-white font-medium mb-3" style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.02em' }}>
                7 dias grátis. Depois, escolhes o plano.
              </h3>
              <p className="text-gray-400 text-sm max-w-md">
                Sem cartão de crédito para começar. Pilot, Professional, Business ou Enterprise — cancela quando quiseres.
              </p>
            </div>
            <RollButton label="Iniciar trial de 7 dias" variant="orange" />
          </div>
        </div>
      </section>

      <footer className="bg-white py-8 px-5 sm:px-8 lg:px-12 border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-400">
          <span>© {new Date().getFullYear()} SGAS Pro</span>
          <span>IFC PS1–PS8 · World Bank ESS1–ESS10</span>
        </div>
      </footer>
    </div>
  )
}
