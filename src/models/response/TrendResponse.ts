export interface IResponseTrends {
  meta: IMetaTrend
  data: ITrendCard[]
}

export interface IMetaTrend {
  found: number
  returned: number
  limit: number
  page: number
}

export interface ITrendCard {
  uuid: string
  title: string
  description: string
  keywords: string
  snippet: string
  url: string
  image_url: string
  language: string
  published_at: string
  source: string
  relevance_score: any
}
