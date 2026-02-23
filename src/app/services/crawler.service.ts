import { http } from "./http";
import type { CrawlerSetting } from "luksal/app/types/crawler";

export const crawlerService = {
    list(): Promise<CrawlerSetting[]> {
        return http<CrawlerSetting[]>("/api/crawlers", { method: "GET" });
    },

    get(id: number): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`/api/crawlers/${id}`, { method: "GET" });
    },

    update(id: number, payload: Partial<CrawlerSetting>): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`/api/crawlers/${id}`, { method: "PUT", body: payload });
    },

    remove(id: number): Promise<void> {
        return http<void>(`/api/crawlers/${id}`, { method: "DELETE" });
    },
};