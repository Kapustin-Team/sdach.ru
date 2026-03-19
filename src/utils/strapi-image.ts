import { API_URL } from './config'

export function strapiImage(url?: string): string {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return `${API_URL}${url}`
}
