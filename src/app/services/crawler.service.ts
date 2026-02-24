import { http } from "./http";
import type { CrawlerSetting } from "luksal/app/types/crawler";


export const crawlerService = {
    list(): Promise<CrawlerSetting[]> {
        return http<CrawlerSetting[]>("/api/crawler", { method: "GET" });
    },

    create(payload: CrawlerSetting): Promise<CrawlerSetting> {
        return http<CrawlerSetting>("/api/crawler", {
            method: "POST",
            body: payload,
        });
    },

    get(id?: number | null): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`/api/crawler/${id}`, { method: "GET" });
    },

    update(id: number, payload: Partial<CrawlerSetting>): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`/api/crawler/${id}`, { method: "PUT", body: payload });
    },

    remove(id: number): Promise<void> {
        return http<void>(`/api/crawler/${id}`, { method: "DELETE" });
    },
};