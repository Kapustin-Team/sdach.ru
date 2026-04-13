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
  },
  {
    title: 'IT-ипотека',
    rate: '6%',
    downPayment: 'от 20,1%',
    amount: 'до 9 млн ₽',
    term: 'до 30 лет',
  },
  {
    title: 'Сельская ипотека',
    rate: '0,1–3%',
    downPayment: 'от 20%',
    amount: 'до 6 млн ₽',
    term: 'до 25 лет',
  },
  {
    title: 'Стандартная ипотека',
    rate: 'от 17,4%',
    downPayment: 'от 20,1%',
    amount: 'до 100 млн ₽',
    term: 'до 30 лет',
  },
]

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
            const tags = [program.rate, program.downPayment, program.amount, program.term]
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

                  <div className="flex flex-wrap gap-3">
                    {tags.map((tag) => (
                      <span
                        key={`${program.title}-${tag}`}
                        className="font-sans font-medium text-sm leading-[1.14] uppercase px-3 pt-2 pb-1.5 bg-dark/10 text-dark"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            )
          })}
        </div>
      </div>
    </section>
  )
}
