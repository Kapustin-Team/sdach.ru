'use client'

import { useState } from 'react'
import Button from '@/components/atoms/Button'

interface ConsultationProps {
  title?: string
  subtitle?: string
}

export default function Consultation({
  title = 'Получите бесплатную\nконсультацию\nпо вашему участку',
  subtitle = 'Оставьте контакты — инженер перезвонит, предложит 2–3 подходящих проекта и сориентирует по срокам и стоимости строительства.',
}: ConsultationProps) {
  const [form, setForm] = useState({ name: '', phone: '', hasPlot: true })
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          contact: form.phone,
          task: form.hasPlot ? 'Участок есть' : 'Только планирую',
        }),
      })
      setStatus(res.ok ? 'ok' : 'err')
    } catch {
      setStatus('err')
    }
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
        <h2 className="font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-white max-md:text-[36px] max-md:text-dark whitespace-pre-line">
          {title}
        </h2>
        <p className="font-sans font-normal text-lg leading-[1.1] text-white max-md:text-[18px] max-md:text-dark">
          {subtitle}
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="absolute right-[120px] top-[320px] w-[463px] bg-white p-[30px] flex flex-col gap-[34px] max-md:relative max-md:right-0 max-md:top-0 max-md:w-full max-md:p-6 max-md:bg-bg"
      >
        <div className="flex flex-col gap-0">
          <input
            type="text"
            placeholder="Имя"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full py-4 border-b border-dark/30 bg-transparent font-sans text-base text-dark placeholder:text-dark/30 outline-none"
          />
          <input
            type="tel"
            placeholder="Телефон"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
            className="w-full py-4 border-b border-dark/30 bg-transparent font-sans text-base text-dark placeholder:text-dark/30 outline-none"
          />

          <div className="flex items-center gap-6 pt-4">
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

        <div className="flex flex-col gap-3">
          <Button>Получить консультацию</Button>
          {status === 'ok' && (
            <p className="text-sm text-green-600 text-center">Заявка отправлена!</p>
          )}
          {status === 'err' && (
            <p className="text-sm text-red-500 text-center">Ошибка, попробуйте позже</p>
          )}
          <p className="text-xs text-dark/40 text-center">
            Отправляя данные, вы соглашаетесь с{' '}
            <a href="/privacy" className="text-dark underline">политикой конфиденциальности</a>
          </p>
        </div>
      </form>
    </section>
  )
}
