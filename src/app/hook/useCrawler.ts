import { useQuery } from "@tanstack/react-query";
import {crawlerService} from "luksal/app/services/crawler.service";

export function useCrawler(id: number) {
    return useQuery({
        queryKey: ["crawler", id],
        queryFn: () => crawlerService.get(id),
        enabled: !!id,
    });
}