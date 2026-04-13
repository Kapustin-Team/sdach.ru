'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'

interface ProcessStep {
  title: string
  description?: string
}

interface ProcessGroup {
  title: string
  steps: ProcessStep[] | string[]
}

interface HowWeWorkProps {
  label?: string
  title?: string
  subtitle?: string
  groups?: ProcessGroup[]
}

const defaultGroups: ProcessGroup[] = [
  {
    title: 'Подготовка',
    steps: [
      { title: 'Консультация и подбор проекта' },
      { title: 'Расчёт полной стоимости' },
      { title: 'Проведение геологических изысканий' },
      { title: 'Разработка проектной документации' },
    ],
  },
  {
    title: 'Строительство',
    steps: [
      { title: 'Подготовительные работы на участке' },
      { title: 'Заливка и устройство фундамента' },
      { title: 'Строительство дома (каждый этап сдаётся заказчику отдельно)' },
      { title: 'Инженерные коммуникации и отделка' },
    ],
  },
  {
    title: 'Завершение',
    steps: [
      { title: 'Сдача объекта заказчику' },
      { title: 'Гарантийное обслуживание' },
    ],
  },
]

export default function HowWeWork({
  label = 'Этапы работы',
  title = 'Как мы работаем',
  subtitle = 'От первого обращения до сдачи дома и гарантийного обслуживания сопровождаем проект на каждом этапе.',
  groups = defaultGroups,
}: HowWeWorkProps) {
  let index = 0

  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <AnimatedTitle
        label={label}
        heading={title}
        subtitle={subtitle}
      />

      <div className="mt-[50px] border-t border-black/10 max-md:mt-8">
        {groups.map((group, groupIndex) => (
          <div key={group.title} className="border-b border-black/10 py-8 max-md:py-6">
            <AnimatedSection delay={groupIndex * 0.08}>
              <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-8 max-md:grid-cols-1 max-md:gap-6">
                <div>
                  <h3 className="font-sans text-[36px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[28px]">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-col">
                  {group.steps.map((step) => {
                    index += 1
                    const stepTitle = typeof step === 'string' ? step : step.title
                    return (
                      <div
                        key={stepTitle}
                        className="grid grid-cols-[88px_minmax(0,1fr)] gap-6 border-t border-black/10 py-5 first:border-t-0 first:pt-0 last:pb-0 max-md:grid-cols-[64px_minmax(0,1fr)] max-md:gap-4"
                      >
                        <span className="font-sans text-[24px] leading-none tracking-[-0.02em] text-dark/45 max-md:text-[20px]">
                          {String(index).padStart(2, '0')}
                        </span>
                        <p className="font-sans text-[22px] leading-[1.25] tracking-[-0.01em] text-dark/70 max-md:text-[18px]">
                          {stepTitle}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </AnimatedSection>
          </div>
        ))}
      </div>
    </section>
  )
}
