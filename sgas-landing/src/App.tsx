import { useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  ClipboardCheck,
  FolderCheck,
  Radar,
  AlertTriangle,
  Sparkles,
  ShieldCheck,
  Globe2,
  MessageCircle,
} from 'lucide-react'
import heroLoopFull from './assets/hero-loop-full.mp4'
import heroLoop2 from './assets/hero-loop-2.mp4'

// lucide-react v1 dropped brand/logo icons — minimal inline replacements
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.86 0-2.15 1.45-2.15 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
    </svg>
  )
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.4c0-.87.24-1.46 1.49-1.46h1.6V4.28C16.3 4.2 15.3 4.1 14.1 4.1c-2.4 0-4.05 1.47-4.05 4.16v2.24H7.5v3h2.55V21h3.45z" />
    </svg>
  )
}
function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.6a2.7 2.7 0 0 0-1.9-1.9C18 5.2 12 5.2 12 5.2s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.6C2 9.3 2 12 2 12s0 2.7.4 4.4a2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9c.4-1.7.4-4.4.4-4.4s0-2.7-.4-4.4zM10 15.2V8.8L15.8 12 10 15.2z" />
    </svg>
  )
}

type Lang = 'pt' | 'en'

const T = {
  pt: {
    nav: { modules: 'Módulos', benefits: 'Benefícios', form: 'Começar', dashboard: 'Ver painel', cta: 'Entrar' },
    badge: 'SGAS Pro · HSE Management',
    heroTitle1: 'O SGAS da sua empresa pode ser organizado em',
    heroTitleAccent: 'minutos — não em meses.',
    heroSub:
      'O SGAS Pro ajuda empresas a conhecer o seu nível actual de HSE, organizar documentação, identificar falhas e gerir segurança, ambiente, inspecções, incidentes e conformidade numa única plataforma digital.',
    heroCta: 'Começar 2 Dias Grátis',
    heroCta2: 'Ver o painel ao vivo',
    heroTag: 'Descubra o nível real do seu SGAS em menos de 2 minutos.',
    trust: 'Criado para empresas que levam a sério segurança, ambiente, conformidade e controlo de projectos.',
    scoreLabel: 'Nível SGAS',
    missionLabel: 'Diagnóstico',
    missionUnit: 'min',
    liveChip: 'Ao vivo · SGAS Pro',
    problemTag: '01 — O problema',
    problemTitle: 'HSE espalhado em Excel, papel e WhatsApp.',
    problemBody:
      'Muitas empresas ainda gerem HSE com ficheiros Excel espalhados, mensagens no WhatsApp, formulários em papel, documentos em falta, relatórios atrasados e responsabilidades pouco claras. Isso cria risco em auditorias, inspecções, acidentes e execução de projectos.',
    solutionTag: '02 — A solução',
    solutionTitle: 'Uma estrutura digital clara, do primeiro dia.',
    solutionBody:
      'O SGAS Pro dá à sua empresa uma estrutura digital clara para controlar documentação HSE, inspecções, acções correctivas, incidentes, formações, auditorias, indicadores e conformidade do projecto.',
    benefitsTag: '03 — Benefícios',
    benefitsTitle: 'Tudo o que precisa para elevar o nível HSE.',
    benefits: [
      'Conheça o nível real de HSE da sua empresa',
      'Identifique falhas antes das auditorias',
      'Organize documentos e responsabilidades',
      'Melhore o controlo de segurança e conformidade',
      'Reduza trabalho manual e atrasos nos relatórios',
      'Comece com 2 dias de acesso gratuito',
    ],
    formTag: '04 — Comece agora',
    formTitle: 'Comece por nos dizer o básico sobre a sua empresa.',
    formSub: 'Preencha as informações básicas e aceda imediatamente ao sistema SGAS Pro.',
    formNote: 'Comece com 2 dias de acesso gratuito. Sem compromisso. Depois, escolha o pacote ideal para a sua empresa.',
    fields: {
      company: 'Nome da empresa',
      industry: 'Sector / Indústria',
      email: 'Email profissional',
      country: 'País ou província',
      stage: 'Fase actual do projecto',
      level: 'Nível actual de SGAS / HSE',
    },
    industries: ['Construção', 'Óleo & Gás', 'Indústria', 'Logística', 'Engenharia', 'Contratação / Subcontratação', 'Outro'],
    stages: [
      'Fase de planeamento',
      'Projecto em execução',
      'Empresa já em operação',
      'Preparação para auditoria',
      'Precisa organizar o HSE',
      'Precisa apoio em conformidade legal',
    ],
    levels: [
      'Ainda não temos um sistema',
      'Usamos Excel e documentos manuais',
      'Temos alguns procedimentos, mas sem controlo digital',
      'Temos SGAS/HSE, mas está desorganizado',
      'Estamos a preparar auditoria ou certificação',
      'Queremos melhorar indicadores e conformidade',
    ],
    submit: 'Entrar na Plataforma SaaS',
    finalTag: '05 — Última chamada',
    finalTitle: 'O seu SGAS não deve depender apenas de Excel, papel e WhatsApp.',
    finalBody: 'Comece hoje os seus 2 dias de acesso gratuito.',
    finalCta: 'Começar Acesso Gratuito',
    modules: [
      { title: 'Diagnóstico HSE', body: 'Descubra o nível real do seu SGAS em menos de 2 minutos, com pontuação e mapa de gaps.', n: '01' },
      { title: 'Documentação & Procedimentos', body: 'Repositório digital: políticas, procedimentos, registos e versionamento auditável.', n: '02' },
      { title: 'Inspecções & Incidentes', body: 'Checklists móveis, registos de incidentes, acções correctivas com dono e prazo.', n: '03' },
      { title: 'Auditorias & Conformidade', body: 'Pacote pronto para auditor: evidências, indicadores e conformidade legal.', n: '04' },
    ],
    modulesTag: 'Módulos',
    modulesTitle: 'Da avaliação inicial à auditoria — numa só plataforma.',
    modulesSub: 'Cada módulo devolve evidência exportável. Cada gap tem plano de acção com prazo.',
    required: 'obrigatório',
    selectPlaceholder: 'Seleccionar…',
    footerTag: 'SGAS Pro · HSE Management System',
  },
  en: {
    nav: { modules: 'Modules', benefits: 'Benefits', form: 'Get started', dashboard: 'View dashboard', cta: 'Sign in' },
    badge: 'SGAS Pro · HSE Management',
    heroTitle1: "Your company's HSE system can be organized in",
    heroTitleAccent: 'minutes — not months.',
    heroSub:
      'SGAS Pro helps companies understand their current HSE level, organize documentation, identify gaps, and start managing safety, environment, inspections, incidents, and compliance from one digital platform.',
    heroCta: 'Start 2-Day Free Access',
    heroCta2: 'See the live dashboard',
    heroTag: 'Discover the real level of your HSE Management System in less than 2 minutes.',
    trust: 'Built for companies that take safety, environment, compliance, and project control seriously.',
    scoreLabel: 'HSE level',
    missionLabel: 'Assessment',
    missionUnit: 'min',
    liveChip: 'Live · SGAS Pro',
    problemTag: '01 — The problem',
    problemTitle: 'HSE scattered across Excel, paper and WhatsApp.',
    problemBody:
      'Many companies still manage HSE with scattered Excel files, WhatsApp messages, paper forms, missing documents, delayed reports, and unclear responsibilities. This creates risk during audits, inspections, accidents, and project execution.',
    solutionTag: '02 — The solution',
    solutionTitle: 'A clear digital structure — from day one.',
    solutionBody:
      'SGAS Pro gives your company a clear digital structure to control HSE documentation, inspections, corrective actions, incidents, training, audits, indicators, and project compliance.',
    benefitsTag: '03 — Benefits',
    benefitsTitle: 'Everything you need to raise your HSE level.',
    benefits: [
      'Know your company\'s real HSE level',
      'Identify gaps before audits',
      'Organize documents and responsibilities',
      'Improve safety and compliance control',
      'Reduce manual work and reporting delays',
      'Start with 2 days of free access',
    ],
    formTag: '04 — Get started',
    formTitle: 'Start by telling us about your company.',
    formSub: 'Fill in the basic information and access the SGAS Pro system immediately.',
    formNote: 'Start with 2 days of free access. No commitment. After that, choose the package that fits your company.',
    fields: {
      company: 'Company name',
      industry: 'Industry / business sector',
      email: 'Work email',
      country: 'Country or province',
      stage: 'Current project stage',
      level: 'Current SGAS / HSE level',
    },
    industries: ['Construction', 'Oil & Gas', 'Industrial', 'Logistics', 'Engineering', 'Contractor / Subcontractor', 'Other'],
    stages: [
      'Planning stage',
      'Active project',
      'Company already operating',
      'Audit preparation',
      'Needs HSE organization',
      'Needs legal compliance support',
    ],
    levels: [
      'We do not have a system yet',
      'We use Excel and manual documents',
      'We have some procedures but no digital control',
      'We have an HSE system but it is not organized',
      'We are preparing for audits or certification',
      'We want to improve indicators and compliance',
    ],
    submit: 'Enter the SaaS Platform',
    finalTag: '05 — Last call',
    finalTitle: 'Your HSE system should not depend only on Excel, paper, and WhatsApp.',
    finalBody: 'Start your 2-day free access today.',
    finalCta: 'Start Free Access',
    modules: [
      { title: 'HSE Assessment', body: 'Discover your real SGAS level in under 2 minutes, with a score and gap map.', n: '01' },
      { title: 'Documents & Procedures', body: 'Digital repository: policies, procedures, records and auditable versioning.', n: '02' },
      { title: 'Inspections & Incidents', body: 'Mobile checklists, incident logs, corrective actions with owner and due date.', n: '03' },
      { title: 'Audits & Compliance', body: 'Auditor-ready package: evidence, KPIs and legal compliance.', n: '04' },
    ],
    modulesTag: 'Modules',
    modulesTitle: 'From first assessment to audit — on one platform.',
    modulesSub: 'Every module returns exportable evidence. Every gap gets an owner and a deadline.',
    required: 'required',
    selectPlaceholder: 'Select…',
    footerTag: 'SGAS Pro · HSE Management System',
  },
} as const

