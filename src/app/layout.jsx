import '@fontsource/onest/400.css'
import '@fontsource/onest/500.css'
import '@fontsource/onest/600.css'
import './globals.css'

export const metadata = {
  title: 'olga.kpstn.ru',
  description: 'Фронтенд-проект для Ольги на Next.js.',
  openGraph: {
    title: 'olga.kpstn.ru',
    description: 'Фронтенд-проект для Ольги на Next.js.',
    type: 'website',
    url: 'https://olga.kpstn.ru',
    siteName: 'olga.kpstn.ru',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
