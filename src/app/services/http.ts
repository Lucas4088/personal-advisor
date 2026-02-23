export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

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

export async function http<TResponse>(
    path: string,
    init?: {
        method?: HttpMethod;
        body?: unknown;
        headers?: Record<string, string>;
        cache?: RequestCache;
        next?: NextFetchRequestConfig;
    },
): Promise<TResponse> {
    const url = `${getApiBaseUrl()}${path}`;

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