'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import Button from '@/components/atoms/Button'

interface MortgageProgram {
  title: string
  details: string
  highlights: string[]
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
      'Программа подходит семьям, в которых есть ребёнок до 6 лет, ребёнок с инвалидностью до 18 лет, а также семьям с двумя и более детьми до 18 лет. Процентная ставка составляет 6% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 12 млн рублей для Москвы, Московской области, Санкт-Петербурга и Ленинградской области и до 6 млн рублей для других регионов. Срок кредита составляет до 30 лет.',
    highlights: ['6%', 'от 20,1%', 'до 12 млн рублей', 'до 6 млн рублей', 'до 30 лет'],
  },
  {
    title: 'IT-ипотека',
    details:
      'Программа доступна гражданам России, которые работают в компании из сферы информационных технологий. Возраст заёмщика составляет от 18 до 50 лет включительно. Компания должна находиться за пределами Москвы и Санкт-Петербурга. Процентная ставка составляет 6% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 9 млн рублей. Срок кредита составляет до 30 лет.',
    highlights: ['от 18 до 50 лет', '6%', 'от 20,1%', 'до 9 млн рублей', 'до 30 лет'],
  },
  {
    title: 'Сельская ипотека',
    details:
      'Программа подходит для строительства жилого дома на приграничных и сельских территориях России. Не распространяется на Москву, Московскую область и Санкт-Петербург. Процентная ставка составляет от 0,1% до 3% годовых. Первоначальный взнос составляет от 20%. Максимальная сумма кредита составляет до 6 млн рублей. Срок кредита составляет до 25 лет.',
    highlights: ['от 0,1% до 3%', 'от 20%', 'до 6 млн рублей', 'до 25 лет'],
  },
  {
    title: 'Стандартная ипотека',
    details:
      'Программа подходит тем, кто не подпадает под условия льготных ипотечных программ. В этом случае можно оформить ипотеку на рыночных условиях. Процентная ставка составляет от 17,4% годовых. Первоначальный взнос составляет от 20,1%. Максимальная сумма кредита составляет до 100 млн рублей. Срок кредита составляет до 30 лет.',
    highlights: ['от 17,4%', 'от 20,1%', 'до 100 млн рублей', 'до 30 лет'],
  },
]

function renderHighlightedText(text: string, highlights: string[]) {
  const sortedHighlights = [...highlights].sort((a, b) => b.length - a.length)
  const parts: Array<{ text: string; strong: boolean }> = []
  let remaining = text

  while (remaining.length > 0) {
    let nextMatchIndex = -1
    let nextMatch = ''

    for (const highlight of sortedHighlights) {
      const index = remaining.indexOf(highlight)
      if (index !== -1 && (nextMatchIndex === -1 || index < nextMatchIndex)) {
        nextMatchIndex = index
        nextMatch = highlight
      }
    }

    if (nextMatchIndex === -1) {
      parts.push({ text: remaining, strong: false })
      break
    }

    if (nextMatchIndex > 0) {
      parts.push({ text: remaining.slice(0, nextMatchIndex), strong: false })
    }

    parts.push({ text: nextMatch, strong: true })
    remaining = remaining.slice(nextMatchIndex + nextMatch.length)
  }

  return parts.map((part, index) =>
    part.strong ? (
      <strong key={`${part.text}-${index}`} className="font-semibold text-dark">
        {part.text}
      </strong>
    ) : (
      <span key={`${part.text}-${index}`}>{part.text}</span>
    )
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
                <p className="max-w-[780px] font-sans text-[15px] leading-[1.7] text-dark/70 max-md:text-[14px]">
                  {renderHighlightedText(program.details, program.highlights)}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
