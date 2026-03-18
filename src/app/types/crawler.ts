
export interface CrawlerSetting {
    id?: number
    name: string
    baseUrl: string
    rateLimit: RateLimit
    path: Path
    enabled: boolean
    proxyEnabled: boolean
    proxyName: string
}

export interface RateLimit {
    requestsPerMinute: number
    burst: number
}

export interface Path {
    bookResultSelector: string
    bookRatingCountSelector: string
    bookRatingScoreSelector: string
    search: string
    titleSpaceSeparator: string
}