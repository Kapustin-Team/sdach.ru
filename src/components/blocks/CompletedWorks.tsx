'use client'

import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

const imageMaskVariants = {
  enter: (direction: number) => ({
    clipPath: direction > 0 ? 'inset(0 0 0 100%)' : 'inset(0 100% 0 0)',
    scale: 1.04,
  }),
  center: {
    clipPath: 'inset(0 0 0 0)',
    scale: 1,
  },
  exit: (direction: number) => ({
    clipPath: direction > 0 ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)',
    scale: 1.04,
  }),
}

const imageMaskTransition = {
  duration: 0.72,
  ease: [0.76, 0, 0.24, 1] as const,
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
  const [slideDirection, setSlideDirection] = useState(1)
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

  const prev = () => {
    setSlideDirection(-1)
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  }
  const next = () => {
    setSlideDirection(1)
    setActiveIndex((prev) => (prev + 1) % images.length)
  }
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
        <div className="grid grid-cols-[1.2fr_1.1fr_0.78fr] items-start gap-4 max-lg:grid-cols-2 max-md:grid-cols-1">
          {visibleImages[0] && (
            <button
              type="button"
              onClick={() => setLightboxIndex(visibleImages[0].index)}
              className="group relative block h-[420px] cursor-zoom-in overflow-hidden bg-black/5 text-left max-md:h-[300px]"
              aria-label={`Открыть фото ${visibleImages[0].index + 1}`}
            >
              <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                <motion.img
                  key={`${visibleImages[0].src}-${visibleImages[0].index}-main`}
                  src={visibleImages[0].src}
                  alt={visibleImages[0].alt}
                  custom={slideDirection}
                  variants={imageMaskVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={imageMaskTransition}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </AnimatePresence>
            </button>
          )}

          {visibleImages[1] && (
            <button
              type="button"
              onClick={() => setLightboxIndex(visibleImages[1].index)}
              className="group relative block h-[330px] cursor-zoom-in overflow-hidden bg-black/5 text-left max-md:h-[280px]"
              aria-label={`Открыть фото ${visibleImages[1].index + 1}`}
            >
              <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                <motion.img
                  key={`${visibleImages[1].src}-${visibleImages[1].index}-secondary`}
                  src={visibleImages[1].src}
                  alt={visibleImages[1].alt}
                  custom={slideDirection}
                  variants={imageMaskVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ ...imageMaskTransition, delay: 0.05 }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </AnimatePresence>
            </button>
          )}

          <div className="flex h-[420px] flex-col justify-between gap-4 max-lg:col-span-2 max-lg:h-auto max-lg:flex-row max-lg:items-end max-md:col-span-1 max-md:flex-col">
            {visibleImages[2] && (
              <button
                type="button"
                onClick={() => setLightboxIndex(visibleImages[2].index)}
                className="group relative block h-[330px] cursor-zoom-in overflow-hidden bg-black/5 text-left max-lg:flex-1 max-md:h-[280px]"
                aria-label={`Открыть фото ${visibleImages[2].index + 1}`}
              >
                <AnimatePresence initial={false} custom={slideDirection} mode="popLayout">
                  <motion.img
                    key={`${visibleImages[2].src}-${visibleImages[2].index}-small`}
                    src={visibleImages[2].src}
                    alt={visibleImages[2].alt}
                    custom={slideDirection}
                    variants={imageMaskVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ ...imageMaskTransition, delay: 0.1 }}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </AnimatePresence>
              </button>
            )}

            {images.length > 1 && (
              <div className="flex items-center justify-end gap-3 max-lg:min-w-[128px] max-md:justify-start">
                <button
                  type="button"
                  className="flex h-12 min-w-[56px] items-center justify-center border border-dark bg-transparent px-4 text-[24px] text-dark transition hover:bg-dark hover:text-bg"
                  onClick={prev}
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="flex h-12 min-w-[56px] items-center justify-center border border-dark bg-transparent px-4 text-[24px] text-dark transition hover:bg-dark hover:text-bg"
                  onClick={next}
                  aria-label="Следующее фото"
                >
                  ›
                </button>
              </div>
            )}
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
                    className="absolute left-4 top-1/2 z-10 flex h-14 min-w-[56px] -translate-y-1/2 items-center justify-center border border-white/30 bg-black/20 px-4 text-[32px] text-white transition hover:bg-white hover:text-dark max-md:left-2"
                    onClick={prevLightbox}
                    aria-label="Предыдущее фото"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 z-10 flex h-14 min-w-[56px] -translate-y-1/2 items-center justify-center border border-white/30 bg-black/20 px-4 text-[32px] text-white transition hover:bg-white hover:text-dark max-md:right-2"
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
              <div className="w-full max-w-[760px] overflow-x-auto border border-white/15 bg-black/35 px-3 py-2 max-md:max-w-full">
                <div className="flex min-w-max gap-2 pb-1">
                  {images.map((image, index) => (
                    <button
                      key={`${image.fullSrc}-thumb-${index}`}
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className={`overflow-hidden border transition ${index === lightboxIndex ? 'border-white opacity-100' : 'border-white/15 opacity-60 hover:opacity-100'}`}
                      aria-label={`Открыть фото ${index + 1}`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-14 w-20 object-cover md:h-16 md:w-24"
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
