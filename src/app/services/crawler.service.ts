import { http } from "./http";
import type { CrawlerSetting } from "luksal/app/types/crawler";
import {API_CRAWLER_URL} from "luksal/app/lib/api";


export const crawlerService = {
    list(): Promise<CrawlerSetting[]> {
        return http<CrawlerSetting[]>(API_CRAWLER_URL, { method: "GET" });
    },

    create(payload: CrawlerSetting): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(API_CRAWLER_URL, {
            method: "POST",
            body: payload,
        });
    },

    get(id?: number | null): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`${API_CRAWLER_URL}/${id}`, { method: "GET" });
    },

    update(id: number, payload: Partial<CrawlerSetting>): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`${API_CRAWLER_URL}/${id}`, { method: "PUT", body: payload });
    },

    remove(id: number): Promise<void> {
        return http<void>(`${API_CRAWLER_URL}${id}`, { method: "DELETE" });
    },
};