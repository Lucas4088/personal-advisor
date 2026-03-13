import React from "react";
import { Column, ListGridProps, isPageResponse, getByPath } from "luksal/app/types/list";
import {
    MdModeEditOutline,
    MdDeleteOutline,
    MdOutlineArrowBackIos,
    MdOutlineArrowForwardIos,
} from "react-icons/md";

export default function ListCard<T>({
                                        data,
                                        columns,
                                        onRowClick,
                                        onEditRow,
                                        onDeleteRow,
                                        onPageChange,
                                        paginationEnabled,
                                        maxRowsVisible = 5,
                                    }: ListGridProps<T>) {
    const hasActions = !!onEditRow || !!onDeleteRow;
    const [pageSize, setPageSize] = React.useState<number>(10);
    const [currentPage, setCurrentPage] = React.useState<number>(1);

    const gridTemplateColumns = hasActions
        ? `repeat(${columns.length}, minmax(0, 1fr)) 96px`
        : `repeat(${columns.length}, minmax(0, 1fr))`;

    const renderCell = (row: T, col: Column<T>) => {
        if (col.render) return col.render(null, row);
        const value = getByPath(row, col.accessor);
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

    const content: T[] = isPageResponse<T>(data) ? data.content : (data ?? []);
    // For array data, total is length. For PageResponse, it's totalElements.
    const total = isPageResponse<T>(data) ? data.page.totalElements : content.length;
    
    // Calculate total pages
    const totalPages = Math.ceil(total / pageSize);
    
    const displayContent = isPageResponse<T>(data) 
        ? content 
        : (paginationEnabled 
            ? content.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            : content);

    const startIdx = (currentPage - 1) * pageSize;
    const endIdx = Math.min(startIdx + pageSize, total);

    const canPrev = currentPage > 1;
    const canNext = isPageResponse<T>(data) 
        ? currentPage < (data.page.totalPages)
        : endIdx < total;

    const rowHeightPx = 44;
    const listMaxHeightPx = maxRowsVisible * rowHeightPx;

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
        onPageChange?.(newPage, pageSize);
    };

    const handlePageSizeChange = (newSize: number) => {
        setPageSize(newSize);
        setCurrentPage(1); // Reset to first page
        onPageChange?.(1, newSize);
    };

    return (
        <div className="bg-white rounded-2xl shadow-2xl p-6">
            <div
                className="grid gap-4 border-b pb-2 text-sm font-medium text-gray-500 items-center sticky top-0 bg-white z-10"
                style={{ gridTemplateColumns }}
            >
                {columns.map((col) => (
                    <span key={String(col.header)} className={cellClass}>
            {col.header}
          </span>
                ))}
                {hasActions ? <span className="text-right">Actions</span> : null}
            </div>

            <div
                className="divide-y overflow-y-auto"
                style={{ maxHeight: `${listMaxHeightPx}px` }}
            >
                {displayContent.map((row, index) => (
                    <div
                        key={isPageResponse<T>(data) ? index : startIdx + index}
                        onClick={() => onRowClick?.(row)}
                        className={`
              grid gap-4 py-3 items-center
              hover:bg-gray-50 transition
              ${onRowClick ? "cursor-pointer" : ""}
            `}
                        style={{ gridTemplateColumns, minHeight: `${rowHeightPx}px` }}
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

            {paginationEnabled ? (
                <div className="flex justify-end mt-2 mb-4 py-3 px-6 border-t border-gray-500 h-5 font-medium text-gray-500">
                    <span className="mr-2 m-1">Rows per page:</span>
                    <select
                        value={pageSize}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                        className="m-1 h-6 border-gray-300 rounded bg-white text-gray-500 appearance-none cursor-pointer"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select>

                    <span className="m-1">
                        {isPageResponse<T>(data) ? currentPage : 1} of {total}
                    </span>

                    <button
                        type="button"
                        disabled={!canPrev}
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`p-2 rounded-full w-8 h-8 hover:bg-gray-200 ${
                            !canPrev ? "opacity-40 pointer-events-none" : ""
                        }`}
                    >
                        <MdOutlineArrowBackIos />
                    </button>

                    <button
                        type="button"
                        disabled={!canNext}
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`p-2 rounded-full w-8 h-8 hover:bg-gray-200 ${
                            !canNext ? "opacity-40 pointer-events-none" : ""
                        }`}
                    >
                        <MdOutlineArrowForwardIos />
                    </button>
                </div>
            ) : null}
        </div>
    );
}