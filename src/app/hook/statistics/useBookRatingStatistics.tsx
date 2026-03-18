import {useQuery} from "@tanstack/react-query";
import {statisticsService} from "luksal/app/services/statistics.service";

export function useBookRatingStatistics() {
    return useQuery({
        queryKey: ["book-rating-statistics"],
        queryFn: statisticsService.calculateBooksRatingStatistics,
    });
}