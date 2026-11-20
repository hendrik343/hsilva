import { NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-deep px-6 py-12 md:px-16 md:py-14">
      <div className="mx-auto flex max-w-content flex-col gap-10 md:gap-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-amber font-display text-lg font-semibold text-deep">
                S
              </span>
              <span className="font-display text-xl font-semibold text-white">SilvaGo</span>
            </div>
            <p className="font-sans text-sm text-white/65">Táxi SilvaGo e Corrida Solidária. Huambo, Angola.</p>
          </div>

          <nav aria-label="Links do rodapé" className="flex flex-wrap gap-x-8 gap-y-3 font-sans text-sm text-white/75">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-white">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/12 pt-6">
          <p className="font-sans text-xs text-white/50">
            © 2026 H.SILVA — Consultoria &amp; Prestação de Serviços (SU), Lda.
          </p>
        </div>
      </div>
    </footer>
  )
}
