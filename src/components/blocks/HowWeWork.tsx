'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'

interface ProcessStep {
  title: string
  description?: string
}

interface ProcessGroup {
  title: string
  steps?: ProcessStep[] | string[]
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

function getSafeGroups(groups?: ProcessGroup[]): ProcessGroup[] {
  if (!Array.isArray(groups) || groups.length === 0) return defaultGroups

  return groups.map((group, idx) => {
    const fallback = defaultGroups.find((item) => item.title === group.title) || defaultGroups[idx]
    const steps = Array.isArray(group.steps) && group.steps.length > 0 ? group.steps : fallback?.steps || []
    return {
      ...group,
      steps,
    }
  })
}

export default function HowWeWork({
  label = 'Этапы работы',
  title = 'Как мы работаем',
  subtitle = 'От первого обращения до сдачи дома и гарантийного обслуживания сопровождаем проект на каждом этапе.',
  groups = defaultGroups,
}: HowWeWorkProps) {
  let index = 0
  const safeGroups = getSafeGroups(groups)

  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <AnimatedTitle
        label={label}
        heading={title}
        subtitle={subtitle}
      />

      <div className="mt-10 border-t border-black/10 max-md:mt-8">
        {safeGroups.map((group, groupIndex) => (
          <div key={group.title} className="border-b border-black/10 py-7 max-md:py-6">
            <AnimatedSection delay={groupIndex * 0.08}>
              <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-10 max-lg:grid-cols-[200px_minmax(0,1fr)] max-lg:gap-8 max-md:grid-cols-1 max-md:gap-5">
                <div>
                  <h3 className="font-sans text-[30px] leading-[1.08] tracking-[-0.02em] text-dark/80 max-md:text-[26px]">
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
                        className="grid grid-cols-[56px_minmax(0,1fr)] gap-5 border-t border-black/10 py-[18px] first:border-t-0 first:pt-0 last:pb-0 max-md:grid-cols-[48px_minmax(0,1fr)] max-md:gap-4"
                      >
                        <span className="font-sans text-[20px] leading-[1.15] tracking-[-0.02em] text-dark/40 max-md:text-[18px]">
                          {String(index).padStart(2, '0')}
                        </span>
                        <p className="max-w-[760px] font-sans text-[22px] leading-[1.25] tracking-[-0.01em] text-dark/75 max-md:text-[18px]">
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
