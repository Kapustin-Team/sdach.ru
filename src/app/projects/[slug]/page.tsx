import { redirect } from 'next/navigation'
import Header from '@/components/blocks/Header'
import Footer from '@/components/blocks/Footer'
import Manager from '@/components/dynamic/Manager'
import ProjectView from '@/components/molecules/ProjectView'
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
    params: `filters[slug][$eq]=${slug}&populate=*`,
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
      <ProjectView
        title={project.title}
        price={project.price}
        tags={project.tags || []}
        description={project.description}
        image={strapiImage(project.image?.url) || '/hero-1-4df8d5.png'}
        gallery={project.gallery}
        specs={project.specs}
      />
      {project.content && <Manager content={project.content} />}
      <Footer />
    </main>
  )
}
