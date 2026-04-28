'use client'

import { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Lightbox from '@/components/molecules/Lightbox'
import { strapiImage } from '@/utils/strapi-image'
import { StaggerContainer, StaggerItem } from '@/components/atoms/StaggerContainer'

interface Spec {
  label: string
  value: string
}

interface GalleryItem {
  url: string
  fullUrl?: string
}

interface ProjectHeroProps {
  title: string
  description?: string
  price: string
  priceWarmCircuit?: number | null
  priceForFinishing?: number | null
  priceWithFinishing?: number | null
  image: string
  gallery?: GalleryItem[]
  specs?: Spec[]
}

function formatRub(n: number) {
  return `${n.toLocaleString('ru-RU')} ₽`
}

interface PriceBreakdownProps {
  price: string
  warm: number
  forFinishing: number
  withFinishing: number
}

function PriceBreakdown({ price, warm, forFinishing, withFinishing }: PriceBreakdownProps) {
  const [open, setOpen] = useState(false)
  const breakdownId = useId()

  useEffect(() => {
    if (!open) return
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [open])

  const content = (
    <ul className="flex flex-col gap-2">
      <li className="flex justify-between gap-3 font-sans text-sm leading-[1.3] text-dark">
        <span className="text-dark/60">Тёплый контур</span>
        <span className="font-medium whitespace-nowrap">{formatRub(warm)}</span>
      </li>
      <li className="flex justify-between gap-3 font-sans text-sm leading-[1.3] text-dark">
        <span className="text-dark/60">Под отделку</span>
        <span className="font-medium whitespace-nowrap">{formatRub(forFinishing)}</span>
      </li>
      <li className="flex justify-between gap-3 font-sans text-sm leading-[1.3] text-dark">
        <span className="text-dark/60">С отделкой</span>
        <span className="font-medium whitespace-nowrap">{formatRub(withFinishing)}</span>
      </li>
    </ul>
  )

  return (
    <div className="relative flex flex-col gap-3">
      <div className="inline-flex items-center gap-3 font-sans font-medium text-[32px] leading-[1.1] text-dark max-md:text-2xl">
        <span>{price}</span>
        <span className="group relative inline-flex">
          <button
            type="button"
            aria-label="Расшифровка цены"
            aria-expanded={open}
            aria-controls={breakdownId}
            onClick={() => setOpen((v) => !v)}
            className="flex h-6 w-6 items-center justify-center rounded-full border border-dark/30 text-sm leading-none text-dark/60 transition-colors hover:border-dark hover:text-dark"
          >
            ?
          </button>
          <div
            id={breakdownId}
            className="pointer-events-none absolute bottom-full left-full z-20 ml-2 mb-2 hidden w-[300px] rounded-lg border border-dark/10 bg-[#f6f1e9] p-4 shadow-xl md:group-hover:block md:group-focus-within:block"
          >
            {content}
          </div>
        </span>
      </div>
      {open && (
        <div className="hidden w-full rounded-lg border border-dark/10 bg-dark/[0.03] p-4 max-md:block">
          {content}
        </div>
      )}
    </div>
  )
}

const placeholderGallery = [
  '/hero-1-4df8d5.webp',
  '/hero-2-29c330.webp',
  '/hero-3-6cfe9d.webp',
  '/hero-1-4df8d5.webp',
]

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]
const easeReveal = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease },
})

export default function ProjectHero({
  title,
  description,
  price,
  priceWarmCircuit,
  priceForFinishing,
  priceWithFinishing,
  image,
  gallery,
  specs,
}: ProjectHeroProps) {
  const hasBreakdown =
    typeof priceWarmCircuit === 'number' &&
    typeof priceForFinishing === 'number' &&
    typeof priceWithFinishing === 'number'
  const galleryImages = gallery && gallery.length > 0
    ? gallery.map((img) => img.url)
    : placeholderGallery
  const allImages = [image, ...galleryImages]

  // Full-size images for lightbox
  const fullImages = gallery && gallery.length > 0
    ? gallery.map((img) => img.fullUrl || img.url)
    : placeholderGallery
  const allFullImages = [image, ...fullImages]

  const titleLines = title.split('\n').filter(Boolean)

  return (
    <section className="pt-[40px]">
      {/* Breadcrumbs */}
      <motion.div
        className="flex items-center gap-2.5 px-[120px] pb-10 max-md:px-6 max-md:pb-[54px]"
        {...fadeUp(0)}
      >
        <a href="/" className="font-sans text-base leading-[1.25] text-dark/50 no-underline hover:text-dark transition-colors">
          Главная
        </a>
        <span className="w-px h-4 bg-dark/30" />
        <a href="/#projects" className="font-sans text-base leading-[1.25] text-dark/50 no-underline hover:text-dark transition-colors">
          Проекты домов
        </a>
        <span className="w-px h-4 bg-dark/30" />
        <span className="font-sans text-base leading-[1.25] text-dark">
          {title}
        </span>
      </motion.div>

      {/* Title + Description */}
      <div className="flex flex-col gap-5 px-[120px] max-md:px-6">
        <h1 className="font-sans font-normal text-[96px] leading-[1em] tracking-[-0.03em] text-dark max-md:text-5xl">
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: easeReveal }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {description && (
          <motion.p
            className="font-sans font-normal text-lg leading-[1.3] text-dark max-w-[677px] max-md:text-base"
            {...fadeUp(0.35)}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Price + Buttons */}
      <div className="flex justify-between items-center gap-[119px] px-[120px] pt-[80px] pb-6 max-md:px-6 max-md:pt-10 max-md:flex-col max-md:items-start max-md:gap-6">
        <motion.div className="flex flex-col gap-3 w-full max-w-[560px]" {...fadeUp(0.45)}>
          {hasBreakdown ? (
            <PriceBreakdown
              price={price}
              warm={priceWarmCircuit as number}
              forFinishing={priceForFinishing as number}
              withFinishing={priceWithFinishing as number}
            />
          ) : (
            <span className="font-sans font-medium text-[32px] leading-[1.1] text-dark max-md:text-2xl">{price}</span>
          )}
        </motion.div>
        <motion.div
          className="flex items-center gap-[20px] max-md:flex-col max-md:w-full max-md:[&_a]:w-full"
          {...fadeUp(0.55)}
        >
          <Button href="#contact">Запросить смету</Button>
          <Button href="#contact" variant="secondary">Записаться на просмотр объекта</Button>
        </motion.div>
      </div>

      {/* Photo Grid */}
      <motion.div
        className="flex flex-col gap-2 px-2 max-md:px-2"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease }}
      >
        <Lightbox
          images={allImages.map((src, i) => ({
            src,
            fullSrc: i === 0 ? image : allFullImages[i],
            alt: i === 0 ? title : `${title} — фото ${i}`,
          }))}
          layout="project-hero"
        />
      </motion.div>

      {/* Specs Grid */}
      {specs && specs.length > 0 && (
        <div className="px-[120px] pt-[105px] max-md:px-6 max-md:pt-10">
          <StaggerContainer className="flex flex-wrap gap-x-10 gap-y-10 py-[30px] max-md:gap-y-6">
            {specs.map((spec, i) => (
              <StaggerItem
                key={i}
                className="flex items-center gap-4 w-[270px] h-[80px] px-4 border-l border-dark/10 max-md:w-full max-md:h-auto max-md:py-0"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-sm leading-[1.14] text-dark/50 max-md:text-base">
                    {spec.label}
                  </span>
                  <span className="font-sans font-medium text-lg leading-[1.1] text-dark max-md:text-[22px]">
                    {spec.value}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
    </section>
  )
}
