'use client'

import AnimatedTitle from '@/components/atoms/AnimatedTitle'
import { motion } from 'framer-motion'

const steps = [
  'Консультация и подбор проекта',
  'Расчёт полной стоимости',
  'Проведение геологических изысканий',
  'Разработка проектной документации',
  'Подготовительные работы на участке',
  'Заливка и устройство фундамента',
  'Строительство дома (каждый этап сдаётся заказчику отдельно)',
  'Инженерные коммуникации и отделка',
  'Сдача объекта заказчику',
  'Гарантийное обслуживание',
]

export default function HowWeWork() {
  return (
    <section className="px-[120px] py-[90px] max-md:px-6 max-md:py-10">
      <AnimatedTitle
        label="Этапы работы"
        heading="Как мы работаем"
        subtitle="От первого обращения до сдачи дома и гарантийного обслуживания сопровождаем проект на каждом этапе."
      />

      <div className="mt-[50px] grid grid-cols-5 gap-5 max-xl:grid-cols-3 max-md:mt-8 max-md:grid-cols-1">
        {steps.map((step, index) => (
          <motion.div
            key={step}
            className="flex min-h-[210px] flex-col justify-between rounded-[24px] border border-black/10 bg-[#F6F1ED] p-6 max-md:min-h-[unset]"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: index * 0.04, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="font-sans text-sm uppercase tracking-[0.08em] text-dark/45">
              Шаг {index + 1}
            </span>
            <p className="mt-8 font-sans text-[28px] leading-[1.05] tracking-[-0.02em] text-dark max-md:mt-5 max-md:text-2xl">
              {step}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
