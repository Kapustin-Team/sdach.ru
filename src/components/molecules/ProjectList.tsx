'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard, { type ProjectCardProps } from '@/components/molecules/ProjectCard'
import Button from '@/components/atoms/Button'

const INITIAL_COUNT = 3

export default function ProjectList({ items }: { items: ProjectCardProps[] }) {
  const [expanded, setExpanded] = useState(false)

  const visible = expanded ? items : items.slice(0, INITIAL_COUNT)
  const hasMore = items.length > INITIAL_COUNT

  return (
    <>
      <div className="flex flex-col gap-5 mt-10 max-md:mt-[28px] max-md:gap-[30px]">
        {visible.map(project => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>

      <AnimatePresence>
        {hasMore && !expanded && (
          <motion.div
            className="flex justify-center mt-10 px-[120px] max-md:px-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <Button variant="secondary" onClick={() => setExpanded(true)}>
              Смотреть все
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
