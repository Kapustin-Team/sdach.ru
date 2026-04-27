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

function formatUrl(url?: string, format?: string): string | undefined {
  if (!url) return undefined
  if (format && !url.includes('/uploads/')) return strapiImage(url)
  // Insert format prefix before filename: /uploads/filename.jpg → /uploads/format_filename.jpg
  return url.replace(/\/uploads\//, `/uploads/${format}_`)
}

export const dynamicParams = true
export const revalidate = 60

interface PageProps {
  params: Promise<{ slug: string }>
}

async function getProject(slug: string) {
  const data = await getContent('projects', {
    params: `filters[slug][$eq]=${slug}&populate[image]=*&populate[gallery]=*&populate[specs]=*&populate[layouts]=*&populate[layouts_mobile]=*&populate[facades]=*&populate[facades_mobile]=*&populate[specification]=*&populate[seo]=*`,
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
        image={project.image?.formats?.large?.url ? strapiImage(project.image.formats.large.url) : strapiImage(project.image?.url) || '/hero-1-4df8d5.webp'}
        gallery={project.gallery?.map((img: any) => ({
          url: img.formats?.medium?.url ? strapiImage(img.formats.medium.url) : strapiImage(img.url),
          fullUrl: img.formats?.large?.url ? strapiImage(img.formats.large.url) : strapiImage(img.url),
        }))}
        specs={project.specs}
      />

      {/* Планировки / Фасады / Спецификация */}
      <ProjectGalleryFilter
        layouts={project.layouts?.map((img: any) => img.formats?.medium?.url ? strapiImage(img.formats.medium.url) : strapiImage(img.url))}
        layoutsMobile={project.layouts_mobile?.map((img: any) => img.formats?.medium?.url ? strapiImage(img.formats.medium.url) : strapiImage(img.url))}
        facades={project.facades?.map((img: any) => img.formats?.medium?.url ? strapiImage(img.formats.medium.url) : strapiImage(img.url))}
        facadesMobile={project.facades_mobile?.map((img: any) => img.formats?.medium?.url ? strapiImage(img.formats.medium.url) : strapiImage(img.url))}
        layoutFull={project.layouts?.map((img: any) => img.formats?.large?.url ? strapiImage(img.formats.large.url) : strapiImage(img.url))}
        facadeFull={project.facades?.map((img: any) => img.formats?.large?.url ? strapiImage(img.formats.large.url) : strapiImage(img.url))}
        specificationUrl={project.specification?.url ? strapiImage(project.specification.url) : undefined}
      />

      {project.content && <Manager content={project.content} />}

      <Projects excludeSlug={slug} />
      <Advantages />
      <Consultation />
      <Footer />
    </main>
  )
}
