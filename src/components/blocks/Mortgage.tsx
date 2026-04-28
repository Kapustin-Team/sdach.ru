'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import AnimatedSection from '@/components/atoms/AnimatedSection'
import Button from '@/components/atoms/Button'
import { motion } from 'framer-motion'

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
      'Программа подходит семьям, в которых есть ребёнок до 6 лет, ребёнок с инвалидностью до 18 лет, а также семьям с двумя и более детьми до 18 лет. Процентная ставка составляет **6%** годовых. Первоначальный взнос составляет **от 20,1%**. Максимальная сумма кредита составляет **до 12 млн рублей** для Москвы, Московской области, Санкт-Петербурга и Ленинградской области и **до 6 млн рублей** для других регионов. Срок кредита составляет **до 30 лет**.',
  },
  {
    title: 'IT-ипотека',
    details:
      'Программа доступна гражданам России, которые работают в компании из сферы информационных технологий. Возраст заёмщика составляет от 18 до 50 лет включительно. Компания должна находиться за пределами Москвы и Санкт-Петербурга. Процентная ставка составляет **6%** годовых. Первоначальный взнос составляет **от 20,1%**. Максимальная сумма кредита составляет **до 9 млн рублей**. Срок кредита составляет **до 30 лет**.',
  },
  {
    title: 'Сельская ипотека',
    details:
      'Программа подходит для строительства жилого дома на приграничных и сельских территориях России. Не распространяется на Москву, Московскую область и Санкт-Петербург. Процентная ставка составляет **от 0,1% до 3%** годовых. Первоначальный взнос составляет **от 20%**. Максимальная сумма кредита составляет **до 6 млн рублей**. Срок кредита составляет **до 25 лет**.',
  },
  {
    title: 'Стандартная ипотека',
    details:
      'Программа подходит тем, кто не подпадает под условия льготных ипотечных программ. В этом случае можно оформить ипотеку на рыночных условиях. Процентная ставка составляет **от 17,4%** годовых. Первоначальный взнос составляет **от 20,1%**. Максимальная сумма кредита составляет **до 100 млн рублей**. Срок кредита составляет **до 30 лет**.',
  },
]

function renderRichText(text: string) {
  const html = text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br />')

  return {
    __html: html,
  }
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
        <AnimatedSection className="sticky top-[130px] flex h-fit flex-col gap-8 max-md:static max-md:gap-6">
          <AnimatedTitle label={label} heading={title} subtitle={subtitle} />
          <div className="max-md:[&_a]:w-full max-md:[&_button]:w-full">
            <Button href={buttonLink}>{buttonText}</Button>
          </div>
        </AnimatedSection>

        <div className="flex flex-col md:-mt-[18vh] md:pt-[18vh]">
          {programs.map((program, index) => (
            <motion.article
              key={program.title}
              className="flex min-h-[72vh] items-center border-b border-dark/10 py-14 last:min-h-[52vh] last:border-b-0 max-md:min-h-0 max-md:py-8"
              initial={{ opacity: 0, y: 70, clipPath: 'inset(18% 0 0 0)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
              viewport={{ once: false, amount: 0.55, margin: '-12% 0px -18% 0px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col gap-4">
                <span className="font-sans text-sm leading-none text-dark/40">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="font-sans text-[32px] leading-[1.05] tracking-[-0.02em] text-dark max-md:text-[26px]">
                  {program.title}
                </h3>
                {program.details && (
                  <p
                    className="max-w-[780px] font-sans text-[15px] leading-[1.7] text-dark/70 max-md:text-[14px] [&_strong]:font-semibold [&_strong]:text-dark"
                    dangerouslySetInnerHTML={renderRichText(program.details)}
                  />
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
