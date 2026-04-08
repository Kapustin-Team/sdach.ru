'use client'

import { motion } from 'framer-motion'

interface AnimatedTitleProps {
  label?: string
  heading?: string
  subtitle?: string
  /** Pass 'light' for dark backgrounds */
  theme?: 'dark' | 'light'
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
}

const transition = (delay: number) => ({
  duration: 0.6,
  delay,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
})

export default function AnimatedTitle({ label, heading, subtitle, theme = 'dark' }: AnimatedTitleProps) {
  const color = theme === 'light' ? 'text-white' : 'text-dark'

  return (
    <div className="flex flex-col gap-[34px] max-md:gap-5">
      {label && (
        <motion.div
          className="flex items-center gap-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          transition={transition(0)}
        >
          <span className={`block w-[5px] h-[5px] rounded-full shrink-0 ${theme === 'light' ? 'bg-white' : 'bg-dark'}`} />
          <span className={`font-sans font-normal text-base leading-[1.25] tracking-[0.02em] uppercase ${color}`}>
            {label}
          </span>
        </motion.div>
      )}

      {heading && (
        <motion.h2
          className={`font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] m-0 max-w-[1088px] max-md:text-[36px] ${color}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          transition={transition(label ? 0.12 : 0)}
        >
          {heading}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          className={`font-sans font-normal text-xl leading-[1.3] m-0 max-w-[716px] max-md:text-[17px] ${color}`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={fadeUp}
          transition={transition(label ? 0.24 : 0.12)}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}
