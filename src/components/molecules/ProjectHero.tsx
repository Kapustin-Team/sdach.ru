import Button from '@/components/atoms/Button'
import { strapiImage } from '@/utils/strapi-image'

interface Spec {
  label: string
  value: string
}

interface ProjectHeroProps {
  title: string
  description?: string
  price: string
  image: string
  gallery?: { url: string }[]
  specs?: Spec[]
}

const placeholderGallery = [
  '/hero-1-4df8d5.png',
  '/hero-2-29c330.png',
  '/hero-3-6cfe9d.png',
  '/hero-1-4df8d5.png',
]

export default function ProjectHero({
  title,
  description,
  price,
  image,
  gallery,
  specs,
}: ProjectHeroProps) {
  const galleryImages = gallery && gallery.length > 0
    ? gallery.map((img) => strapiImage(img.url))
    : placeholderGallery

  return (
    <section className="pt-[40px]">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2.5 px-[120px] pb-10 max-md:px-6 max-md:pb-[54px]">
        <a href="/" className="font-sans text-base leading-[1.25] text-dark/50 no-underline hover:text-dark transition-colors">
          Главная
        </a>
        <span className="w-px h-4 bg-dark/30" />
        <a href="/#projects" className="font-sans text-base leading-[1.25] text-dark/50 no-underline hover:text-dark transition-colors">
          Проекты домов
        </a>
        <span className="w-px h-4 bg-dark/30" />
        <span className="font-sans text-base leading-[1.25] text-dark">
          {title}
        </span>
      </div>

      {/* Title + Description */}
      <div className="flex flex-col gap-5 px-[120px] max-md:px-6">
        <h1 className="font-sans font-normal text-[96px] leading-[1em] tracking-[-0.03em] text-dark max-md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="font-sans font-normal text-lg leading-[1.3] text-dark max-w-[677px] max-md:text-base">
            {description}
          </p>
        )}
      </div>

      {/* Price + Buttons */}
      <div className="flex justify-between items-center gap-[119px] px-[120px] pt-[80px] pb-6 max-md:px-6 max-md:pt-10 max-md:flex-col max-md:items-start max-md:gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-sans font-medium text-[32px] leading-[1.1] text-dark max-md:text-2xl">
            {price}
          </span>
        </div>
        <div className="flex items-center gap-[20px] max-md:flex-col max-md:w-full max-md:[&_a]:w-full">
          <Button href="#contact">Запросить смету</Button>
          <Button href="#contact" variant="secondary">Записаться на просмотр объекта</Button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="flex flex-col gap-2 px-2 max-md:px-2">
        {/* Main image — 100% width */}
        <div className="w-full h-[578px] overflow-hidden max-md:h-[280px]">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 4 gallery images — 25% each */}
        <div className="flex gap-2 max-md:flex-col">
          {galleryImages.slice(0, 4).map((src, i) => (
            <div key={i} className="w-1/4 h-[350px] overflow-hidden max-md:w-full max-md:h-[200px]">
              <img
                src={src}
                alt={`${title} — фото ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Specs Grid */}
      {specs && specs.length > 0 && (
        <div className="px-[120px] pt-[105px] max-md:px-6 max-md:pt-10">
          <div className="flex flex-wrap gap-x-10 gap-y-10 py-[30px] max-md:gap-y-6">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="flex items-center gap-4 w-[270px] h-[80px] px-4 border-l border-dark/10 max-md:w-full max-md:h-auto max-md:py-0"
              >
                <div className="flex flex-col gap-2">
                  <span className="font-sans text-sm leading-[1.14] text-dark/50 max-md:text-base">
                    {spec.label}
                  </span>
                  <span className="font-sans font-medium text-lg leading-[1.1] text-dark max-md:text-[22px]">
                    {spec.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
