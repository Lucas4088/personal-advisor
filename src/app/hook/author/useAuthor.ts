import { useQuery } from "@tanstack/react-query";
import { authorService } from "luksal/app/services/author.service";

export function useAuthor(publicId: string | null) {
  return useQuery({
    queryKey: ["author", publicId],
    queryFn: () => authorService.get(publicId!),
    enabled: !!publicId,
  });
}
