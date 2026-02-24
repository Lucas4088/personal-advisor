import { useMutation, useQueryClient } from "@tanstack/react-query";
import {crawlerService} from "luksal/app/services/crawler.service";

export function useDeleteCrawler() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: crawlerService.remove,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["crawlers"] });
        },
    });
}