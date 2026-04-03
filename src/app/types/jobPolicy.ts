export interface JobPolicy {
    name:  "POPULATE_BOOK_BASIC_INFO" | "POPULATE_BOOK_DETAILS" | "CRAWL_BOOKS" | "CRAWL_BOOKS_ON_DEMAND";
    enabled: boolean;
}
