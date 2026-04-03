import {useMutation} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useBookBasicInfoEditionsImport(options?: { onSuccess?: () => void; }) {

    return useMutation({
        mutationFn:  dataPopulationService.importBasicBookInfoEditionsFromFile,
        onSuccess: options?.onSuccess,
        onError (error) {
            console.error("request has failed", error);
        }
    })
}