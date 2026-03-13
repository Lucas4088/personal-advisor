import { useQuery } from "@tanstack/react-query";
import { authorService } from "luksal/app/services/author.service";
import { AuthorSearchCriteria } from "luksal/app/types/author";

export function useAuthors(criteria: AuthorSearchCriteria, page: number = 0, size: number = 10) {
  return useQuery({
    queryKey: ["authors", criteria, page, size],
    queryFn: () => authorService.search(criteria, page, size),
  });
}
