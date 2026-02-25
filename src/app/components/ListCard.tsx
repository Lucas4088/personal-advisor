import React, { useEffect } from "react";
import { Column, ListGridProps } from "luksal/app/types/list";
import { MdModeEditOutline, MdDeleteOutline, MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";

export default function ListCard<T>({
                                        data,
                                        columns,
                                        onRowClick,
                                        onEditRow,
                                        onDeleteRow,
                                        onChange,
                                    }: ListGridProps<T>) {
    const hasActions = !!onEditRow || !!onDeleteRow;
    const [selectedPageSize, setSelectedPageSize] = React.useState<number>(5);

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

            <div className="divide-y ">
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
            <div className="flex justify-end mt-2 mb-4 py-3 px-6 border-t border-gray-500 h-5 font-medium text-gray-500">
                <span className="mr-5 m-1">Rows per page: </span>
                <select value={selectedPageSize} onChange={(e) => setSelectedPageSize(Number(e.target.value))} className="m-1 h-6 border-gray-300 rounded bg-white text-gray-500 appearance-none cursor-pointer" style={{backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%234b5563' stroke-width='2'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem"}}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                </select>
                <span className="m-1">1-5 of 10</span>
                <MdOutlineArrowBackIos className="p-2 rounded-full w-8 h-8 hover:bg-gray-200"/>
                <MdOutlineArrowForwardIos className="p-2 rounded-full w-8 h-8 hover:bg-gray-200"/>
            </div>
        </div>
    );
}