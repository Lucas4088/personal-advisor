import {http} from "luksal/app/services/http";
import {API_BOOK_STATISTICS_URL} from "luksal/app/lib/api";
import {BookStatistics} from "luksal/app/types/statistics";

export const statisticsService = {
    calculateBookStatistics(): Promise<BookStatistics> {
        return http<BookStatistics>(API_BOOK_STATISTICS_URL, { method: "GET" });
    },

};