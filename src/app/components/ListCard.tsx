import React from "react";
import {ListGridProps} from "luksal/app/types/list";

export default function ListCard<T>({data, columns, onRowClick}: ListGridProps<T>) {
    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6">

            {/* Header */}
            <div
                className="grid gap-4 border-b pb-2 text-sm font-medium text-gray-500"
                style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}
            >
                {columns.map(col => (
                    <span key={String(col.accessor)}>{col.header}</span>
                ))}
            </div>

            {/* Rows */}
            <div className="divide-y">
                {data.map((row, index) => (
                    <div
                        key={index}
                        onClick={() => onRowClick?.(row)}
                        className={`
                                  grid gap-4 py-3 items-center
                                  hover:bg-gray-50 transition
                                  ${onRowClick ? "cursor-pointer" : ""}
                                `}
                        style={{gridTemplateColumns: `repeat(${columns.length}, 1fr)`}}>
                        {columns.map(col => {
                            const value = row[col.accessor]
                            return (
                                <span key={String(col.accessor)}>
                                 {col.render ? col.render(value, row) : String(value)}
                                </span>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
}