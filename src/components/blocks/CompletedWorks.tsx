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

const PUBLIC_KEY = 'https://disk.yandex.ru/d/RlyqxH7aOx2qHw'
const API_URL = `https://cloud-api.yandex.net/v1/disk/public/resources?public_key=${encodeURIComponent(PUBLIC_KEY)}&limit=200`

export default function CompletedWorks() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const response = await fetch(API_URL)
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
  }, [])

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

  const activeImage = images[activeIndex]
  const thumbnails = useMemo(() => images.slice(0), [images])

  const prev = () => setActiveIndex((prev) => (prev - 1 + images.length) % images.length)
  const next = () => setActiveIndex((prev) => (prev + 1) % images.length)

  if (!images.length) return null

  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <AnimatedTitle
        label="Галерея"
        heading="Готовые работы"
        subtitle="Показываем реальные объекты и детали выполненных работ. Листайте фотографии и открывайте каждую в полном размере."
      />

      <div className="mt-[50px] grid grid-cols-[minmax(0,1fr)_220px] gap-8 max-lg:grid-cols-1 max-md:mt-8">
        <div className="relative">
          <button
            type="button"
            className="group block w-full cursor-zoom-in overflow-hidden bg-black/5"
            onClick={() => setLightboxIndex(activeIndex)}
            aria-label="Открыть фото"
          >
            <img
              src={activeImage.fullSrc}
              alt={activeImage.alt}
              className="h-[620px] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] max-md:h-[420px]"
            />
          </button>

          {images.length > 1 && (
            <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-5">
              <button
                type="button"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition hover:bg-black/55"
                onClick={prev}
                aria-label="Предыдущее фото"
              >
                ‹
              </button>
              <button
                type="button"
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white transition hover:bg-black/55"
                onClick={next}
                aria-label="Следующее фото"
              >
                ›
              </button>
            </div>
          )}
        </div>

        <div className="flex max-h-[620px] flex-col gap-3 overflow-auto pr-1 max-lg:grid max-lg:max-h-none max-lg:grid-cols-4 max-lg:pr-0 max-md:grid-cols-3 max-sm:grid-cols-2">
          {thumbnails.map((image, index) => (
            <button
              key={image.fullSrc}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`overflow-hidden border transition ${index === activeIndex ? 'border-dark' : 'border-black/10 opacity-70 hover:opacity-100'}`}
              aria-label={`Показать фото ${index + 1}`}
            >
              <img src={image.src} alt={image.alt} className="h-[116px] w-full object-cover max-lg:h-[120px]" />
            </button>
          ))}
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
