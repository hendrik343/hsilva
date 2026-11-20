import Image from 'next/image'
import Reveal from '../Reveal'

const GRUPOS = ['Grávidas', 'Idosos', 'Pessoas sem condições'] as const

const SERVICOS = ['Consultas', 'Maternidade e partos', 'Urgências', 'Exames e tratamentos'] as const

export default function QuemTemDireito() {
  return (
    <section id="quem-tem-direito" className="bg-white px-6 py-16 md:px-16 md:py-[120px]">
      <div className="mx-auto flex max-w-content flex-col gap-12 md:flex-row md:items-center md:gap-[88px]">
        <Reveal className="relative mx-auto h-[420px] w-full max-w-[420px] shrink-0 md:h-[720px] md:w-[560px] md:max-w-none">
          <div className="absolute inset-0 overflow-hidden rounded-[28px] md:rounded-[36px]">
            <Image
              src="/images/ajuda-embarcar.webp"
              alt="Motorista da SilvaGo a ajudar uma passageira grávida a entrar no táxi"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 560px, 90vw"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-[55%] w-[42%] overflow-hidden rounded-[20px] border-4 border-white md:h-[288px] md:w-[230px] md:rounded-[28px] md:border-8">
            <Image
              src="/images/gravida-taxi.webp"
              alt="Mulher grávida sentada no banco de trás de um táxi"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 230px, 40vw"
            />
          </div>
        </Reveal>

        <div className="flex flex-1 flex-col gap-6 md:gap-7">
          <Reveal className="flex flex-col gap-4 md:gap-7">
            <p className="font-sans text-[13px] font-bold tracking-[1.82px] text-amber-dark">CORRIDA SOLIDÁRIA</p>
            <h2 className="font-display text-[32px] md:text-[56px] font-semibold leading-[1.1] md:leading-[60px] tracking-[-0.84px] text-ink">
              Quem pode pedir a corrida grátis
            </h2>
            <p className="font-sans text-base md:text-lg leading-7 text-muted">
              Se precisa de ir ao hospital e não tem como pagar o transporte, ligue. A corrida é gratuita
              para estes grupos:
            </p>
          </Reveal>

          <Reveal className="flex flex-wrap gap-3">
            {GRUPOS.map((grupo) => (
              <span
                key={grupo}
                className="inline-flex items-center gap-2.5 rounded-full bg-mint px-5 py-3.5 font-sans text-[15px] md:text-[17px] font-bold text-teal"
              >
                <span className="size-2.5 rounded-full bg-teal" aria-hidden="true" />
                {grupo}
              </span>
            ))}
          </Reveal>

          <Reveal className="flex flex-col gap-4">
            <p className="font-sans text-sm font-bold tracking-[0.3px] text-ink">Serviços cobertos</p>
            <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
              {SERVICOS.map((servico) => (
                <div key={servico} className="flex items-center gap-3.5">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-amber font-sans text-base font-bold text-deep">
                    +
                  </span>
                  <p className="font-sans text-base md:text-lg font-semibold text-ink">{servico}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal
            className="flex items-center rounded-[20px] border border-amber bg-[#fff3d6] px-6 py-5"
          >
            <p className="font-sans text-base md:text-[17px] font-semibold text-deep">
              A corrida grátis é só para serviços hospitalares.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
