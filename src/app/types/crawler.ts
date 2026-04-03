
export interface CrawlerSetting {
    id?: number;
    name: string;
    baseUrl: string;
    rateLimit: RateLimit;
    path: Path;
    enabled: boolean
    proxyEnabled: boolean;
    proxyName: string;
    proxySessionEnabled: boolean,
    forwardingProxyEnabled: boolean
}

export interface RateLimit {
    requestsPerMinute: number;
    burst: number;
}

export interface Path {
    bookResultSelector: string;
    bookRatingCountSelector: string;
    bookRatingScoreSelector: string;
    bookTitleSelector: string;
    bookAuthorsSelector: string;
    search: string;
    searchPageLoadedSelector: string
    isRatingAvailableOnSearch: boolean,
    bookFirstElementSearchSelector: string,
    bookRatingCountSearchSelector: string,
    bookRatingScoreSearchSelector: string,
    bookAuthorsSearchSelector: string,
    bookTitleSearchSelector: string,
    includeAuthorsForSearch: boolean;
    titleSpaceSeparator: string;
}