import Button from '@/components/atoms/Button'

export default function Hero() {
  return (
    <section className="flex flex-col">
      <div className="flex justify-between items-end gap-2.5 px-[120px] pt-[50px] pb-[34px] max-md:flex-col max-md:items-start max-md:px-6 max-md:pt-6 max-md:pb-5">
        <h1 className="font-display font-normal text-[96px] leading-[1em] tracking-[-0.03em] text-dark whitespace-pre-line m-0 max-md:text-5xl">
          {'Современные\nдома под ключ'}
        </h1>
        <div className="shrink-0 max-md:w-full max-md:[&_a]:w-full max-md:[&_button]:w-full">
          <Button href="#contact">Подобрать проект</Button>
        </div>
      </div>

      <ul className="flex justify-between items-center gap-2.5 px-[120px] py-[34px] list-none m-0 max-md:flex-col max-md:items-start max-md:gap-3 max-md:px-6 max-md:py-5">
        <li className="font-display font-normal text-xl leading-[1.3] text-dark max-md:text-base">
          Гарантия на конструкцию до 10 лет
        </li>
        <li className="font-display font-normal text-xl leading-[1.3] text-dark max-md:text-base">
          Фиксированная смета без скрытых доплат
        </li>
        <li className="font-display font-normal text-xl leading-[1.3] text-dark max-md:text-base">
          Индивидуальные и типовые проекты
        </li>
      </ul>

      <div className="flex gap-4 overflow-hidden max-md:flex-col max-md:gap-0">
        <div className="shrink-0 w-[570px] h-[380px] overflow-hidden max-md:!w-full max-md:!h-auto">
          <img src="/hero-1-4df8d5.png" alt="Современный дом" className="block w-full h-full object-cover max-md:h-auto" />
        </div>
        <div className="shrink-0 w-[570px] h-[321px] overflow-hidden max-md:!w-full max-md:!h-auto">
          <img src="/hero-2-29c330.png" alt="Интерьер дома" className="block w-full h-full object-cover max-md:h-auto" />
        </div>
        <div className="shrink-0 w-[570px] h-[321px] overflow-hidden max-md:!w-full max-md:!h-auto">
          <img src="/hero-3-6cfe9d.png" alt="Проект дома" className="block w-full h-full object-cover max-md:h-auto" />
        </div>
      </div>
    </section>
  )
}
