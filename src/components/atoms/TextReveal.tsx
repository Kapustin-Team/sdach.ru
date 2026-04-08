'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

type TextRevealProps = HTMLMotionProps<'div'> & {
  delay?: number
}

export default function TextReveal({
  children,
  delay = 0,
  className = '',
  ...props
}: TextRevealProps) {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </div>
  )
}
