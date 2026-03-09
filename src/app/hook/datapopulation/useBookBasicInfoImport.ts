import {useMutation} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useBookBasicInfoImport() {

    return useMutation({
        mutationFn:  dataPopulationService.importBasicBookInfoFromFile,
        onSuccess: () => {},
        onError (error) {
            console.error("request has failed", error);
        }
    })
}