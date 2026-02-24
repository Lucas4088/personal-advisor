import {useQuery} from "@tanstack/react-query";
import {crawlerService} from "luksal/app/services/crawler.service";

export function useCrawlers() {
    return useQuery({
        queryKey: ["crawlers"],
        queryFn: crawlerService.list
    });
}