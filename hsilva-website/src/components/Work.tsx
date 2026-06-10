import { motion } from 'framer-motion'

const PROJECTS = [
  {
    id: 1,
    title: 'KARREGA',
    category: 'Mobilidade',
    desc: 'Plataforma de ride-hailing pensada para cidades angolanas.',
    span: 'md:col-span-7',
    accent: '#d73528',
  },
  {
    id: 2,
    title: 'Ecossistema Dashboard',
    category: 'Analítica empresarial',
    desc: 'Dashboards financeiros em tempo real para equipas de decisão.',
    span: 'md:col-span-5',
    accent: '#89aacc',
  },
  {
    id: 3,
    title: 'Bot de Trading Crypto',
    category: 'IA / Fintech',
    desc: 'Sistema automatizado com sinais em tempo real.',
    span: 'md:col-span-5',
    accent: '#7ed957',
  },
  {
    id: 4,
    title: 'H.SILVA Platform',
    category: 'Identidade digital',
    desc: 'Website, sistema visual e presença digital do estúdio.',
    span: 'md:col-span-7',
    accent: '#f0c76d',
  },
]

const fade = {
  hidden: { opacity: 0, y: 32 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Work() {
  return (
    <section id="work" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fade}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em]">Projetos selecionados</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display leading-tight text-text-primary">
              Projetos em <em className="italic">destaque</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm leading-relaxed">
              Do conceito ao lançamento: produtos digitais para negócios reais em Angola.
            </p>
          </div>

          <a
            href="mailto:geral@hsilva.ao"
            className="group hidden md:inline-flex items-center gap-2 rounded-full border border-stroke px-6 py-3 text-sm text-muted hover:text-text-primary transition-colors duration-200 relative"
          >
            <span
              className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: 'linear-gradient(90deg,#89aacc,#4e85bf)' }}
            />
            <span className="relative bg-bg rounded-full px-6 py-3 -mx-6 -my-3 flex items-center gap-2">
              Iniciar projeto <span>→</span>
            </span>
          </a>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {PROJECTS.map((p, i) => (
            <motion.a
              key={p.id}
              href={`mailto:geral@hsilva.ao?subject=${encodeURIComponent(`Projeto H.SILVA: ${p.title}`)}`}
              aria-label={`Falar sobre ${p.title}`}
              className={`group relative overflow-hidden rounded-3xl bg-surface border border-stroke ${p.span} ${
                i % 2 === 0 ? 'aspect-[4/3]' : 'aspect-[3/4]'
              }`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                style={{
                  background:
                    `radial-gradient(circle at 18% 18%, ${p.accent}44, transparent 28%), ` +
                    `linear-gradient(135deg, ${p.accent}22 0%, hsl(var(--surface)) 42%, hsl(var(--bg)) 100%)`,
                }}
              />

              <div className="absolute inset-x-8 top-8 h-px bg-white/10" />
              <div className="absolute inset-y-8 right-8 w-px bg-white/10" />
              <div
                className="absolute right-8 top-8 h-16 w-16 rounded-full opacity-70 blur"
                style={{ background: p.accent }}
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-1">{p.category}</p>
                <h3 className="text-lg md:text-xl font-display italic text-text-primary">{p.title}</h3>
                <p className="mt-3 max-w-sm text-sm text-muted leading-relaxed">{p.desc}</p>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400 bg-bg/65 backdrop-blur-md rounded-3xl z-20">
                <div
                  className="relative inline-flex rounded-full p-[1.5px]"
                  style={{ background: 'linear-gradient(90deg,#89aacc,#4e85bf)' }}
                >
                  <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-sm font-medium">
                    Falar sobre <em className="font-display italic">{p.title}</em>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
