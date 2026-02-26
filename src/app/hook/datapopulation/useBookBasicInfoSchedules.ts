import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";
import {BookBasicInfoSchedule, SearchCriteriaBookBasicInfoSchedule} from "luksal/app/types/dataPopulation";
import {PageResponse} from "luksal/app/types/api";

export function useBookBasicInfoSchedules(criteria?: SearchCriteriaBookBasicInfoSchedule | null, page: number, size: number): UseQueryResult<PageResponse<BookBasicInfoSchedule>> {
    return useQuery({
        queryKey: ["bookBasicInfoSchedules", criteria, page, size],
        queryFn: async () => {
            if (!criteria) {
                throw new Error("criteria is required");
            }
            return dataPopulationService.searchScheduleBookBasicInfo(criteria, { page, size });
        },
        enabled: !!criteria,
    })
}