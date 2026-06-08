import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'motion/react'
import { ArrowRight, Music2, ChevronDown } from 'lucide-react'
import { CallToAction } from '@/components/cta'

// ─── Brand SVGs ───────────────────────────────────────────────────────────────
const LogoMark = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
    <path d="M4.688 136C68.373 136 120 187.627 120 251.312 120 252.883 119.967 254.445 119.905 256L0 256 0 136.096C1.555 136.034 3.117 136 4.688 136ZM251.312 136C252.883 136 254.445 136.034 256 136.096L256 256 136.095 256C136.032 254.438 136.001 252.875 136 251.312 136 187.627 187.627 136 251.312 136ZM119.905 0C119.967 1.555 120 3.117 120 4.688 120 68.373 68.373 120 4.687 120 3.117 120 1.555 119.967 0 119.905L0 0ZM256 119.905C254.445 119.967 252.883 120 251.312 120 187.627 120 136 68.373 136 4.687 136 3.117 136.033 1.555 136.095 0L256 0Z" />
  </svg>
)

const IconFacebook = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)
const IconTwitter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)
const IconYoutube = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
)
const IconInstagram = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
)

// ─── Data ─────────────────────────────────────────────────────────────────────
const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4'

const CARDS = [
  { n: '01', title: 'IFC Compliance',        desc: 'Full PS1–PS8 coverage with live scoring, gap analysis and automated readiness tracking.' },
  { n: '02', title: 'ESAP Management',        desc: 'Contractual E&S action plan tracking — deadlines, owners, status and IFC reporting ready.' },
  { n: '03', title: 'Stakeholder Engagement', desc: 'FPIC registry, Broad Community Support gate and 4-quadrant influence/impact mapping.' },
  { n: '04', title: 'KPI Intelligence',       desc: 'Environmental, social and HSE indicators with trend charts and World Bank-standard exports.' },
]

const TRUST = ['IFC Performance Standards', 'World Bank ESF', 'AfDB · EBRD', 'CAO Compliant', 'ESAP Ready']

const FOOTER_COLS = [
  { label: 'Discover',    links: ['Labs & Workshops', 'Deep Dive Series', 'Global Circle', 'Resource Vault', 'Future Roadmap'] },
  { label: 'The Mission', links: ['Origin Story', 'The Collective', 'Newsroom Hub', 'Join the Team'] },
  { label: 'Concierge',   links: ['Get in Touch', 'Legal Privacy', 'User Agreement', 'Report Concern'] },
]

