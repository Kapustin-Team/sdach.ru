'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function TiltCard({ children, className, ...props }) {
  const ref = useRef(null)
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTransform({ rotateX: -y * 3, rotateY: x * 3 })
  }

  const handleLeave = () => setTransform({ rotateX: 0, rotateY: 0 })

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={transform}
      transition={{ type: 'spring', damping: 20, stiffness: 200 }}
      style={{ perspective: 800, transformStyle: 'preserve-3d' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
