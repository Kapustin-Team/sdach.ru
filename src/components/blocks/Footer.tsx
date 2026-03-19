export default function Footer() {
  return (
    <footer className="flex flex-col px-[120px] pb-[50px] max-md:px-6 max-md:pb-8">
      <div className="flex flex-col gap-[26px]">
        {/* Label */}
        <div className="flex items-center gap-2">
          <span className="block w-[5px] h-[5px] rounded-full bg-dark shrink-0" />
          <span className="font-label font-normal text-base leading-[1.25] tracking-[0.02em] uppercase text-dark">
            Контакты
          </span>
        </div>

        {/* Contacts row */}
        <div className="flex justify-between items-end gap-[34px] max-md:flex-col max-md:items-start max-md:gap-6">
          <div className="flex flex-col gap-6">
            <a
              href="mailto:office@karkaso.ru"
              className="font-display font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-dark hover:opacity-70 transition-opacity max-md:text-3xl"
            >
              office@karkaso.ru
            </a>
            <a
              href="tel:+74950230673"
              className="font-display font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-dark hover:opacity-70 transition-opacity max-md:text-3xl"
            >
              +7 495 023 06 73
            </a>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-[34px] max-md:flex-col max-md:items-start max-md:gap-3">
          <a href="#projects" className="font-display font-normal text-lg leading-[1.1] text-dark hover:opacity-70 transition-opacity">
            Проекты домов
          </a>
          <a href="#about" className="font-display font-normal text-lg leading-[1.1] text-dark hover:opacity-70 transition-opacity">
            О компании
          </a>
          <a href="#" className="font-display font-normal text-lg leading-[1.1] text-dark hover:opacity-70 transition-opacity">
            Ипотека
          </a>
        </div>
      </div>

      {/* Big logo */}
      <div className="w-full overflow-hidden mt-8">
        <span className="block text-center font-[Inter] font-normal text-[264px] leading-[1.02] uppercase bg-gradient-to-b from-[rgba(225,213,213,1)] to-[rgba(195,183,183,0.1)] bg-clip-text text-transparent select-none max-md:text-[80px]">
          karkaso
        </span>
      </div>
    </footer>
  )
}
