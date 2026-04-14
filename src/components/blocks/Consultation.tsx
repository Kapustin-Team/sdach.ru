'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
import sendMessage from '@/utils/telegram'
import Button from '@/components/atoms/Button'
import AnimatedSection from '@/components/atoms/AnimatedSection'

const schema = z.object({
  name: z.string()
    .min(1, 'Обязательное поле')
    .min(2, 'Введите минимум 2 символа')
    .regex(/^[a-zA-Zа-яА-ЯёЁ\s]+$/, {
      message: 'Введите корректное имя (только буквы)',
    }),
  phone: z.string()
    .min(1, 'Обязательное поле')
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
      message: 'Введите корректный номер телефона',
    }),
})

type FormErrors = Partial<Record<'name' | 'phone' | 'consent', string>>

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  const d = digits.startsWith('8') ? '7' + digits.slice(1) : digits.startsWith('7') ? digits : '7' + digits

  let result = '+7'
  if (d.length > 1) result += ' (' + d.slice(1, 4)
  if (d.length >= 4) result += ')'
  if (d.length > 4) result += ' ' + d.slice(4, 7)
  if (d.length > 7) result += '-' + d.slice(7, 9)
  if (d.length > 9) result += '-' + d.slice(9, 11)
  return result
}

function escapeMarkdown(str: string) {
  return str.replace(/[_*[\]()~`>#+\-=|{}.!]/g, '\\$&')
}

interface ConsultationProps {
  title?: string
  subtitle?: string
}

export default function Consultation({
  title = 'Получите бесплатную\nконсультацию\nпо вашему участку',
  subtitle = 'Оставьте контакты — инженер перезвонит, предложит 2–3 подходящих проекта и сориентирует по срокам и стоимости строительства.',
}: ConsultationProps) {
  const [form, setForm] = useState({ name: '', phone: '', hasPlot: true, consent: false })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'err'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    const result = schema.safeParse({ name: form.name, phone: form.phone })
    const fieldErrors: FormErrors = {}

    if (!result.success) {
      for (const issue of result.error.issues) {
        const field = issue.path[0] as keyof FormErrors
        if (!fieldErrors[field]) fieldErrors[field] = issue.message
      }
    }

    if (!form.consent) {
      fieldErrors.consent = 'Нужно согласие на обработку персональных данных'
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors)
      return
    }

    setStatus('loading')

    const date = new Date().toLocaleDateString('ru-RU', { timeZone: 'Europe/Moscow' })
    const text = [
      '*Новая заявка с сайта*',
      '',
      `*Имя:* ${escapeMarkdown(form.name)}`,
      `*Телефон:* ${form.phone}`,
      `*Участок:* ${form.hasPlot ? 'Есть' : 'Только планирую'}`,
      '',
      date,
    ].join('\n')

    const ok = await sendMessage(text)
    setStatus(ok ? 'ok' : 'err')
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value)
    setForm({ ...form, phone: formatted })
    if (errors.phone) setErrors({ ...errors, phone: undefined })
  }

  return (
    <section id="contact" className="relative w-full h-[716px] overflow-hidden max-md:h-auto max-md:flex max-md:flex-col">
      {/* BG with image + gradient */}
      <div className="absolute inset-0 max-md:relative max-md:h-[300px]">
        <img
          src="/consultation-bg.png"
          alt=""
          className="absolute inset-0 w-full h-[565px] object-cover max-md:h-full"
        />
        <div className="absolute inset-0 h-[565px] bg-gradient-to-br from-[rgba(45,33,33,0.45)] to-[rgba(65,53,53,0.04)] max-md:h-full" />
      </div>

      {/* Title */}
      <div className="absolute left-[118px] top-[129px] w-[743px] flex flex-col gap-[34px] max-md:relative max-md:left-0 max-md:top-0 max-md:w-full max-md:p-6">
        <motion.h2
          className="font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-white max-md:text-[36px] max-md:text-dark whitespace-pre-line"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="font-sans font-normal text-lg leading-[1.1] text-white max-md:text-[18px] max-md:text-dark"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Form */}
      <AnimatedSection
        direction="left"
        delay={0.2}
        className="absolute right-[120px] top-[320px] w-[463px] max-md:relative max-md:right-0 max-md:top-0 max-md:w-full"
      >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-[30px] flex flex-col gap-[34px] max-md:p-6 max-md:bg-bg"
      >
        <div className="flex flex-col gap-0">
          <input
            type="text"
            placeholder="Имя"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value })
              if (errors.name) setErrors({ ...errors, name: undefined })
            }}
            className={`w-full py-4 border-b bg-transparent font-sans text-base text-dark placeholder:text-dark/30 outline-none ${errors.name ? 'border-red-500' : 'border-dark/30'}`}
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
          <input
            type="tel"
            placeholder="Телефон"
            value={form.phone}
            onChange={handlePhoneChange}
            className={`w-full py-4 border-b bg-transparent font-sans text-base text-dark placeholder:text-dark/30 outline-none ${errors.phone ? 'border-red-500' : 'border-dark/30'}`}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}

          <div className="flex items-center gap-6 pt-4 max-md:justify-center">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="plot"
                checked={form.hasPlot}
                onChange={() => setForm({ ...form, hasPlot: true })}
                className="accent-dark"
              />
              <span className="font-sans text-base text-dark">Участок есть</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="plot"
                checked={!form.hasPlot}
                onChange={() => setForm({ ...form, hasPlot: false })}
                className="accent-dark"
              />
              <span className="font-sans text-base text-dark">Только планирую</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Button disabled={status === 'loading'}>
            {status === 'loading' ? 'Отправка...' : 'Посмотреть проект'}
          </Button>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => {
                setForm({ ...form, consent: e.target.checked })
                if (errors.consent) setErrors({ ...errors, consent: undefined })
              }}
              className="mt-1 h-4 w-4 shrink-0 accent-dark"
            />
            <span className="text-xs leading-[1.5] text-dark/60">
              Нажимая «Отправить», вы даете{' '}
              <a href="/personal-data" className="text-dark underline">
                согласие на обработку ваших персональных данных
              </a>
            </span>
          </label>
          {errors.consent && <p className="text-xs text-red-500">{errors.consent}</p>}
          {status === 'ok' && (
            <p className="text-sm text-green-600 text-center">Заявка отправлена!</p>
          )}
          {status === 'err' && (
            <p className="text-sm text-red-500 text-center">Ошибка, попробуйте позже</p>
          )}
        </div>
      </form>
      </AnimatedSection>
    </section>
  )
}
