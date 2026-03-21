interface TitleProps {
  label?: string
  heading?: string
  subtitle?: string
}

export default function Title({ label, heading, subtitle }: TitleProps) {
  return (
    <div className="flex flex-col gap-[34px] max-md:gap-5">
      {label && (
        <div className="flex items-center gap-2">
          <span className="block w-[5px] h-[5px] rounded-full bg-dark shrink-0" />
          <span className="font-sans font-normal text-base leading-[1.25] tracking-[0.02em] uppercase text-dark">
            {label}
          </span>
        </div>
      )}
      {heading && (
        <h2 className="font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-dark m-0 max-w-[1088px] max-md:text-[36px]">
          {heading}
        </h2>
      )}
      {subtitle && (
        <p className="font-sans font-normal text-xl leading-[1.3] text-dark m-0 max-w-[716px] max-md:text-[17px]">
          {subtitle}
        </p>
      )}
    </div>
  )
}