const MODULE_ICONS = [ClipboardCheck, FolderCheck, Radar, ShieldCheck]

export default function App() {
  const [lang, setLang] = useState<Lang>('pt')
  const t = T[lang]

  const [form, setForm] = useState({
    company: '',
    industry: '',
    email: '',
    country: '',
    stage: '',
    level: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      sessionStorage.setItem('sgas_lead', JSON.stringify({ ...form, lang, ts: Date.now() }))
    } catch {}
    window.location.href = '/sgas-pro.html'
  }

  const set = <K extends keyof typeof form>(k: K, v: string) => setForm((f) => ({ ...f, [k]: v }))

  return (
    <div style={{ background: 'var(--cream)', color: 'var(--emerald-ink)' }} className="min-h-screen overflow-x-hidden">
      {/* NAV */}
      <header className="sticky top-4 z-50 mx-auto max-w-[1400px] px-4">
        <div
          className="flex items-center justify-between rounded-full border px-5 py-2.5 backdrop-blur-md"
          style={{
            background: 'rgba(250, 247, 239, 0.75)',
            borderColor: 'rgba(4, 29, 22, 0.08)',
            boxShadow: '0 8px 32px -12px rgba(4, 29, 22, 0.12)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="grid h-9 w-9 place-items-center rounded-full font-display text-xs font-bold"
              style={{ background: 'var(--emerald-ink)', color: 'var(--gold-soft)' }}
            >
              SGAS
            </div>
            <span className="hidden text-[13px] tracking-wide sm:block" style={{ color: 'var(--emerald-ink)' }}>
              Pro · HSE Management
            </span>
          </div>
          <nav
            className="hidden items-center gap-8 text-[13px] font-medium md:flex"
            style={{ color: 'rgba(4,29,22,0.7)' }}
          >
            <a href="#form" className="hover:text-[color:var(--emerald-deep)]">{t.nav.modules}</a>
            <a href="#form" className="hover:text-[color:var(--emerald-deep)]">{t.nav.benefits}</a>
            <a href="#form" className="hover:text-[color:var(--emerald-deep)]">{t.nav.form}</a>
            <a href="#form" className="hover:text-[color:var(--emerald-deep)]">{t.nav.dashboard}</a>
          </nav>
          <div className="flex items-center gap-2">
            {/* Language toggle */}
            <div
              className="flex items-center gap-1 rounded-full border p-1 text-[11px] font-semibold"
              style={{ borderColor: 'rgba(4,29,22,0.12)', background: 'rgba(255,255,255,0.6)' }}
            >
              {(['pt', 'en'] as Lang[]).map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => setLang(l)}
                  className="rounded-full px-2.5 py-1 uppercase tracking-wider transition-colors"
                  style={{
                    background: lang === l ? 'var(--emerald-ink)' : 'transparent',
                    color: lang === l ? 'var(--gold-soft)' : 'rgba(4,29,22,0.6)',
                  }}
                  aria-pressed={lang === l}
                >
                  <span className="inline-flex items-center gap-1">
                    <Globe2 className="h-3 w-3" /> {l}
                  </span>
                </button>
              ))}
            </div>
            <a
              href="/sgas-pro.html"
              className="group inline-flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-semibold transition-transform hover:-translate-y-0.5 sm:px-4"
              style={{ background: 'var(--emerald-ink)', color: 'var(--gold-soft)' }}
            >
              {t.nav.cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative mx-auto max-w-[1400px] px-6 pt-14 pb-24 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em]"
              style={{
                borderColor: 'rgba(13, 122, 95, 0.25)',
                background: 'var(--emerald-soft)',
                color: 'var(--emerald-deep)',
              }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--emerald)' }} />
              {t.badge}
            </div>

            <h1
              className="font-display mt-6 text-[clamp(2.4rem,5.6vw,5rem)] font-semibold leading-[1]"
              style={{ color: 'var(--emerald-ink)' }}
            >
              {t.heroTitle1}{' '}
              <span className="relative inline-block">
                <span className="relative z-10 italic" style={{ color: 'var(--emerald-deep)' }}>
                  {t.heroTitleAccent}
                </span>
                <svg className="absolute -bottom-2 left-0 h-3 w-full" viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 8 Q 80 2, 150 6 T 298 4" fill="none" stroke="var(--gold)" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-relaxed" style={{ color: 'rgba(4, 29, 22, 0.72)' }}>
              {t.heroSub}
            </p>

            <p className="mt-6 max-w-xl text-[14px] font-medium" style={{ color: 'var(--emerald-deep)' }}>
              <Sparkles className="mr-1.5 inline h-4 w-4" /> {t.heroTag}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#form"
                className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold shadow-[0_16px_40px_-16px_rgba(4,29,22,0.6)] transition-transform hover:-translate-y-0.5"
                style={{ background: 'var(--emerald-ink)', color: 'var(--gold-soft)' }}
              >
                {t.heroCta}
                <span
                  className="grid h-7 w-7 place-items-center rounded-full transition-transform group-hover:translate-x-1"
                  style={{ background: 'var(--gold)', color: 'var(--emerald-ink)' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </a>
              <a
                href="/sgas-pro.html"
                className="inline-flex items-center gap-2 text-[14px] font-semibold underline-offset-4 hover:underline"
                style={{ color: 'var(--emerald-deep)' }}
              >
                {t.heroCta2}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <div className="mt-10 flex items-center gap-4 border-t pt-6" style={{ borderColor: 'rgba(4,29,22,0.08)' }}>
              <div className="grid h-10 w-10 place-items-center rounded-full" style={{ background: 'var(--emerald-soft)' }}>
                <BadgeCheck className="h-5 w-5" style={{ color: 'var(--emerald-deep)' }} />
              </div>
              <p className="text-[13px]" style={{ color: 'rgba(4,29,22,0.7)' }}>
                {t.trust}
              </p>
            </div>
          </div>

          {/* RIGHT — two videos side by side */}
          <div className="relative lg:col-span-5">
            <div className="grid grid-cols-2 gap-3">
              {[heroLoopFull, heroLoop2].map((src, idx) => (
                <a
                  href="#form"
                  key={src}
                  aria-label={t.heroCta}
                  className={`group relative block aspect-[3/5] w-full overflow-hidden rounded-[22px] border transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                    idx === 1 ? 'mt-8' : ''
                  }`}
                  style={{
                    borderColor: 'rgba(4,29,22,0.12)',
                    boxShadow:
                      '0 30px 60px -30px rgba(4,29,22,0.4), 0 0 0 1px rgba(201,168,76,0.15) inset',
                  }}
                >
                  <video
                    className="pointer-events-none h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(4,29,22,0.05) 0%, rgba(4,29,22,0) 40%, rgba(4,29,22,0.7) 100%)',
                    }}
                  />
                  {/* hover CTA veil */}
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ background: 'rgba(4,29,22,0.35)' }}
                  >
                    <span
                      className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold shadow-lg"
                      style={{ background: 'var(--gold)', color: 'var(--emerald-ink)' }}
                    >
                      {t.heroCta}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  {idx === 0 && (
                    <div
                      className="absolute left-3 top-3 flex items-center gap-2 rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider backdrop-blur-md"
                      style={{
                        background: 'rgba(250,247,239,0.85)',
                        borderColor: 'rgba(4,29,22,0.1)',
                        color: 'var(--emerald-ink)',
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 animate-pulse rounded-full"
                        style={{ background: 'var(--emerald)' }}
                      />
                      {t.liveChip}
                    </div>
                  )}
                  <div
                    className="absolute bottom-3 left-3 right-3 rounded-xl border p-3 backdrop-blur-md"
                    style={{
                      background: 'rgba(4, 29, 22, 0.55)',
                      borderColor: 'rgba(201,168,76,0.25)',
                      color: 'var(--gold-soft)',
                    }}
                  >
                    <p
                      className="text-[9px] uppercase tracking-[0.2em]"
                      style={{ color: 'rgba(245,240,224,0.6)' }}
                    >
                      {idx === 0 ? t.scoreLabel : t.missionLabel}
                    </p>
                    <p className="font-display mt-1 text-2xl font-semibold">
                      {idx === 0 ? (
                        <>
                          31<span style={{ color: 'var(--gold)' }}>%</span>
                        </>
                      ) : (
                        <>
                          2
                          <span
                            className="ml-1 text-[10px] font-normal"
                            style={{ color: 'rgba(245,240,224,0.6)' }}
                          >
                            {t.missionUnit}
                          </span>
                        </>
                      )}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <div
              className="absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'var(--gold)', opacity: 0.35 }}
            />
            <div
              className="absolute -top-6 -left-6 -z-10 h-40 w-40 rounded-full blur-3xl"
              style={{ background: 'var(--emerald)', opacity: 0.25 }}
            />
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION */}
      <section className="mx-auto max-w-[1400px] px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <article
            className="rounded-3xl border p-8 md:p-10"
            style={{ background: 'var(--surface-container-lowest)', borderColor: 'rgba(4,29,22,0.08)' }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: 'rgba(201,60,60,0.1)', color: '#a83636' }}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: '#a83636' }}>
                {t.problemTag}
              </p>
            </div>
            <h2 className="font-display mt-5 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.1]" style={{ color: 'var(--emerald-ink)' }}>
              {t.problemTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'rgba(4,29,22,0.65)' }}>
              {t.problemBody}
            </p>
          </article>

          <article
            className="rounded-3xl border p-8 md:p-10"
            style={{ background: 'var(--emerald-ink)', borderColor: 'rgba(201,168,76,0.2)', color: 'var(--gold-soft)' }}
          >
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl" style={{ background: 'rgba(201,168,76,0.15)', color: 'var(--gold)' }}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--gold)' }}>
                {t.solutionTag}
              </p>
            </div>
            <h2 className="font-display mt-5 text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-[1.1]">
              {t.solutionTitle}
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: 'rgba(245,240,224,0.75)' }}>
              {t.solutionBody}
            </p>
          </article>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--emerald)' }}>
              {t.modulesTag}
            </p>
            <h2 className="font-display mt-4 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.05]" style={{ color: 'var(--emerald-ink)' }}>
              {t.modulesTitle}
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed" style={{ color: 'rgba(4,29,22,0.65)' }}>
              {t.modulesSub}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8">
            {t.modules.map((m, i) => {
              const I = MODULE_ICONS[i]
              const featured = i === 0
              return (
                <article
                  key={m.n}
                  className={`group relative overflow-hidden rounded-3xl border p-7 transition-all hover:-translate-y-1 ${
                    featured ? 'sm:col-span-2' : ''
                  }`}
                  style={{
                    background: featured ? 'var(--emerald-ink)' : 'var(--surface-container-lowest)',
                    borderColor: featured ? 'rgba(201,168,76,0.2)' : 'rgba(4,29,22,0.08)',
                    color: featured ? 'var(--gold-soft)' : 'var(--emerald-ink)',
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div
                      className="grid h-12 w-12 place-items-center rounded-2xl"
                      style={{
                        background: featured ? 'rgba(201,168,76,0.15)' : 'var(--emerald-soft)',
                        color: featured ? 'var(--gold)' : 'var(--emerald-deep)',
                      }}
                    >
                      <I className="h-6 w-6" strokeWidth={1.75} />
                    </div>
                    <span
                      className="font-display text-sm font-semibold tracking-widest"
                      style={{ color: featured ? 'rgba(245,240,224,0.4)' : 'rgba(4,29,22,0.3)' }}
                    >
                      {m.n}
                    </span>
                  </div>
                  <h3 className="font-display mt-6 text-[22px] font-semibold leading-tight">{m.title}</h3>
                  <p
                    className="mt-3 text-[14px] leading-relaxed"
                    style={{ color: featured ? 'rgba(245,240,224,0.75)' : 'rgba(4,29,22,0.62)' }}
                  >
                    {m.body}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section
        id="benefits"
        className="relative overflow-hidden"
        style={{ background: 'var(--emerald-ink)', color: 'var(--gold-soft)' }}
      >
        <div className="absolute inset-0 grain-noise opacity-70" aria-hidden />
        <div className="relative mx-auto max-w-[1400px] px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--gold)' }}>
                {t.benefitsTag}
              </p>
              <h2 className="font-display mt-4 text-[clamp(2rem,3.4vw,3rem)] font-semibold leading-[1.05]">
                {t.benefitsTitle}
              </h2>
            </div>
          </div>
          <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {t.benefits.map((b) => (
              <li
                key={b}
                className="flex items-start gap-3 rounded-2xl border p-5"
                style={{ borderColor: 'rgba(201,168,76,0.15)', background: 'rgba(255,255,255,0.02)' }}
              >
                <span
                  className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full"
                  style={{ background: 'var(--gold)', color: 'var(--emerald-ink)' }}
                >
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[15px] leading-relaxed" style={{ color: 'rgba(245,240,224,0.9)' }}>
                  {b}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* MONEY-BACK GUARANTEE — cinematic liquid-glass */}
      {(() => {
        const g =
          lang === 'pt'
            ? {
                eyebrow: 'Garantia de devolução',
                title: 'Teste sem risco. Se não ficar satisfeito, devolvemos o seu dinheiro.',
                body:
                  'Temos confiança no valor da nossa plataforma. Se, após adquirir um pacote, perceber que o SGAS Pro não ajuda a sua empresa a organizar melhor a gestão de HSE, documentação, auditorias, inspecções, acções correctivas e conformidade básica do projecto, garantimos a devolução do seu dinheiro dentro do período definido.',
                cta: 'Começar Teste Gratuito',
                note:
                  'Aplicam-se termos e condições. A garantia é válida dentro do período definido após a compra do pacote.',
                badge: 'Confiança · Transparência · Compromisso',
              }
            : {
                eyebrow: 'Money-back guarantee',
                title: 'Try it risk-free. If you are not satisfied, we give your money back.',
                body:
                  'We are confident in the value of our platform. If, after purchasing a package, you feel that SGAS Pro does not help your company better organize HSE management, documentation, audits, inspections, corrective actions, and basic project compliance, we guarantee your money back within the defined period.',
                cta: 'Start Free Trial',
                note:
                  'Terms and conditions apply. The guarantee is valid within the defined period after purchasing a package.',
                badge: 'Trust · Transparency · Commitment',
              }
        return (
          <section
            id="guarantee"
            className="relative isolate overflow-hidden bg-black"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
              @keyframes guarantee-bob { 0%,100% { transform: translateY(0) scale(1.03);} 50% { transform: translateY(-6px) scale(1.03);} }
              .guarantee-glass {
                background: rgba(255,255,255,0.04);
                background-blend-mode: luminosity;
                backdrop-filter: blur(14px) saturate(140%);
                border: 1px solid rgba(255,255,255,0.14);
                box-shadow: inset 0 1px 1px rgba(255,255,255,0.12), 0 30px 80px -20px rgba(0,0,0,0.6);
                position: relative;
                overflow: hidden;
              }
              .guarantee-glass::before {
                content: '';
                position: absolute; inset: 0;
                border-radius: inherit;
                padding: 1.4px;
                background: linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.55) 100%);
                -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                -webkit-mask-composite: xor;
                        mask-composite: exclude;
                pointer-events: none;
              }
              .guarantee-bob { animation: guarantee-bob 6s ease-in-out infinite; will-change: transform; }
            `}</style>

            {/* Background video */}
            <video
              src={heroLoopFull}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover guarantee-bob"
              aria-hidden
            />
            {/* Cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" aria-hidden />
            <div
              className="absolute inset-0"
              aria-hidden
              style={{
                background:
                  'radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.18), transparent 55%), radial-gradient(ellipse at 80% 90%, rgba(13,122,95,0.25), transparent 60%)',
              }}
            />

            <div className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-6 py-24 md:py-32">
              <div
                className="guarantee-glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                <ShieldCheck size={14} className="text-white/90" />
                <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/85">
                  {g.eyebrow}
                </span>
              </div>

              <div className="guarantee-glass w-full rounded-[32px] p-8 md:p-14 text-center">
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full"
                     style={{
                       background: 'linear-gradient(135deg, rgba(201,168,76,0.35), rgba(13,122,95,0.35))',
                       boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.35), 0 10px 30px rgba(201,168,76,0.25)',
                     }}>
                  <ShieldCheck size={40} className="text-white" strokeWidth={1.5} />
                </div>

                <h2 className="mx-auto max-w-3xl text-3xl italic leading-[1.15] text-white md:text-5xl">
                  {g.title}
                </h2>

                <p
                  className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {g.body}
                </p>

                <div className="mt-10 flex flex-col items-center gap-4">
                  <a
                    href="#form"
                    className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(255,255,255,0.6)] transition hover:scale-[1.02] hover:bg-white/95"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {g.cta}
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                  </a>

                  <p
                    className="max-w-xl text-xs leading-relaxed text-white/55"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {g.note}
                  </p>
                </div>

                <div
                  className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/50"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {g.badge}
                </div>
              </div>
            </div>
          </section>
        )
      })()}

      {/* FORM */}
      <section id="form" className="mx-auto max-w-[1400px] px-6 py-20 md:py-28">
        <div
          className="relative overflow-hidden rounded-[36px] border p-8 md:p-14"
          style={{
            background: 'linear-gradient(135deg, var(--emerald-soft) 0%, var(--cream) 60%, var(--gold-soft) 100%)',
            borderColor: 'rgba(4,29,22,0.08)',
          }}
        >
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--emerald-deep)' }}>
                {t.formTag}
              </p>
              <h2 className="font-display mt-4 text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.05]" style={{ color: 'var(--emerald-ink)' }}>
                {t.formTitle}
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: 'rgba(4,29,22,0.7)' }}>
                {t.formSub}
              </p>
              <div
                className="mt-6 flex items-start gap-3 rounded-2xl border p-4"
                style={{ borderColor: 'rgba(4,29,22,0.1)', background: 'rgba(255,255,255,0.6)' }}
              >
                <Sparkles className="mt-0.5 h-4 w-4 flex-none" style={{ color: 'var(--emerald-deep)' }} />
                <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(4,29,22,0.75)' }}>
                  {t.formNote}
                </p>
              </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <Field label={t.fields.company} required>
                <input
                  required
                  value={form.company}
                  onChange={(e) => set('company', e.target.value)}
                  className="w-full rounded-xl border bg-white/80 px-4 py-3 text-[14px] outline-none focus:ring-2"
                  style={{ borderColor: 'rgba(4,29,22,0.12)', color: 'var(--emerald-ink)' }}
                  placeholder="Acme Construction, Lda."
                  maxLength={120}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={t.fields.industry} required>
                  <Select value={form.industry} onChange={(v) => set('industry', v)} placeholder={t.selectPlaceholder} options={t.industries as unknown as string[]} />
                </Field>
                <Field label={t.fields.country} required>
                  <input
                    required
                    value={form.country}
                    onChange={(e) => set('country', e.target.value)}
                    className="w-full rounded-xl border bg-white/80 px-4 py-3 text-[14px] outline-none focus:ring-2"
                    style={{ borderColor: 'rgba(4,29,22,0.12)', color: 'var(--emerald-ink)' }}
                    placeholder="Angola / Luanda"
                    maxLength={80}
                  />
                </Field>
              </div>

              <Field label={t.fields.email} required>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  className="w-full rounded-xl border bg-white/80 px-4 py-3 text-[14px] outline-none focus:ring-2"
                  style={{ borderColor: 'rgba(4,29,22,0.12)', color: 'var(--emerald-ink)' }}
                  placeholder="name@company.com"
                  maxLength={160}
                />
              </Field>

              <Field label={t.fields.stage} required>
                <Select value={form.stage} onChange={(v) => set('stage', v)} placeholder={t.selectPlaceholder} options={t.stages as unknown as string[]} />
              </Field>

              <Field label={t.fields.level} required>
                <Select value={form.level} onChange={(v) => set('level', v)} placeholder={t.selectPlaceholder} options={t.levels as unknown as string[]} />
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold shadow-[0_16px_40px_-16px_rgba(4,29,22,0.6)] transition-transform hover:-translate-y-0.5 disabled:opacity-60"
                style={{ background: 'var(--emerald-ink)', color: 'var(--gold-soft)' }}
              >
                {t.submit}
                <span
                  className="grid h-7 w-7 place-items-center rounded-full transition-transform group-hover:translate-x-1"
                  style={{ background: 'var(--gold)', color: 'var(--emerald-ink)' }}
                >
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="mx-auto max-w-[1400px] px-6 pb-24">
        <div
          className="relative overflow-hidden rounded-[36px] border p-10 md:p-14"
          style={{ background: 'var(--emerald-ink)', color: 'var(--gold-soft)', borderColor: 'rgba(201,168,76,0.2)' }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: 'var(--gold)' }}>
            {t.finalTag}
          </p>
          <div className="mt-4 grid grid-cols-1 items-end gap-6 md:grid-cols-[1fr_auto]">
            <div>
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-[1.1]">{t.finalTitle}</h2>
              <p className="mt-3 text-[15px]" style={{ color: 'rgba(245,240,224,0.75)' }}>
                {t.finalBody}
              </p>
            </div>
            <a
              href="#form"
              className="group inline-flex items-center gap-3 rounded-full px-7 py-4 text-[15px] font-semibold transition-transform hover:-translate-y-0.5"
              style={{ background: 'var(--gold)', color: 'var(--emerald-ink)' }}
            >
              {t.finalCta}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="border-t"
        style={{ background: 'var(--emerald-ink)', color: 'rgba(245,240,224,0.6)', borderColor: 'rgba(201,168,76,0.15)' }}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full font-display text-xs font-bold" style={{ background: 'var(--gold)', color: 'var(--emerald-ink)' }}>
              SGAS
            </div>
            <div>
              <p className="text-[13px] font-semibold" style={{ color: 'var(--gold-soft)' }}>
                SGAS Pro
              </p>
              <p className="text-[11px] uppercase tracking-widest">{t.footerTag}</p>
            </div>
          </div>

          {/* SOCIAL NETWORKS */}
          <div className="flex items-center gap-3">
            {[
              { Icon: LinkedinIcon, href: 'https://linkedin.com/company/hsilva', label: 'LinkedIn' },
              { Icon: InstagramIcon, href: 'https://instagram.com/hsilva.app', label: 'Instagram' },
              { Icon: FacebookIcon, href: 'https://facebook.com/hsilva.app', label: 'Facebook' },
              { Icon: YoutubeIcon, href: 'https://youtube.com/@hsilva', label: 'YouTube' },
              { Icon: MessageCircle, href: 'https://wa.me/244945786313', label: 'WhatsApp' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border transition hover:scale-110"
                style={{ borderColor: 'rgba(201,168,76,0.3)', color: 'var(--gold-soft)' }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <p className="text-[12px]">© {new Date().getFullYear()} SGAS Pro · hsilva.app</p>
        </div>
      </footer>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--emerald-deep)' }}>
        {label} {required && <span style={{ color: 'var(--gold)' }}>*</span>}
      </span>
      {children}
    </label>
  )
}

function Select({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <select
      required
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none rounded-xl border bg-white/80 px-4 py-3 text-[14px] outline-none focus:ring-2"
      style={{ borderColor: 'rgba(4,29,22,0.12)', color: value ? 'var(--emerald-ink)' : 'rgba(4,29,22,0.4)' }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o} style={{ color: 'var(--emerald-ink)' }}>
          {o}
        </option>
      ))}
    </select>
  )
}
