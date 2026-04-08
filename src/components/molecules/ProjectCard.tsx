'use client'

import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'

const textVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  },
}

export interface ProjectCardProps {
  title: string
  tags: string[]
  price: string
  image: string
  slug: string
}

export default function ProjectCard({ title, tags, price, image, slug }: ProjectCardProps) {
  return (
    <motion.div
      className="flex items-stretch gap-10 px-[120px] pt-5 max-md:flex-col max-md:px-0 max-md:gap-6"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.a
        href={`/projects/${slug}`}
        className="w-[570px] h-[340px] shrink-0 overflow-hidden max-md:w-full max-md:h-[340px] max-md:px-2 cursor-pointer block"
        whileHover={{ scale: 1.03, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }}
      >
        <img
          src={image}
          alt={title}
          className="block w-full h-full object-cover"
        />
      </motion.a>

      <motion.div
        className="flex flex-col justify-between gap-[22px] py-5 flex-1 min-w-0 max-md:py-0 max-md:px-6"
        variants={textVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <div className="flex flex-col gap-5">
          <motion.a
            href={`/projects/${slug}`}
            className="no-underline cursor-pointer"
            variants={itemVariants}
          >
            <h3 className="font-sans font-normal text-4xl leading-[1.1] text-dark">
              {title}
            </h3>
          </motion.a>

          <motion.a
            href={`/projects/${slug}`}
            className="no-underline cursor-pointer"
            variants={itemVariants}
          >
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-sans font-medium text-sm leading-[1.14] uppercase px-3 pt-2 pb-1.5 bg-dark/10 text-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.a>

          <motion.div
            className="font-sans font-medium text-xl leading-[1] text-dark"
            variants={itemVariants}
          >
            {price}
          </motion.div>
        </div>

        <motion.div
          className="flex gap-[20px] max-md:flex-col max-md:w-full max-md:[&_a]:w-full max-md:[&_button]:w-full"
          variants={itemVariants}
        >
          <Button href={`/projects/${slug}`}>Посмотреть проект</Button>
          <Button href="#contact" variant="secondary">Оставить заявку</Button>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
