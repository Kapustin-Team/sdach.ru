'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import Button from '@/components/atoms/Button'

interface MortgageProgram {
  title: string
  details?: string
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
    details:
      'Программа подходит семьям, в которых есть ребёнок до 6 лет, ребёнок с инвалидностью до 18 лет, а также семьям с двумя и более детьми до 18 лет. Процентная ставка составляет <strong>6%</strong> годовых. Первоначальный взнос составляет <strong>от 20,1%</strong>. Максимальная сумма кредита составляет <strong>до 12 млн рублей</strong> для Москвы, Московской области, Санкт-Петербурга и Ленинградской области и <strong>до 6 млн рублей</strong> для других регионов. Срок кредита составляет <strong>до 30 лет</strong>.',
  },
  {
    title: 'IT-ипотека',
    details:
      'Программа доступна гражданам России, которые работают в компании из сферы информационных технологий. Возраст заёмщика составляет от 18 до 50 лет включительно. Компания должна находиться за пределами Москвы и Санкт-Петербурга. Процентная ставка составляет <strong>6%</strong> годовых. Первоначальный взнос составляет <strong>от 20,1%</strong>. Максимальная сумма кредита составляет <strong>до 9 млн рублей</strong>. Срок кредита составляет <strong>до 30 лет</strong>.',
  },
  {
    title: 'Сельская ипотека',
    details:
      'Программа подходит для строительства жилого дома на приграничных и сельских территориях России. Не распространяется на Москву, Московскую область и Санкт-Петербург. Процентная ставка составляет <strong>от 0,1% до 3%</strong> годовых. Первоначальный взнос составляет <strong>от 20%</strong>. Максимальная сумма кредита составляет <strong>до 6 млн рублей</strong>. Срок кредита составляет <strong>до 25 лет</strong>.',
  },
  {
    title: 'Стандартная ипотека',
    details:
      'Программа подходит тем, кто не подпадает под условия льготных ипотечных программ. В этом случае можно оформить ипотеку на рыночных условиях. Процентная ставка составляет <strong>от 17,4%</strong> годовых. Первоначальный взнос составляет <strong>от 20,1%</strong>. Максимальная сумма кредита составляет <strong>до 100 млн рублей</strong>. Срок кредита составляет <strong>до 30 лет</strong>.',
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

        <div className="flex flex-col gap-12 max-md:gap-10">
          {programs.map((program, index) => (
            <AnimatedSection key={program.title} delay={index * 0.08}>
              <div className="flex flex-col gap-4">
                <h3 className="font-sans text-[32px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[26px]">
                  {program.title}
                </h3>
                {program.details && (
                  <p
                    className="max-w-[780px] font-sans text-[15px] leading-[1.7] text-dark/70 max-md:text-[14px] [&_strong]:font-semibold [&_strong]:text-dark"
                    dangerouslySetInnerHTML={{ __html: program.details }}
                  />
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
