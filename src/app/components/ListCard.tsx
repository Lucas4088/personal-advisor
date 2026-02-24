import React, { useEffect } from "react";
import { Column, ListGridProps } from "luksal/app/types/list";
import { MdModeEditOutline, MdDeleteOutline } from "react-icons/md";

export default function ListCard<T>({
                                        data,
                                        columns,
                                        onRowClick,
                                        onEditRow,
                                        onDeleteRow,
                                        onChange,
                                    }: ListGridProps<T>) {
    const hasActions = !!onEditRow || !!onDeleteRow;

    useEffect(() => {
        if (onChange) onChange(data);
    }, [data, onChange]);

    const gridTemplateColumns = hasActions
        ? `repeat(${columns.length}, minmax(0, 1fr)) 96px`
        : `repeat(${columns.length}, minmax(0, 1fr))`;

    const renderCell = (row: T, col: Column<T>) => {
        if (col.render) return col.render(null, row);
        const key = col.accessor as keyof T;
        const value = row?.[key];
        return value == null ? "" : String(value);
    };

    const renderActionsCell = (row: T) => (
        <div className="flex items-center justify-end gap-2">
            {onEditRow ? (
                <button
                    type="button"
                    className="rounded px-2 py-1 text-sm hover:bg-gray-100"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditRow(row);
                    }}
                >
                    <MdModeEditOutline />
                </button>
            ) : null}

            {onDeleteRow ? (
                <button
                    type="button"
                    className="rounded px-2 py-1 text-sm text-red-700 hover:bg-red-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDeleteRow(row);
                    }}
                >
                    <MdDeleteOutline />
                </button>
            ) : null}
        </div>
    );

    const cellClass = "min-w-0 overflow-hidden whitespace-nowrap text-ellipsis";

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6">
            <div
                className="grid gap-4 border-b pb-2 text-sm font-medium text-gray-500 items-center"
                style={{ gridTemplateColumns }}
            >
                {columns.map((col) => (
                    <span key={String(col.header)} className={cellClass}>
            {col.header}
          </span>
                ))}
                {hasActions ? <span className="text-right">Actions</span> : null}
            </div>

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
                        style={{ gridTemplateColumns }}
                    >
                        {columns.map((col) => (
                            <span key={String(col.accessor)} className={cellClass}>
                {renderCell(row, col)}
              </span>
                        ))}
                        {hasActions ? (
                            <div className="justify-self-end">{renderActionsCell(row)}</div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    );
}