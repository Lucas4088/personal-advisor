import {useQuery, UseQueryResult} from "@tanstack/react-query";
import {dataPopulationService} from "luksal/app/services/dataPopulationService";
import {BookBasicInfoSchedule, SearchCriteriaBookBasicInfoSchedule} from "luksal/app/types/dataPopulation";
import {PageResponse} from "luksal/app/types/api";

export function useBookBasicInfoSchedules(criteria?: SearchCriteriaBookBasicInfoSchedule | null, page?: number, size?: number): UseQueryResult<PageResponse<BookBasicInfoSchedule>> {
    return useQuery({
        queryKey: ["bookBasicInfoSchedules"],
        queryFn: () => dataPopulationService.searchScheduleBookBasicInfo(criteria, {page, size}),
        enabled: criteria !== null,
    })


}