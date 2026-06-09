import { motion } from 'framer-motion'
import LazyVideo from './LazyVideo'

const PROJECTS = [
  {
    id: 1,
    title: 'KARREGA',
    category: 'Mobilidade',
    desc: 'Plataforma de ride-hailing pensada para cidades angolanas.',
    span: 'md:col-span-7',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4',
  },
  {
    id: 2,
    title: 'Ecossistema Dashboard',
    category: 'Analítica empresarial',
    desc: 'Dashboards financeiros em tempo real para equipas de decisão.',
    span: 'md:col-span-5',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260419_064822_f120e48a-d545-45dd-a02d-facb07829888.mp4',
  },
  {
    id: 3,
    title: 'Bot de Trading Crypto',
    category: 'IA / Fintech',
    desc: 'Sistema automatizado com sinais em tempo real.',
    span: 'md:col-span-5',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4',
  },
  {
    id: 4,
    title: 'H.SILVA Platform',
    category: 'Identidade digital',
    desc: 'Website, sistema visual e presença digital do estúdio.',
    span: 'md:col-span-7',
    video: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4',
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
              {/* Video background */}
              <LazyVideo
                src={p.video}
                wrapperClassName="absolute inset-0 h-full w-full"
                mediaClassName="transition-transform duration-700 group-hover:scale-105"
              />

              {/* Halftone overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                  backgroundSize: '4px 4px',
                }}
              />

              {/* Dark gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                <p className="text-[10px] text-muted uppercase tracking-[0.2em] mb-1">{p.category}</p>
                <h3 className="text-lg md:text-xl font-display italic text-text-primary">{p.title}</h3>
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
