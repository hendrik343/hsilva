import { lazy, Suspense, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'motion/react'
import { ArrowRight, Check } from 'lucide-react'

const Spline = lazy(() => import('@splinetool/react-spline'))

// ─── Types ────────────────────────────────────────────────────────────────────
type Lang = 'PT' | 'FR' | 'EN'

interface HeadlineLine {
  text: string
  size: string
  weight: string
  op: string
}

interface SlideData {
  lines: HeadlineLine[]
  sub: string
  cta1: string
  cta2: string
  trust: string
}

interface CardData {
  n: string
  title: string
  checks: string[]
  href: string
}

// ─── Content ──────────────────────────────────────────────────────────────────
const LANGS: Lang[] = ['PT', 'FR', 'EN']
const SAAS_URL = 'https://sgas-pro.vercel.app'
const saasPage = (page?: string) => page ? `${SAAS_URL}/?page=${page}` : SAAS_URL

const NAV_LINKS = [
  { label: 'Plataforma',        href: '#platform' },
  { label: 'Sala de Evidências',href: saasPage('audit-room') },
  { label: 'Documentos',        href: saasPage('documentos') },
  { label: 'Contacto',          href: '#contact' },
]

const QUICK_ACCESS = [
  { label: 'Dashboard',          href: saasPage('dashboard') },
  { label: 'Sala de Auditoria',  href: saasPage('audit-room') },
  { label: 'Cofre de Documentos',href: saasPage('documentos') },
  { label: 'Monitoramento KPI',  href: saasPage('monitoring') },
  { label: 'Reclamações GRM',    href: saasPage('reclamacoes') },
]

const VIDEO_HERO = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4'

const CARD_ICONS = [
  '/card-loan.png',
  '/card-audit.png',
  '/card-es.png',
  '/card-decision.png',
]

const SLIDES: Record<Lang, SlideData> = {
  PT: {
    lines: [
      { text: 'ESTEJA PRONTO',    size: 'text-[clamp(2.4rem,7vw,6rem)]',   weight: 'font-bold',  op: 'opacity-100' },
      { text: 'PARA A AUDITORIA', size: 'text-[clamp(1.6rem,4.5vw,4rem)]', weight: 'font-light', op: 'opacity-50' },
      { text: 'ANTES DO',         size: 'text-[clamp(2.4rem,7vw,6rem)]',   weight: 'font-bold',  op: 'opacity-80' },
      { text: 'FINANCIADOR.',     size: 'text-[clamp(1.4rem,3.8vw,3.4rem)]',weight: 'font-light', op: 'opacity-22' },
    ],
    sub: 'O SGAS Pro ajuda empresas a prepararem-se para auditorias, due diligence ambiental e social, e pedidos de financiamento junto do Banco Mundial, IFC e outros financiadores de desenvolvimento.',
    cta1: 'Preparar Auditoria',
    cta2: 'Ver Sala de Evidências',
    trust: 'Plataforma IFC · Banco Mundial · CAO Compliant · ESAP Ready',
  },
  FR: {
    lines: [
      { text: 'SOYEZ PRÊT',      size: 'text-[clamp(2.4rem,7vw,6rem)]',   weight: 'font-bold',  op: 'opacity-100' },
      { text: "POUR L'AUDIT",    size: 'text-[clamp(1.6rem,4.5vw,4rem)]', weight: 'font-light', op: 'opacity-50' },
      { text: 'AVANT LE',        size: 'text-[clamp(2.4rem,7vw,6rem)]',   weight: 'font-bold',  op: 'opacity-80' },
      { text: 'FINANCEUR.',      size: 'text-[clamp(1.4rem,3.8vw,3.4rem)]',weight: 'font-light', op: 'opacity-22' },
    ],
    sub: "SGAS Pro aide les entreprises à se préparer aux audits, à la due diligence environnementale et sociale, et aux demandes de financement auprès de la Banque mondiale, de l'IFC.",
    cta1: "Préparer L'Audit",
    cta2: 'Voir La Salle De Preuves',
    trust: 'Plateforme IFC · Banque mondiale · CAO Compliant · ESAP Ready',
  },
  EN: {
    lines: [
      { text: 'BE AUDIT',        size: 'text-[clamp(2.4rem,7vw,6rem)]',   weight: 'font-bold',  op: 'opacity-100' },
      { text: 'READY',           size: 'text-[clamp(2rem,6vw,5.5rem)]',   weight: 'font-bold',  op: 'opacity-100' },
      { text: 'BEFORE THE',      size: 'text-[clamp(1.6rem,4.5vw,4rem)]', weight: 'font-light', op: 'opacity-50' },
      { text: 'LENDER.',         size: 'text-[clamp(1.4rem,3.8vw,3.4rem)]',weight: 'font-light', op: 'opacity-22' },
    ],
    sub: 'SGAS Pro helps companies prepare for environmental and social audits, IFC / World Bank due diligence, and loan applications with development-finance institutions.',
    cta1: 'Prepare for Audit',
    cta2: 'View Evidence Room',
    trust: 'IFC Performance Standards · World Bank ESF · CAO Compliant · ESAP Ready',
  },
}

const CARDS_DATA: Record<Lang, CardData[]> = {
  PT: [
    { n: '01', title: 'Preparado para Financiamento',  href: saasPage('dashboard'),  checks: ['Due diligence IFC / Banco Mundial organizada', 'Readiness score antes da aprovação do loan', 'Evidências indexadas por performance standard'] },
    { n: '02', title: 'Preparado para Auditoria',      href: saasPage('audit-room'), checks: ['Documentos, fotos e inspecções centralizados', 'Reclamações encerradas e rastreadas com datas', 'KPIs e validações de gestão prontos para revisão'] },
    { n: '03', title: 'Preparado para Controlo E&S',   href: saasPage('esap'),        checks: ['ESAP / ESCP com prazos e responsáveis', 'Empreiteiros e partes interessadas monitorizados', 'Relatórios ao financiador gerados automaticamente'] },
    { n: '04', title: 'Preparado para Decisão',        href: saasPage('relatorio'),   checks: ['Dashboard: pronto vs. o que falta', 'Gaps que podem bloquear o financiador', 'Visão executiva para decisão rápida'] },
  ],
  FR: [
    { n: '01', title: 'Prêt Pour Le Financement',     href: saasPage('dashboard'),  checks: ['Due diligence IFC / Banque mondiale organisée', 'Score de préparation avant approbation', 'Preuves indexées par performance standard'] },
    { n: '02', title: "Prêt Pour L'Audit",            href: saasPage('audit-room'), checks: ['Documents, photos, inspections centralisés', 'Plaintes clôturées et tracées avec dates', 'KPIs et validations prêts pour révision'] },
    { n: '03', title: 'Prêt Pour Le Contrôle E&S',    href: saasPage('esap'),        checks: ['ESAP / ESCP avec délais et responsables', 'Sous-traitants et parties prenantes surveillés', 'Rapports financeur générés automatiquement'] },
    { n: '04', title: 'Prêt Pour La Décision',        href: saasPage('relatorio'),   checks: ['Tableau de bord : prêt vs. manquant', 'Écarts pouvant bloquer le financeur', 'Vue exécutive pour décision rapide'] },
  ],
  EN: [
    { n: '01', title: 'Built for Loan Readiness',      href: saasPage('dashboard'),  checks: ['IFC / World Bank due diligence organized', 'Readiness score before loan approval', 'Evidence indexed by performance standard'] },
    { n: '02', title: 'Built for Audit Evidence',      href: saasPage('audit-room'), checks: ['Documents, photos, inspections centralized', 'Grievances closed and tracked with dates', 'KPIs and management validations review-ready'] },
    { n: '03', title: 'Built for E&S Control',         href: saasPage('esap'),        checks: ['ESAP / ESCP tracked with deadlines and owners', 'Contractors and stakeholders monitored', 'Lender reports generated automatically'] },
    { n: '04', title: 'Built for Management Decisions',href: saasPage('relatorio'),   checks: ['Dashboard: ready vs. missing', 'Gaps that could block lender confidence', 'Executive view for fast decision-making'] },
  ],
}

const CLOSE: Record<Lang, [string, string]> = {
  PT: ['Não espere pela auditoria para descobrir os gaps.', 'Construa hoje a sua sala de evidências para financiadores.'],
  FR: ["N'attendez pas l'audit pour découvrir les écarts.", "Construisez dès aujourd'hui votre salle de preuves."],
  EN: ['Do not wait for the audit to discover the gaps.', 'Build your lender-ready evidence room today.'],
}

const FOOTER_COLS = [
  { label: 'SaaS', links: [
    { text: 'Abrir Dashboard',      href: saasPage('dashboard') },
    { text: 'Sala de Auditoria BM', href: saasPage('audit-room') },
    { text: 'Cofre de Documentos',  href: saasPage('documentos') },
    { text: 'Calendário IFC',       href: saasPage('calendario') },
  ] },
  { label: 'Controlo E&S', links: [
    { text: 'Plano ESAP',        href: saasPage('esap') },
    { text: 'Registo de Riscos', href: saasPage('riscos') },
    { text: 'Reclamações GRM',   href: saasPage('reclamacoes') },
    { text: 'Monitoramento KPI', href: saasPage('monitoring') },
  ] },
  { label: 'Preparação', links: [
    { text: 'Partes Interessadas', href: saasPage('stakeholders') },
    { text: 'Empreiteiros',        href: saasPage('terceiros') },
    { text: 'Registo Legal',       href: saasPage('legal') },
    { text: 'Falar com a equipa',  href: 'mailto:contact@hsilva.com?subject=SGAS%20Pro' },
  ] },
]

// ─── Green accent ─────────────────────────────────────────────────────────────
const GREEN = 'hsl(119,99%,46%)'
const GREEN_DIM = 'rgba(41,245,2,0.12)'
const GREEN_BORDER = 'rgba(41,245,2,0.28)'

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState<Lang>('PT')
  const [splineLoaded, setSplineLoaded] = useState(false)
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-80px' })

  useEffect(() => {
    const timer = setInterval(() => {
      setLang(prev => LANGS[(LANGS.indexOf(prev) + 1) % LANGS.length])
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const slide = SLIDES[lang]

  return (
    <div className="min-h-screen bg-hero-bg antialiased">

      {/* ═══════════════════════════════════════════
          NAVBAR — fixed, floating, transparent
      ═══════════════════════════════════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 lg:px-16 py-5">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/hsilva-logo.jpg" alt="HSILVA" className="h-8 w-8 rounded-md object-cover" />
          <span className="text-xl font-semibold tracking-tight text-foreground">
            SGAS <span style={{ color: GREEN }}>PRO</span>
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              className="text-xs uppercase tracking-widest transition-colors duration-200"
              style={{ color: 'hsl(0,0%,60%)' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,96%)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,60%)' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={saasPage('audit-room')}
          className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-widest transition-all duration-200 active:scale-[0.97] cursor-pointer"
          style={{ backgroundColor: 'hsl(0,0%,18%)', color: 'hsl(0,0%,96%)' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(0,0%,22%)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'hsl(0,0%,18%)' }}
        >
          Preparar Auditoria
        </a>
      </nav>

      {/* ═══════════════════════════════════════════
          HERO — full-screen, Spline 3D + content bottom-left
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex items-end"
        style={{ minHeight: '100vh', background: 'hsl(0,0%,8%)' }}
      >
        {/* Spline 3D background */}
        <div className="absolute inset-0">
          <Suspense fallback={
            <div className="absolute inset-0" style={{ background: 'hsl(0,0%,8%)' }}>
              {/* Fallback: video while Spline loads */}
              <video
                src={VIDEO_HERO}
                poster="/hero-bg.png"
                autoPlay loop muted playsInline
                className="w-full h-full object-cover opacity-40"
              />
            </div>
          }>
            <Spline
              scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
              className="w-full h-full"
              onLoad={() => setSplineLoaded(true)}
            />
          </Suspense>
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 z-[1] pointer-events-none" />

        {/* Subtle noise grain */}
        <div className="noise-overlay absolute inset-0 z-[2] opacity-[0.3] mix-blend-overlay pointer-events-none" />

        {/* Bottom-left content — pointer-events-none so Spline stays interactive */}
        <div
          className="relative z-10 pointer-events-none w-full max-w-[90%] sm:max-w-lg lg:max-w-2xl px-6 md:px-10 pb-10 pt-32"
          style={{ opacity: splineLoaded || true ? 1 : 0, transition: 'opacity 0.5s' }}
        >
          {/* Language switcher */}
          <div className="flex items-center gap-1 mb-7 pointer-events-auto">
            {LANGS.map((l, i) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className="text-[9px] font-medium tracking-[0.2em] px-2.5 py-1 rounded transition-all duration-300 cursor-pointer"
                style={{
                  color: lang === l ? GREEN : 'rgba(255,255,255,0.28)',
                  backgroundColor: lang === l ? GREEN_DIM : 'transparent',
                  border: lang === l ? `1px solid ${GREEN_BORDER}` : '1px solid transparent',
                }}
              >
                {l}
                {i < LANGS.length - 1 && <span className="ml-1 opacity-20">·</span>}
              </button>
            ))}
            {/* Progress bar */}
            <div className="ml-3 relative h-px w-16 overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                key={lang}
                className="absolute left-0 top-0 h-full rounded-full"
                style={{ background: GREEN }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 7, ease: 'linear' }}
              />
            </div>
          </div>

          {/* Stacked headline — AnimatePresence per language */}
          <AnimatePresence mode="wait">
            <motion.div
              key={lang + '-h'}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="mb-5"
            >
              {slide.lines.map((line, i) => (
                <motion.span
                  key={line.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className={`block leading-[0.92] tracking-[-0.045em] ${line.size} ${line.weight} ${line.op}`}
                  style={{ color: 'hsl(0,0%,96%)' }}
                >
                  {line.text}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Sub text */}
          <AnimatePresence mode="wait">
            <motion.p
              key={lang + '-s'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-sm md:text-base font-light leading-relaxed mb-7 max-w-[44ch]"
              style={{ color: 'rgba(255,255,255,0.6)' }}
            >
              {slide.sub}
            </motion.p>
          </AnimatePresence>

          {/* CTA buttons — pointer-events-auto to re-enable clicks over Spline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={lang + '-cta'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="flex flex-wrap gap-3 pointer-events-auto"
            >
              <a
                href={saasPage('audit-room')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 md:px-8 md:py-4 text-sm font-bold rounded-sm cursor-pointer transition-all duration-200 active:scale-[0.97]"
                style={{ backgroundColor: GREEN, color: 'hsl(0,0%,4%)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)' }}
              >
                {slide.cta1}
              </a>
              <a
                href={saasPage()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 md:px-8 md:py-4 text-sm font-bold rounded-sm cursor-pointer transition-all duration-200 active:scale-[0.97]"
                style={{ backgroundColor: 'hsl(0,0%,96%)', color: 'hsl(0,0%,8%)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(0.9)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.filter = 'brightness(1)' }}
              >
                {slide.cta2}
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Trust line */}
          <AnimatePresence mode="wait">
            <motion.p
              key={lang + '-trust'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-[10px] font-light mt-6"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {slide.trust}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          QUICK ACCESS STRIP
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-10 py-10" style={{ background: 'hsl(0,0%,10%)' }}>
        <div
          className="max-w-6xl mx-auto rounded-xl px-6 py-5 md:px-8 md:py-6"
          style={{ border: '1px solid hsl(0,0%,20%)', backgroundColor: 'hsl(0,0%,12%)' }}
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[9px] uppercase tracking-[0.22em] mb-1.5" style={{ color: 'hsl(0,0%,40%)' }}>
                Entrada directa no SaaS
              </p>
              <h2 className="text-xl md:text-2xl font-semibold tracking-tight" style={{ color: 'hsl(0,0%,96%)' }}>
                Abra o módulo certo no momento certo.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {QUICK_ACCESS.map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-4 py-2 text-[11px] font-medium transition-all duration-200 cursor-pointer"
                  style={{ border: '1px solid hsl(0,0%,22%)', color: 'rgba(255,255,255,0.65)', backgroundColor: 'transparent' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget
                    el.style.borderColor = GREEN_BORDER
                    el.style.color = GREEN
                    el.style.backgroundColor = GREEN_DIM
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget
                    el.style.borderColor = 'hsl(0,0%,22%)'
                    el.style.color = 'rgba(255,255,255,0.65)'
                    el.style.backgroundColor = 'transparent'
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PLATFORM CARDS
      ═══════════════════════════════════════════ */}
      <section id="platform" className="relative px-6 md:px-10 py-12 pb-20" style={{ background: 'hsl(0,0%,10%)' }}>
        <div className="bg-noise absolute inset-0 opacity-[0.08] pointer-events-none" />

        <p className="relative text-[9px] uppercase tracking-[0.22em] mb-10" style={{ color: 'hsl(0,0%,35%)' }}>
          Platform capabilities
        </p>

        <div
          ref={cardsRef}
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-5"
        >
          <AnimatePresence mode="wait">
            {CARDS_DATA[lang].map((card, i) => (
              <motion.div
                key={lang + card.n}
                initial={{ opacity: 0, y: 20 }}
                animate={cardsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-xl p-8 flex flex-col gap-6 min-h-[380px] cursor-default group transition-all duration-300"
                style={{
                  backgroundColor: 'hsl(0,0%,12%)',
                  border: '1px solid hsl(0,0%,20%)',
                }}
                whileHover={{
                  borderColor: GREEN_BORDER,
                  backgroundColor: 'hsl(0,0%,13%)',
                  y: -3,
                }}
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={CARD_ICONS[i]} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Number + Title */}
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] tracking-[0.22em] uppercase font-medium" style={{ color: 'hsl(0,0%,35%)' }}>
                    {card.n}
                  </span>
                  <h3 className="text-lg md:text-xl font-semibold leading-tight" style={{ color: 'hsl(0,0%,96%)' }}>
                    {card.title}
                  </h3>
                </div>

                {/* Checklist */}
                <ul className="flex flex-col gap-4 flex-1">
                  {card.checks.map(c => (
                    <li key={c} className="flex items-start gap-3">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: GREEN }} />
                      <span className="text-[13px] leading-relaxed" style={{ color: 'hsl(0,0%,60%)' }}>
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-lg text-[12px] font-semibold tracking-wide transition-all duration-200 cursor-pointer mt-2"
                  style={{ color: GREEN, border: `1px solid ${GREEN_BORDER}`, backgroundColor: GREEN_DIM }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(41,245,2,0.2)' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.backgroundColor = GREEN_DIM }}
                >
                  Abrir módulo <ArrowRight size={12} />
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CLOSE + @efferd CTA
      ═══════════════════════════════════════════ */}
      <section className="px-6 md:px-10 py-20" style={{ background: 'hsl(0,0%,10%)' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto text-center mb-14"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={lang + '-close'}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-[-0.03em] leading-[1.15] mb-3" style={{ color: 'hsl(0,0%,96%)' }}>
                {CLOSE[lang][0]}
              </p>
              <p className="text-2xl sm:text-3xl md:text-4xl font-light tracking-[-0.03em] leading-[1.15]" style={{ color: 'hsl(0,0%,40%)' }}>
                {CLOSE[lang][1]}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}
      <div id="contact" className="px-5 md:px-8 pb-6" style={{ background: 'hsl(0,0%,10%)' }}>
        <motion.footer
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="liquid-glass w-full rounded-2xl p-6 md:p-10"
          style={{ border: '1px solid hsl(0,0%,18%)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-5">
                <img src="/hsilva-logo.jpg" alt="HSILVA" className="h-9 w-9 rounded-lg object-cover" />
                <span className="text-base font-semibold tracking-tight">
                  SGAS <span style={{ color: GREEN }}>PRO</span>
                </span>
              </div>
              <p className="text-[13px] leading-relaxed max-w-sm" style={{ color: 'hsl(0,0%,42%)' }}>
                Porta de entrada para preparar auditorias, due diligence IFC / Banco Mundial e salas de evidências para financiadores.
              </p>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {FOOTER_COLS.map(col => (
                <div key={col.label}>
                  <h4 className="text-[9px] uppercase tracking-[0.2em] font-semibold mb-5" style={{ color: GREEN }}>
                    {col.label}
                  </h4>
                  <ul className="space-y-2.5">
                    {col.links.map(link => (
                      <li key={link.text}>
                        <a
                          href={link.href}
                          className="text-[12px] transition-colors duration-200 cursor-pointer"
                          style={{ color: 'hsl(0,0%,45%)' }}
                          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,96%)' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,45%)' }}
                        >
                          {link.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid hsl(0,0%,18%)' }}>
            <p className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'hsl(0,0%,30%)' }}>
              SGAS Pro · Audit room readiness
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="text-[9px] uppercase tracking-[0.2em]" style={{ color: 'hsl(0,0%,30%)' }}>
                Acesso rápido:
              </span>
              {QUICK_ACCESS.slice(0, 3).map(item => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[11px] transition-colors duration-200 cursor-pointer"
                  style={{ color: 'hsl(0,0%,40%)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = GREEN }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'hsl(0,0%,40%)' }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </motion.footer>
      </div>

    </div>
  )
}
