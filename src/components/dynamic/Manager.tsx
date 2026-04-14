import Hero from '@/components/blocks/Hero'
import About from '@/components/blocks/About'
import Indicators from '@/components/blocks/Indicators'
import Projects from '@/components/blocks/Projects'
import CompletedWorks from '@/components/blocks/CompletedWorks'
import HowWeWork from '@/components/blocks/HowWeWork'
import Mortgage from '@/components/blocks/Mortgage'
import Reconstruction from '@/components/blocks/Reconstruction'
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
  'blocks.completed-works': CompletedWorks,
  'blocks.how-we-work': HowWeWork,
  'blocks.mortgage': Mortgage,
  'blocks.reconstruction': Reconstruction,
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

  const rendered: React.ReactNode[] = []
  let completedWorksInserted = false

  content.forEach((block) => {
    const Component = components[block.__component]
    if (Component) {
      rendered.push(<Component key={`${block.__component}-${block.id}`} {...block} />)
    }

    if (!completedWorksInserted && block.__component === 'blocks.projects') {
      rendered.push(<CompletedWorks key="completed-works-static" />)
      completedWorksInserted = true
    }
  })

  if (!completedWorksInserted) {
    rendered.push(<CompletedWorks key="completed-works-static-fallback" />)
  }

  return <>{rendered}</>
}
