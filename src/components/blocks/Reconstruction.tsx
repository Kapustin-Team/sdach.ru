'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import Button from '@/components/atoms/Button'

interface ServiceGroup {
  title: string
  items: string[]
}

interface ReconstructionProps {
  label?: string
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  groups?: ServiceGroup[]
}

const defaultGroups: ServiceGroup[] = [
  {
    title: 'Обновление дома',
    items: ['Фасадные работы', 'Замена внутренней отделки', 'Покраска', 'Замена окон', 'Замена кровли'],
  },
  {
    title: 'Улучшение комфорта',
    items: ['Перепланировка дома', 'Утепление и шумоизоляция'],
  },
  {
    title: 'Расширение и достройка',
    items: ['Пристройка к дому или террасы', 'Мансардный или полноценный второй этаж', 'Установка забора'],
  },
]

export default function Reconstruction({
  label = 'Дополнительные услуги',
  title = 'Достройка и реконструкция домов',
  subtitle = 'Выполняем не только строительство новых домов, но и работы по обновлению, расширению и модернизации существующих объектов.',
  buttonText = 'Обсудить реконструкцию',
  buttonLink = '#contact',
  groups = defaultGroups,
}: ReconstructionProps) {
  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <AnimatedTitle label={label} heading={title} subtitle={subtitle} />

      <div className="mt-[50px] max-md:mt-8">
        <div className="grid grid-cols-3 gap-0 max-lg:grid-cols-1">
          {groups.map((group, index) => (
            <AnimatedSection
              key={group.title}
              delay={index * 0.08}
              className="border-b border-black/10 px-0 py-8 max-lg:border-r-0 max-lg:px-0 max-md:py-6 lg:border-b-0 lg:border-r lg:border-black/10 lg:px-8 first:lg:pl-0 last:lg:border-r-0 last:lg:pr-0"
            >
              <h3 className="font-sans text-[32px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[26px]">
                {group.title}
              </h3>
              <ul className="mt-8 flex flex-col gap-4 list-none p-0 m-0">
                {group.items.map((item) => (
                  <li key={item} className="font-sans text-xl leading-[1.25] text-dark max-md:text-[18px]">
                    {item}
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <AnimatedSection delay={0.2} className="mt-10 max-md:[&_a]:w-full max-md:[&_button]:w-full">
        <Button href={buttonLink} variant="secondary">{buttonText}</Button>
      </AnimatedSection>
    </section>
  )
}
