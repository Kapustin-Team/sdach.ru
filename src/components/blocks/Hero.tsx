'use client'

import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'
import { strapiImage } from '@/utils/strapi-image'

interface HeroProps {
  title?: string
  subtitle?: string
  image?: {
    url?: string
    formats?: {
      small?: { url?: string }
      medium?: { url?: string }
      large?: { url?: string }
    }
  }
}

const defaultSubtitles = [
  'Гарантия на конструкцию до 10 лет',
  'Фиксированная смета без скрытых доплат',
  'Индивидуальные и типовые проекты',
]

export default function Hero({
  title = 'Современные\nдома под ключ',
  subtitle,
  image,
}: HeroProps) {
  const titleLines = title.split('\n').filter(Boolean)
  const lines = subtitle
    ? subtitle.split('\n').filter(Boolean)
    : defaultSubtitles
  const heroSrc =
    image?.formats?.large?.url ||
    image?.formats?.medium?.url ||
    image?.url
  const heroImage = heroSrc ? strapiImage(heroSrc) : null

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-end gap-2.5 px-[120px] pt-[50px] pb-[34px] max-md:flex-col max-md:items-start max-md:px-6 max-md:pt-[34px] max-md:pb-0">
        <h1 className="font-sans font-normal text-[96px] leading-[1em] tracking-[-0.03em] text-dark m-0 max-md:text-5xl">
          {titleLines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: '105%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          className="shrink-0 max-md:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Button href="#contact">Подобрать проект</Button>
        </motion.div>
      </div>

      {/* Mobile buttons */}
      <div className="hidden max-md:flex flex-col gap-[20px] px-6 mt-[54px] [&_a]:w-full [&_button]:w-full">
        <Button href="#contact">Подобрать проект</Button>
        <Button href="#contact" variant="secondary">Рассчитать по эскизу</Button>
      </div>

      <ul className="flex justify-between items-center gap-2.5 px-[120px] py-[34px] list-none m-0 max-md:hidden">
        {lines.map((line, i) => (
          <motion.li
            key={i}
            className="font-sans font-normal text-xl leading-[1.3] text-dark"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {line}
          </motion.li>
        ))}
      </ul>

      {heroImage ? (
        <div className="overflow-hidden max-md:px-2 max-md:mt-[34px] group">
          <img src={heroImage} alt={title} className="block w-full h-[380px] object-cover max-md:h-auto transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.02]" />
        </div>
      ) : (
        <div className="flex gap-4 overflow-hidden max-md:flex-col max-md:gap-2 max-md:px-2 max-md:mt-[34px]">
          {[
            { src: '/hero-1-4df8d5.webp', alt: 'Современный дом', cls: 'shrink-0 w-[520px] h-[380px] overflow-hidden max-md:!w-full max-md:!h-auto' },
            { src: '/hero-2-29c330.webp', alt: 'Интерьер дома',   cls: 'shrink-0 w-[570px] h-[321px] overflow-hidden max-md:!w-full max-md:!h-auto' },
            { src: '/hero-3-6cfe9d.webp', alt: 'Проект дома',     cls: 'shrink-0 w-[620px] h-[321px] overflow-hidden max-md:!w-full max-md:!h-auto' },
          ].map((img, i) => (
            <motion.div
              key={img.src}
              className={`${img.cls} group`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 + i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img src={img.src} alt={img.alt} className="block w-full h-full object-cover max-md:h-auto transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-[1.03]" />
            </motion.div>
          ))}
        </div>
      )}
    </section>
  )
}
