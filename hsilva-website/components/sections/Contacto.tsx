import Reveal from '../Reveal'
import { EMAIL, EMAIL_MAILTO, PHONE_DISPLAY, PHONE_TEL, PHONE_WHATSAPP } from '@/lib/constants'

export default function Contacto() {
  return (
    <section id="contacto" className="bg-cream px-6 py-10 md:px-16 md:py-16">
      <Reveal className="mx-auto max-w-content">
        <div className="relative overflow-hidden rounded-[28px] bg-deep px-7 py-12 md:rounded-[44px] md:px-16 md:py-20">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-10 -top-16 size-[220px] rounded-full bg-teal/60 md:-right-6 md:-top-20 md:size-[320px]"
          />
          <div className="relative flex flex-col gap-8 md:max-w-xl">
            <p className="font-sans text-[13px] font-bold tracking-[1.82px] text-amber">CONTACTO</p>
            <h2 className="font-display text-[32px] md:text-[48px] font-semibold leading-[1.15] tracking-[-0.48px] text-white">
              Precisa de um táxi ou de uma corrida solidária?
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={PHONE_TEL}
                className="flex items-center justify-center rounded-full bg-amber px-7 py-4 text-center font-sans text-base font-bold text-deep transition-transform hover:scale-[1.02]"
              >
                Ligar {PHONE_DISPLAY}
              </a>
              <a
                href={PHONE_WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center rounded-full border border-white/55 px-7 py-4 text-center font-sans text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                WhatsApp
              </a>
            </div>
            <a href={EMAIL_MAILTO} className="w-fit font-sans text-sm text-white/75 hover:text-white">
              {EMAIL}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
