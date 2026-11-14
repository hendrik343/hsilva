import { useEffect, useState, type ReactNode } from "react";

/* SilvaGo — táxi no Huambo + Corrida Solidária (grátis para o hospital). */

type Lang = "pt" | "en";

const PHONE = { tel: "tel:+244945786313", label: "945 786 313" };
const EMAIL = "geral@hsilva.app";

const T = {
  pt: {
    nav: { servicos: "Serviços", solidaria: "Corrida Solidária", como: "Como funciona", contacto: "Contacto" },
    call: "Ligar agora",
    callNumber: "Ligar " + PHONE.label,
    badge: "Táxi no Huambo",
    h1: "O táxi do Huambo que leva quem precisa ao hospital,",
    h1Mark: "de graça.",
    lede: "A SilvaGo é um serviço de táxi como os outros — com uma diferença. Grávidas, idosos e pessoas sem condições ligam, marcam, e nós vamos buscá-los a casa para os levar ao hospital. Sem pagar nada.",
    heroSecondary: "Quem tem direito",
    ticket: {
      label: "Corrida Solidária",
      free: "Grátis",
      from: "A sua casa",
      fromSub: "Vamos buscar à porta",
      to: "Hospital",
      toSub: "Consulta, parto ou urgência",
      costLabel: "Custo da corrida",
      cost: "0 Kz",
      taxiTitle: "Táxi SilvaGo",
      taxiSub: "Para qualquer destino no Huambo",
    },
    services: {
      kicker: "Serviços",
      title: "Um táxi para todos os dias. Uma corrida grátis para os dias difíceis.",
      taxi: {
        tag: "Serviço normal",
        title: "Táxi SilvaGo",
        body: "Precisa de ir ao mercado, ao trabalho ou a casa de alguém? Ligue, diga onde está e para onde vai. É um táxi normal, pago, para qualquer destino no Huambo.",
        items: ["Qualquer destino no Huambo", "Marque com antecedência ou peça na hora", "Uma chamada e fica marcado"],
        cta: "Pedir um táxi",
      },
      sol: {
        tag: "Grátis",
        title: "Corrida Solidária",
        body: "Quem precisa de ir ao hospital e não tem como pagar um táxi não fica em casa. Ligue, marque a corrida, e vamos buscar a pessoa a casa e levá-la ao hospital. Não se paga nada.",
        items: ["Grávidas", "Idosos", "Pessoas sem condições para pagar"],
        cta: "Marcar corrida grátis",
      },
    },
    who: {
      kicker: "Corrida Solidária",
      title: "Quem pode pedir a corrida grátis",
      lede: "Não é preciso aplicação nem internet. Basta um telefone.",
      tiles: [
        { icon: "baby", title: "Grávidas", body: "Consultas de acompanhamento, exames e a ida para a maternidade na hora do parto." },
        { icon: "user", title: "Idosos", body: "Consultas, tratamentos e exames, sem ter de depender de boleias." },
        { icon: "heart", title: "Pessoas sem condições", body: "Quem não tem dinheiro para o táxi não deixa de ir ao hospital por causa disso." },
      ],
      coverTitle: "Para que serve",
      cover: ["Consultas", "Maternidade e partos", "Urgências", "Exames e tratamentos"],
      coverNote: "A corrida grátis é só para serviços hospitalares.",
    },
    how: {
      kicker: "Como funciona",
      title: "Três passos. Uma chamada.",
      steps: [
        { icon: "phone", title: "Ligue para a SilvaGo", body: PHONE.label + ". Diga se é táxi normal ou corrida para o hospital." },
        { icon: "pin", title: "Diga onde está e para onde vai", body: "A morada onde vamos buscar, o hospital ou destino, e o dia e a hora." },
        { icon: "car", title: "Vamos buscar a casa", body: "O motorista chega ao local combinado e leva a pessoa até ao destino." },
      ],
    },
    final: {
      title: "Precisa de uma corrida?",
      lede: "Para o dia a dia ou para chegar ao hospital — a chamada é a mesma.",
    },
    footer: {
      tagline: "Táxi e Corrida Solidária no Huambo, Angola.",
      note: "Corrida grátis para serviços hospitalares: grávidas, idosos e pessoas sem condições.",
    },
  },
  en: {
    nav: { servicos: "Services", solidaria: "Solidarity Ride", como: "How it works", contacto: "Contact" },
    call: "Call now",
    callNumber: "Call " + PHONE.label,
    badge: "Taxi in Huambo",
    h1: "The Huambo taxi that takes those in need to hospital,",
    h1Mark: "for free.",
    lede: "SilvaGo is a taxi service like any other — with one difference. Pregnant women, the elderly and people who cannot afford it call, book, and we pick them up at home and take them to hospital. At no cost.",
    heroSecondary: "Who qualifies",
    ticket: {
      label: "Solidarity Ride",
      free: "Free",
      from: "Your home",
      fromSub: "We pick you up at the door",
      to: "Hospital",
      toSub: "Appointment, delivery or emergency",
      costLabel: "Cost of the ride",
      cost: "0 Kz",
      taxiTitle: "SilvaGo Taxi",
      taxiSub: "To any destination in Huambo",
    },
    services: {
      kicker: "Services",
      title: "A taxi for every day. A free ride for the hard days.",
      taxi: {
        tag: "Regular service",
        title: "SilvaGo Taxi",
        body: "Need to get to the market, to work or to someone's house? Call, tell us where you are and where you are going. It is a regular, paid taxi to any destination in Huambo.",
        items: ["Any destination in Huambo", "Book ahead or ask on the spot", "One call and it is booked"],
        cta: "Book a taxi",
      },
      sol: {
        tag: "Free",
        title: "Solidarity Ride",
        body: "Anyone who needs to get to hospital and cannot pay for a taxi does not stay at home. Call, book the ride, and we pick the person up at home and take them to hospital. Nothing to pay.",
        items: ["Pregnant women", "The elderly", "People who cannot afford to pay"],
        cta: "Book a free ride",
      },
    },
    who: {
      kicker: "Solidarity Ride",
      title: "Who can ask for the free ride",
      lede: "No app and no internet needed. A phone is enough.",
      tiles: [
        { icon: "baby", title: "Pregnant women", body: "Check-ups, exams and the trip to the maternity ward when labour starts." },
        { icon: "user", title: "The elderly", body: "Appointments, treatments and exams, without depending on lifts from others." },
        { icon: "heart", title: "People without means", body: "Nobody should miss hospital because they cannot pay for the taxi." },
      ],
      coverTitle: "What it is for",
      cover: ["Appointments", "Maternity and deliveries", "Emergencies", "Exams and treatments"],
      coverNote: "The free ride is for hospital services only.",
    },
    how: {
      kicker: "How it works",
      title: "Three steps. One call.",
      steps: [
        { icon: "phone", title: "Call SilvaGo", body: PHONE.label + ". Tell us if it is a regular taxi or a ride to hospital." },
        { icon: "pin", title: "Tell us where you are and where you are going", body: "The pick-up address, the hospital or destination, and the day and time." },
        { icon: "car", title: "We pick you up at home", body: "The driver arrives at the agreed place and takes the person to the destination." },
      ],
    },
    final: {
      title: "Need a ride?",
      lede: "For everyday trips or to get to hospital — it is the same call.",
    },
    footer: {
      tagline: "Taxi and Solidarity Ride in Huambo, Angola.",
      note: "Free ride for hospital services: pregnant women, the elderly and people without means.",
    },
  },
} as const;

