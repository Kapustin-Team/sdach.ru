import Title from '@/components/atoms/Title'

export default function About() {
  return (
    <section className="px-[120px] py-[50px] max-md:px-6 max-md:py-10">
      <Title
        label="О компании"
        heading="От концепции и проектирования до отделки и ввода в эксплуатацию"
        subtitle="Собственная строительная бригада, инженерный контроль и проверенные материалы позволяют держать сроки и качество."
      />
    </section>
  )
}
