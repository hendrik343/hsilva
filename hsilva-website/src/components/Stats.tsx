import Reveal from './Reveal'

const STATS = [
  { value: '10+',  label: 'projetos entregues em Angola' },
  { value: '3+',   label: 'anos em operações de campo HSE/ESMS' },
  { value: '3',    label: 'hospitais militares geridos em simultâneo' },
  { value: '100%', label: 'acompanhamento do início ao encerramento' },
]

export default function Stats() {
  return (
    <section className="bg-bg px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08}>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
              <p className="font-display text-5xl italic leading-none text-lime">{stat.value}</p>
              <p className="mt-4 text-sm leading-6 text-white/60">{stat.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
