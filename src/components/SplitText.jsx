'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const vmEasing = [0.64, 0.32, 0, 1]

export default function SplitText({ children, className, as: Tag = 'h1', delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  // Extract text from children (handles JSX with spans)
  const extractText = (node) => {
    if (typeof node === 'string') return node
    if (Array.isArray(node)) return node.map(extractText).join('')
    if (node?.props?.children) return extractText(node.props.children)
    return ''
  }

  const text = typeof children === 'string' ? children : extractText(children)
  const words = text.split(' ').filter(Boolean)

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: 'inline-block',
            overflow: 'hidden',
            verticalAlign: 'top',
            marginRight: '0.28em',
          }}
        >
          <motion.span
            aria-hidden="true"
            style={{ display: 'inline-block', willChange: 'transform' }}
            initial={{ y: '100%' }}
            animate={isInView ? { y: '0%' } : {}}
            transition={{
              duration: 0.8,
              delay: delay + i * 0.05,
              ease: vmEasing,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
