import {useQuery} from "@tanstack/react-query";
import {statisticsService} from "luksal/app/services/statistics.service";

export function useBookStatistics() {
    return useQuery({
        queryKey: ["book-statistics"],
        queryFn: statisticsService.calculateBookStatistics,
    });
}