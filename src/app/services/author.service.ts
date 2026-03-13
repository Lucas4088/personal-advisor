import { http } from "./http";
import {PageResponse} from "luksal/app/types/api";
import { AuthorDetailsDto, AuthorDto, AuthorSearchCriteria } from "luksal/app/types/author";
import {API_AUTHOR_URL} from "luksal/app/lib/api";

export const authorService = {
  search(criteria: AuthorSearchCriteria, page: number, size: number): Promise<PageResponse<AuthorDto>> {
    return http<PageResponse<AuthorDto>>(`${API_AUTHOR_URL}`, {
      method: "POST",
      body: criteria,
      params: { page, size },
    });
  },

  get(publicId: string): Promise<AuthorDetailsDto> {
    return http<AuthorDetailsDto>(`${API_AUTHOR_URL}/${publicId}`);
  },

  delete(id?: string): Promise<void> {
    return http<void>(`${API_AUTHOR_URL}/${id}`, { method: "DELETE" });
  },
};
