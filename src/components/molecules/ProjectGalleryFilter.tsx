'use client'

import { useState } from 'react'

type Tab = 'layouts' | 'facades'

interface ProjectGalleryFilterProps {
  layouts?: string[]
  facades?: string[]
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const positions: Record<string, string> = {
    tl: '-top-1 -left-1',
    tr: '-top-1 -right-1 -scale-x-100',
    bl: '-bottom-1 -left-1 -scale-y-100',
    br: '-bottom-1 -right-1 scale-[-1]',
  }
  return (
    <img
      src="/icons/button-el.svg"
      alt=""
      aria-hidden="true"
      className={`absolute pointer-events-none w-[9px] h-[6px] ${positions[pos]}`}
      width={9}
      height={6}
    />
  )
}

export default function ProjectGalleryFilter({ layouts, facades }: ProjectGalleryFilterProps) {
  const [active, setActive] = useState<Tab>('layouts')

  const images = active === 'layouts' ? layouts : facades
  const hasLayouts = layouts && layouts.length > 0
  const hasFacades = facades && facades.length > 0

  if (!hasLayouts && !hasFacades) return null

  return (
    <div className="px-[120px] pt-[34px] max-md:px-6">
      {/* Buttons */}
      <div className="flex items-center gap-4 max-md:gap-[16px] max-md:[&_button]:flex-1 max-md:[&_button]:text-center">
        <button
          onClick={() => setActive('layouts')}
          className={`relative px-4 py-[11px] font-sans font-light text-lg cursor-pointer transition-colors duration-300 ${
            active === 'layouts'
              ? 'bg-[#372B2B] text-white'
              : 'bg-dark/10 text-dark'
          }`}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />
          <span className="relative z-1">Планировки</span>
        </button>
        <button
          onClick={() => setActive('facades')}
          className={`relative px-4 py-[11px] font-sans font-light text-lg cursor-pointer transition-colors duration-300 ${
            active === 'facades'
              ? 'bg-[#372B2B] text-white'
              : 'bg-dark/10 text-dark'
          }`}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />
          <span className="relative z-1">Фасады</span>
        </button>
      </div>

      {/* Images */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-2 gap-2 mt-6 max-md:grid-cols-1">
          {images.map((src, i) => (
            <div key={`${active}-${i}`} className="w-full h-[400px] overflow-hidden max-md:h-[250px]">
              <img
                src={src}
                alt={`${active === 'layouts' ? 'Планировка' : 'Фасад'} ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
