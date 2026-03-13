import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookBasicInfoService } from "luksal/app/services/bookBasicInfo.service";

export function useDeleteBookBasicInfo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => bookBasicInfoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookBasicInfos"] });
    },
  });
}
