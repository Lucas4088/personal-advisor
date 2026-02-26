"use client"

import ListCard from "luksal/app/components/ListCard";
import ListToolbar from "luksal/app/components/ListToolbar";
import {CrawlerSetting} from "luksal/app/types/crawler";
import {Column} from "luksal/app/types/list";
import Modal, {ModalMode} from "luksal/app/components/Modal";
import React from "react";
import CrawlerDetailsView from "./CrawlerDetailsView";
import {useCrawlers} from "luksal/app/hook/crawler/useCrawlers";
import {useCrawler} from "luksal/app/hook/crawler/useCrawler";
import {useCreateCrawler} from "luksal/app/hook/crawler/useCreateCrawler";
import {useDeleteCrawler} from "luksal/app/hook/crawler/useDeleteCrawler";
import {useUpdateCrawler} from "luksal/app/hook/crawler/useUpdateCrawler";

export default function Page() {
    const [selected, setSelected] = React.useState<CrawlerSetting | null>(null);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [mode, setMode] = React.useState<ModalMode>(ModalMode.View);

    const useCreateCrawlerHook = useCreateCrawler();
    const useDeleteCrawlerHook = useDeleteCrawler();
    const useUpdateCrawlerHook = useUpdateCrawler();

    const { data: crawlers } = useCrawlers();
    const { data: selectedCrawler } = useCrawler(selectedId);

    const crawlerSettings: CrawlerSetting[]  = crawlers ?? []

    const columns: Column<CrawlerSetting>[] = [
        {
            header: "Id",
            accessor: "id"
        },
        {header: "Name", accessor: "name"},
        {header: "Enabled", accessor: "enabled"},
        {header: "URL", accessor: "baseUrl"},
    ];

    function createEmptyCrawlerSetting(): CrawlerSetting {
        return {
            name: "",
            enabled: false,
            baseUrl: "",
            proxyEnabled: false,
            rateLimit: {
                requestsPerMinute: 0,
                burst: 0,
            },
            path: {
                bookResultSelector: "",
                bookRatingCountSelector: "",
                bookRatingScoreSelector: "",
                search: "",
                titleSpaceSeparator: "",
            },
        };
    }

    function normalizeFormPayload(payload: CrawlerSetting) {
        if (payload.rateLimit) {
            payload.rateLimit.requestsPerMinute = Number(payload.rateLimit.requestsPerMinute) || 0;
            payload.rateLimit.burst = Number(payload.rateLimit.burst) || 0;
        }
        payload.enabled = Boolean(payload.enabled);
        payload.proxyEnabled = Boolean(payload.proxyEnabled);
    }

    async function createCrawlerSettings(payload: CrawlerSetting) {
        normalizeFormPayload(payload);
        return await useCreateCrawlerHook.mutateAsync(payload);
    }

    async function updateCrawlerSettings(id: number, payload: CrawlerSetting) {
        normalizeFormPayload(payload);
        return await useUpdateCrawlerHook.mutateAsync({ id, payload });
    }

    async function deleteCrawlerSettings(id: number) {
        await useDeleteCrawlerHook.mutateAsync(id);
    }

    return (
        <div className="p-1 space-y-4">
            <div className="grid grid-cols-1 gap-6">
                <ListToolbar search={""} onCreate={()=> {
                    setSelected(createEmptyCrawlerSetting);
                    setSelectedId(null);
                    setMode(ModalMode.Create);
                }}></ListToolbar>
                <ListCard
                    data={crawlerSettings}
                    columns={columns}
                    onRowClick={(row) => {
                        setSelected(row); // open modal
                        setSelectedId(row.id ?? null); // fetch details
                        setMode(ModalMode.View);
                    }}
                    onEditRow={(row) => {
                        setSelected(row);
                        setSelectedId(row.id ?? null);
                        setMode(ModalMode.Edit);
                    }}
                    onDeleteRow={(row) => {
                        setSelected(row);
                        setSelectedId(row.id ?? null);
                        setMode(ModalMode.Delete);
                    }}
                    onChange={() => {}}
                    paginationEnabled ={false}
                />

                <Modal
                    open={!!selected}
                    onSubmit={(data) => {
                        setSelected(null);
                        setSelectedId(null);
                        return selectedId === null
                            ? createCrawlerSettings(data)
                            : updateCrawlerSettings(selectedId, data);
                    }}
                    onConfirmDelete={() => {
                        const id = selected?.id;
                        setSelected(null);
                        setSelectedId(null);
                        return deleteCrawlerSettings(id as number);
                    }}
                    onClose={() => {
                        setSelected(null);
                        setSelectedId(null);
                    }}
                    mode={mode}
                    id={selected?.id}
                >
                    {!ModalMode.isDelete(mode) && (mode === ModalMode.Create ? (
                        <CrawlerDetailsView selected={selected as CrawlerSetting} mode={mode} />
                    ) : selectedCrawler ? (
                        <CrawlerDetailsView selected={selectedCrawler} mode={mode} />
                    ) : null)}
                </Modal>
            </div>
        </div>
    )
}