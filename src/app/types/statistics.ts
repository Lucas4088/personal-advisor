export interface BookStatistics {
    authorCount: number,
    bookBasicInfoCount: number,
    bookDocumentCount: number,
    bookRecordCount: number,
    bookSyncPercentage: number
}

export interface CrawlerEventStatistics {
    total: number,
    values: RatingEventValue[]
}

export interface RatingEventValue {
    status?: string,
    crawlerName?: string,
    value: number
}

export interface BookRatingStatistics {
    totalRatings: number,
    values: BookRatingValue[]
}

export interface BookRatingValue {
    numberOfRatings: number,
    value: number,
}

export interface BookDetailsFetchedStatisticsDto {
    values: Record<string, Date | number>[];
}
