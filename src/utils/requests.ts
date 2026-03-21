import { API_URL, API_PREFIX, API_KEY, revalidateTime } from './config'

interface RequestSettings {
  params?: string
  revalidateParams?: NextFetchRequestConfig
}

export async function getContent(path: string, settings?: RequestSettings) {
  const { revalidateParams, params } = settings || {
    revalidateParams: undefined,
    params: '',
  }

  try {
    const request = await fetch(
      `${API_URL}/${API_PREFIX}/${path}?${params}`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
        next: revalidateParams || { revalidate: revalidateTime },
      }
    )

    if (!request.ok) return null
    const res = await request.json()
    return res.data !== undefined ? res.data : res
  } catch {
    return null
  }
}

export async function getContentGraph(query: string) {
  try {
    const request = await fetch(`${API_URL}/graphql`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })

    const data = await request.json()
    return data.data
  } catch {
    return null
  }
}
