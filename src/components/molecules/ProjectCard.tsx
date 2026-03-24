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
    <div className="flex items-stretch gap-10 px-[120px] pt-5 max-md:flex-col max-md:px-6 max-md:gap-6">
      <a href={`/projects/${slug}`} className="w-[570px] h-[340px] shrink-0 overflow-hidden max-md:w-full max-md:h-[340px] cursor-pointer block">
        <img
          src={image}
          alt={title}
          className="block w-full h-full object-cover"
        />
      </a>

      <div className="flex flex-col justify-between gap-[22px] py-5 flex-1 min-w-0 max-md:py-0">
        <div className="flex flex-col gap-5">
          <a href={`/projects/${slug}`} className="no-underline cursor-pointer">
            <h3 className="font-sans font-normal text-4xl leading-[1.1] text-dark">
              {title}
            </h3>
          </a>
          <a href={`/projects/${slug}`} className="no-underline cursor-pointer">
            <div className="flex flex-wrap gap-3">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="font-sans font-medium text-sm leading-[1.14] uppercase px-3 pt-2 pb-1.5 bg-dark/10 text-dark"
                >
                  {tag}
                </span>
              ))}
            </div>
          </a>
          <div className="font-sans font-medium text-xl leading-[1] text-dark">
            {price}
          </div>
        </div>

        <div className="flex gap-[20px] max-md:flex-col max-md:w-full max-md:[&_a]:w-full max-md:[&_button]:w-full">
          <Button href={`/projects/${slug}`}>Посмотреть проект</Button>
          <Button href="#contact" variant="secondary">Оставить заявку</Button>
        </div>
      </div>
    </div>
  )
}
