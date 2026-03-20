import Button from '@/components/atoms/Button'
import { strapiImage } from '@/utils/strapi-image'

interface Spec {
  label: string
  value: string
}

interface ProjectViewProps {
  title: string
  price: string
  tags: string[]
  description?: string
  image: string
  gallery?: { data: { attributes: { url: string } }[] }
  specs?: Spec[]
}

export default function ProjectView({
  title,
  price,
  tags,
  description,
  image,
  gallery,
  specs,
}: ProjectViewProps) {
  const images = gallery?.data?.map((img) => strapiImage(img.attributes.url)) || []

  return (
    <section className="pt-28 pb-10">
      {/* Hero image */}
      <div className="w-full h-[500px] overflow-hidden max-md:h-[280px]">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-[120px] pt-10 max-md:px-6">
        {/* Title + Price */}
        <div className="flex justify-between items-end gap-10 mb-8 max-md:flex-col max-md:items-start max-md:gap-4">
          <h1 className="font-sans font-normal text-[96px] leading-[1em] tracking-[-0.03em] text-dark max-md:text-5xl">
            {title}
          </h1>
          <span className="font-sans font-medium text-3xl text-dark shrink-0 max-md:text-xl">
            {price}
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-3 mb-10">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="font-sans font-medium text-sm leading-[1.14] uppercase px-3 pt-2 pb-1.5 bg-dark/10 text-dark"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        {description && (
          <p className="font-sans font-normal text-xl leading-[1.3] text-dark max-w-[716px] mb-10 max-md:text-base">
            {description}
          </p>
        )}

        {/* Specs table */}
        {specs && specs.length > 0 && (
          <div className="flex flex-col mb-10">
            {specs.map((spec, i) => (
              <div
                key={i}
                className="flex justify-between py-4 border-b border-black/10 last:border-b-0 max-md:flex-col max-md:gap-1"
              >
                <span className="font-sans text-lg text-dark/50">{spec.label}</span>
                <span className="font-sans text-lg text-dark">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Gallery */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-4 mb-10 max-md:grid-cols-1">
            {images.map((src, i) => (
              <div key={i} className="overflow-hidden">
                <img src={src} alt={`${title} — фото ${i + 1}`} className="w-full h-auto object-cover" />
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4 max-md:flex-col">
          <Button href="#contact">Оставить заявку</Button>
          <Button href="/projects" variant="secondary">Все проекты</Button>
        </div>
      </div>
    </section>
  )
}
