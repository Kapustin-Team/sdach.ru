import Button from '@/components/atoms/Button'
import { strapiImage } from '@/utils/strapi-image'

interface HeroProps {
  title?: string
  subtitle?: string
  image?: { url?: string }
}

const defaultSubtitles = [
  'Гарантия на конструкцию до 10 лет',
  'Фиксированная смета без скрытых доплат',
  'Индивидуальные и типовые проекты',
]

export default function Hero({
  title = 'Современные\nдома под ключ',
  subtitle,
  image,
}: HeroProps) {
  const lines = subtitle
    ? subtitle.split('\n').filter(Boolean)
    : defaultSubtitles
  const heroImage = image?.url ? strapiImage(image.url) : null

  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-end gap-2.5 px-[120px] pt-[50px] pb-[34px] max-md:flex-col max-md:items-start max-md:px-6 max-md:pt-[34px] max-md:pb-0">
        <h1 className="font-sans font-normal text-[96px] leading-[1em] tracking-[-0.03em] text-dark whitespace-pre-line m-0 max-md:text-5xl">
          {title}
        </h1>
        <div className="shrink-0 max-md:hidden">
          <Button href="#contact">Подобрать проект</Button>
        </div>
      </div>

      {/* Mobile buttons */}
      <div className="hidden max-md:flex flex-col gap-[20px] px-6 mt-[54px] [&_a]:w-full [&_button]:w-full">
        <Button href="#contact">Подобрать проект</Button>
        <Button href="#contact" variant="secondary">Рассчитать по эскизу</Button>
      </div>

      <ul className="flex justify-between items-center gap-2.5 px-[120px] py-[34px] list-none m-0 max-md:hidden">
        {lines.map((line, i) => (
          <li key={i} className="font-sans font-normal text-xl leading-[1.3] text-dark">
            {line}
          </li>
        ))}
      </ul>

      {heroImage ? (
        <div className="overflow-hidden max-md:px-2 max-md:mt-[34px]">
          <img src={heroImage} alt={title} className="block w-full h-[380px] object-cover max-md:h-auto" />
        </div>
      ) : (
        <div className="flex gap-4 overflow-hidden max-md:flex-col max-md:gap-2 max-md:px-2 max-md:mt-[34px]">
          <div className="shrink-0 w-[520px] h-[380px] overflow-hidden max-md:!w-full max-md:!h-auto">
            <img src="/hero-1-4df8d5.png" alt="Современный дом" className="block w-full h-full object-cover max-md:h-auto" />
          </div>
          <div className="shrink-0 w-[570px] h-[321px] overflow-hidden max-md:!w-full max-md:!h-auto">
            <img src="/hero-2-29c330.png" alt="Интерьер дома" className="block w-full h-full object-cover max-md:h-auto" />
          </div>
          <div className="shrink-0 w-[620px] h-[321px] overflow-hidden max-md:!w-full max-md:!h-auto">
            <img src="/hero-3-6cfe9d.png" alt="Проект дома" className="block w-full h-full object-cover max-md:h-auto" />
          </div>
        </div>
      )}
    </section>
  )
}
