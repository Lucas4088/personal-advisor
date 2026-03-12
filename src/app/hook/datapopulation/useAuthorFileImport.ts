import {useMutation} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useAuthorFileImport(options?: { onSuccess?: () => void; }) {

    return useMutation({
        mutationFn:  () => {
            return dataPopulationService.importAuthorsFromFile();
        },
        onSuccess: options?.onSuccess,
        onError (error) {
            console.error("request has failed", error);
        }
    })
}