import { useQuery } from "@tanstack/react-query";
import { bookService } from "luksal/app/services/book.service";

export function useBook(id: string | null) {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => bookService.get(id!),
    enabled: !!id,
  });
}
