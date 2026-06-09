import { useEffect, useRef, useState } from 'react'

interface LazyVideoProps {
  src: string
  poster?: string
  eager?: boolean
  wrapperClassName?: string
  mediaClassName?: string
}

export default function LazyVideo({
  src,
  poster = '/hsilva-logo.jpg',
  eager = false,
  wrapperClassName = '',
  mediaClassName = '',
}: LazyVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [inView, setInView] = useState(eager)
  const [allowMotion, setAllowMotion] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => setAllowMotion(!media.matches)

    updateMotion()
    media.addEventListener('change', updateMotion)
    return () => media.removeEventListener('change', updateMotion)
  }, [])

  useEffect(() => {
    if (eager || inView || !wrapperRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(wrapperRef.current)
    return () => observer.disconnect()
  }, [eager, inView])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (allowMotion) {
      void video.play().catch(() => undefined)
    } else {
      video.pause()
    }
  }, [allowMotion, inView])

  const shouldLoadVideo = (eager || inView) && allowMotion

  return (
    <div ref={wrapperRef} className={wrapperClassName} aria-hidden="true">
      <img
        src={poster}
        alt=""
        loading={eager ? 'eager' : 'lazy'}
        className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`}
      />
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className={`absolute inset-0 h-full w-full object-cover ${mediaClassName}`}
          src={src}
        />
      ) : null}
    </div>
  )
}
