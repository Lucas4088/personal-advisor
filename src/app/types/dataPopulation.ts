
export interface SearchCriteriaBookBasicInfoSchedule {
    yearFrom?: number;
    yearTo?: number;
    lang?: string;
    status?: string;
}

export interface CreateBookBasicInfoSchedule {
    yearFrom: number;
    yearTo: number;
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