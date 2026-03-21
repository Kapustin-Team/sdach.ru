import Title from '@/components/atoms/Title'
import ProjectCard from '@/components/molecules/ProjectCard'
import type { ProjectCardProps } from '@/components/molecules/ProjectCard'
import { getContent } from '@/utils/requests'
import { strapiImage } from '@/utils/strapi-image'

interface StrapiProject {
  id: number
  title: string
  slug: string
  price: string
  tags: string[]
  image?: { url?: string }
}

function mapProject(p: StrapiProject): ProjectCardProps {
  return {
    title: p.title,
    slug: p.slug,
    price: p.price,
    tags: p.tags || [],
    image: strapiImage(p.image?.url) || '/hero-1-4df8d5.png',
  }
}

const fallbackProjects: ProjectCardProps[] = [
  {
    title: 'Пальмира',
    slug: 'palmira',
    price: 'от 7 400 000 ₽',
    tags: ['керамогранит', '120м²', '1 этаж', 'отдельный гараж', '1 санузел', '3 спальни', 'открытая терасса'],
    image: '/hero-1-4df8d5.png',
  },
  {
    title: 'Сорренто',
    slug: 'sorrento',
    price: 'от 5 600 000 ₽',
    tags: ['каркасный дом', '90м²', '1 этаж', 'отдельный гараж', '1 санузел', '2 спальни', 'частично крытая терасса'],
    image: '/hero-2-29c330.png',
  },
  {
    title: 'Лаго',
    slug: 'lago',
    price: 'от 9 200 000 ₽',
    tags: ['газобетонные блоки', '180 м²', '2 этажа', 'отдельный гараж', '2 санузла', '4 спальни', 'крытая терасса'],
    image: '/hero-3-6cfe9d.png',
  },
]

interface ProjectsProps {
  projects?: StrapiProject[]
}

export default async function Projects({ projects: passedProjects }: ProjectsProps = {}) {
  let items: ProjectCardProps[]

  if (passedProjects && passedProjects.length > 0) {
    items = passedProjects.map(mapProject)
  } else {
    try {
      const data = await getContent('projects', {
        params: 'populate=image&sort=createdAt:desc',
      })
      items = Array.isArray(data) && data.length > 0
        ? data.map(mapProject)
        : fallbackProjects
    } catch {
      items = fallbackProjects
    }
  }

  return (
    <section id="projects" className="py-[50px]">
      <div className="px-[120px] max-md:px-6">
        <Title label="Проекты домов" heading="Выбери где жить" />
      </div>
      <div className="flex flex-col gap-5 mt-10 max-md:mt-[28px] max-md:gap-[30px]">
        {items.map((project) => (
          <ProjectCard key={project.slug} {...project} />
        ))}
      </div>
    </section>
  )
}
