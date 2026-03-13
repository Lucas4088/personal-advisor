import { useQuery } from "@tanstack/react-query";
import { bookService } from "luksal/app/services/book.service";
import {BookSearchCriteria} from "luksal/app/types/book";

export function useBooks(criteria: BookSearchCriteria, page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ["books", criteria, page, size],
    queryFn: () => bookService.search(criteria, page, size),
  });
}
