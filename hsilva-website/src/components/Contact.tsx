import Reveal from './Reveal'

const FOOTER_LINKS = [
  ['Consultoria', 'ESG / ESMS', 'ISO 14001', 'Auditorias HSE', 'Relatórios Ambientais'],
  ['Software', 'Dashboards HSE', 'Plataformas Web', 'Produtos Mobile', 'Automação'],
  ['Contacto', 'geral@hsilva.ao', 'Huambo · Angola', 'NIF: 5001495852'],
]

export default function Contact() {
  const year = new Date().getFullYear()

  return (
    <section id="contact" className="bg-bg px-4 pb-8 pt-10 md:px-8 md:pb-10">
      <Reveal>
        <div className="mx-auto max-w-6xl rounded-[32px] border border-white/10 bg-white/[0.04] p-6 md:p-10">
          <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/hsilva-logo.jpg"
                  alt="H.SILVA"
                  className="h-11 w-11 rounded-full border border-white/15 object-cover"
                />
                <div>
                  <p className="font-bold text-white">H.SILVA</p>
                  <p className="text-xs text-white/45">Consultoria & Software · Huambo</p>
                </div>
              </div>

              <h2 className="mt-8 max-w-2xl font-display text-5xl leading-none text-white md:text-6xl">
                Tens um projeto, uma operação ou uma empresa que precisa de estrutura.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/60">
                Seja uma auditoria HSE, um sistema ESMS, um relatório ESG ou um dashboard
                operacional — começa com uma conversa.
              </p>
              <a
                href="mailto:geral@hsilva.ao"
                className="mt-8 inline-flex rounded-full bg-lime px-7 py-4 text-sm font-bold text-black transition hover:bg-lime/90"
              >
                geral@hsilva.ao
              </a>
            </div>

            <div className="grid grid-cols-3 gap-5">
              {FOOTER_LINKS.map(([title, ...items]) => (
                <div key={title}>
                  <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/40">
                    {title}
                  </p>
                  <div className="grid gap-3">
                    {items.map((item) => (
                      <span key={item} className="text-sm text-white/60">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/35 md:flex-row md:items-center md:justify-between">
            <span>© {year} H.SILVA — Consultoria & Prestação de Serviços (SU), Lda.</span>
            <span>Software que transforma negócios angolanos.</span>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
