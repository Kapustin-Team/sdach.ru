'use client'

import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const words = ['шоу', 'подкаст', 'рекламу', 'спецпроект', 'интеграцию', 'реалити', 'ток-шоу', 'скетч\u2011шоу', 'фильм', 'сериал']

export default function RotatingWords({ suffix }) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState('auto')
  const measureRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (measureRef.current) {
      setWidth(measureRef.current.offsetWidth + 'px')
    }
  }, [index])

  return (
    <span className="rotating-words-wrapper">
      <span
        className="rotating-words-sizer"
        style={{ width, transition: 'width 0.4s ease' }}
      >
        {/* Hidden measurer */}
        <span ref={measureRef} className="rotating-words-measure" aria-hidden="true">
          {words[index]}
        </span>

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={index}
            className="rotating-words-word"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            exit={{ y: '-100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
      {suffix && <>{suffix}</>}
    </span>
  )
}
