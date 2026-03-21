import { API_URL } from './config'

interface SeoData {
  metaTitle?: string
  metaDescription?: string
  metaImage?: {
    url?: string
  }
}

export function generateSEO(seo?: SeoData | null, path?: string | null) {
  const title = seo?.metaTitle || 'Karkaso — современные дома под ключ'
  const description =
    seo?.metaDescription ||
    'Строим современные энергоэффективные дома. От проекта до сдачи под ключ.'

  const imageUrl = seo?.metaImage?.url
  const image = imageUrl
    ? imageUrl.startsWith('http')
      ? imageUrl
      : `${API_URL}${imageUrl}`
    : undefined

  const url = path ? `https://karkaso.ru/${path}` : 'https://karkaso.ru'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Karkaso',
      type: 'website',
      ...(image && { images: [{ url: image }] }),
    },
  }
}
