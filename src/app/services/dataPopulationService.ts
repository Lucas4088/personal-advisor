import {http} from "./http";
import {JobPolicy} from "luksal/app/types/jobPolicy";
import {
    BookBasicInfoSchedule,
    CreateBookBasicInfoSchedule,
    SearchCriteriaBookBasicInfoSchedule
} from "luksal/app/types/dataPopulation";
import {PageResponse} from "luksal/app/types/api";
import {
    API_AUTHOR_FILE_IMPORT_URL, API_BOOK_BASIC_INFO_EDITIONS_FILE_IMPORT_URL,
    API_BOOK_BASIC_INFO_FILE_IMPORT_URL,
    API_DATA_POPULATION_JOB_RUN_POLICY,
    API_FILE_IMPORT_URL
} from "luksal/app/lib/api";

export const dataPopulationService = {

    get(name: string): Promise<JobPolicy> {
        return http<JobPolicy>(`${API_DATA_POPULATION_JOB_RUN_POLICY}/${name}`, {method: "GET"});
    },

    update(payload: JobPolicy): Promise<JobPolicy> {
        return http<JobPolicy>(API_DATA_POPULATION_JOB_RUN_POLICY, {method: "PUT", body: payload});
    },

    scheduleBookBasicInfo(request: CreateBookBasicInfoSchedule): Promise<void> {
        return http<void>("/api/population-management/schedule/book-basic-info", {method: "POST", body: request});
    },

    searchScheduleBookBasicInfo(criteria?: SearchCriteriaBookBasicInfoSchedule | null, page?: {
        page?: number,
        size?: number
    }): Promise<PageResponse<BookBasicInfoSchedule>> {
        const stringParams: Record<string, string> = {};
        if (page && page.page !== undefined) {
            stringParams.page = String(page.page);
        }
        if (page && page.size !== undefined) {
            stringParams.size = String(page.size);
        }
        return http<PageResponse<BookBasicInfoSchedule>>(`/api/population-management/book-basic-info-schedule`, {
            method: "POST",
            body: criteria,
            params: stringParams
        })
    },

    importAuthorsFromFile(): Promise<void> {
        return http<void>(API_AUTHOR_FILE_IMPORT_URL, {method: "POST"})
    },

    importBasicBookInfoFromFile(): Promise<void> {
        return http<void>(API_BOOK_BASIC_INFO_FILE_IMPORT_URL, {method: "POST"})
    },

    importBasicBookInfoEditionsFromFile(): Promise<void> {
        return http<void>(API_BOOK_BASIC_INFO_EDITIONS_FILE_IMPORT_URL, {method: "POST"})
    },

    getInitialFileImportState(eventName: string): Promise<string | undefined> {
        return http<string>(`${API_FILE_IMPORT_URL}/${eventName}`, {method: "GET"})
    }
};