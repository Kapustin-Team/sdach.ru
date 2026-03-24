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

interface ProjectsProps {
  excludeSlug?: string
  [key: string]: unknown
}

export default async function Projects({ excludeSlug }: ProjectsProps = {}) {
  let items: ProjectCardProps[] = []

  try {
    const excludeFilter = excludeSlug ? `&filters[slug][$ne]=${excludeSlug}` : ''
    const data = await getContent('projects', {
      params: `populate=image&sort=createdAt:desc${excludeFilter}`,
    })
    if (Array.isArray(data) && data.length > 0) {
      items = data.map(mapProject)
    }
  } catch {
    // Strapi unavailable — show nothing
  }

  if (items.length === 0) return null

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
