import { http } from "./http";
import { PageResponse } from "luksal/app/types/api";
import {BookSearchCriteria, BookDto, BookDetailsDto} from "luksal/app/types/book";
import {API_BOOK_URL} from "luksal/app/lib/api";


export const bookService = {
  search(criteria: BookSearchCriteria, page: number, size: number): Promise<PageResponse<BookDto>> {
    console.log("criteria", criteria)
    return http<PageResponse<BookDto>>(`${API_BOOK_URL}`, {
      method: "POST",
      body: criteria,
      params: {  page, size },
    });
  },

  get(id: string): Promise<BookDetailsDto> {
    return http<BookDetailsDto>(`${API_BOOK_URL}/${id}`);
  },
};
