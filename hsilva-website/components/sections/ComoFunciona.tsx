import Reveal from '../Reveal'

const STEPS = [
  { number: 1, title: 'Ligue', body: 'Ligue para 945 786 313.' },
  { number: 2, title: 'Diga a morada', body: 'Indique de onde sai e para onde vai.' },
  { number: 3, title: 'Entre no táxi', body: 'O motorista vai buscar a pessoa à sua casa.' },
] as const

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-cream px-6 py-16 md:px-16 md:py-[120px]">
      <div className="mx-auto flex max-w-content flex-col gap-10 md:gap-14">
        <Reveal className="flex flex-col gap-3 md:gap-4">
          <p className="font-sans text-[13px] font-bold tracking-[1.82px] text-amber-dark">COMO FUNCIONA</p>
          <h2 className="font-display text-[34px] md:text-[60px] font-semibold leading-[1.1] md:leading-[64px] tracking-[-0.9px] text-ink">
            Três passos. Uma chamada.
          </h2>
          <p className="font-sans text-base md:text-xl text-muted">
            Sem aplicação e sem internet: basta ter um telefone.
          </p>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {STEPS.map((step, i) => (
            <Reveal
              key={step.number}
              delay={(i + 1) as 1 | 2 | 3}
              className="flex flex-col gap-4 rounded-[28px] bg-white p-7 md:gap-5 md:p-9"
            >
              <span className="flex size-12 md:size-14 items-center justify-center rounded-full bg-amber font-display text-xl md:text-2xl font-semibold text-deep">
                {step.number}
              </span>
              <p className="font-display text-2xl md:text-[32px] font-semibold leading-[1.15] md:leading-[38px] text-ink">
                {step.title}
              </p>
              <p className="font-sans text-base md:text-lg leading-7 text-muted">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
