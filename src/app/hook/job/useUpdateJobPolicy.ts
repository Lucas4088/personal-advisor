import {useMutation, useQueryClient} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";
import {JobPolicy} from "luksal/app/types/jobPolicy";

export function useUpdateJobPolicy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
    }: {
      payload: JobPolicy;
    }) => dataPopulationService.update(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({queryKey: ["jobPolicy", variables.payload.name]}).then(() =>{});
    },
  });
}