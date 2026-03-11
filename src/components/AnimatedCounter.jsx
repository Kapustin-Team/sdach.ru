'use client'

import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

export default function AnimatedCounter({ value, suffix = '', duration = 1500 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const numValue = parseFloat(value)

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = numValue * eased

      if (value.toString().includes('.')) {
        setDisplay(current.toFixed(1))
      } else {
        setDisplay(Math.round(current).toString())
      }

      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value, duration])

  return (
    <span ref={ref} className="animated-counter">
      {display}{suffix}
    </span>
  )
}
