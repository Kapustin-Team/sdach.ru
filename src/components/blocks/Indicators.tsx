import IndicatorRow from "@/components/molecules/IndicatorRow";
import AnimatedSection from "@/components/atoms/AnimatedSection";

interface StatItem {
  value: string;
  label: string;
  desc?: string;
}

interface IndicatorsProps {
  items?: StatItem[];
}

const defaultItems: StatItem[] = [
  {
    value: "10+",
    label: "Лет на рынке строительства",
    desc: "Опыт в современных энергоэффективных домах",
  },
  {
    value: "150+",
    label: "Домов построено под ключ",
    desc: "Реализованные проекты разной площади и сложности",
  },
  {
    value: "4–6",
    label: "Месяцев срок строительства",
    desc: "От проекта до готового дома без затягивания сроков",
  },
];

const aboutParagraphs = [
  "Мы специализируемся на строительстве частных домов под ключ из дерева и газобетона. Основные проекты реализуем в Центральном федеральном округе.",
  "Строим надёжные, комфортные и красивые дома в срок и за понятную стоимость. На все построенные дома предоставляем официальную гарантию до 10 лет, прописанную в договоре.",
  "Наш главный приоритет — довольный клиент. Поэтому в работе мы опираемся на опыт команды, инженерный контроль, современное оборудование и внимательное отношение к каждому проекту.",
];

export default function Indicators({ items }: IndicatorsProps) {
  const data =
    items && items.length > 0
      ? items.map((item, i) => ({
          ...item,
          desc: item.desc || defaultItems[i]?.desc,
        }))
      : defaultItems;

  return (
    <section className="flex flex-col px-[120px] max-md:px-6">
      {data.map((item, i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <IndicatorRow
            value={item.value}
            label={item.label}
            desc={item.desc}
          />
        </AnimatedSection>
      ))}

      <div className="mt-8 flex max-w-[900px] flex-col gap-4 font-sans text-xl font-normal leading-[1.35] text-dark max-md:mt-6 max-md:text-[17px]">
        {aboutParagraphs.map((paragraph) => (
          <p key={paragraph} className="m-0">
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
