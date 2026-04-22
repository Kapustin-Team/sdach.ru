'use client'

import { useState } from 'react'
import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import Button from '@/components/atoms/Button'

interface MortgageProgram {
  title: string
  rate: string
  downPayment: string
  amount: string
  term: string
  description?: string
  details?: string
  rateLabel?: string
  downPaymentLabel?: string
  amountLabel?: string
  termLabel?: string
}

interface MortgageProps {
  label?: string
  title?: string
  subtitle?: string
  buttonText?: string
  buttonLink?: string
  programs?: MortgageProgram[]
}

const defaultPrograms: MortgageProgram[] = [
  {
    title: 'Семейная ипотека',
    rate: '6%',
    downPayment: 'от 20,1%',
    amount: 'до 12 млн ₽ / до 6 млн ₽ по регионам',
    term: 'до 30 лет',
    description: 'Подходит семьям, где есть ребенок до 6 лет, ребенок с инвалидностью до 18 лет или двое и более детей до 18 лет.',
    details:
      'Программа подходит семьям, в которых есть ребенок до 6 лет, ребенок с инвалидностью до 18 лет, а также семьям с двумя и более детьми до 18 лет. Процентная ставка составляет 6% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 12 млн рублей для Москвы, Московской области, Санкт-Петербурга и Ленинградской области и до 6 млн рублей для других регионов. Срок кредита составляет до 30 лет.',
  },
  {
    title: 'IT-ипотека',
    rate: '6%',
    downPayment: 'от 20,1%',
    amount: 'до 9 млн ₽',
    term: 'до 30 лет',
    description: 'Для граждан России, работающих в IT-компаниях. Возраст заемщика от 18 до 50 лет включительно.',
    details:
      'Программа доступна гражданам России, которые работают в компании из сферы информационных технологий. Возраст заемщика составляет от 18 до 50 лет включительно. Компания должна находиться за пределами Москвы и Санкт-Петербурга. Процентная ставка составляет 6% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 9 млн рублей. Срок кредита составляет до 30 лет.',
  },
  {
    title: 'Сельская ипотека',
    rate: '0,1–3%',
    downPayment: 'от 20%',
    amount: 'до 6 млн ₽',
    term: 'до 25 лет',
    description: 'Для строительства жилого дома на приграничных и сельских территориях России, кроме Москвы, Московской области и Санкт-Петербурга.',
    details:
      'Программа подходит для строительства жилого дома на приграничных и сельских территориях России. Не распространяется на Москву, Московскую область и Санкт-Петербург. Процентная ставка составляет от 0,1% до 3% годовых. Первоначальный взнос составляет от 20%. Максимальная сумма кредита составляет до 6 млн рублей. Срок кредита составляет до 25 лет.',
  },
  {
    title: 'Стандартная ипотека',
    rate: 'от 17,4%',
    downPayment: 'от 20,1%',
    amount: 'до 100 млн ₽',
    term: 'до 30 лет',
    description: 'Если вы не подходите под льготные программы, можно воспользоваться ипотекой на рыночных условиях.',
    details:
      'Программа подходит тем, кто не подпадает под условия льготных ипотечных программ. В этом случае можно оформить ипотеку на рыночных условиях. Процентная ставка составляет от 17,4% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 100 млн рублей. Срок кредита составляет до 30 лет.',
  },
]

const defaultBadgeLabels = {
  rateLabel: 'Ставка',
  downPaymentLabel: 'Первоначальный взнос',
  amountLabel: 'Максимальная сумма',
  termLabel: 'Срок кредита',
}

export default function Mortgage({
  label = 'Ипотека',
  title = 'Строительство дома в ипотеку',
  subtitle = 'Помогаем подобрать подходящую ипотечную программу, рассчитать условия и получить решение от банка.',
  buttonText = 'Получить консультацию',
  buttonLink = '#contact',
  programs = defaultPrograms,
}: MortgageProps) {
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null)

  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <div className="grid grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-16 max-md:grid-cols-1 max-md:gap-10">
        <AnimatedSection className="flex flex-col gap-8 max-md:gap-6">
          <AnimatedTitle label={label} heading={title} subtitle={subtitle} />
          <div className="max-md:[&_a]:w-full max-md:[&_button]:w-full">
            <Button href={buttonLink}>{buttonText}</Button>
          </div>
        </AnimatedSection>

        <div className="flex flex-col gap-12 max-md:gap-10">
          {programs.map((program, index) => {
            const items = [
              { label: program.rateLabel || defaultBadgeLabels.rateLabel, value: program.rate },
              { label: program.downPaymentLabel || defaultBadgeLabels.downPaymentLabel, value: program.downPayment },
              { label: program.amountLabel || defaultBadgeLabels.amountLabel, value: program.amount },
              { label: program.termLabel || defaultBadgeLabels.termLabel, value: program.term },
            ]
            const isExpanded = expandedProgram === program.title

            return (
              <AnimatedSection key={program.title} delay={index * 0.08}>
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-sans text-[32px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[26px]">
                      {program.title}
                    </h3>
                    {program.description && (
                      <p className="mt-3 max-w-[780px] font-sans text-base leading-[1.4] text-dark/60 max-md:text-[15px]">
                        {program.description}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {items.map((item) => (
                      <div key={`${program.title}-${item.label}`} className="flex flex-col gap-2">
                        <span className="font-sans text-[11px] uppercase tracking-[0.08em] text-dark/45">
                          {item.label}
                        </span>
                        <span className="inline-flex w-fit bg-[#EFEBE4] px-3 py-2 font-sans text-sm uppercase leading-none text-dark">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {program.details && (
                    <div className="flex flex-col items-start gap-4">
                      <button
                        type="button"
                        onClick={() => setExpandedProgram(isExpanded ? null : program.title)}
                        className="inline-flex items-center justify-center border border-dark bg-dark px-5 py-3 font-sans text-sm text-white transition-colors hover:bg-transparent hover:text-dark"
                      >
                        {isExpanded ? 'Скрыть подробности' : 'Подробнее'}
                      </button>

                      {isExpanded && (
                        <p className="max-w-[780px] font-sans text-[15px] leading-[1.6] text-dark/70 max-md:text-[14px]">
                          {program.details}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