type IconName = "phone" | "pin" | "car" | "heart" | "check" | "baby" | "user" | "home" | "hospital" | "arrow";

const ICONS: Record<IconName, ReactNode> = {
  phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />,
  pin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
  car: (
    <>
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </>
  ),
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  check: <path d="M20 6 9 17l-5-5" />,
  baby: (
    <>
      <path d="M9 12h.01" />
      <path d="M15 12h.01" />
      <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
      <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
    </>
  ),
  home: (
    <>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  hospital: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </>
  ),
};

function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg className={className + " flex-none"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

const btn = "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-2xl px-6 font-display text-base font-bold transition-colors duration-200";
const btnPrimary = btn + " bg-cta text-cta-ink shadow-soft hover:bg-cta-hover";
const btnGhost = btn + " border border-line bg-card text-ink hover:border-brand";

function SectionHead({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <div className="max-w-2xl">
      <p className="font-display text-sm font-bold uppercase tracking-wider text-brand">{kicker}</p>
      <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {lede && <p className="mt-4 text-lg leading-relaxed text-body">{lede}</p>}
    </div>
  );
}

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-6 space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 font-medium text-ink">
          <span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-brand/10 text-brand">
            <Icon name="check" className="h-4 w-4" />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>("pt");
  const t = T[lang];

  useEffect(() => {
    document.documentElement.lang = lang === "pt" ? "pt-AO" : "en";
  }, [lang]);

  return (
    <div id="top" className="min-h-screen text-[17px] leading-relaxed">
      <header className="fixed inset-x-3 top-3 z-50 mx-auto max-w-6xl rounded-2xl border border-line bg-card/90 shadow-soft backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
          <a href="#top" className="flex min-h-[44px] items-center gap-2.5 font-display text-xl font-extrabold tracking-tight text-ink">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-panel text-cta">
              <Icon name="car" className="h-5 w-5" />
            </span>
            <span>
              Silva<span className="text-brand">Go</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex" aria-label={lang === "pt" ? "Secções" : "Sections"}>
            {(
              [
                ["#servicos", t.nav.servicos],
                ["#solidaria", t.nav.solidaria],
                ["#como-funciona", t.nav.como],
                ["#contacto", t.nav.contacto],
              ] as const
            ).map(([href, label]) => (
              <a key={href} href={href} className="rounded-lg px-3 py-2.5 text-[15px] font-medium text-body transition-colors duration-200 hover:bg-page hover:text-ink">
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="flex overflow-hidden rounded-xl border border-line" role="group" aria-label="Idioma / Language">
              {(["pt", "en"] as const).map((l) => (
                <button
                  key={l}
                  type="button"
                  aria-pressed={lang === l}
                  onClick={() => setLang(l)}
                  className={
                    "h-11 min-w-[44px] cursor-pointer px-2 font-display text-sm font-bold uppercase transition-colors duration-200 " +
                    (lang === l ? "bg-panel text-white" : "bg-card text-muted hover:text-ink")
                  }
                >
                  {l}
                </button>
              ))}
            </div>
            <a href={PHONE.tel} className={btnPrimary + " hidden !min-h-[44px] !rounded-xl !px-4 !text-[15px] sm:inline-flex"}>
              <Icon name="phone" className="h-[18px] w-[18px]" />
              {t.call}
            </a>
          </div>
        </div>
      </header>

      <main className="pb-24 pt-24 sm:pb-0">
        <section className="relative overflow-hidden">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-cta/20 blur-3xl" />
          <div aria-hidden="true" className="pointer-events-none absolute -left-52 top-40 h-[460px] w-[460px] rounded-full bg-brand/10 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-16 pt-8 lg:grid-cols-[1.1fr_.9fr] lg:pb-24 lg:pt-16">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-line bg-card px-3.5 py-1.5 font-display text-sm font-bold text-ink motion-safe:animate-rise">
                <span className="h-2 w-2 rounded-full bg-cta" aria-hidden="true" />
                {t.badge}
              </p>
              <h1 className="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.06] tracking-tight text-ink motion-safe:animate-rise sm:text-6xl" style={{ animationDelay: "70ms" }}>
                {t.h1}{" "}
                <span className="relative inline-block whitespace-nowrap">
                  <span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-3 rounded bg-cta/70 sm:bottom-2 sm:h-4" />
                  <span className="relative">{t.h1Mark}</span>
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-body motion-safe:animate-rise sm:text-xl" style={{ animationDelay: "140ms" }}>
                {t.lede}
              </p>
              <div className="mt-8 flex flex-col gap-3 motion-safe:animate-rise sm:flex-row" style={{ animationDelay: "210ms" }}>
                <a href={PHONE.tel} className={btnPrimary}>
                  <Icon name="phone" className="h-5 w-5" />
                  {t.callNumber}
                </a>
                <a href="#solidaria" className={btnGhost}>
                  {t.heroSecondary}
                  <Icon name="arrow" className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="mx-auto w-full max-w-md motion-safe:animate-rise lg:max-w-none" style={{ animationDelay: "200ms" }}>
              <div className="on-panel rounded-[28px] bg-panel p-6 text-white shadow-lift sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-display text-sm font-bold">
                    <Icon name="heart" className="h-4 w-4 text-cta" />
                    {t.ticket.label}
                  </span>
                  <span className="rounded-full bg-cta px-3.5 py-1.5 font-display text-sm font-extrabold text-cta-ink">{t.ticket.free}</span>
                </div>

                <ol className="mt-8">
                  <li className="relative flex gap-4 pb-9">
                    <span aria-hidden="true" className="absolute bottom-1 left-[21px] top-12 border-l-2 border-dashed border-white/30" />
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-white/10">
                      <Icon name="home" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold">{t.ticket.from}</p>
                      <p className="text-[15px] text-teal-100/90">{t.ticket.fromSub}</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-cta text-cta-ink">
                      <Icon name="hospital" className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-display text-xl font-bold">{t.ticket.to}</p>
                      <p className="text-[15px] text-teal-100/90">{t.ticket.toSub}</p>
                    </div>
                  </li>
                </ol>

                <div className="mt-8 flex items-end justify-between gap-4 border-t border-white/15 pt-5">
                  <span className="text-[15px] text-teal-100/90">{t.ticket.costLabel}</span>
                  <span className="font-display text-5xl font-extrabold leading-none text-cta">{t.ticket.cost}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 rounded-2xl border border-line bg-card p-4 shadow-soft">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand/10 text-brand">
                  <Icon name="car" className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold leading-tight text-ink">{t.ticket.taxiTitle}</p>
                  <p className="text-[15px] text-muted">{t.ticket.taxiSub}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="servicos" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <SectionHead kicker={t.services.kicker} title={t.services.title} />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col rounded-3xl border border-line bg-card p-7 shadow-soft sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                  <Icon name="car" />
                </span>
                <span className="rounded-full border border-line px-3.5 py-1.5 font-display text-sm font-bold text-muted">{t.services.taxi.tag}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-extrabold text-ink">{t.services.taxi.title}</h3>
              <p className="mt-3 text-body">{t.services.taxi.body}</p>
              <CheckList items={t.services.taxi.items} />
              <a href={PHONE.tel} className={btnGhost + " mt-8 self-start"}>
                <Icon name="phone" className="h-5 w-5" />
                {t.services.taxi.cta}
              </a>
            </article>

            <article className="flex flex-col rounded-3xl border-2 border-tint-line bg-tint p-7 shadow-soft sm:p-9">
              <div className="flex items-center justify-between gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cta text-cta-ink">
                  <Icon name="heart" />
                </span>
                <span className="rounded-full bg-cta px-3.5 py-1.5 font-display text-sm font-extrabold text-cta-ink">{t.services.sol.tag}</span>
              </div>
              <h3 className="mt-6 font-display text-2xl font-extrabold text-ink">{t.services.sol.title}</h3>
              <p className="mt-3 text-body">{t.services.sol.body}</p>
              <CheckList items={t.services.sol.items} />
              <a href={PHONE.tel} className={btnPrimary + " mt-8 self-start"}>
                <Icon name="phone" className="h-5 w-5" />
                {t.services.sol.cta}
              </a>
            </article>
          </div>
        </section>

        <section id="solidaria" className="border-y border-line bg-card">
          <div className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
            <SectionHead kicker={t.who.kicker} title={t.who.title} lede={t.who.lede} />
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {t.who.tiles.map((tile) => (
                <article key={tile.title} className="rounded-3xl border border-line bg-page p-7">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-panel text-cta">
                    <Icon name={tile.icon} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-extrabold text-ink">{tile.title}</h3>
                  <p className="mt-2 text-body">{tile.body}</p>
                </article>
              ))}

              <div className="on-panel rounded-3xl bg-panel p-7 text-white md:col-span-3 sm:p-9">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <h3 className="font-display text-xl font-extrabold">{t.who.coverTitle}</h3>
                    <p className="mt-1 text-[15px] text-teal-100/90">{t.who.coverNote}</p>
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {t.who.cover.map((c) => (
                      <li key={c} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-display text-[15px] font-bold">
                        <Icon name="hospital" className="h-4 w-4 text-cta" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="como-funciona" className="mx-auto max-w-6xl px-5 py-16 lg:py-24">
          <SectionHead kicker={t.how.kicker} title={t.how.title} />
          <ol className="mt-10 grid gap-5 md:grid-cols-3">
            {t.how.steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl border border-line bg-card p-7 shadow-soft">
                <div className="flex items-center justify-between">
                  <span className="font-display text-5xl font-extrabold leading-none text-brand/25" aria-hidden="true">
                    {i + 1}
                  </span>
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/10 text-brand">
                    <Icon name={s.icon} />
                  </span>
                </div>
                <h3 className="mt-6 font-display text-xl font-extrabold text-ink">{s.title}</h3>
                <p className="mt-2 text-body">{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <section id="contacto" className="mx-auto max-w-6xl px-5 pb-16 lg:pb-24">
          <div className="on-panel relative overflow-hidden rounded-[32px] bg-panel px-7 py-12 text-white shadow-lift sm:px-12 sm:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cta/25 blur-3xl" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-xl">
                <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{t.final.title}</h2>
                <p className="mt-4 text-lg text-teal-100/90">{t.final.lede}</p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
                <a href={PHONE.tel} className={btnPrimary + " !min-h-[60px] !px-7 !text-lg"}>
                  <Icon name="phone" className="h-5 w-5" />
                  {PHONE.label}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-line pb-28 sm:pb-0">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-xl font-extrabold text-ink">
              Silva<span className="text-brand">Go</span>
            </p>
            <p className="mt-2 text-[15px] text-muted">{t.footer.tagline}</p>
            <p className="mt-2 text-[15px] text-muted">{t.footer.note}</p>
          </div>
          <ul className="space-y-1 text-[15px]">
            <li>
              <a href={PHONE.tel} className="inline-flex min-h-[44px] cursor-pointer items-center gap-2.5 font-semibold text-ink transition-colors duration-200 hover:text-brand">
                  <Icon name="phone" className="h-[18px] w-[18px] text-brand" />
                  {PHONE.label}
                </a>
            </li>
            <li>
              <a href={"mailto:" + EMAIL} className="inline-flex min-h-[44px] cursor-pointer items-center text-muted underline decoration-line underline-offset-4 transition-colors duration-200 hover:text-ink">
                {EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </footer>

      <a href={PHONE.tel} className={btnPrimary + " fixed inset-x-3 bottom-3 z-50 !min-h-[56px] shadow-lift sm:hidden"}>
        <Icon name="phone" className="h-5 w-5" />
        {t.callNumber}
      </a>
    </div>
  );
}
