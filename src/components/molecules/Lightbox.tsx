'use client'

import { useCallback, useEffect, useState } from 'react'

interface LightboxProps {
  images: { src: string; alt: string }[]
  layout?: 'project-hero'
}

export default function Lightbox({ images, layout }: LightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const close = useCallback(() => setActiveIndex(null), [])

  useEffect(() => {
    if (activeIndex === null) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [activeIndex, close])

  const renderThumbnail = (img: { src: string; alt: string }, i: number, className: string) => (
    <div
      key={i}
      className={`cursor-pointer overflow-hidden ${className}`}
      onClick={() => setActiveIndex(i)}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover"
      />
    </div>
  )

  const renderImages = () => {
    if (layout === 'project-hero') {
      const row1 = images.slice(0, 2)
      const row2 = images.slice(2, 5)
      return (
        <>
          {/* Row 1: 2 photos 16:9 */}
          <div className="flex gap-2 max-md:flex-col">
            {row1.map((img, i) =>
              renderThumbnail(img, i, 'w-1/2 aspect-video max-md:w-full')
            )}
          </div>
          {/* Row 2: 3 photos 16:9 */}
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

      {activeIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={close}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white text-3xl leading-none bg-transparent border-none cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation()
              close()
            }}
            aria-label="Закрыть"
          >
            &#215;
          </button>
          <img
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  )
}
