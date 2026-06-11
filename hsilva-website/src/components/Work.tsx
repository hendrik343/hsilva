import Reveal from './Reveal'

const PILLARS = [
  {
    eyebrow: 'Pilar 01',
    tag: 'ESG · ESMS',
    title: 'Consultoria ESG & ESMS',
    headline: 'Gestão ambiental e social com estrutura real.',
    desc: 'Implementamos Sistemas de Gestão Ambiental e Social (ESMS) alinhados com os padrões IFC/Banco Mundial, preparando empresas para due diligence, financiamento internacional e relatórios de conformidade.',
    clients: 'Construtoras · Mineradoras · Empresas financiadas por bancos multilaterais · Exportadoras',
    cta: 'Saber mais',
    light: true,
  },
  {
    eyebrow: 'Pilar 02',
    tag: 'ISO 14001 · HSE',
    title: 'Auditorias HSE & ISO 14001',
    headline: 'Identifica o problema antes que ele te custe dinheiro ou vidas.',
    desc: 'Realizamos auditorias de saúde, segurança e ambiente em estaleiros, instalações industriais e operações de campo. Preparamos empresas para certificação ISO 14001 e conformidade com a legislação angolana.',
    clients: 'Construção · Energia · Logística · Operações com exposição a risco HSE',
    cta: 'Ver processo',
    light: false,
  },
  {
    eyebrow: 'Pilar 03',
    tag: 'Software · Dashboards',
    title: 'Software & Dashboards Operacionais',
    headline: 'Sistemas que a tua equipa realmente usa.',
    desc: 'Desenvolvemos dashboards HSE, plataformas de gestão e produtos mobile desenhados para o contexto angolano — com os dados certos, no momento certo.',
    clients: 'Equipas HSE · Gestores de projeto · Empresas que querem sair do Excel e do WhatsApp',
    cta: 'Ver projetos',
    light: false,
  },
]

const ESG_PROJECTS = [
  {
    number: '01',
    title: 'HMRC · HMRH · HMRL',
    category: 'HSE · Campo',
    desc: 'Gestão HSE em 3 estaleiros de construção hospitalar para as FAA — Cabinda, Huambo e Luena.',
  },
  {
    number: '02',
    title: 'ESMS para Financiamento',
    category: 'ESMS · Conformidade',
    desc: 'Estruturação de sistemas ESMS para empresas a aceder a financiamento IFC, BAI e BDA.',
  },
  {
    number: '03',
    title: 'Auditorias ISO 14001',
    category: 'ISO 14001 · Ambiente',
    desc: 'Diagnóstico e preparação para certificação ambiental em operações industriais e de construção.',
  },
  {
    number: '04',
    title: 'SGAS Pro',
    category: 'SaaS · HSE',
    desc: 'Plataforma SaaS de gestão HSE para estaleiros angolanos — do registo de incidentes ao relatório mensal.',
  },
]

const PRODUCTS = [
  {
    title: 'HSE Dashboards',
    category: 'Dashboards de HSE',
    desc: 'Dados de saúde, segurança e ambiente convertidos em indicadores claros para decisões rápidas.',
    image: '/cards/hse-dashboard.png',
  },
  {
    title: 'Sem Fronteiras',
    category: 'Financiamento e confiança',
    desc: 'Uma apresentação visual para explicar soluções completas, processos e resultados reais.',
    image: '/cards/sem-fronteiras.png',
  },
  {
    title: 'AI Safety Lens',
    category: 'IA aplicada',
    desc: 'Análise inteligente de imagens para identificar riscos, EPI, EPC e ações no terreno.',
    image: '/cards/ai-safety.png',
  },
  {
    title: 'KARREGA',
    category: 'Mobilidade',
    desc: 'Ride-hailing pensado para cidades angolanas, com marca, fluxo e experiência mobile.',
    image: '/cards/karrega.png',
  },
]

