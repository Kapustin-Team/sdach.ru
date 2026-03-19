import Header from '@/components/blocks/Header'
import Footer from '@/components/blocks/Footer'
import Manager from '@/components/dynamic/Manager'
import { getContent } from '@/utils/requests'
import { generateSEO } from '@/utils/generate-seo'
import { revalidateTime } from '@/utils/config'

// Fallback static blocks for when Strapi is unavailable
import Hero from '@/components/blocks/Hero'
import About from '@/components/blocks/About'
import Indicators from '@/components/blocks/Indicators'
import Projects from '@/components/blocks/Projects'
import Advantages from '@/components/blocks/Advantages'
import Consultation from '@/components/blocks/Consultation'

export async function generateMetadata() {
  const data = await getContent('karkaso-home', {
    params: 'populate[seo][populate][metaImage]=*',
  })
  const content = data?.attributes
  return generateSEO(content?.seo, null)
}

export default async function HomePage() {
  const data = await getContent('karkaso-home', {
    params: [
      'populate[content][populate]=*',
      'populate[content][on][blocks.projects][populate][projects][populate][image][fields][0]=url',
    ].join('&'),
  })

  const content = data?.attributes?.content

  // If Strapi returns dynamic zone blocks, use Manager
  if (content && Array.isArray(content) && content.length > 0) {
    return (
      <main className="min-h-screen font-sans bg-bg text-dark-full">
        <Header />
        <Manager content={content} />
        <Footer />
      </main>
    )
  }

  // Fallback: render static blocks when Strapi is unavailable
  return (
    <main className="min-h-screen font-sans bg-bg text-dark-full">
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
