import React from "react";
import {PageResponse} from "luksal/app/types/api";

type Primitive = string | number | boolean | bigint | symbol | null | undefined | Date;

export type Path<T> =
    T extends Primitive
        ? never
        : {
            [K in Extract<keyof T, string>]:
            T[K] extends Primitive
                ? K
                : T[K] extends Array<any>
                    ? K // keep arrays as a leaf by default
                    : K | `${K}.${Path<T[K]>}`;
        }[Extract<keyof T, string>];

export type Column<T> = {
    header: string
    accessor?: Path<T>;
    render?: (value: unknown, row: T) => React.ReactNode
}

export function getByPath<T>(obj: T, path?: Path<T>): unknown {
    if (!path) return undefined;
    return (path as string).split(".").reduce<unknown>((acc, key) => {
        if (acc == null) return undefined;
        return (acc as any)[key];
    }, obj as any);
}

export type ListGridProps<T> = {
    data: T[] | PageResponse<T> | undefined,
    columns: Column<T>[]
    onPageChange?: (page: number, size: number) => void,
    onRowClick?: (row: T) => void,
    onEditRow?: (row: T) => void,
    onDeleteRow?: (row: T) => void,
    paginationEnabled: boolean,
    maxRowsVisible?: number
}

export function isPageResponse<T>(data: T[] | PageResponse<T> | undefined): data is PageResponse<T> {
    return (
        !!data &&
        !Array.isArray(data) &&
        typeof data === 'object' &&
        'content' in data &&
        Array.isArray((data as any).content)
    );
}