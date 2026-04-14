'use client'

import { useEffect, useState } from 'react'
import Button from '@/components/atoms/Button'

const STORAGE_KEY = 'karkaso-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const accepted = window.localStorage.getItem(STORAGE_KEY)
    if (!accepted) setVisible(true)
  }, [])

  const accept = () => {
    window.localStorage.setItem(STORAGE_KEY, 'accepted')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 px-6 max-md:bottom-3 max-md:px-4">
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 border border-dark/10 bg-[#F8F4EC] px-6 py-5 shadow-[0_20px_60px_rgba(55,43,43,0.08)] max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-5">
        <p className="max-w-[880px] font-sans text-[15px] leading-[1.5] text-dark/80 max-md:text-[14px]">
          Мы используем cookies, чтобы вам было удобнее пользоваться сайтом. Продолжая пользоваться сайтом, вы принимаете{' '}
          <a href="/personal-data" className="text-dark underline underline-offset-4 transition-opacity hover:opacity-70">
            условия обработки персональных данных
          </a>
          .
        </p>

        <div className="shrink-0">
          <Button onClick={accept}>Принять</Button>
        </div>
      </div>
    </div>
  )
}