export default function Work() {
  return (
    <>
      {/* ── About ─────────────────────────────────────────────────────── */}
      <section id="about" className="bg-bg px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime">O que fazemos</p>
            <h2 className="mt-4 font-display text-5xl leading-none text-white md:text-7xl">
              Da auditoria ao produto.
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="grid gap-5 text-lg leading-8 text-white/65">
            <p>
              A H.SILVA combina consultoria ESG/ESMS, auditorias HSE e desenvolvimento de software —
              para empresas que precisam de estrutura real no contexto angolano.
            </p>
            <p>
              Operamos em campo, construímos sistemas e garantimos conformidade
              para equipas que não podem depender do improviso.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Three Pillars ─────────────────────────────────────────────── */}
      <section id="services" className="bg-bg px-4 pb-10 pt-2 md:px-8 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime">Serviços</p>
              <h2 className="mt-3 font-display text-4xl text-white md:text-6xl">
                Três pilares. Um único parceiro.
              </h2>
            </div>
            <a
              href="mailto:geral@hsilva.ao"
              className="hidden rounded-full border border-white/15 px-5 py-3 text-sm text-white/65 transition hover:border-white/30 hover:text-white md:inline-flex"
            >
              Contacto
            </a>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {PILLARS.map((card, i) => (
              <Reveal key={card.eyebrow} delay={i * 0.1}>
                <article
                  className={
                    card.light
                      ? 'flex min-h-[440px] flex-col rounded-[28px] bg-white p-7 text-black shadow-2xl shadow-black/20'
                      : 'flex min-h-[440px] flex-col rounded-[28px] border border-white/10 bg-white/[0.04] p-7 text-white'
                  }
                >
                  {/* Eyebrow + tag */}
                  <div className="flex items-center justify-between">
                    <span className={card.light ? 'text-xs font-bold text-black/40' : 'text-xs font-bold text-lime'}>
                      {card.eyebrow}
                    </span>
                    <span
                      className={
                        card.light
                          ? 'rounded-full bg-black/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-black/50'
                          : 'rounded-full bg-white/8 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45'
                      }
                    >
                      {card.tag}
                    </span>
                  </div>

                  {/* Title + headline + desc */}
                  <div className="mt-7 flex-1">
                    <h3 className="text-2xl font-bold leading-tight tracking-[-0.03em]">{card.title}</h3>
                    <p className={card.light ? 'mt-2 text-sm italic text-black/55' : 'mt-2 text-sm italic text-white/50'}>
                      {card.headline}
                    </p>
                    <p className={card.light ? 'mt-5 text-sm leading-7 text-black/60' : 'mt-5 text-sm leading-7 text-white/60'}>
                      {card.desc}
                    </p>
                  </div>

                  {/* Para quem */}
                  <div className={card.light ? 'mt-6 border-t border-black/10 pt-5' : 'mt-6 border-t border-white/10 pt-5'}>
                    <p className={card.light ? 'mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/35' : 'mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/35'}>
                      Para quem
                    </p>
                    <p className={card.light ? 'text-xs leading-5 text-black/55' : 'text-xs leading-5 text-white/55'}>
                      {card.clients}
                    </p>
                  </div>

                  <a
                    href="mailto:geral@hsilva.ao"
                    className={
                      card.light
                        ? 'mt-6 inline-flex w-max rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80'
                        : 'mt-6 inline-flex w-max rounded-full bg-lime px-5 py-3 text-sm font-semibold text-black transition hover:bg-lime/90'
                    }
                  >
                    {card.cta}
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ESG / Consulting projects ──────────────────────────────────── */}
      <section id="work" className="bg-bg px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime">Projetos</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-white md:text-7xl">
              Trabalho real. Resultados mensuráveis.
            </h2>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2">
            {ESG_PROJECTS.map((p, i) => (
              <Reveal key={p.number} delay={i * 0.1}>
                <a
                  href={`mailto:geral@hsilva.ao?subject=${encodeURIComponent(`Projeto H.SILVA: ${p.title}`)}`}
                  className="group block cursor-pointer rounded-[24px] bg-zinc-900 p-7 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-lime/25 hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.7)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-5xl italic leading-none text-lime/25 transition duration-300 group-hover:text-lime/40">
                      {p.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-lime/70">
                        {p.category}
                      </span>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-lime/10 text-lime text-xs font-bold transition duration-300 group-hover:bg-lime group-hover:text-black">
                        ↗
                      </span>
                    </div>
                  </div>
                  <h3 className="mt-5 font-display text-[1.6rem] italic leading-tight text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.75] text-white/65">{p.desc}</p>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Software products ──────────────────────────────────────────── */}
      <section id="products" className="bg-bg px-4 pb-20 pt-2 md:px-8 md:pb-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-lime">Produtos</p>
            <h2 className="mt-3 font-display text-5xl leading-none text-white md:text-7xl">
              Ideias em produto.
            </h2>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.title} delay={i * 0.1}>
                <a
                  href={`mailto:geral@hsilva.ao?subject=${encodeURIComponent(`Produto H.SILVA: ${product.title}`)}`}
                  className="group block cursor-pointer overflow-hidden rounded-[28px] bg-zinc-900 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-0.5 hover:ring-lime/25 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.85)]"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      draggable={false}
                      className="w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <div className="px-6 py-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-lime">
                        {product.category}
                      </span>
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime text-sm font-bold text-black transition-transform duration-300 group-hover:scale-110">
                        ↗
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-[1.75rem] italic leading-tight text-white">
                      {product.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-[1.75] text-white/70">{product.desc}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
