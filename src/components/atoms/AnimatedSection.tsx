'use client'

import { motion, type HTMLMotionProps } from 'framer-motion'

type AnimatedSectionProps = HTMLMotionProps<'div'> & {
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

const directions = {
  up:    { y: 50, x: 0 },
  down:  { y: -50, x: 0 },
  left:  { x: 50, y: 0 },
  right: { x: -50, y: 0 },
}

export default function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
