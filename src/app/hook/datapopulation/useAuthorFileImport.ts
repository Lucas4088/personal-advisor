import {useMutation, useQueryClient} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";

export function useAuthorFileImport() {

    return useMutation({
        mutationFn:  dataPopulationService.importAuthorsFromFile,
        onSuccess: () => {},
        onError (error) {
            console.error("request has failed", error);
        }
    })
}