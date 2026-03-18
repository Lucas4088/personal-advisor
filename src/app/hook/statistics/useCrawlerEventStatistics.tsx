import {useQuery} from "@tanstack/react-query";
import {statisticsService} from "luksal/app/services/statistics.service";

export function useCrawlerEventStatistics() {
    return useQuery({
        queryKey: ["crawler-event-statistics"],
        queryFn: statisticsService.calculateCrawlerEventStatistics,
    });
}