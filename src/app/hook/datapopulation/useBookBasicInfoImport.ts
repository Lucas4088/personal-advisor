import {useMutation} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useBookBasicInfoImport(options?: { onSuccess?: () => void; }) {

    return useMutation({
        mutationFn:  dataPopulationService.importBasicBookInfoFromFile,
        onSuccess: options?.onSuccess,
        onError (error) {
            console.error("request has failed", error);
        }
    })
}