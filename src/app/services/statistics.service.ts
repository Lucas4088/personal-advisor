import {http} from "luksal/app/services/http";
import {
    API_BOOK_DETAILS_FETCHED_STATISTICS_URL,
    API_BOOK_RATTING_STATISTICS_URL,
    API_BOOK_STATISTICS_URL,
    API_CRAWLER_EVENT_STATISTICS_URL
} from "luksal/app/lib/api";
import {
    BookDetailsFetchedStatisticsDto,
    BookRatingStatistics,
    BookStatistics,
    CrawlerEventStatistics
} from "luksal/app/types/statistics";

export const statisticsService = {
    calculateBookStatistics(): Promise<BookStatistics> {
        return http<BookStatistics>(API_BOOK_STATISTICS_URL, {method: "GET"});
    },

    calculateCrawlerEventStatistics(): Promise<CrawlerEventStatistics> {
        return http<CrawlerEventStatistics>(API_CRAWLER_EVENT_STATISTICS_URL, {method: "GET"});
    },

    calculateBooksRatingStatistics(): Promise<BookRatingStatistics> {
        return http<BookRatingStatistics>(API_BOOK_RATTING_STATISTICS_URL, {method: "GET"})
    },

    calculateBookDetailsFetchedStatistics(): Promise<BookDetailsFetchedStatisticsDto> {
        return http<BookDetailsFetchedStatisticsDto>(API_BOOK_DETAILS_FETCHED_STATISTICS_URL, {method: "GET"})
    }
};