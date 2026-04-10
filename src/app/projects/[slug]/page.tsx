import { redirect } from 'next/navigation'
import Header from '@/components/blocks/Header'
import Footer from '@/components/blocks/Footer'
import Manager from '@/components/dynamic/Manager'
import ProjectHero from '@/components/molecules/ProjectHero'
import Projects from '@/components/blocks/Projects'
import Advantages from '@/components/blocks/Advantages'
import Consultation from '@/components/blocks/Consultation'
import ProjectGalleryFilter from '@/components/molecules/ProjectGalleryFilter'
import { getContent } from '@/utils/requests'
import { generateSEO } from '@/utils/generate-seo'
import { strapiImage } from '@/utils/strapi-image'

export const dynamicParams = true
export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  const data = await getContent('projects', {
    params: `filters[slug][$eq]=${slug}&populate[image]=*&populate[gallery]=*&populate[specs]=*&populate[layouts]=*&populate[layouts_mobile]=*&populate[facades]=*&populate[facades_mobile]=*&populate[seo]=*`,
  })
  const item = Array.isArray(data) ? data[0] : data
  return item || null
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  return generateSEO(
    {
      metaTitle: project?.title,
      metaDescription: project?.seo?.metaDescription,
      metaImage: project?.image,
    },
    `projects/${slug}`
  )
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) redirect('/')

  return (
    <main className="min-h-screen flex flex-col font-sans bg-bg text-dark-full">
      <Header />
      <ProjectHero
        title={project.title}
        description={project.description}
        price={project.price}
        image={strapiImage(project.image?.url) || '/hero-1-4df8d5.png'}
        gallery={project.gallery}
        specs={project.specs}
      />

      {/* Планировки / Фасады */}
      <ProjectGalleryFilter
        layouts={project.layouts?.map((img: { url: string }) => strapiImage(img.url))}
        layoutsMobile={project.layouts_mobile?.map((img: { url: string }) => strapiImage(img.url))}
        facades={project.facades?.map((img: { url: string }) => strapiImage(img.url))}
        facadesMobile={project.facades_mobile?.map((img: { url: string }) => strapiImage(img.url))}
      />

      {project.content && <Manager content={project.content} />}

      <Projects excludeSlug={slug} />
      <Advantages />
      <Consultation />
      <Footer />
    </main>
  )
}
