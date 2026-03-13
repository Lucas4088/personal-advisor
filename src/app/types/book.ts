export type BookSearchCriteria = {
    bookId?: string
    title?: string
    genres?: Genre[]
    yearFrom?: number
    yearTo?: number
}

export type BookDto = {
    id?: string
    bookId?: string
    title?: string
    publishedYear: number
}

export type BookDetailsDto = {
    bookId?: string
    title: string
    publishedYear: number
    description?: string
    publishingYear: number
    pageCount?: number
    thumbnailUrl?: string
    smallThumbnailUrl?: string
}

export type Genre = {
    name: string
}

export type PublishedYearRange = {
    from: number
    to: number
}