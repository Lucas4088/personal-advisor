
export interface PageResponse<T> {
    content: T[];
    size: number;
    totalElements: number;
    totalPages: number;
}