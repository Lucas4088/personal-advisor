import {http} from "./http";
import {JobPolicy} from "luksal/app/types/jobPolicy";
import {
    BookBasicInfoSchedule,
    CreateBookBasicInfoSchedule,
    SearchCriteriaBookBasicInfoSchedule
} from "luksal/app/types/dataPopulation";
import {PageResponse} from "luksal/app/types/api";

export const dataPopulationService = {

    get(name: string): Promise<JobPolicy> {
        return http<JobPolicy>(`/api/population-management/job-run-policy/${name}`, { method: "GET" });
    },

    update(payload: JobPolicy): Promise<JobPolicy> {
        return http<JobPolicy>(`/api/population-management/job-run-policy`, { method: "PUT", body: payload });
    },

    scheduleBookBasicInfo(request: CreateBookBasicInfoSchedule): Promise<void> {
        return http<void>("/api/population-management/book-basic-info-schedule", { method: "POST", body: request});
    },

    searchScheduleBookBasicInfo(criteria?: SearchCriteriaBookBasicInfoSchedule | null, page?: {page?: number, size?: number}): Promise<PageResponse<BookBasicInfoSchedule>> {
        return http<PageResponse<BookBasicInfoSchedule>>("/api/population-management/book-basic-info-schedule", {method: "GET", body: criteria, params: page})
    }

};