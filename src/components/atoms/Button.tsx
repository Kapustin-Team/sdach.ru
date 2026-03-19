'use client'

import { type ReactNode, type ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'white' | 'secondary'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  href?: string
  className?: string
}

const base =
  'group relative inline-flex items-center justify-center px-4 py-3.5 font-display font-normal text-lg cursor-pointer transition-all duration-400 no-underline rounded-none'

const variants: Record<Variant, string> = {
  primary: 'bg-[#372B2B] text-white',
  white: 'bg-white text-dark-full',
  secondary: 'bg-transparent text-dark',
}

function Corner({ pos }: { pos: 'tl' | 'tr' | 'bl' | 'br' }) {
  const posClass: Record<string, string> = {
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
      className={`absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-[9px] h-[6px] ${posClass[pos]}`}
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
  const cls = `${base} ${variants[variant]} ${className}`

  const secondaryInner = variant === 'secondary'

  const inner = (
    <>
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />
      {secondaryInner ? (
        <span className="block px-4 py-3.5 bg-dark/10 relative z-1">{children}</span>
      ) : (
        <span className="relative z-1">{children}</span>
      )}
    </>
  )

  if (href) {
    return <a href={href} className={cls} {...props}>{inner}</a>
  }
  return <button className={cls} {...(props as ComponentPropsWithoutRef<'button'>)}>{inner}</button>
}
