import { http } from "./http";
import type { CrawlerSetting } from "luksal/app/types/crawler";


export const crawlerService = {
    list(): Promise<CrawlerSetting[]> {
        return http<CrawlerSetting[]>("/api/crawlers", { method: "GET" });
    },

    create(payload: CrawlerSetting): Promise<CrawlerSetting> {
        return http<CrawlerSetting>("/api/crawlers", {
            method: "POST",
            body: JSON.stringify(payload),
        });
    },

    get(id: number): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`/api/crawler/${id}`, { method: "GET" });
    },

    update(id: number, payload: Partial<CrawlerSetting>): Promise<CrawlerSetting> {
        return http<CrawlerSetting>(`/api/crawler/${id}`, { method: "PUT", body: JSON.stringify(payload) });
    },

    remove(id: number): Promise<void> {
        return http<void>(`/api/crawlers/${id}`, { method: "DELETE" });
    },
};