import { redirect } from 'next/navigation'
import Header from '@/components/blocks/Header'
import Footer from '@/components/blocks/Footer'
import Manager from '@/components/dynamic/Manager'
import ProjectView from '@/components/molecules/ProjectView'
import projectQuery from '@/query/project'
import { getContent, getContentGraph } from '@/utils/requests'
import { generateSEO } from '@/utils/generate-seo'
import { strapiImage } from '@/utils/strapi-image'
import { revalidateTime } from '@/utils/config'

export const dynamicParams = true

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const data = await getContent('projects', {
    params: `populate[image]=*&populate[seo][populate][metaImage]=*&filters[slug][$eq]=${slug}`,
  })
  const project = data?.[0]?.attributes

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
  const req = await getContentGraph(projectQuery(slug))

  const project = req?.projects?.data?.[0]?.attributes
  if (!project) redirect('/')

  return (
    <main className="min-h-screen font-sans bg-bg text-dark-full">
      <Header />
      <ProjectView
        title={project.title}
        price={project.price}
        tags={project.tags || []}
        description={project.description}
        image={strapiImage(project.image?.data?.attributes?.url) || '/hero-1-4df8d5.png'}
        gallery={project.gallery}
        specs={project.specs}
      />
      {project.content && <Manager content={project.content} />}
      <Footer />
    </main>
  )
}
