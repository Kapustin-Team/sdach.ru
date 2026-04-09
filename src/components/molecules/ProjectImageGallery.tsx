'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface ProjectImageGalleryProps {
  images: string[]
}

export default function ProjectImageGallery({ images }: ProjectImageGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const pointerStartX = useRef<number | null>(null)
  const isOpen = lightboxIndex !== null

  const close = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(
    () => setLightboxIndex(i => i !== null ? (i - 1 + images.length) % images.length : 0),
    [images.length]
  )

  const next = useCallback(
    () => setLightboxIndex(i => i !== null ? (i + 1) % images.length : 0),
    [images.length]
  )

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [isOpen, close, prev, next])

  if (!images.length) return null

  return (
    <>
      {/* ── Static view ─────────────────────────────────────── */}
      <div className="flex flex-col gap-2 px-2">
        {/* Main image */}
        <div
          className="w-full aspect-video overflow-hidden cursor-pointer group"
          onClick={() => setLightboxIndex(0)}
        >
          <img
            src={images[0]}
            alt="Главное фото проекта"
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.15]"
            draggable={false}
          />
        </div>

        {/* Thumbnail strip */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="shrink-0 w-[120px] h-[80px] overflow-hidden group focus:outline-none max-md:w-[90px] max-md:h-[60px]"
                aria-label={`Открыть фото ${i + 1}`}
              >
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.1]"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox overlay ────────────────────────────────── */}
      {isOpen && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.9)' }}
          onClick={close}
          onPointerDown={e => { pointerStartX.current = e.clientX }}
          onPointerUp={e => {
            if (pointerStartX.current === null) return
            const dx = e.clientX - pointerStartX.current
            pointerStartX.current = null
            if (dx > 50) prev()
            else if (dx < -50) next()
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-6 text-white/80 hover:text-white text-4xl leading-none cursor-pointer z-10 select-none bg-transparent border-none"
            onClick={e => { e.stopPropagation(); close() }}
            aria-label="Закрыть"
          >
            &#215;
          </button>

          {/* Left arrow */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none cursor-pointer z-10 select-none bg-transparent border-none px-2 max-md:left-1"
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Предыдущее фото"
            >
              &#8249;
            </button>
          )}

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none cursor-pointer z-10 select-none bg-transparent border-none px-2 max-md:right-1"
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Следующее фото"
            >
              &#8250;
            </button>
          )}

          {/* Active image */}
          <img
            src={images[lightboxIndex]}
            alt={`Фото ${lightboxIndex + 1}`}
            style={{ maxWidth: '90vw', maxHeight: '80vh' }}
            className="object-contain select-none"
            onClick={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onPointerUp={e => e.stopPropagation()}
            draggable={false}
          />

          {/* Lightbox thumbnail strip */}
          {images.length > 1 && (
            <div
              className="flex gap-2 mt-4 overflow-x-auto max-w-[90vw] py-1 px-1"
              onClick={e => e.stopPropagation()}
              onPointerDown={e => e.stopPropagation()}
              onPointerUp={e => e.stopPropagation()}
            >
              {images.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className={`shrink-0 w-16 h-11 overflow-hidden border-2 focus:outline-none transition-opacity ${
                    i === lightboxIndex
                      ? 'border-white opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Фото ${i + 1}`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
