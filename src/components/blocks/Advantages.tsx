const items = [
  {
    icon: '/icons/control.svg',
    title: 'Комплексное решение «под ключ»',
    desc: 'Берём на себя все этапы — от проекта до сдачи дома.',
  },
  {
    icon: '/icons/solution.svg',
    title: 'Фиксированная цена',
    desc: 'Смета формируется заранее и не меняется в процессе строительства.',
  },
  {
    icon: '/icons/price.svg',
    title: 'Контроль и отчётность',
    desc: 'Контролируем качество и сроки на каждом этапе.',
  },
]

export default function Advantages() {
  return (
    <section className="bg-[#372B2B] px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <h2 className="font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-white mb-[50px] max-md:text-[28px] max-md:mb-8">
        Строим дома для счастливой жизни
      </h2>
      <div className="flex gap-[34px] max-md:flex-col">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex-1 flex gap-6 items-stretch h-[260px] border-l border-dashed border-white/20 max-md:h-auto max-md:border-l-0 max-md:border-t-0 max-md:pt-6"
          >
            <div className="flex flex-col flex-1 pl-6 max-md:pl-0 max-md:gap-6">
              <img src={item.icon} alt="" aria-hidden="true" className="w-auto h-[37px] self-start mb-auto" />
              <h3 className="font-sans font-normal text-4xl leading-[1.1] text-white max-md:text-2xl">
                {item.title}
              </h3>
              <p className="font-sans font-normal text-lg leading-[1.1] text-white/80 mt-auto max-md:mt-4">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
