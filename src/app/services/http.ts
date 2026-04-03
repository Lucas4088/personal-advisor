export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export function getApiBaseUrl() {
    if (typeof window === "undefined") {
        return process.env.INTERNAL_API_URL;
    }

    // browser
    return process.env.NEXT_PUBLIC_API_BASE_URL;
}

export class HttpError extends Error {
    constructor(
        message: string,
        public readonly status: number,
        public readonly body?: unknown,
    ) {
        super(message);
        this.name = "HttpError";
    }
}

function addSearchParams(
    url: URL,
    params?: Record<string, string | number | boolean | undefined | null | unknown>,
) {
    if (!params) return;

    for (const [key, raw] of Object.entries(params)) {
        if (raw === undefined || raw === null) continue;

        // avoid sending "NaN" / "Infinity"
        if (typeof raw === "number" && !Number.isFinite(raw)) continue;

        // if value is an array: repeat the key (?a=1&a=2)
        if (Array.isArray(raw)) {
            url.searchParams.delete(key);
            for (const item of raw) {
                if (item === undefined || item === null) continue;
                url.searchParams.append(key, String(item));
            }
            continue;
        }

        // if value is an object: JSON encode (or change to your backend expectation)
        if (typeof raw === "object") {
            url.searchParams.set(key, JSON.stringify(raw));
            continue;
        }

        // primitives
        url.searchParams.set(key, String(raw));
    }
}


export async function http<TResponse>(
    path: string,
    init?: {
        method?: HttpMethod;
        body?: unknown;
        params?: Record<string, string | number | boolean | undefined | null | unknown>;
        headers?: Record<string, string>;
        cache?: RequestCache;
        next?: NextFetchRequestConfig;
    },
): Promise<TResponse> {
    const baseUrl = getApiBaseUrl();
    const url = new URL(path, baseUrl);
    addSearchParams(url, init?.params);
    const res = await fetch(url, {
        method: init?.method ?? "GET",
        headers: {
            "Content-Type": "application/json",
            ...(init?.headers ?? {}),
        },
        body: init?.body == null ? undefined : JSON.stringify(init.body),
        cache: init?.cache,
        next: init?.next,
    });

    const contentType = res.headers.get("content-type") ?? "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await res.json().catch(() => undefined) : await res.text().catch(() => undefined);

    if (!res.ok) {
        throw new HttpError(`HTTP ${res.status} calling ${path}`, res.status, data);
    }

    return data as TResponse;
}