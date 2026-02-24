import { useMutation, useQueryClient } from "@tanstack/react-query";
import {crawlerService} from "luksal/app/services/crawler.service";

export function useCreateCrawler() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: crawlerService.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["crawlers"] });
        },
    });
}