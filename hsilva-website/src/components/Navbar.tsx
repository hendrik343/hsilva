import { useState } from 'react'

const LINKS = [
  { label: 'Sobre', href: '#about' },
  { label: 'Servicos', href: '#services' },
  { label: 'Projetos', href: '#work' },
  { label: 'Contacto', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-8">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-[28px] border border-white/15 bg-black/45 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
        <a href="#hero" className="flex items-center gap-3" aria-label="H.SILVA inicio">
          <img src="/hsilva-logo.jpg" alt="H.SILVA" className="h-9 w-9 rounded-full border border-cyan-400/30 object-cover" />
          <span className="text-sm font-bold tracking-wide text-white md:text-base">H.SILVA</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="mailto:geral@hsilva.ao"
          className="hidden rounded-full bg-lime px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] md:inline-flex"
        >
          Iniciar Projeto
        </a>

        <button
          type="button"
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span className={`h-0.5 w-5 bg-current transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-current transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-3 max-w-6xl rounded-[24px] border border-white/10 bg-black/90 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl md:hidden">
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 px-2 py-4 text-sm text-white/75 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:geral@hsilva.ao"
              className="mt-3 rounded-full bg-lime px-5 py-3 text-center text-sm font-semibold text-black"
            >
              Iniciar Projeto
            </a>
          </div>
        </div>
      ) : null}
    </header>
  )
}
