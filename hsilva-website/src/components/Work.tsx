const SERVICE_CARDS = [
  {
    eyebrow: '01',
    title: 'Foundation of the new digital epoch',
    desc: 'Design systems, websites and platforms built for companies that need trust, speed and clarity.',
    cta: 'Contact us',
    light: true,
  },
  {
    eyebrow: '02',
    title: 'Dashboards for decisions that cannot wait',
    desc: 'Operational views for HSE, finance and mobility teams with the metrics that matter.',
    cta: 'View systems',
  },
  {
    eyebrow: '03',
    title: 'Mobile products for local markets',
    desc: 'Interfaces and workflows shaped for Angolan users, payments, operations and field teams.',
    cta: 'Build mobile',
  },
]

const PROJECTS = [
  {
    title: 'HSE Dashboards',
    category: 'Dashboards de HSE',
    desc: 'Dados de saude, seguranca e ambiente convertidos em indicadores claros para decisoes rapidas.',
    image: '/cards/hse-dashboard.png',
  },
  {
    title: 'Sem Fronteiras',
    category: 'Financiamento e confianca',
    desc: 'Uma apresentacao visual para explicar solucoes completas, processos e resultados reais.',
    image: '/cards/sem-fronteiras.png',
  },
  {
    title: 'AI Safety Lens',
    category: 'IA aplicada',
    desc: 'Analise inteligente de imagens para identificar riscos, EPI, EPC e acoes no terreno.',
    image: '/cards/ai-safety.png',
  },
  {
    title: 'KARREGA',
    category: 'Mobilidade',
    desc: 'Ride-hailing pensado para cidades angolanas, com marca, fluxo e experiencia mobile.',
    image: '/cards/karrega.png',
  },
]

export default function Work() {
  return (
    <>
      <section id="about" className="bg-bg px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime">O que fazemos</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-white md:text-7xl">
              Tecnologia com contexto local.
            </h2>
          </div>
          <div className="grid gap-5 text-lg leading-8 text-white/62">
            <p>
              A H.SILVA cria software para empresas que precisam sair do improviso e operar com sistemas claros,
              bonitos e confiaveis.
            </p>
            <p>
              Unimos estrategia, interface, desenvolvimento e automacao para construir produtos que podem ser usados
              no terreno, apresentados a investidores e evoluidos por equipas reais.
            </p>
          </div>
        </div>
      </section>

      <section id="services" className="bg-bg px-4 py-10 md:px-8 md:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime">Cards</p>
              <h2 className="mt-3 font-display text-4xl text-white md:text-6xl">Servicos principais</h2>
            </div>
            <a href="mailto:geral@hsilva.ao" className="hidden rounded-full border border-white/15 px-5 py-3 text-sm text-white/70 md:inline-flex">
              Contacto
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SERVICE_CARDS.map((card) => (
              <article
                key={card.title}
                className={
                  card.light
                    ? 'min-h-[340px] rounded-[28px] bg-white p-6 text-black shadow-2xl shadow-black/20'
                    : 'min-h-[340px] rounded-[28px] border border-white/10 bg-white/[0.04] p-6 text-white'
                }
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <span className={card.light ? 'text-xs font-bold text-black/45' : 'text-xs font-bold text-lime'}>
                      {card.eyebrow}
                    </span>
                    <h3 className="mt-6 text-3xl font-bold leading-[1.02] tracking-[-0.04em]">{card.title}</h3>
                    <p className={card.light ? 'mt-5 text-sm leading-6 text-black/55' : 'mt-5 text-sm leading-6 text-white/55'}>
                      {card.desc}
                    </p>
                  </div>
                  <a
                    href="mailto:geral@hsilva.ao"
                    className={card.light ? 'mt-8 inline-flex w-max rounded-full bg-black px-5 py-3 text-sm font-semibold text-white' : 'mt-8 inline-flex w-max rounded-full bg-lime px-5 py-3 text-sm font-semibold text-black'}
                  >
                    {card.cta}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="bg-bg px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime">Projetos</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-white md:text-7xl">Ideias em produto.</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {PROJECTS.map((project) => (
              <a
                key={project.title}
                href={`mailto:geral@hsilva.ao?subject=${encodeURIComponent(`Projeto H.SILVA: ${project.title}`)}`}
                className="group overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.035] transition hover:border-white/25"
              >
                <div className="overflow-hidden bg-white/[0.03]">
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    draggable={false}
                    className="w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
                      {project.category}
                    </span>
                    <span className="text-2xl text-lime">↗</span>
                  </div>
                  <h3 className="mt-8 font-display text-5xl italic leading-none text-white">{project.title}</h3>
                  <p className="mt-5 max-w-md text-sm leading-7 text-white/58">{project.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
