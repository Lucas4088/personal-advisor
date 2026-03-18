import { useQuery } from "@tanstack/react-query";
import { statisticsService } from "luksal/app/services/statistics.service";

export function useBookDetailsFetchedStatistics() {
    return useQuery({
        queryKey: ["statistics", "book-details-fetched"],
        queryFn: () => statisticsService.calculateBookDetailsFetchedStatistics(),
    });
}
