import { http } from "./http";
import { PageResponse } from "luksal/app/types/api";
import { BookBasicInfoDto, BookBasicInfoDetailsDto, BookBasicInfoSearchCriteria } from "luksal/app/types/bookBasicInfo";
import {API_BOOK_BASIC_INFO_URL} from "luksal/app/lib/api";


export const bookBasicInfoService = {
  search(criteria: BookBasicInfoSearchCriteria, page: number, size: number): Promise<PageResponse<BookBasicInfoDto>> {
    return http<PageResponse<BookBasicInfoDto>>(`${API_BOOK_BASIC_INFO_URL}`, {
      method: "POST",
      body: criteria,
      params: { page, size },
    });
  },

  get(bookId: string): Promise<BookBasicInfoDetailsDto> {
    return http<BookBasicInfoDetailsDto>(`${API_BOOK_BASIC_INFO_URL}/${bookId}`);
  },

  delete(id: string): Promise<void> {
    return http<void>(`${API_BOOK_BASIC_INFO_URL}/${id}`, { method: "DELETE" });
  },
};
