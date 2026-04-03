
export interface SearchCriteriaBookBasicInfoSchedule {
    fromYear?: number;
    toYear?: number;
    lang?: string;
    status?: string;
}

export interface CreateBookBasicInfoSchedule {
    fromYear: number;
    toYear: number;
    lang: string;
}

export interface BookBasicInfoSchedule {
    year: number;
    lang: string;
    meta: EventMeta;
}

export interface EventMeta {
    status: string,
    errorMessage?: string,
    createdAt: number,
    updatedAt?: number,
}

export interface IngestionSourceStatus {
    name: string,
    status: "AVAILABLE" | "UNAVAILABLE" | "SEMI_AVAILABLE" | "UNKNOWN"
}