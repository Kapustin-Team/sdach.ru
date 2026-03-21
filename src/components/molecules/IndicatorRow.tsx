interface IndicatorRowProps {
  value: string
  label: string
  desc?: string
}

export default function IndicatorRow({ value, label, desc }: IndicatorRowProps) {
  return (
    <div className="flex items-stretch gap-[72px] h-[140px] max-md:flex-col max-md:gap-4 max-md:h-auto max-md:py-6">
      <div className="flex items-center w-[220px] shrink-0 font-sans font-normal text-[84px] leading-[1] tracking-[-0.02em] text-dark max-md:w-auto max-md:text-[84px]">
        {value}
      </div>
      <div className="flex items-stretch flex-1 min-w-0 max-md:flex-col max-md:gap-2">
        <div className="flex items-center w-[412px] shrink-0 font-sans font-normal text-xl leading-[1.3] text-dark max-md:w-auto max-md:text-[17px]">
          <span className="max-w-[200px]">{label}</span>
        </div>
        {desc && (
          <div className="flex items-center flex-1 font-sans font-normal text-xl leading-[1.3] text-dark opacity-50 max-md:text-base">
            <span className="max-w-[318px]">{desc}</span>
          </div>
        )}
      </div>
    </div>
  )
}
