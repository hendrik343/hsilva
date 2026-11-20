'use client'

import { useState } from 'react'
import Image from 'next/image'

type VideoSlotProps = {
  src?: string
  poster: string
  posterAlt: string
  playLabel: string
  className?: string
  children?: React.ReactNode
}

/**
 * Click-to-play video slot. With no `src` configured it renders only the
 * poster image and hides the play affordance, per spec.
 */
export default function VideoSlot({ src, poster, posterAlt, playLabel, className = '', children }: VideoSlotProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {isPlaying && src ? (
        <video
          className="absolute inset-0 size-full object-cover"
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          controls
        />
      ) : (
        <Image
          src={poster}
          alt={posterAlt}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 1312px, 100vw"
        />
      )}

      {!isPlaying && (
        <div className="absolute inset-0 bg-deep/42" aria-hidden="true" />
      )}

      {!isPlaying && src && (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          aria-label={playLabel}
          className="absolute left-1/2 top-1/2 flex size-20 md:size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white transition-transform duration-200 hover:scale-105"
        >
          <svg width="22" height="25" viewBox="0 0 30 34" fill="none" aria-hidden="true" className="md:w-[30px] md:h-[34px]">
            <path d="M3 2L27 17L3 32V2Z" fill="#062624" />
          </svg>
        </button>
      )}

      {children}
    </div>
  )
}
