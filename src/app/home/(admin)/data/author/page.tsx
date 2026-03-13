"use client"

import ListCard from "luksal/app/components/ListCard";
import Modal, {ModalMode} from "luksal/app/components/Modal";
import React from "react";
import {AuthorDetailsDto, AuthorDto, AuthorSearchCriteria} from "luksal/app/types/author";
import {useAuthors} from "luksal/app/hook/author/useAuthors";
import {useAuthor} from "luksal/app/hook/author/useAuthor";
import {Column} from "luksal/app/types/list";
import {useDeleteAuthor} from "luksal/app/hook/author/useDeleteAuthor";
import AuthorDetailsView from "luksal/app/home/(admin)/data/author/AuthorDetailsView";
import ListToolbar, {Criteria} from "luksal/app/components/ListToolbar";
import {useSetBreadcrumbs} from "luksal/app/context/BreadcrumbContext";

export default function Page() {
    useSetBreadcrumbs([
        { label: 'Data', href: '/data' },
        { label: 'Authors', href: '/author' }
    ]);

    const [selected, setSelected] = React.useState<AuthorDto | null>(null);
    const [selectedId, setSelectedId] = React.useState<string | null>(null);
    const [searchCriteria, setSearchCriteria] = React.useState<AuthorSearchCriteria>({});
    const [pagination, setPagination] = React.useState({ page: 1, size: 20 });
    const [mode, setMode] = React.useState<ModalMode>(ModalMode.View);

    const {data: authorsPage} = useAuthors(searchCriteria, pagination.page - 1, pagination.size);
    const {data: selectedAuthor} = useAuthor(selectedId);
    const useDeleteAuthorHook = useDeleteAuthor();

    const columns: Column<AuthorDto>[] = [
        {header: "Id", accessor: "id"},
        {header: "Public Id", accessor: "publicId"},
        {header: "Name", accessor: "name"}
    ];

    const criteriaFields: Criteria[] = [
        {id: "id", type: "number", placeholder: "Id", transform: Number,
            props: {
                min: 0,
                className: "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            }},
        {id: "publicId", type: "text", placeholder: "Public Id"},
        {id: "name", type: "text", placeholder: "Name"}
    ];

    function search(criteria: Record<string, unknown>) {
        setSearchCriteria(criteria as AuthorSearchCriteria);
        setPagination(prev => ({ ...prev, page: 1 }));
    }

    async function deleteAuthor(publicId: string | undefined) {
        if (!publicId) return;
        await useDeleteAuthorHook.mutateAsync(publicId);
    }

    return <div className="p-1 space-y-4 h-full">
        <div className="grid grid-cols-1 gap-6">
            <ListToolbar searchCriteria={criteriaFields} search={search} onCreate={()=> {
                setSelected(null);
                setSelectedId(null);
                setMode(ModalMode.Create);
            }}></ListToolbar>
            <ListCard
                data={authorsPage}
                columns={columns}
                maxRowsVisible={pagination.size}
                onRowClick={(row) => {
                    setSelected(row);
                    setSelectedId(row.publicId ?? null);
                    setMode(ModalMode.View);
                }}
                onEditRow={(row) => {
                    setSelected(row);
                    setSelectedId(row.publicId ?? null);
                    setMode(ModalMode.Edit);
                }}
                onDeleteRow={(row) => {
                    setSelected(row);
                    setSelectedId(row.publicId ?? null);
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
                    // Placeholder for create/update logic
                }}
                onConfirmDelete={() => {
                    const publicId = selected?.publicId;
                    setSelected(null);
                    setSelectedId(null);
                    return deleteAuthor(publicId);
                }}
                onClose={() => {
                    setSelected(null);
                    setSelectedId(null);
                }}
                mode={mode}
                id={selected?.id}
            >
                {!ModalMode.isDelete(mode) && (mode === ModalMode.Create ? (
                    <AuthorDetailsView selected={selected as AuthorDetailsDto} mode={mode}/>
                ) : selectedAuthor ? (
                    <AuthorDetailsView selected={selectedAuthor} mode={mode}/>
                ) : null)}
            </Modal>
        </div>
    </div>
}