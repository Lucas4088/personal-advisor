import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authorService } from "luksal/app/services/author.service";

export function useDeleteAuthor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string | undefined) => authorService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authors"] });
    },
  });
}
