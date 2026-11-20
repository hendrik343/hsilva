import Image from 'next/image'
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/constants'

const HERO_VIDEO_URL = process.env.HERO_VIDEO_URL

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <div className="relative min-h-[820px] md:h-[920px] md:min-h-0">
        <div className="absolute inset-0">
          {HERO_VIDEO_URL ? (
            <video
              className="size-full object-cover"
              src={HERO_VIDEO_URL}
              poster="/images/hero-mountain.webp"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <Image
              src="/images/hero-mountain.webp"
              alt="Formação rochosa íngreme coberta de vegetação na paisagem do Huambo"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          )}
        </div>

        {/* Desktop overlay: left-to-right gradient */}
        <div
          aria-hidden="true"
          className="hidden md:block absolute inset-0 bg-gradient-to-r from-[rgba(6,38,36,0.94)] via-[rgba(6,38,36,0.62)] via-50% to-[rgba(6,38,36,0.05)]"
        />
        {/* Mobile overlay: flat scrim */}
        <div aria-hidden="true" className="md:hidden absolute inset-0 bg-[rgba(6,38,36,0.66)]" />

        {/* Mobile: single stacked flow. Desktop: absolutely positioned per Figma frame. */}
        <div className="relative z-10 flex h-full flex-col gap-6 px-6 pb-10 pt-28 md:block md:px-0 md:pb-0 md:pt-0">
          <div className="flex flex-col gap-6 md:absolute md:left-16 md:top-[170px] md:w-[760px] md:gap-7">
            <div className="inline-flex w-fit items-center gap-2.5 rounded-full border border-white/28 bg-white/12 px-4 py-2.5 md:px-[18px] md:py-[10px]">
              <span className="size-2 rounded-full bg-amber" aria-hidden="true" />
              <p className="font-sans text-sm font-semibold text-white whitespace-nowrap">
                Huambo &nbsp;·&nbsp; Corrida Solidária gratuita
              </p>
            </div>

            <h1 className="font-display text-[36px] font-semibold leading-[1.08] tracking-[-0.5px] text-white md:w-[760px] md:text-[76px] md:leading-[80px] md:tracking-[-1.52px]">
              O táxi do Huambo que leva quem precisa ao hospital,{' '}
              <span className="font-display italic font-normal text-amber">de graça.</span>
            </h1>

            <p className="max-w-[560px] font-sans text-base leading-[27px] text-white/82 md:text-xl md:leading-[31px]">
              Grávidas, idosos e pessoas sem condições ligam e são levados ao hospital sem pagar. Sem
              aplicação. Sem internet.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <a
                href={PHONE_TEL}
                className="flex items-center justify-center rounded-full bg-amber px-7 py-[18px] text-center font-sans text-base font-bold text-deep transition-transform hover:scale-[1.02] md:px-[34px] md:py-[22px] md:text-lg"
              >
                Ligar {PHONE_DISPLAY}
              </a>
              <a
                href="#quem-tem-direito"
                className="flex items-center justify-center rounded-full border border-white/55 px-7 py-[18px] text-center font-sans text-base font-bold text-white transition-colors hover:bg-white/10 md:px-[34px] md:py-[22px] md:text-lg"
              >
                Quem tem direito
              </a>
            </div>
          </div>

          {HERO_VIDEO_URL && (
            <a
              href="#como-funciona"
              className="flex w-fit items-center gap-3.5 rounded-full border border-white/30 bg-white/14 py-2.5 pl-2.5 pr-5 md:absolute md:left-16 md:top-[782px] md:py-[10px] md:pl-[10px] md:pr-[26px]"
            >
              <span className="flex size-11 md:size-[52px] items-center justify-center rounded-full bg-white">
                <svg width="15" height="17" viewBox="0 0 18 20" fill="none" aria-hidden="true">
                  <path d="M2 2L16 10L2 18V2Z" fill="#062624" />
                </svg>
              </span>
              <span className="font-sans text-[15px] md:text-base font-semibold text-white">Ver como funciona</span>
            </a>
          )}

          <div className="w-full rounded-[28px] border border-white/25 bg-[rgba(6,38,36,0.38)] p-7 backdrop-blur-md md:absolute md:right-16 md:top-[610px] md:w-[380px] md:p-8">
            <p className="font-sans text-xs font-bold tracking-[1.68px] text-amber">CORRIDA SOLIDÁRIA</p>
            <div className="mt-4 flex items-center gap-3 font-sans text-lg">
              <span className="font-semibold text-white">Casa</span>
              <span className="font-bold text-amber">→</span>
              <span className="font-semibold text-white">Hospital</span>
            </div>
            <p className="mt-4 font-display text-[52px] md:text-[68px] font-semibold leading-[1] tracking-[-1.36px] text-white">
              0 Kz
            </p>
            <p className="mt-4 font-sans text-sm font-medium text-white/75">
              Ligar &nbsp;·&nbsp; Indicar morada &nbsp;·&nbsp; Embarcar
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
