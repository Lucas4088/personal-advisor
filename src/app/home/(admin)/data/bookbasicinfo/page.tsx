"use client"

import ListCard from "luksal/app/components/ListCard";
import Modal, {ModalMode} from "luksal/app/components/Modal";
import React from "react";
import {BookBasicInfoDto, BookBasicInfoDetailsDto, BookBasicInfoSearchCriteria} from "luksal/app/types/bookBasicInfo";
import {useBookBasicInfos} from "luksal/app/hook/bookbasicinfo/useBookBasicInfos";
import {useBookBasicInfo} from "luksal/app/hook/bookbasicinfo/useBookBasicInfo";
import {Column} from "luksal/app/types/list";
import {useDeleteBookBasicInfo} from "luksal/app/hook/bookbasicinfo/useDeleteBookBasicInfo";
import BookBasicInfoDetailsView from "luksal/app/home/(admin)/data/bookbasicinfo/BookBasicInfoDetailsView";
import ListToolbar, {Criteria} from "luksal/app/components/ListToolbar";
import {useSetBreadcrumbs} from "luksal/app/context/BreadcrumbContext";

export default function Page() {
    useSetBreadcrumbs([
        { label: 'Data', href: '/data' },
        { label: 'Books basic info', href: '/book-basic-info' }
    ]);

    const [selected, setSelected] = React.useState<BookBasicInfoDto | null>(null);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [searchCriteria, setSearchCriteria] = React.useState<BookBasicInfoSearchCriteria>({});
    const [pagination, setPagination] = React.useState({ page: 1, size: 20 });
    const [mode, setMode] = React.useState<ModalMode>(ModalMode.View);

    const {data: bookBasicInfosPage} = useBookBasicInfos(searchCriteria, pagination.page - 1, pagination.size);
    const {data: selectedBookBasicInfo} = useBookBasicInfo(selectedId);
    const useDeleteBookBasicInfoHook = useDeleteBookBasicInfo();

    const columns: Column<BookBasicInfoDto>[] = [
        {header: "Id", accessor: "id"},
        {header: "Book Id", accessor: "bookId"},
        {header: "Title", accessor: "title"},
        {header: "First Publish Date", accessor: "firstPublishDate"}
    ];

    const criteriaFields: Criteria[] = [
        {id: "title", type: "text", placeholder: "Title"},
    ];

    function search(criteria?: Record<string, unknown>) {
        setSearchCriteria(criteria as BookBasicInfoSearchCriteria);
        setPagination(prev => ({ ...prev, page: 1 }));
    }

    async function deleteBookBasicInfo(id?: string) {
        if (!id) return;
        await useDeleteBookBasicInfoHook.mutateAsync(id);
    }

    return <div className="p-1 space-y-4 h-full">
        <div className="grid grid-cols-1 gap-6">
            <ListToolbar searchCriteria={criteriaFields} search={search}></ListToolbar>
            <ListCard
                data={bookBasicInfosPage}
                columns={columns}
                maxRowsVisible={pagination.size}
                onRowClick={(row) => {
                    setSelected(row);
                    setSelectedId(row.bookId ?? null);
                    setMode(ModalMode.View);
                }}
                onEditRow={(row) => {
                    setSelected(row);
                    setSelectedId(row.bookId ?? null);
                    setMode(ModalMode.Edit);
                }}
                onDeleteRow={(row) => {
                    setSelected(row);
                    setSelectedId(row.bookId ?? null);
                    setMode(ModalMode.Delete);
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
                onConfirmDelete={() => {
                    const id = selected?.id;
                    setSelected(null);
                    setSelectedId(null);
                    return deleteBookBasicInfo(id?.toString());
                }}
                onClose={() => {
                    setSelected(null);
                    setSelectedId(null);
                }}
                mode={mode}
                id={selected?.id}
            >
                {!ModalMode.isDelete(mode) && (mode === ModalMode.Create ? (
                    <BookBasicInfoDetailsView selected={selected as BookBasicInfoDetailsDto} mode={mode}/>
                ) : selectedBookBasicInfo ? (
                    <BookBasicInfoDetailsView selected={selectedBookBasicInfo} mode={mode}/>
                ) : null)}
            </Modal>
        </div>
    </div>
}