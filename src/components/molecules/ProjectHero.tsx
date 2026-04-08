'use client'

import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Lightbox from '@/components/molecules/Lightbox'
import { strapiImage } from '@/utils/strapi-image'
import { StaggerContainer, StaggerItem } from '@/components/atoms/StaggerContainer'

interface Spec {
  label: string
  value: string
}

interface ProjectHeroProps {
  title: string
  description?: string
  price: string
  image: string
  gallery?: { url: string }[]
  specs?: Spec[]
}

const placeholderGallery = [
  '/hero-1-4df8d5.png',
  '/hero-2-29c330.png',
  '/hero-3-6cfe9d.png',
  '/hero-1-4df8d5.png',
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
  image,
  gallery,
  specs,
}: ProjectHeroProps) {
  const galleryImages = gallery && gallery.length > 0
    ? gallery.map((img) => strapiImage(img.url))
    : placeholderGallery
  const allImages = [image, ...galleryImages]

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
        <motion.div className="flex flex-col gap-2" {...fadeUp(0.45)}>
          <span className="font-sans font-medium text-[32px] leading-[1.1] text-dark max-md:text-2xl">
            {price}
          </span>
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
