'use client'

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
    details: 'Данная программа подходит тем, у кого есть ребенок до 6 лет или ребенок с инвалидностью до 18 лет. Либо если есть двое и более детей до 18 лет. Процентная ставка: 6% годовых. Первоначальный взнос: от 20,1%. Максимальная сумма кредита: 12 млн рублей для Москвы, Московской области, Санкт-Петербурга и Ленинградской области; 6 млн рублей для других регионов. Срок кредита: до 30 лет.',
  },
  {
    title: 'IT-ипотека',
    rate: '6%',
    downPayment: 'от 20,1%',
    amount: 'до 9 млн ₽',
    term: 'до 30 лет',
    description: 'Для граждан России, работающих в IT-компаниях. Возраст заемщика от 18 до 50 лет включительно.',
    details: 'Оформить данную ипотеку может гражданин России, трудоустроенный в компании, которая работает в сфере информационных технологий. Возраст от 18 до 50 лет включительно. Компания должна находиться за пределами Москвы и Санкт-Петербурга. Процентная ставка: 6% годовых. Первоначальный взнос: от 20,1%. Максимальная сумма кредита: 9 млн рублей для всех регионов. Срок кредита: до 30 лет.',
  },
  {
    title: 'Сельская ипотека',
    rate: '0,1–3%',
    downPayment: 'от 20%',
    amount: 'до 6 млн ₽',
    term: 'до 25 лет',
    description: 'Для строительства жилого дома на приграничных и сельских территориях России, кроме Москвы, Московской области и Санкт-Петербурга.',
    details: 'Кредит можно получить на строительство жилого дома на приграничных и сельских территориях России, кроме Москвы, Московской области и Санкт-Петербурга. Процентная ставка: от 0,1% до 3% годовых. Первоначальный взнос: от 20%. Максимальная сумма кредита: 6 млн рублей. Срок кредита: до 25 лет.',
  },
  {
    title: 'Стандартная ипотека',
    rate: 'от 17,4%',
    downPayment: 'от 20,1%',
    amount: 'до 100 млн ₽',
    term: 'до 30 лет',
    description: 'Если вы не подходите под льготные программы, можно воспользоваться ипотекой на рыночных условиях.',
    details: 'Если вы не подходите под льготные программы, можно воспользоваться ипотекой на рыночных условиях. Процентная ставка: от 17,4% годовых. Первоначальный взнос: от 20,1%. Максимальная сумма кредита: 100 млн рублей. Срок кредита: до 30 лет.',
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
  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <div className="grid grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-16 max-md:grid-cols-1 max-md:gap-10">
        <AnimatedSection className="flex flex-col gap-8 max-md:gap-6">
          <AnimatedTitle label={label} heading={title} subtitle={subtitle} />
          <div className="max-md:[&_a]:w-full max-md:[&_button]:w-full">
            <Button href={buttonLink}>{buttonText}</Button>
          </div>
        </AnimatedSection>

        <div>
          {programs.map((program, index) => {
            const badges = [
              { label: program.rateLabel || defaultBadgeLabels.rateLabel, value: program.rate },
              { label: program.downPaymentLabel || defaultBadgeLabels.downPaymentLabel, value: program.downPayment },
              { label: program.amountLabel || defaultBadgeLabels.amountLabel, value: program.amount },
              { label: program.termLabel || defaultBadgeLabels.termLabel, value: program.term },
            ]

            return (
              <AnimatedSection key={program.title} delay={index * 0.08} className="py-6 max-md:py-5">
                <div className="flex flex-col gap-5">
                  <div>
                    <h3 className="font-sans text-[32px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[26px]">
                      {program.title}
                    </h3>
                    {program.description && (
                      <p className="mt-3 font-sans text-base leading-[1.35] text-dark/60 max-md:text-[15px]">
                        {program.description}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
                    {badges.map((badge) => (
                      <div key={`${program.title}-${badge.label}`} className="flex flex-col gap-2 rounded-[18px] border border-dark/10 bg-white/60 p-4">
                        <span className="font-sans text-xs leading-none uppercase tracking-[0.08em] text-dark/45">
                          {badge.label}
                        </span>
                        <span className="inline-flex w-fit font-sans font-medium text-sm leading-[1.14] uppercase px-3 pt-2 pb-1.5 bg-dark/10 text-dark">
                          {badge.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  {program.details && (
                    <div className="rounded-[18px] border border-dark/10 bg-white/50 p-5">
                      <p className="font-sans text-[15px] leading-[1.5] text-dark/70 max-md:text-[14px]">
                        {program.details}
                      </p>
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
