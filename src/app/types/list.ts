import React from "react";

export type Column<T> = {
    header: string
    accessor?: keyof T
    render?: (value: any, row: T) => React.ReactNode
}

export type ListGridProps<T> = {
    data: T[]
    columns: Column<T>[]
    onRowClick?: (row: T) => void,
    onEditRow?: (row: T) => void,
    onDeleteRow?: (row: T) => void,
}
