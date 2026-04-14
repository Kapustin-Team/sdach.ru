'use client'

import { useEffect, useMemo, useState } from 'react'
import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import { strapiImage } from '@/utils/strapi-image'

type MediaImage = {
  id?: number
  name?: string
  url?: string
  formats?: {
    small?: { url?: string }
    medium?: { url?: string }
    large?: { url?: string }
  }
}

type GalleryImage = {
  src: string
  fullSrc: string
  alt: string
}

interface CompletedWorksProps {
  label?: string
  title?: string
  subtitle?: string
  images?: MediaImage[]
}

export default function CompletedWorks({
  label = 'Галерея',
  title = 'Готовые работы',
  subtitle = 'Показываем реальные объекты и детали выполненных работ. Листайте фотографии и открывайте каждую в полном размере.',
  images: imagesProp = [],
}: CompletedWorksProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const images = useMemo<GalleryImage[]>(() => {
    return (imagesProp || [])
      .filter((item) => item?.url)
      .map((item) => ({
        src: strapiImage(item.formats?.medium?.url || item.formats?.small?.url || item.url),
        fullSrc: strapiImage(item.formats?.large?.url || item.url),
        alt: `Готовая работа ${item.name || ''}`.trim(),
      }))
  }, [imagesProp])

  useEffect(() => {
    if (lightboxIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null)
      if (event.key === 'ArrowLeft') setLightboxIndex((prev) => prev === null ? 0 : (prev - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') setLightboxIndex((prev) => prev === null ? 0 : (prev + 1) % images.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [lightboxIndex, images.length])

  const visibleImages = useMemo(() => {
    if (!images.length) return []

    return [0, 1, 2].map((offset) => {
      const index = (activeIndex + offset) % images.length
      return { ...images[index], index }
    })
  }, [activeIndex, images])

  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  const next = () => setActiveIndex((prev) => (prev + 1) % images.length)
  const prevLightbox = () => setLightboxIndex((prev) => prev === null ? 0 : (prev - 1 + images.length) % images.length)
  const nextLightbox = () => setLightboxIndex((prev) => prev === null ? 0 : (prev + 1) % images.length)

  if (!images.length) return null

  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <AnimatedTitle
        label={label}
        heading={title}
        subtitle={subtitle}
      />

      <div className="mt-[50px] max-md:mt-8">
        <div className="relative">
          {images.length > 1 && (
            <div className="mb-6 flex items-center justify-end gap-3 max-md:mb-4">
              <button
                type="button"
                className="flex h-12 min-w-[56px] items-center justify-center rounded-[14px] border border-dark bg-transparent px-4 text-[24px] text-dark transition hover:bg-dark hover:text-bg"
                onClick={prev}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className="flex h-12 min-w-[56px] items-center justify-center rounded-[14px] border border-dark bg-transparent px-4 text-[24px] text-dark transition hover:bg-dark hover:text-bg"
                onClick={next}
                aria-label="Следующее фото"
              >
                ›
              </button>
            </div>
          )}

          <div className="grid grid-cols-[1.05fr_1.15fr_0.8fr] gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
            {visibleImages.map((image, position) => (
              <button
                key={`${image.fullSrc}-${position}`}
                type="button"
                onClick={() => setLightboxIndex(image.index)}
                className="group block cursor-zoom-in overflow-hidden bg-black/5 text-left"
                aria-label={`Открыть фото ${image.index + 1}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-[360px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] max-md:h-[280px]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {lightboxIndex !== null && images[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/90 px-6 py-5 max-md:px-3 max-md:py-3"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 z-20 text-[40px] leading-none text-white/80 transition hover:text-white"
            onClick={(event) => {
              event.stopPropagation()
              setLightboxIndex(null)
            }}
            aria-label="Закрыть"
          >
            ×
          </button>

          <div className="flex h-full flex-col items-center justify-center gap-5" onClick={(event) => event.stopPropagation()}>
            <div className="relative flex w-full max-w-[1280px] items-center justify-center">
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    className="absolute left-4 top-1/2 z-10 flex h-14 min-w-[56px] -translate-y-1/2 items-center justify-center rounded-[14px] border border-white/30 bg-black/20 px-4 text-[32px] text-white transition hover:bg-white hover:text-dark max-md:left-2"
                    onClick={prevLightbox}
                    aria-label="Предыдущее фото"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 z-10 flex h-14 min-w-[56px] -translate-y-1/2 items-center justify-center rounded-[14px] border border-white/30 bg-black/20 px-4 text-[32px] text-white transition hover:bg-white hover:text-dark max-md:right-2"
                    onClick={nextLightbox}
                    aria-label="Следующее фото"
                  >
                    ›
                  </button>
                </>
              )}

              <img
                src={images[lightboxIndex].fullSrc}
                alt={images[lightboxIndex].alt}
                className="max-h-[74vh] max-w-[90vw] object-contain"
              />
            </div>

            {images.length > 1 && (
              <div className="w-full max-w-[760px] overflow-x-auto rounded-[18px] border border-white/15 bg-white/5 p-3 backdrop-blur-sm max-md:max-w-full">
                <div className="flex min-w-max gap-2">
                  {images.map((image, index) => (
                    <button
                      key={`${image.fullSrc}-thumb-${index}`}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className={`overflow-hidden rounded-[10px] border transition ${index === lightboxIndex ? 'border-white' : 'border-white/10 opacity-60 hover:opacity-100'}`}
                      aria-label={`Открыть фото ${index + 1}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-16 w-24 object-cover max-md:h-14 max-md:w-20"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
