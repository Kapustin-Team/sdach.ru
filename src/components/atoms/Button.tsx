'use client'

import { type ReactNode, type ComponentPropsWithoutRef } from 'react'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'white' | 'secondary'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
}

const base =
  'group relative inline-flex items-center justify-center px-4 py-[11px] font-sans font-light text-lg cursor-pointer transition-all duration-400 no-underline rounded-none'

const variants: Record<Variant, string> = {
  primary: 'bg-[#372B2B] text-white',
  white: 'bg-white text-dark-full',
  secondary: 'bg-transparent text-dark',
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const base: Record<string, string> = {
    tl: '-top-1 -left-1',
    tr: '-top-1 -right-1 -scale-x-100',
    bl: '-bottom-1 -left-1 -scale-y-100',
    br: '-bottom-1 -right-1 scale-[-1]',
  }
  const hover: Record<string, string> = {
    tl: 'group-hover:-top-[6px] group-hover:-left-[6px]',
    tr: 'group-hover:-top-[6px] group-hover:-right-[6px]',
    bl: 'group-hover:-bottom-[6px] group-hover:-left-[6px]',
    br: 'group-hover:-bottom-[6px] group-hover:-right-[6px]',
  }
  return (
    <img
      src="/icons/button-el.svg"
      alt=""
      aria-hidden="true"
      className={`absolute pointer-events-none transition-all duration-300 w-[9px] h-[6px] ${base[pos]} ${hover[pos]}`}
      width={9}
      height={6}
    />
  )
}

export default function Button({
  children,
  variant = 'primary',
  href,
  className = '',
  ...props
}: ButtonProps & Omit<ComponentPropsWithoutRef<'a'> & ComponentPropsWithoutRef<'button'>, keyof ButtonProps>) {
  const cls = `${base} ${variants[variant]} ${variant === 'secondary' ? '!p-0' : ''} ${className}`

  const secondaryInner = variant === 'secondary'

  const inner = (
    <>
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      {secondaryInner ? (
        <span className="block w-full px-4 py-[11px] bg-dark/10 relative z-1 text-center">{children}</span>
      ) : (
        <span className="relative z-1">{children}</span>
      )}
    </>
  )

  const tap = { scale: 0.97 }
  const hover = { scale: 1.02 }
  const transition = { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }

  if (href) {
    return (
      <motion.a href={href} className={cls} whileHover={hover} whileTap={tap} transition={transition} {...props}>
        {inner}
      </motion.a>
    )
  }
  return (
    <motion.button
      className={cls}
      whileHover={hover}
      whileTap={tap}
      transition={transition}
      {...(props as ComponentPropsWithoutRef<'button'>)}
    >
      {inner}
    </motion.button>
  )
}
