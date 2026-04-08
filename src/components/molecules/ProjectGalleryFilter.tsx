'use client'

import { useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Tab = 'layouts' | 'facades'

interface ProjectGalleryFilterProps {
  layouts?: string[]
  layoutsMobile?: string[]
  facades?: string[]
  facadesMobile?: string[]
}

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number]

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

function ImageGrid({ images, label }: { images: string[]; label: string }) {
  return (
    <>
      {images.map((src, i) => (
        <motion.div
          key={`${src}-${i}`}
          className="w-full cursor-pointer overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: i * 0.1, ease }}
          whileHover={{ scale: 1.02, transition: { duration: 0.5, ease } }}
        >
          <img
            src={src}
            alt={`${label} ${i + 1}`}
            className="w-full h-auto"
          />
        </motion.div>
      ))}
    </>
  )
}

export default function ProjectGalleryFilter({ layouts, layoutsMobile, facades, facadesMobile }: ProjectGalleryFilterProps) {
  const [active, setActive] = useState<Tab>('layouts')
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)

  const closeLightbox = useCallback(() => setLightboxSrc(null), [])

  useEffect(() => {
    if (!lightboxSrc) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handler)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handler)
    }
  }, [lightboxSrc, closeLightbox])

  const desktopImages = active === 'layouts' ? layouts : facades
  const mobileImages = active === 'layouts' ? layoutsMobile : facadesMobile
  const hasLayouts = layouts && layouts.length > 0
  const hasFacades = facades && facades.length > 0

  if (!hasLayouts && !hasFacades) return null

  const label = active === 'layouts' ? 'Планировка' : 'Фасад'

  return (
    <motion.div
      className="px-[120px] pt-[34px] max-md:px-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Tab buttons */}
      <div className="flex items-center gap-4 max-md:gap-[16px] max-md:[&_button]:flex-1 max-md:[&_button]:text-center">
        <motion.button
          onClick={() => setActive('layouts')}
          className={`relative px-4 py-[11px] font-sans font-light text-lg cursor-pointer transition-colors duration-300 ${
            active === 'layouts'
              ? 'bg-[#372B2B] text-white'
              : 'bg-dark/10 text-dark'
          }`}
          whileHover={{ scale: 1.02, transition: { duration: 0.18, ease } }}
          whileTap={{ scale: 0.97, transition: { duration: 0.18, ease } }}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />
          <span className="relative z-1">Планировки</span>
        </motion.button>
        <motion.button
          onClick={() => setActive('facades')}
          className={`relative px-4 py-[11px] font-sans font-light text-lg cursor-pointer transition-colors duration-300 ${
            active === 'facades'
              ? 'bg-[#372B2B] text-white'
              : 'bg-dark/10 text-dark'
          }`}
          whileHover={{ scale: 1.02, transition: { duration: 0.18, ease } }}
          whileTap={{ scale: 0.97, transition: { duration: 0.18, ease } }}
        >
          <Corner pos="tl" />
          <Corner pos="tr" />
          <Corner pos="bl" />
          <Corner pos="br" />
          <span className="relative z-1">Фасады</span>
        </motion.button>
      </div>

      {/* Desktop images */}
      {desktopImages && desktopImages.length > 0 && (
        <div
          key={`desktop-${active}`}
          className="grid grid-cols-2 gap-2 mt-[34px] max-md:hidden"
          onClick={(e) => {
            const src = (e.target as HTMLImageElement).src
            if (src) setLightboxSrc(src)
          }}
        >
          <ImageGrid images={desktopImages} label={label} />
        </div>
      )}

      {/* Mobile images */}
      {(mobileImages && mobileImages.length > 0) ? (
        <div
          key={`mobile-${active}`}
          className="hidden max-md:grid grid-cols-1 gap-2 mt-[34px]"
          onClick={(e) => {
            const src = (e.target as HTMLImageElement).src
            if (src) setLightboxSrc(src)
          }}
        >
          <ImageGrid images={mobileImages} label={label} />
        </div>
      ) : desktopImages && desktopImages.length > 0 && (
        <div
          key={`mobile-fallback-${active}`}
          className="hidden max-md:grid grid-cols-1 gap-2 mt-[34px]"
          onClick={(e) => {
            const src = (e.target as HTMLImageElement).src
            if (src) setLightboxSrc(src)
          }}
        >
          <ImageGrid images={desktopImages} label={label} />
        </div>
      )}

      {/* Lightbox overlay */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center text-white/80 hover:text-white text-3xl leading-none bg-transparent border-none cursor-pointer z-10"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
            aria-label="Закрыть"
          >
            &#215;
          </button>
          <img
            src={lightboxSrc}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </motion.div>
  )
}
