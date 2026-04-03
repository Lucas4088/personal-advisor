"use client"

import ListCard from "luksal/app/components/ListCard";
import Modal, {ModalMode} from "luksal/app/components/Modal";
import React from "react";
import {BookDetailsDto, BookDto, BookSearchCriteria} from "luksal/app/types/book";
import {useBooks} from "luksal/app/hook/book/useBooks";
import {useBook} from "luksal/app/hook/book/useBook";
import {Column} from "luksal/app/types/list";
import BookDetailsView from "luksal/app/home/(admin)/data/book/BookDetailsView";
import ListToolbar, {Criteria} from "luksal/app/components/ListToolbar";
import {useSetBreadcrumbs} from "luksal/app/context/BreadcrumbContext";

export default function Page() {
    useSetBreadcrumbs([
        { label: 'Data', href: '/data' },
        { label: 'Books', href: '/book' }
    ]);

    const [selected, setSelected] = React.useState<BookDto | null>(null);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [searchCriteria, setSearchCriteria] = React.useState<BookSearchCriteria>({});
    const [pagination, setPagination] = React.useState({ page: 1, size: 20 });
    const [mode, setMode] = React.useState<ModalMode>(ModalMode.View);

    const {data: booksPage} = useBooks(searchCriteria, pagination.page - 1, pagination.size);
    const {data: selectedBook} = useBook(selectedId);

    const columns: Column<BookDto>[] = [
        {header: "Id", accessor: "id"},
        {header: "Title", accessor: "title"},
        {header: "Published Year", accessor: "publishedYear"}
    ];

    const criteriaFields: Criteria[] = [
        {
            id: "bookId", type: "number", placeholder: "Book Id", transform: Number,
            props: {
                min: 0,
                className: "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            }
        },
        {id: "title", type: "text", placeholder: "Title"},
        {id: "genres", type: "select", placeholder: "Genre"},
        {
            id: "startYear", type: "number", placeholder: "Start Year", transform: Number,
            props: {
                min: 0,
                className: "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            }
        },
        {
            id: "endYear", type: "number", placeholder: "End Year", transform: Number,
            props: {
                max: 3000,
                className: "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            }
        }
    ];

    function search(criteria?: Record<string, unknown>) {
        setSearchCriteria(criteria as BookSearchCriteria);
        setPagination(prev => ({ ...prev, page: 1 }));
    }

    return <div className="p-1 space-y-4 h-full">
        <div className="grid grid-cols-1 gap-6">
            <ListToolbar searchCriteria={criteriaFields} search={search}></ListToolbar>
            <ListCard
                data={booksPage}
                columns={columns}
                maxRowsVisible={pagination.size}
                onRowClick={(row) => {
                    setSelected(row);
                    setSelectedId(row.id ?? null);
                    setMode(ModalMode.View);
                }}
                onPageChange={(page, size) => {
                    setPagination({ page, size });
                }}
                paginationEnabled={true}
            />
            <Modal
                open={!!selected}
                onSubmit={(data) => {
                    return Promise.any([]);
                }}
                onClose={() => {
                    setSelected(null);
                    setSelectedId(null);
                }}
                mode={mode}
                id={selected?.id}
            >
                {selectedBook && <BookDetailsView selected={selectedBook as BookDetailsDto} mode={mode}/>}
            </Modal>
        </div>
    </div>
}