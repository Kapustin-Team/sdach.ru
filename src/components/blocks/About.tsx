import AnimatedTitle from "@/components/atoms/AnimatedTitle";

interface AboutProps {
  title?: string;
  description?: string;
}

const aboutParagraphs = [
  "Мы специализируемся на строительстве частных домов под ключ из дерева и газобетона. Основные проекты реализуем в Центральном федеральном округе.",
  "Строим надёжные, комфортные и красивые дома в срок и за понятную стоимость. На все построенные дома предоставляем официальную гарантию до 10 лет, прописанную в договоре.",
  "Наш главный приоритет — довольный клиент. Поэтому в работе мы опираемся на опыт команды, инженерный контроль, современное оборудование и внимательное отношение к каждому проекту.",
];

export default function About({
  title = "От концепции и проектирования до отделки и ввода в эксплуатацию",
  description = "Собственная строительная бригада, инженерный контроль и проверенные материалы позволяют держать сроки и качество.",
}: AboutProps) {
  return (
    <section
      id="about"
      className="px-[120px] py-[50px] max-md:px-6 max-md:py-10"
    >
      <div className="flex flex-col gap-10 max-md:gap-8">
        <AnimatedTitle
          label="О компании"
          heading={title}
          subtitle={description}
        />

        <div className="border border-dark/10 bg-[#F8F4EC] px-8 py-7 shadow-[0_18px_50px_rgba(55,43,43,0.05)] max-md:px-5 max-md:py-5">
          <div className="mb-6 flex items-center gap-2 max-md:mb-5">
            <span className="block h-[5px] w-[5px] shrink-0 rounded-full bg-dark" />
            <h3 className="m-0 font-sans text-base font-normal uppercase leading-[1.25] tracking-[0.02em] text-dark">
              О нас коротко
            </h3>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_320px] gap-10 max-lg:grid-cols-1 max-md:gap-6">
            <div className="flex max-w-[820px] flex-col gap-4">
              {aboutParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="m-0 font-sans text-xl font-normal leading-[1.35] text-dark max-md:text-[17px]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="grid content-start gap-3 font-sans text-base leading-[1.25] text-dark/75 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:text-[15px]">
              <div className="border border-dark/10 px-4 py-3">
                Дома из дерева и газобетона
              </div>
              <div className="border border-dark/10 px-4 py-3">
                Строительство под ключ
              </div>
              <div className="border border-dark/10 px-4 py-3">
                Работаем в ЦФО
              </div>
              <div className="border border-dark/10 px-4 py-3">
                Гарантия до 10 лет
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
