'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'

const groups = [
  {
    title: 'Подготовка',
    steps: [
      'Консультация и подбор проекта',
      'Расчёт полной стоимости',
      'Проведение геологических изысканий',
      'Разработка проектной документации',
    ],
  },
  {
    title: 'Строительство',
    steps: [
      'Подготовительные работы на участке',
      'Заливка и устройство фундамента',
      'Строительство дома (каждый этап сдаётся заказчику отдельно)',
      'Инженерные коммуникации и отделка',
    ],
  },
  {
    title: 'Завершение',
    steps: [
      'Сдача объекта заказчику',
      'Гарантийное обслуживание',
    ],
  },
]

export default function HowWeWork() {
  let index = 0

  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <AnimatedTitle
        label="Этапы работы"
        heading="Как мы работаем"
        subtitle="От первого обращения до сдачи дома и гарантийного обслуживания сопровождаем проект на каждом этапе."
      />

      <div className="mt-[50px] border-t border-black/10 max-md:mt-8">
        {groups.map((group, groupIndex) => (
          <div key={group.title} className="border-b border-black/10 py-8 max-md:py-6">
            <AnimatedSection delay={groupIndex * 0.08}>
              <div className="grid grid-cols-[260px_minmax(0,1fr)] gap-8 max-md:grid-cols-1 max-md:gap-6">
                <div>
                  <p className="font-sans text-sm uppercase tracking-[0.08em] text-dark/45">
                    Группа {groupIndex + 1}
                  </p>
                  <h3 className="mt-3 font-sans text-[36px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[28px]">
                    {group.title}
                  </h3>
                </div>

                <div className="flex flex-col">
                  {group.steps.map((step, stepIndex) => {
                    index += 1
                    return (
                      <div
                        key={step}
                        className="grid grid-cols-[96px_minmax(0,1fr)] gap-6 border-t border-black/10 py-5 first:border-t-0 first:pt-0 last:pb-0 max-md:grid-cols-[72px_minmax(0,1fr)] max-md:gap-4"
                      >
                        <span className="font-sans text-[40px] leading-none tracking-[-0.03em] text-dark max-md:text-[30px]">
                          {String(index).padStart(2, '0')}
                        </span>
                        <p className="font-sans text-[28px] leading-[1.08] tracking-[-0.02em] text-dark max-md:text-[22px]">
                          {step}
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
