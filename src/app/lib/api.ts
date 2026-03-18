export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const API_CRAWLER_URL = `${API_BASE_URL}/api/crawler`
export const API_DATA_POPULATION_URL = `${API_BASE_URL}/api/population-management`
export const API_DATA_POPULATION_JOB_RUN_POLICY = `${API_DATA_POPULATION_URL}/job-run-policy`

export const API_DATA_EVENT_URL = `${API_BASE_URL}/api/event`

export const API_FILE_IMPORT_URL = `${API_BASE_URL}/api/file-import/open-library`
export const API_AUTHOR_FILE_IMPORT_URL = `${API_FILE_IMPORT_URL}/author`
export const API_BOOK_BASIC_INFO_FILE_IMPORT_URL = `${API_FILE_IMPORT_URL}/book-basic-info`

//CRUD Book basic info, book, author
export const API_BOOK_BASIC_INFO_URL = "/api/book-basic-info";
export const API_BOOK_URL = "/api/book";
export const API_AUTHOR_URL = "/api/author";

//Statistics
export const API_BOOK_STATISTICS_URL = "/api/statistics/book";
export const API_CRAWLER_EVENT_STATISTICS_URL = "/api/statistics/crawler-event";
export const API_BOOK_RATTING_STATISTICS_URL = "/api/statistics/book-rating";
export const API_BOOK_DETAILS_FETCHED_STATISTICS_URL = "/api/statistics/book-details-fetched";