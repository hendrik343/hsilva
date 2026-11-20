import Reveal from '../Reveal'
import VideoSlot from '../VideoSlot'

const HUAMBO_VIDEO_URL = process.env.HUAMBO_VIDEO_URL

export default function HuamboVideoSection() {
  return (
    <section className="bg-cream px-6 py-16 md:px-16 md:py-[120px]">
      <div className="mx-auto max-w-content">
        <Reveal>
          <VideoSlot
            src={HUAMBO_VIDEO_URL}
            poster="/images/huambo-cidade.webp"
            posterAlt="Vista aérea do Huambo ao pôr do sol, com a rotunda e os jacarandás da cidade"
            playLabel="Reproduzir vídeo: Huambo, a nossa cidade"
            className="h-[340px] w-full rounded-[28px] md:h-[580px] md:rounded-[40px]"
          >
            <div className="absolute bottom-7 left-6 flex flex-col gap-2 md:bottom-[56px] md:left-14">
              <p className="font-sans text-[13px] font-bold tracking-[1.82px] text-amber">VÍDEO</p>
              <p className="font-display text-[32px] md:text-[56px] font-semibold leading-[1.1] md:leading-[60px] tracking-[-0.84px] text-white">
                Huambo, a nossa cidade.
              </p>
            </div>
          </VideoSlot>
        </Reveal>
      </div>
    </section>
  )
}
