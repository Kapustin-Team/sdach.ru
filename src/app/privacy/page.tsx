export const metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика конфиденциальности компании Karkaso.',
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg px-[120px] py-[80px] text-dark-full max-md:px-6 max-md:py-10">
      <div className="mx-auto max-w-[920px]">
        <div className="mb-10 flex items-center gap-2">
          <span className="block h-[5px] w-[5px] shrink-0 rounded-full bg-dark" />
          <span className="font-sans text-base uppercase tracking-[0.02em] text-dark max-md:text-[12px]">
            Документы
          </span>
        </div>

        <h1 className="font-sans text-[56px] leading-[0.98] tracking-[-0.03em] text-dark-full max-md:text-[34px]">
          Политика конфиденциальности
        </h1>

        <div className="mt-10 space-y-6 font-sans text-[18px] leading-[1.6] text-dark/85 max-md:mt-6 max-md:text-[16px]">
          <p>
            Настоящая политика конфиденциальности определяет порядок обработки, хранения и защиты информации, которую сайт Karkaso может получать от пользователей при использовании сайта.
          </p>
          <p>
            Компания собирает только те данные, которые пользователь предоставляет добровольно через формы обратной связи, заявки на консультацию и иные способы взаимодействия с сайтом.
          </p>
          <p>
            Полученная информация используется исключительно для связи с пользователем, подготовки предложений, оказания услуг и улучшения работы сайта.
          </p>
          <p>
            Компания не передаёт персональные данные третьим лицам, за исключением случаев, предусмотренных законодательством Российской Федерации или необходимых для исполнения обязательств перед пользователем.
          </p>
          <p>
            Сайт может использовать cookies и технические данные для корректной работы, аналитики и повышения удобства использования.
          </p>
          <p>
            Пользователь, продолжая использовать сайт, подтверждает согласие с настоящей политикой конфиденциальности.
          </p>
        </div>
      </div>
    </main>
  )
}
