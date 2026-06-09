import { motion } from 'framer-motion'

const STATS = [
  { value: '10+',  label: 'Projetos entregues',     sub: 'Web, mobile, fintech e automação' },
  { value: '100%', label: 'Entrega acompanhada',    sub: 'Processo claro do início ao fim' },
  { value: '3+',   label: 'Anos de inovação',       sub: 'Construído a partir do Huambo' },
]

const fade = {
  hidden: { opacity: 0, y: 28 },
  show:   (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Stats() {
  return (
    <section className="bg-bg py-16 md:py-24 border-t border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col gap-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              custom={i}
              variants={fade}
            >
              {/* Accent line */}
              <div
                className="w-8 h-[2px] rounded-full mb-4 accent-gradient"
              />

              <span className="text-5xl md:text-6xl font-display italic text-text-primary leading-none">
                {s.value}
              </span>
              <span className="text-base font-medium text-text-primary mt-1">{s.label}</span>
              <span className="text-sm text-muted leading-relaxed">{s.sub}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
