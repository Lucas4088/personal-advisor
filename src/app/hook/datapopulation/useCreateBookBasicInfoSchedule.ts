import {useMutation, useQueryClient} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useCreateBookBasicInfoSchedule() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn:  dataPopulationService.scheduleBookBasicInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["bookBasicInfoSchedules"]})
        },
        onError (error) {
                console.error("Failed to schedule book basic info population", error);
        }
    })
}