export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const API_CRAWLER_URL = `${API_BASE_URL}/api/crawler`
export const API_DATA_POPULATION_URL = `${API_BASE_URL}/api/population-management`
export const API_DATA_POPULATION_JOB_RUN_POLICY = `${API_DATA_POPULATION_URL}/job-run-policy`

export const API_DATA_EVENT_URL = `${API_BASE_URL}/api/event`

export const API_FILE_IMPORT_URL = `${API_BASE_URL}/api/file-import/open-library`
export const API_AUTHOR_FILE_IMPORT_URL = `${API_FILE_IMPORT_URL}/author`
export const API_BOOK_BASIC_INFO_FILE_IMPORT_URL = `${API_FILE_IMPORT_URL}/book-basic-info`
