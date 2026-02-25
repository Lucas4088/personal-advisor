import {useMutation, useQueryClient} from "@tanstack/react-query";
import {jobPolicyService} from "luksal/app/services/jobPolicy.service";
import {JobPolicy} from "luksal/app/types/jobPolicy.ts";

export function useUpdateJobPolicy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
    }: {
      payload: Record<string, JobPolicy>;
    }) => jobPolicyService.update(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["jobPolicy", variables.payload.name] });
    },
  });
}