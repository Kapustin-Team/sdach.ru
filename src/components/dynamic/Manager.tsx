import Hero from '@/components/blocks/Hero'
import About from '@/components/blocks/About'
import Indicators from '@/components/blocks/Indicators'
import Projects from '@/components/blocks/Projects'
import Advantages from '@/components/blocks/Advantages'
import Consultation from '@/components/blocks/Consultation'
import Footer from '@/components/blocks/Footer'

// Maps Strapi dynamic zone __component values to React components.
// Each key matches the Strapi component UID (e.g., "blocks.hero").
const components: Record<string, React.ComponentType<any>> = {
  'blocks.hero': Hero,
  'blocks.about': About,
  'blocks.indicators': Indicators,
  'blocks.projects': Projects,
  'blocks.advantages': Advantages,
  'blocks.consultation': Consultation,
  'blocks.footer': Footer,
}

interface Block {
  id: number
  __component: string
  [key: string]: any
}

interface ManagerProps {
  content: Block[]
}

export default function Manager({ content }: ManagerProps) {
  if (!content || !Array.isArray(content)) return null

  return (
    <>
      {content.map((block) => {
        const Component = components[block.__component]
        if (!Component) return null
        return <Component key={`${block.__component}-${block.id}`} {...block} />
      })}
    </>
  )
}
