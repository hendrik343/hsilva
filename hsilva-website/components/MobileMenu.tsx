'use client'

import { useState } from 'react'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from '@/lib/constants'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        className="relative z-50 flex size-11 items-center justify-center rounded-full border border-white/30 bg-white/14 text-white"
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M1 1L17 17M17 1L1 17" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
            <path d="M0 1H20M0 7H20M0 13H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-deep/97 px-6 backdrop-blur-sm"
        >
          <nav aria-label="Navegação principal" className="flex flex-col items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-sans text-xl font-semibold text-white"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href={PHONE_TEL}
            onClick={() => setOpen(false)}
            className="rounded-full bg-amber px-8 py-4 font-sans text-base font-bold text-deep"
          >
            Ligar {PHONE_DISPLAY}
          </a>
        </div>
      )}
    </div>
  )
}
