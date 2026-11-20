import Link from 'next/link'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from '@/lib/constants'
import MobileMenu from './MobileMenu'

export default function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-16 md:py-7">
      <Link href="#top" className="flex items-center gap-3">
        <span className="flex size-9 md:size-10 items-center justify-center rounded-xl bg-amber font-display text-xl md:text-2xl font-semibold text-deep">
          S
        </span>
        <span className="font-display text-xl md:text-[28px] font-semibold text-white">SilvaGo</span>
      </Link>

      <nav aria-label="Navegação principal" className="hidden md:flex items-center gap-9 font-sans text-[15px] font-medium text-white/88">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className="transition-colors hover:text-white">
            {link.label}
          </a>
        ))}
      </nav>

      <a
        href={PHONE_TEL}
        className="hidden md:flex items-center justify-center rounded-full bg-amber px-6 py-3.5 font-sans text-[15px] font-bold text-deep transition-transform hover:scale-[1.03]"
      >
        Ligar {PHONE_DISPLAY}
      </a>

      <MobileMenu />
    </header>
  )
}
