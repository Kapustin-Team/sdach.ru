'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface LightboxProps {
  images: { src: string; alt: string }[]
  layout?: 'project-hero'
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

export default function Lightbox({ images, layout }: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const pointerStartX = useRef<number | null>(null)
  const isOpen = activeIndex !== null

  const close = useCallback(() => setActiveIndex(null), [])

  const prev = useCallback(
    () => setActiveIndex(i => i !== null ? (i - 1 + images.length) % images.length : 0),
    [images.length]
  )

  const next = useCallback(
    () => setActiveIndex(i => i !== null ? (i + 1) % images.length : 0),
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

  const renderThumbnail = (img: { src: string; alt: string }, i: number, className: string) => (
    <motion.div
      key={i}
      className={`cursor-pointer overflow-hidden group ${className}`}
      onClick={() => setActiveIndex(i)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay: i * 0.08, ease }}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.05]"
      />
    </motion.div>
  )

  const renderImages = () => {
    if (layout === 'project-hero') {
      const row1 = images.slice(0, 2)
      const row2 = images.slice(2, 5)
      return (
        <>
          <div className="flex gap-2 max-md:flex-col">
            {row1.map((img, i) =>
              renderThumbnail(img, i, 'w-1/2 aspect-video max-md:w-full')
            )}
          </div>
          <div className="flex gap-2 max-md:flex-col">
            {row2.map((img, i) =>
              renderThumbnail(img, i + 2, 'w-1/3 aspect-video max-md:w-full')
            )}
          </div>
        </>
      )
    }

    return images.map((img, i) =>
      renderThumbnail(img, i, '')
    )
  }

  return (
    <>
      {renderImages()}

      {isOpen && activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
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
          {/* Close */}
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white text-3xl leading-none bg-transparent border-none cursor-pointer z-10"
            onClick={e => { e.stopPropagation(); close() }}
            aria-label="Закрыть"
          >
            &#215;
          </button>

          {/* Left arrow */}
          {images.length > 1 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none bg-transparent border-none cursor-pointer z-10 select-none px-2 max-md:left-1"
              onClick={e => { e.stopPropagation(); prev() }}
              aria-label="Предыдущее фото"
            >
              &#8249;
            </button>
          )}

          {/* Right arrow */}
          {images.length > 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-6xl leading-none bg-transparent border-none cursor-pointer z-10 select-none px-2 max-md:right-1"
              onClick={e => { e.stopPropagation(); next() }}
              aria-label="Следующее фото"
            >
              &#8250;
            </button>
          )}

          {/* Active image */}
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="object-contain select-none"
            style={{ maxWidth: '90vw', maxHeight: '80vh' }}
            onClick={e => e.stopPropagation()}
            onPointerDown={e => e.stopPropagation()}
            onPointerUp={e => e.stopPropagation()}
            draggable={false}
          />

          {/* Thumbnail strip */}
          {images.length > 1 && (
            <div
              className="flex gap-2 mt-4 overflow-x-auto max-w-[90vw] py-1 px-1"
              onClick={e => e.stopPropagation()}
              onPointerDown={e => e.stopPropagation()}
              onPointerUp={e => e.stopPropagation()}
            >
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={`shrink-0 w-16 h-11 overflow-hidden border-2 focus:outline-none transition-opacity ${
                    i === activeIndex
                      ? 'border-white opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Фото ${i + 1}`}
                >
                  <img src={img.src} alt="" className="w-full h-full object-cover" draggable={false} />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
