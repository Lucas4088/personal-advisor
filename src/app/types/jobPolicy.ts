export interface JobPolicy {
    name:  "POPULATE_BOOK_BASIC_INFO" | "POPULATE_BOOK_DETAILS" | "CRAWL_BOOKS";
    enabled: boolean;
}
