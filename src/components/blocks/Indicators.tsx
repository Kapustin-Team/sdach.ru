import IndicatorRow from '@/components/molecules/IndicatorRow'

const data = [
  {
    value: '10+',
    label: 'Лет на рынке строительства',
    desc: 'Опыт в современных энергоэффективных домах',
  },
  {
    value: '150+',
    label: 'Домов построено под ключ',
    desc: 'Реализованные проекты разной площади и сложности',
  },
  {
    value: '4–6',
    label: 'Месяцев срок строительства',
    desc: 'От проекта до готового дома без затягивания сроков',
  },
]

export default function Indicators() {
  return (
    <section className="flex flex-col px-[120px] max-md:px-6">
      {data.map((item, i) => (
        <IndicatorRow key={i} {...item} />
      ))}
    </section>
  )
}
