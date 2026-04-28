'use client'

import { useState, useEffect } from 'react'
import Button from '@/components/atoms/Button'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    if (menuOpen) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.overflow = ''
        window.scrollTo(0, scrollY)
      }
    }
  }, [menuOpen])

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between px-[120px] py-[34px] leading-none bg-bg max-md:px-6 max-md:h-[77px]">
        <a href="/" className="flex items-center no-underline" aria-label="На главную">
          <span className="font-sans font-bold text-xl leading-[1.04] uppercase text-dark">
            студия дач
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="flex gap-6 items-center max-md:hidden">
          <a
            href="/#projects"
            className="font-sans text-lg font-normal leading-[1.1] text-dark no-underline transition-colors duration-200 hover:opacity-70"
          >
            Проекты домов
          </a>
          <a
            href="/#about"
            className="font-sans text-lg font-normal leading-[1.1] text-dark no-underline transition-colors duration-200 hover:opacity-70"
          >
            О компании
          </a>
          <span className="block w-px h-5 bg-dark" />
          <a
            href="tel:+74950230673"
            className="font-sans text-lg font-normal leading-[1.1] text-dark no-underline transition-colors duration-200 hover:opacity-70"
          >
            +7 (495) 023-06-73
          </a>
          <div className="-my-3.5">
            <Button href="/#contact" variant="secondary">
              Рассчитать по эскизу
            </Button>
          </div>
        </nav>

        {/* Mobile burger / close — instant switch, no animation */}
        <button
          className="hidden max-md:flex items-center justify-center w-[22px] h-[22px] bg-none border-none cursor-pointer p-0 relative"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Меню"
        >
          {menuOpen ? (
            <>
              <span className="block w-full h-0.5 bg-dark rounded-sm absolute rotate-45" />
              <span className="block w-full h-0.5 bg-dark rounded-sm absolute -rotate-45" />
            </>
          ) : (
            <img src="/icons/menu-karkaso.svg" alt="" aria-hidden="true" className="w-full h-auto" />
          )}
        </button>
      </header>

      {/* Mobile menu — full screen overlay when open, completely hidden when closed */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col md:hidden">
          {/* Menu panel */}
          <div className="h-[450px] bg-bg flex flex-col px-6 shrink-0">
            {/* Header row matching main header */}
            <div className="flex items-center justify-between h-[77px]">
              <a href="/" className="flex items-center no-underline" aria-label="На главную">
                <span className="font-sans font-bold text-xl leading-[1.04] uppercase text-dark">
                  karkaso
                </span>
              </a>
              <button
                className="flex items-center justify-center w-[22px] h-[22px] bg-none border-none cursor-pointer p-0 relative"
                onClick={() => setMenuOpen(false)}
                aria-label="Закрыть меню"
              >
                <span className="block w-full h-0.5 bg-dark rounded-sm absolute rotate-45" />
                <span className="block w-full h-0.5 bg-dark rounded-sm absolute -rotate-45" />
              </button>
            </div>

            {/* Menu links */}
            <nav className="flex flex-col gap-6 mt-[60px]">
              <a
                href="/#projects"
                className="font-sans text-[28px] font-normal leading-[1.1] text-dark no-underline"
                onClick={() => setMenuOpen(false)}
              >
                Проекты домов
              </a>
              <a
                href="/#about"
                className="font-sans text-[28px] font-normal leading-[1.1] text-dark no-underline"
                onClick={() => setMenuOpen(false)}
              >
                О компании
              </a>
            </nav>

            {/* Bottom: divider + phone */}
            <div className="mt-auto mb-[50px]">
              <div className="w-full h-px bg-dark" />
              <a
                href="tel:+74950230673"
                className="font-sans text-[28px] font-normal leading-[1.1] text-dark no-underline block mt-[34px]"
              >
                +7 (495) 023-06-73
              </a>
            </div>
          </div>

          {/* Dark overlay for remaining screen */}
          <div
            className="flex-1 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      )}
    </>
  )
}
