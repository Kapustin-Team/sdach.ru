'use client'

import { useEffect, useState } from 'react'

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
      <div className="mx-auto flex max-w-[1240px] items-center justify-between gap-6 border border-black/10 bg-[#F4EEE3] px-6 py-5 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur max-md:flex-col max-md:items-start max-md:gap-4 max-md:px-5">
        <p className="max-w-[880px] font-sans text-[15px] leading-[1.5] text-dark max-md:text-[14px]">
          Мы используем cookies, чтобы вам было удобнее пользоваться сайтом. Продолжая пользоваться сайтом, вы принимаете{' '}
          <a href="/personal-data" className="underline underline-offset-4 hover:opacity-70 transition-opacity">
            условия обработки персональных данных
          </a>
          .
        </p>

        <button
          type="button"
          onClick={accept}
          className="shrink-0 border border-dark bg-dark px-6 py-3 font-sans text-sm uppercase tracking-[0.08em] text-[#FDFAF3] transition hover:bg-transparent hover:text-dark"
        >
          Принять
        </button>
      </div>
    </div>
  )
}
