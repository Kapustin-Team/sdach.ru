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
    rate: '6%',
    downPayment: 'от 20,1%',
    amount: 'до 12 млн ₽ / до 6 млн ₽ по регионам',
    term: 'до 30 лет',
    details:
      'Программа подходит семьям, в которых есть ребенок до 6 лет, ребенок с инвалидностью до 18 лет, а также семьям с двумя и более детьми до 18 лет. Процентная ставка составляет 6% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 12 млн рублей для Москвы, Московской области, Санкт-Петербурга и Ленинградской области и до 6 млн рублей для других регионов. Срок кредита составляет до 30 лет.',
  },
  {
    title: 'IT-ипотека',
    rate: '6%',
    downPayment: 'от 20,1%',
    amount: 'до 9 млн ₽',
    term: 'до 30 лет',
    details:
      'Программа доступна гражданам России, которые работают в компании из сферы информационных технологий. Возраст заемщика составляет от 18 до 50 лет включительно. Компания должна находиться за пределами Москвы и Санкт-Петербурга. Процентная ставка составляет 6% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 9 млн рублей. Срок кредита составляет до 30 лет.',
  },
  {
    title: 'Сельская ипотека',
    rate: '0,1–3%',
    downPayment: 'от 20%',
    amount: 'до 6 млн ₽',
    term: 'до 25 лет',
    details:
      'Программа подходит для строительства жилого дома на приграничных и сельских территориях России. Не распространяется на Москву, Московскую область и Санкт-Петербург. Процентная ставка составляет от 0,1% до 3% годовых. Первоначальный взнос составляет от 20%. Максимальная сумма кредита составляет до 6 млн рублей. Срок кредита составляет до 25 лет.',
  },
  {
    title: 'Стандартная ипотека',
    rate: 'от 17,4%',
    downPayment: 'от 20,1%',
    amount: 'до 100 млн ₽',
    term: 'до 30 лет',
    details:
      'Программа подходит тем, кто не подпадает под условия льготных ипотечных программ. В этом случае можно оформить ипотеку на рыночных условиях. Процентная ставка составляет от 17,4% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 100 млн рублей. Срок кредита составляет до 30 лет.',
  },
]

function DetailText({ program }: { program: MortgageProgram }) {
  return (
    <p className="max-w-[780px] font-sans text-[15px] leading-[1.7] text-dark/70 max-md:text-[14px]">
      {program.details?.split(`Процентная ставка составляет ${program.rate} годовых.`)[0]}
      <strong className="font-semibold text-dark">{program.rate}</strong>
      {program.details?.includes(`Процентная ставка составляет ${program.rate} годовых.`)
        ? program.details
            ?.split(`Процентная ставка составляет ${program.rate} годовых.`)[1]
            ?.split(`Первоначальный взнос составляет ${program.downPayment}.`)[0]
        : null}
      <strong className="font-semibold text-dark">{program.downPayment}</strong>
      {program.details?.includes(`Первоначальный взнос составляет ${program.downPayment}.`)
        ? program.details
            ?.split(`Первоначальный взнос составляет ${program.downPayment}.`)[1]
            ?.split(`Максимальная сумма кредита составляет ${program.amount.replace('₽', 'рублей')}`)[0]
        : null}
      <strong className="font-semibold text-dark">{program.amount}</strong>
      {program.details?.includes(`Срок кредита составляет ${program.term}.`)
        ? program.details
            ?.split(`Максимальная сумма кредита составляет ${program.amount.replace('₽', 'рублей')}`)[1]
            ?.split(`Срок кредита составляет ${program.term}.`)[0]
        : null}
      <strong className="font-semibold text-dark">{program.term}</strong>
      .
    </p>
  )
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

        <div className="flex flex-col gap-12 max-md:gap-10">
          {programs.map((program, index) => (
            <AnimatedSection key={program.title} delay={index * 0.08}>
              <div className="flex flex-col gap-4">
                <h3 className="font-sans text-[32px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[26px]">
                  {program.title}
                </h3>
                <DetailText program={program} />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