// ─── Hero headline — split into dramatic lines ─────────────────────────────────
const HEADLINE = [
  { text: 'COMPLIANCE',  size: 'text-[clamp(3.6rem,10vw,9rem)]',  weight: 'font-bold',   opacity: 'text-white' },
  { text: 'BUILT FOR',   size: 'text-[clamp(2rem,5.6vw,5.2rem)]', weight: 'font-light',  opacity: 'text-white/40' },
  { text: 'THE WORLD\'S',size: 'text-[clamp(2.8rem,8vw,7.4rem)]', weight: 'font-bold',   opacity: 'text-white/80' },
  { text: 'HARDEST',     size: 'text-[clamp(3.6rem,10vw,9rem)]',  weight: 'font-bold',   opacity: 'text-white/20' },
  { text: 'PROJECTS.',   size: 'text-[clamp(2.4rem,6.8vw,6.4rem)]',weight: 'font-medium',opacity: 'text-white' },
]

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const cardsRef = useRef<HTMLDivElement>(null)
  const cardsInView = useInView(cardsRef, { once: true, margin: '-60px' })

  const { scrollY } = useScroll()
  const videoY = useTransform(scrollY, [0, 900], ['0%', '20%'])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  return (
    <main className="relative w-full overflow-x-hidden font-sans selection:bg-white/20 selection:text-white">

      {/* ── Video + parallax ── */}
      <motion.div style={{ y: videoY }} className="fixed inset-0 z-[0] will-change-transform">
        <video className="w-full h-full object-cover" src={VIDEO_SRC} autoPlay loop muted playsInline />
      </motion.div>

      {/* ── Overlays — gradient pushes left so right side stays cinematic ── */}
      <div className="fixed inset-0 z-[1] bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />
      <div className="fixed inset-0 z-[1] bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

      {/* ══════════════════════════════════════
          HERO — full viewport, left-aligned
      ══════════════════════════════════════ */}
      <motion.section
        style={{ opacity: heroOpacity }}
        className="relative z-10 min-h-screen flex flex-col"
      >
        {/* Nav */}
        <motion.nav
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="flex items-center justify-between max-w-7xl mx-auto w-full px-8 md:px-14 pt-8 flex-shrink-0"
        >
          <div className="flex items-center gap-2.5 text-white">
            <LogoMark size={19} />
            <span className="text-xs font-medium tracking-[0.14em] uppercase">SGAS PRO</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-[11px] tracking-[0.12em] uppercase text-white/40">
            {['Platform', 'Standards', 'Pricing'].map(l => (
              <a key={l} href="#" className="hover:text-white transition-colors duration-200 cursor-pointer">{l}</a>
            ))}
          </div>
          <a
            href="https://sgas-pro.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/14 text-white/55 text-[11px] tracking-wide hover:border-white/30 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Open App <ArrowRight size={10} />
          </a>
        </motion.nav>

        {/* ── Left-rail hero content — occupies ~55% width, stays left ── */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-14 py-16 max-w-[58%] min-w-[340px]">

          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
            className="flex items-center gap-2 mb-10"
          >
            <span className="w-5 h-px bg-white/25 inline-block" />
            <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
              IFC Performance Standards · PS1–PS8
            </span>
          </motion.div>

          {/* Dramatic stacked headline */}
          <div className="flex flex-col gap-0 leading-none mb-10">
            {HEADLINE.map((line, i) => (
              <motion.span
                key={line.text}
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.22 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`block tracking-[-0.04em] leading-[0.92] ${line.size} ${line.weight} ${line.opacity}`}
              >
                {line.text}
              </motion.span>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.75, ease: 'easeOut' }}
            className="text-white/40 text-[14px] max-w-[30ch] leading-relaxed mb-10"
          >
            The E&S governance platform for IFC, World Bank and development-finance projects.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.88, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-start gap-4"
          >
            <a
              href="https://sgas-pro.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-black text-[13px] font-medium hover:bg-white/90 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_0_48px_rgba(255,255,255,0.12)]"
            >
              Request Access <ArrowRight size={13} />
            </a>
            <a
              href="#platform"
              className="flex items-center gap-1.5 text-white/35 text-[13px] hover:text-white/60 transition-colors duration-200 cursor-pointer pt-3.5 sm:pt-3.5"
            >
              Explore Platform <ArrowRight size={11} />
            </a>
          </motion.div>
        </div>

        {/* Trust strip + scroll cue — pinned to bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.0 }}
          className="flex flex-col items-start gap-4 px-8 md:px-14 pb-10 flex-shrink-0"
        >
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1.5 text-[9px] uppercase tracking-[0.18em] text-white/18">
            {TRUST.map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                {i > 0 && <span className="text-white/10">·</span>}
                {t}
              </span>
            ))}
          </div>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
          >
            <ChevronDown size={14} className="text-white/18" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ══════════════════════════════════════
          PLATFORM SECTION — cards
      ══════════════════════════════════════ */}
      <section id="platform" className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-14 pt-28 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={cardsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-[9px] uppercase tracking-[0.22em] text-white/20 mb-14"
        >
          Platform capabilities
        </motion.p>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.055)' }}
        >
          {CARDS.map((card, i) => (
            <motion.div
              key={card.n}
              initial={{ opacity: 0, y: 28 }}
              animate={cardsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              className="flex flex-col gap-8 p-8 md:p-10 transition-colors duration-300 cursor-default"
              style={{ background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
            >
              <span className="text-[10px] font-medium text-white/16 tracking-[0.18em]">{card.n}</span>
              <div className="flex flex-col gap-3">
                <h3 className="text-[13px] font-medium text-white leading-snug">{card.title}</h3>
                <p className="text-[12px] leading-relaxed text-white/35">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION — @efferd/cta-4
      ══════════════════════════════════════ */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 max-w-7xl mx-auto w-full px-8 md:px-14 pb-16"
        style={{ '--card': 'rgba(255,255,255,0.03)', '--muted-foreground': 'rgba(255,255,255,0.4)', '--primary': 'rgba(255,255,255,1)', '--primary-foreground': 'rgba(0,0,0,1)', '--secondary': 'rgba(255,255,255,0.08)', '--secondary-foreground': 'rgba(255,255,255,0.8)' } as React.CSSProperties}
      >
        <div className="[&>div]:border-white/10 [&>div]:bg-white/[0.03] [&>div]:backdrop-blur-md [&_h2]:text-white [&_p]:text-white/45 [&_button[data-variant=default]]:bg-white [&_button[data-variant=default]]:text-black [&_button[data-variant=default]]:hover:bg-white/90 [&_button[data-variant=secondary]]:bg-white/10 [&_button[data-variant=secondary]]:text-white/80 [&_button[data-variant=secondary]]:hover:bg-white/15 [&_button[data-variant=secondary]]:border-0">
          <CallToAction />
        </div>
      </motion.section>

      {/* ══════════════════════════════════════
          FOOTER — liquid glass
      ══════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-5 md:px-8 pb-7">
        <motion.footer
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/60"
        >
          {/* Top grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10">
            <div className="md:col-span-5">
              <div className="flex items-center gap-2.5 text-white mb-5">
                <LogoMark size={22} />
                <span className="text-lg font-medium tracking-wide">LUMINA</span>
              </div>
              <p className="text-[13px] leading-relaxed max-w-sm text-white/35">
                Lumina provides premium clarity on global events and cosmic wonders — shared with all for free.
              </p>
            </div>

            <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              {FOOTER_COLS.map(col => (
                <div key={col.label}>
                  <h4 className="text-[9px] uppercase tracking-[0.2em] text-white font-medium mb-5">{col.label}</h4>
                  <ul className="space-y-2.5">
                    {col.links.map(l => (
                      <li key={l}>
                        <a href="#" className="text-[12px] text-white/35 hover:text-white transition-colors duration-200 cursor-pointer">
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/[0.07] flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-white/22">Curated by @GotInGeorgiG</p>
            <div className="flex items-center gap-5">
              <span className="text-[9px] uppercase tracking-[0.2em] text-white/22">Join the Journey:</span>
              <div className="flex items-center gap-4">
                {[
                  { C: () => <Music2 size={14} />, l: 'Music' },
                  { C: IconFacebook,               l: 'Facebook' },
                  { C: IconTwitter,                l: 'Twitter' },
                  { C: IconYoutube,                l: 'YouTube' },
                  { C: IconInstagram,              l: 'Instagram' },
                ].map(({ C, l }) => (
                  <a key={l} href="#" aria-label={l} className="text-white/30 hover:text-white transition-colors duration-200 cursor-pointer">
                    <C />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </main>
  )
}
