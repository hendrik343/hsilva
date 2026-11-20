import Reveal from '../Reveal'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/constants'

export default function Servicos() {
  return (
    <section id="servicos" className="bg-deep px-6 py-16 md:px-16 md:py-[120px]">
      <div className="mx-auto flex max-w-content flex-col gap-10 md:gap-14">
        <Reveal className="flex flex-col gap-3 md:gap-4">
          <p className="font-sans text-[13px] font-bold tracking-[1.82px] text-amber">SERVIÇOS</p>
          <h2 className="font-display text-[34px] md:text-[60px] font-semibold leading-[1.1] md:leading-[64px] tracking-[-0.9px] text-white">
            Dois serviços. Um só número.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal
            className="flex flex-col justify-between gap-10 rounded-[28px] border border-white/14 bg-white/7 p-8 md:rounded-[36px] md:p-12"
          >
            <div className="flex flex-col gap-4 md:gap-[18px]">
              <p className="font-sans text-xs font-bold tracking-[1.68px] text-amber">SERVIÇO PAGO</p>
              <p className="font-display text-[32px] md:text-[48px] font-semibold leading-[1.1] tracking-[-0.48px] text-white">
                Táxi SilvaGo
              </p>
              <p className="font-sans text-base md:text-[19px] leading-7 md:leading-[30px] text-white/72">
                Táxi para qualquer destino no Huambo. Ligue, diga a morada e o motorista vai buscá-lo.
              </p>
            </div>
            <a
              href={PHONE_TEL}
              className="flex w-fit items-center justify-center rounded-full border border-white/50 px-7 py-4 font-sans text-base md:text-[17px] font-bold text-white transition-colors hover:bg-white/10"
            >
              Pedir um táxi
            </a>
          </Reveal>

          <Reveal
            delay={1}
            className="flex flex-col justify-between gap-10 rounded-[28px] bg-amber p-8 md:rounded-[36px] md:p-12"
          >
            <div className="flex flex-col gap-4 md:gap-[18px]">
              <span className="w-fit rounded-full bg-deep px-3.5 py-2 font-sans text-xs font-bold tracking-[1.2px] text-amber">
                GRÁTIS PARA O HOSPITAL
              </span>
              <p className="font-display text-[32px] md:text-[48px] font-semibold leading-[1.1] tracking-[-0.48px] text-deep">
                Corrida Solidária
              </p>
              <p className="font-sans text-base md:text-[19px] leading-7 md:leading-[30px] text-deep/80">
                Para grávidas, idosos e pessoas sem condições que precisam de ir ao hospital. Custo: 0 Kz.
              </p>
            </div>
            <a
              href={PHONE_TEL}
              className="flex w-fit items-center justify-center rounded-full bg-deep px-7 py-4 font-sans text-base md:text-[17px] font-bold text-white transition-transform hover:scale-[1.02]"
            >
              Marcar corrida grátis
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
