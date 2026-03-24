import type { MetadataRoute } from 'next'
import { getContent } from '@/utils/requests'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: 'https://karkaso.ru',
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  try {
    const data = await getContent('projects', {
      params: 'fields=slug&sort=createdAt:desc',
    })
    if (Array.isArray(data)) {
      for (const p of data) {
        entries.push({
          url: `https://karkaso.ru/projects/${p.slug}`,
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      }
    }
  } catch {
    // Strapi unavailable
  }

  return entries
}
