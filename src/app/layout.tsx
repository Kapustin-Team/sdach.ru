import '@fontsource/onest/300.css'
import '@fontsource/onest/400.css'
import '@fontsource/onest/500.css'
import '@fontsource/onest/600.css'
import './globals.css'
import CookieBanner from '@/components/blocks/CookieBanner'

export const metadata = {
  title: {
    default: 'Karkaso — современные дома под ключ',
    template: '%s | Karkaso',
  },
  description: 'Строим современные энергоэффективные дома. От проекта до сдачи под ключ. Фиксированная смета, гарантия на конструкцию до 10 лет.',
  metadataBase: new URL('https://karkaso.ru'),
  openGraph: {
    title: 'Karkaso — современные дома под ключ',
    description: 'Строим современные энергоэффективные дома. От проекта до сдачи под ключ.',
    type: 'website',
    url: 'https://karkaso.ru',
    siteName: 'Karkaso',
    locale: 'ru_RU',
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: 'https://karkaso.ru',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Karkaso',
              url: 'https://karkaso.ru',
              telephone: '+74950230673',
              email: 'office@karkaso.ru',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'RU',
              },
            }),
          }}
        />
      </head>
      <body>
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
