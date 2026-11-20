import Reveal from '../Reveal'

const STATS = [
  { value: 'Huambo', label: 'Cidade servida', amber: false },
  { value: '945 786 313', label: 'Número único', amber: false },
  { value: '0 Kz', label: 'Custo da corrida solidária', amber: true },
  { value: '3', label: 'Grupos com direito', amber: false },
] as const

export default function Stats() {
  return (
    <section className="bg-teal px-6 py-10 md:px-16 md:py-14">
      <Reveal
        className="mx-auto grid max-w-content grid-flow-col grid-cols-2 grid-rows-2 gap-x-6 gap-y-7 md:flex md:grid-cols-none md:grid-rows-none md:gap-0"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-1 flex-col gap-2 py-1.5 md:px-9 ${i === 0 ? 'md:pl-0 md:pr-9' : ''} ${
              i > 0 ? 'md:border-l md:border-white/20' : ''
            } ${i === STATS.length - 1 ? 'md:pr-0' : ''}`}
          >
            <p
              className={`font-display text-[28px] md:text-[44px] font-semibold leading-[1.1] tracking-[-0.44px] ${
                stat.amber ? 'text-amber' : 'text-white'
              }`}
            >
              {stat.value}
            </p>
            <p className="font-sans text-sm md:text-base text-white/70">{stat.label}</p>
          </div>
        ))}
      </Reveal>
    </section>
  )
}
