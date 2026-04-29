import AnimatedTitle from "@/components/atoms/AnimatedTitle";

interface AboutProps {
  title?: string;
  description?: string;
}

export default function About({
  title = "От концепции и проектирования до отделки и ввода в эксплуатацию",
  description = "Собственная строительная бригада, инженерный контроль и проверенные материалы позволяют держать сроки и качество.",
}: AboutProps) {
  return (
    <section
      id="about"
      className="px-[120px] py-[50px] max-md:px-6 max-md:py-10"
    >
      <AnimatedTitle
        label="О компании"
        heading={title}
        subtitle={description}
      />
    </section>
  );
}
