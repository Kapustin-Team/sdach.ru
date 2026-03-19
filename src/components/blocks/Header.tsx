'use client'

import { useState } from 'react'
import Button from '@/components/atoms/Button'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="flex items-center justify-between px-[120px] py-[34px] leading-none max-md:px-6 max-md:py-4">
      <a href="/" className="flex items-center no-underline" aria-label="На главную">
        <span className="font-display font-bold text-xl leading-[1.04] uppercase text-dark">
          karkaso
        </span>
      </a>

      <nav
        className={`flex gap-6 items-center max-md:absolute max-md:top-full max-md:left-2 max-md:right-2 max-md:z-100 max-md:bg-white max-md:rounded-2xl max-md:flex-col max-md:p-5 max-md:shadow-[0_12px_48px_rgba(0,0,0,0.1)] max-md:transition-all max-md:duration-300 ${
          menuOpen
            ? 'max-md:opacity-100 max-md:pointer-events-auto max-md:translate-y-0'
            : 'max-md:opacity-0 max-md:pointer-events-none max-md:-translate-y-2'
        }`}
      >
        <a
          href="#projects"
          className="font-display text-lg font-normal leading-[1.1] text-dark no-underline transition-colors duration-200 hover:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          Проекты домов
        </a>
        <a
          href="#about"
          className="font-display text-lg font-normal leading-[1.1] text-dark no-underline transition-colors duration-200 hover:opacity-70"
          onClick={() => setMenuOpen(false)}
        >
          О компании
        </a>
        <span className="block w-px h-5 bg-dark max-md:hidden" />
        <a
          href="tel:+74950230673"
          className="font-display text-lg font-normal leading-[1.1] text-dark no-underline transition-colors duration-200 hover:opacity-70"
        >
          +7 (495) 023-06-73
        </a>
        <div className="-my-3.5">
          <Button href="#contact" variant="secondary">
            Рассчитать по эскизу
          </Button>
        </div>
      </nav>

      <button
        className="hidden max-md:flex flex-col gap-[5px] w-[22px] bg-none border-none cursor-pointer p-0"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Меню"
      >
        <span
          className={`block h-0.5 w-full bg-dark rounded-sm transition-all duration-300 ${
            menuOpen ? 'rotate-45 translate-x-[5px] translate-y-[5px]' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-dark rounded-sm transition-all duration-300 ${
            menuOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-full bg-dark rounded-sm transition-all duration-300 ${
            menuOpen ? '-rotate-45 translate-x-[5px] -translate-y-[5px]' : ''
          }`}
        />
      </button>
    </header>
  )
}
