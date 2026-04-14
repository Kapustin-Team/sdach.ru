'use client'

import { useEffect, useMemo, useState } from 'react'
import AnimatedTitle from '@/components/atoms/AnimatedTitle'

type DiskItem = {
  name: string
  file?: string
  preview?: string
  mime_type?: string
  created?: string
}

type GalleryImage = {
  src: string
  fullSrc: string
  alt: string
}

const DEFAULT_PUBLIC_KEY = 'https://disk.yandex.ru/d/RlyqxH7aOx2qHw'

interface CompletedWorksProps {
  label?: string
  title?: string
  subtitle?: string
  publicKey?: string
}

export default function CompletedWorks({
  label = 'Галерея',
  title = 'Готовые работы',
  subtitle = 'Показываем реальные объекты и детали выполненных работ. Листайте фотографии и открывайте каждую в полном размере.',
  publicKey = DEFAULT_PUBLIC_KEY,
}: CompletedWorksProps) {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const apiUrl = `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=${encodeURIComponent(publicKey)}&limit=200`
        const response = await fetch(apiUrl)
        const data = await response.json()
        const items: DiskItem[] = data?._embedded?.items || []

        const mapped = items
          .filter((item) => item.mime_type?.startsWith('image/') && item.file && item.preview)
          .sort((a, b) => a.name.localeCompare(b.name, 'ru', { numeric: true, sensitivity: 'base' }))
          .map((item) => ({
            src: item.preview!,
            fullSrc: item.file!,
            alt: `Готовая работа ${item.name}`,
          }))

        if (!cancelled) setImages(mapped)
      } catch {
        if (!cancelled) setImages([])
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [publicKey])

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
                className="flex h-12 w-12 items-center justify-center rounded-full border border-dark/15 text-[24px] text-dark transition hover:border-dark hover:bg-dark hover:text-white"
                onClick={prev}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-dark/15 text-[24px] text-dark transition hover:border-dark hover:bg-dark hover:text-white"
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 max-md:p-3"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            className="absolute right-6 top-6 text-[40px] leading-none text-white/80 transition hover:text-white"
            onClick={(event) => {
              event.stopPropagation()
              setLightboxIndex(null)
            }}
            aria-label="Закрыть"
          >
            ×
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[64px] leading-none text-white/70 transition hover:text-white max-md:left-2"
                onClick={(event) => {
                  event.stopPropagation()
                  setLightboxIndex((prev) => prev === null ? 0 : (prev - 1 + images.length) % images.length)
                }}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[64px] leading-none text-white/70 transition hover:text-white max-md:right-2"
                onClick={(event) => {
                  event.stopPropagation()
                  setLightboxIndex((prev) => prev === null ? 0 : (prev + 1) % images.length)
                }}
                aria-label="Следующее фото"
              >
                ›
              </button>
            </>
          )}

          <img
            src={images[lightboxIndex].fullSrc}
            alt={images[lightboxIndex].alt}
            className="max-h-[88vh] max-w-[90vw] object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
