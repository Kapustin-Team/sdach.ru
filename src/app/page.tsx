import Header from '@/components/blocks/Header'
import Footer from '@/components/blocks/Footer'
import Manager from '@/components/dynamic/Manager'
import { getContent } from '@/utils/requests'
import { generateSEO } from '@/utils/generate-seo'

export const revalidate = 60

// Fallback static blocks for when Strapi is unavailable
import Hero from '@/components/blocks/Hero'
import About from '@/components/blocks/About'
import Indicators from '@/components/blocks/Indicators'
import Projects from '@/components/blocks/Projects'
import Advantages from '@/components/blocks/Advantages'
import Consultation from '@/components/blocks/Consultation'

export async function generateMetadata() {
  const data = await getContent('karkaso-home', {
    params: 'populate=*',
  })
  return generateSEO(data?.seo, null)
}

export default async function HomePage() {
  const data = await getContent('karkaso-home', {
    params: 'populate[content][populate]=*',
  })

  const content = data?.content

  // If Strapi returns dynamic zone blocks, use Manager
  if (content && Array.isArray(content) && content.length > 0) {
    const hasFooter = content.some((b: { __component: string }) => b.__component === 'blocks.footer')
    return (
      <main className="min-h-screen flex flex-col font-sans bg-bg text-dark-full">
        <Header />
        <Manager content={content} />
        {!hasFooter && <Footer />}
      </main>
    )
  }

  // Fallback: render static blocks when Strapi is unavailable
  return (
    <main className="min-h-screen flex flex-col font-sans bg-bg text-dark-full">
      <Header />
      <Hero />
      <About />
      <Indicators />
      <Projects />
      <Advantages />
      <Consultation />
      <Footer />
    </main>
  )
}
