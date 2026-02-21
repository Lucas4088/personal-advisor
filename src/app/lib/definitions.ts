export type CrawlerConfig = {
    name: string;
    description: string;
    enabled: boolean;
    baseUrl: string;
    rateLimit: CrawlerRateLimit;
    path: CrawlerPath;
}

export type CrawlerRateLimit = {
    requestsPerMinute: number;
    burst: number;
}

export type CrawlerPath = {
    bookResultSelector: string;
    bookRatingCountSelector: string;
    bookRatingScoreSelector: string;
    search: string;
    titleSpaceSeparator: string;
}