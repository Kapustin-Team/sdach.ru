import Button from '@/components/atoms/Button'

export interface ProjectCardProps {
  title: string
  tags: string[]
  price: string
  image: string
  slug: string
}

export default function ProjectCard({ title, tags, price, image, slug }: ProjectCardProps) {
  return (
    <div className="flex items-center gap-10 px-[120px] pt-5 max-md:flex-col max-md:px-6 max-md:gap-6">
      <div className="w-[570px] h-[340px] shrink-0 overflow-hidden max-md:w-full max-md:h-auto">
        <img
          src={image}
          alt={title}
          className="block w-full h-full object-cover"
        />
      </div>

      <div className="flex flex-col justify-between gap-[34px] py-5 flex-1 min-w-0 max-md:gap-6 max-md:py-0">
        <div className="flex flex-col gap-5">
          <h3 className="font-display font-normal text-4xl leading-[1.1] text-dark">
            {title}
          </h3>
          <div className="flex flex-wrap gap-3">
            {tags.map((tag, i) => (
              <span
                key={i}
                className="font-display font-medium text-sm leading-[1.14] uppercase px-3 pt-2 pb-1.5 bg-dark/10 text-dark"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="font-display font-medium text-xl leading-[1] text-dark">
            {price}
          </div>
        </div>

        <div className="flex gap-4 max-md:flex-col max-md:w-full">
          <Button href={`/projects/${slug}`}>Посмотреть проект</Button>
          <Button href="#contact" variant="secondary">Оставить заявку</Button>
        </div>
      </div>
    </div>
  )
}
