import Reveal from '../Reveal'

const RAZOES = [
  {
    number: '01',
    title: 'Responsabilidade social',
    body: 'Levamos quem precisa ao hospital, sem custo para a pessoa.',
  },
  {
    number: '02',
    title: 'Compromisso com a comunidade',
    body: 'Somos da cidade e trabalhamos para quem vive nela.',
  },
  {
    number: '03',
    title: 'Sem letras pequenas',
    body: 'Sabe desde o início o que está incluído: a corrida grátis cobre serviços hospitalares.',
  },
] as const

export default function Porque() {
  return (
    <section id="porque" className="bg-white px-6 py-16 md:px-16 md:py-[120px]">
      <div className="mx-auto flex max-w-content flex-col gap-10 md:gap-14">
        <Reveal className="flex flex-col gap-3 md:gap-4">
          <p className="font-sans text-[13px] font-bold tracking-[1.82px] text-amber-dark">PORQUÊ</p>
          <h2 className="font-display text-[34px] md:text-[60px] font-semibold leading-[1.1] md:leading-[64px] tracking-[-0.9px] text-ink">
            Feito no Huambo, para o Huambo.
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3 md:gap-12">
          {RAZOES.map((razao, i) => (
            <Reveal
              key={razao.number}
              delay={(i + 1) as 1 | 2 | 3}
              className="flex flex-col gap-4 border-t-2 border-ink/90 pt-6 md:gap-4 md:pt-7"
            >
              <p className="font-display text-xl italic text-amber-dark">{razao.number}</p>
              <p className="font-display text-2xl md:text-[32px] font-semibold leading-[1.15] md:leading-[38px] text-ink">
                {razao.title}
              </p>
              <p className="font-sans text-base md:text-lg leading-7 text-muted">{razao.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
