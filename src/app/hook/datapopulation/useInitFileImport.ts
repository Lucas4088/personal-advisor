import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useInitFileImport(eventName: string): UseQueryResult<string | undefined> {
    return useQuery({
        queryKey: ["initFileImport", eventName],
        queryFn: async () => {
            if (!eventName) {
                throw new Error("Event name is required");
            }
            return dataPopulationService.getInitialFileImportState(eventName);
        },
        enabled: !!eventName,
    })
}