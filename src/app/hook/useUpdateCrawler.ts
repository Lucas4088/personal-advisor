import { useMutation, useQueryClient } from "@tanstack/react-query";
import {crawlerService} from "luksal/app/services/crawler.service";

export function useUpdateCrawler() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: any }) =>
            crawlerService.update(id, payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["crawlers"] });
            queryClient.invalidateQueries({ queryKey: ["crawler", variables.id] });
        },
    });
}