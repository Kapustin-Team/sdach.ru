'use client'

import { motion } from 'framer-motion'
import { strapiImage } from '@/utils/strapi-image'
import { StaggerContainer, StaggerItem } from '@/components/atoms/StaggerContainer'

interface AdvantageItem {
  icon?: { url?: string }
  title: string
  description?: string
}

interface AdvantagesProps {
  items?: AdvantageItem[]
}

const defaultIcons = ['/icons/control.svg', '/icons/solution.svg', '/icons/price.svg']

const defaultItems = [
  {
    iconSrc: '/icons/control.svg',
    title: 'Комплексное решение «под ключ»',
    desc: 'Берём на себя все этапы — от проекта до сдачи дома.',
  },
  {
    iconSrc: '/icons/solution.svg',
    title: 'Фиксированная цена',
    desc: 'Смета формируется заранее и не меняется в процессе строительства.',
  },
  {
    iconSrc: '/icons/price.svg',
    title: 'Контроль и отчётность',
    desc: 'Контролируем качество и сроки на каждом этапе.',
  },
]

export default function Advantages({ items }: AdvantagesProps) {
  const data = items && items.length > 0
    ? items.map((item, i) => ({
        iconSrc: item.icon?.url ? strapiImage(item.icon.url) : (defaultIcons[i] || ''),
        title: item.title,
        desc: item.description || '',
      }))
    : defaultItems

  return (
    <section className="bg-[#372B2B] px-[120px] py-[90px] max-md:px-6 max-md:py-10">
      <motion.h2
        className="font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-white mb-[50px] max-md:text-[36px] max-md:pt-[10px] max-md:pb-[50px] max-md:mb-0"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        Строим дома для счастливой жизни
      </motion.h2>
      <StaggerContainer className="flex gap-[34px] max-md:flex-col max-md:gap-[34px]">
        {data.map((item, i) => (
          <StaggerItem
            key={i}
            className="flex-1 flex gap-6 items-stretch h-[260px] border-l border-dashed border-white/20 max-md:h-auto max-md:border-l-0 max-md:border-t-0"
          >
            <div className="flex flex-col flex-1 pl-6 max-md:pl-0 max-md:gap-5">
              {item.iconSrc && (
                <img src={item.iconSrc} alt="" aria-hidden="true" className="w-auto h-[37px] self-start mb-auto" />
              )}
              <h3 className="font-sans font-normal text-4xl leading-[1.1] text-white max-md:text-2xl">
                {item.title}
              </h3>
              <p className="font-sans font-normal text-lg leading-[1.1] text-white/80 mt-auto max-md:mt-4">
                {item.desc}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  )
}
