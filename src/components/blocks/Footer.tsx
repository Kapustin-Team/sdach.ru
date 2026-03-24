export default function Footer() {
  return (
    <footer className="flex flex-col mt-auto px-[120px] pb-0 max-md:px-6 max-md:pb-0">
      <div className="flex flex-col gap-[26px] pt-[40px] max-md:gap-0">
        {/* Label */}
        <div className="flex items-center gap-2">
          <span className="block w-[5px] h-[5px] rounded-full bg-dark shrink-0" />
          <span className="font-sans font-normal text-base leading-[1.25] tracking-[0.02em] uppercase text-dark max-md:text-[12px]">
            Контакты
          </span>
        </div>

        {/* Contacts row */}
        <div className="flex justify-between items-end gap-[34px] max-md:flex-col max-md:items-start max-md:gap-6 max-md:pt-[24px] max-md:pb-[42px]">
          <div className="flex flex-col gap-6 w-full">
            <a
              href="mailto:office@karkaso.ru"
              className="w-fit font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-dark hover:opacity-70 transition-opacity max-md:text-3xl"
            >
              office@karkaso.ru
            </a>
            <div className="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-6">
              <a
                href="tel:+74950230673"
                className="font-sans font-normal text-[64px] leading-[1em] tracking-[-0.02em] text-dark hover:opacity-70 transition-opacity max-md:text-3xl"
              >
                +7 495 023 06 73
              </a>
              <div className="flex items-center gap-[20px]">
                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <img src="/icons/link-tg.svg" alt="Telegram" width={54} height={54} />
                </a>
                <a href="https://max.ru/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                  <img src="/icons/link-max.svg" alt="Max" width={54} height={54} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-[34px] max-md:flex-col max-md:items-start max-md:gap-3">
          <a href="#projects" className="font-sans font-normal text-lg leading-[1.1] text-dark hover:opacity-70 transition-opacity max-md:text-[12px]">
            Проекты домов
          </a>
          <a href="#about" className="font-sans font-normal text-lg leading-[1.1] text-dark hover:opacity-70 transition-opacity max-md:text-[12px]">
            О компании
          </a>
          <a href="#" className="font-sans font-normal text-lg leading-[1.1] text-dark hover:opacity-70 transition-opacity max-md:text-[12px]">
            Ипотека
          </a>
        </div>
      </div>

      {/* Logo pinned to bottom */}
      <div className="w-full mt-[70px] max-md:mt-[30px]">
        <img src="/icons/karkaso.svg" alt="karkaso" className="w-full h-auto" />
      </div>
    </footer>
  )
}
