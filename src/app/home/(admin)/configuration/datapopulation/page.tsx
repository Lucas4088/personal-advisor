"use client";

import React from "react";
import DataPopulationBookBasicInfoSchedule from "./DataPopulationBookBasicInfoSchedule";
import ListCard from "luksal/app/components/ListCard";
import {useBookBasicInfoSchedules} from "luksal/app/hook/datapopulation/useBookBasicInfoSchedules";
import {BookBasicInfoSchedule, SearchCriteriaBookBasicInfoSchedule} from "luksal/app/types/dataPopulation";
import {Column} from "luksal/app/types/list";
import {useBookBasicInfoImport} from "luksal/app/hook/datapopulation/useBookBasicInfoImport";
import {useAuthorFileImport} from "luksal/app/hook/datapopulation/useAuthorFileImport";
import {useSetBreadcrumbs} from "luksal/app/context/BreadcrumbContext";
import IngestionSourceStatusIndicators
    from "luksal/app/home/(admin)/configuration/datapopulation/IngestionSourceStatusIndicators";
import {FileImport} from "luksal/app/home/(admin)/configuration/datapopulation/FileImport";
import {useBookBasicInfoEditionsImport} from "luksal/app/hook/datapopulation/useBookBasicInfoEditionsImport";
import {ExternalApiImport} from "luksal/app/home/(admin)/configuration/datapopulation/ExternalApiImport";

export default function Page() {
    useSetBreadcrumbs([
        {label: 'Configuration', href: ''},
        {label: 'Data population', href: '/data-population'}
    ]);

    const POPULATE_BOOK_BASIC_INFO = "POPULATE_BOOK_BASIC_INFO"
    const POPULATE_BOOK_DETAILS = "POPULATE_BOOK_DETAILS"
    const CRAWL_BOOKS = "CRAWL_BOOKS"
    const CRAWL_BOOKS_ON_DEMAND = "CRAWL_BOOKS_ON_DEMAND"

    const [searchSchedule, setSearchSchedule] = React.useState<SearchCriteriaBookBasicInfoSchedule>(initSearchScheduleCriteria);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(5);

    const {data: schedules} = useBookBasicInfoSchedules(searchSchedule, currentPage - 1, pageSize)


    const columns: Column<BookBasicInfoSchedule>[] = [
        {header: "Year", accessor: "year"},
        {header: "Language", accessor: "lang"},
        {header: "status", accessor: "meta.status"}
    ];

    function initSearchScheduleCriteria(): SearchCriteriaBookBasicInfoSchedule {
        return {
            fromYear: undefined,
            toYear: undefined,
            lang: undefined,
            status: undefined
        }
    }

    return (
        <div className="grid grid-cols-8 grid-rows-5 w-full min-h-screen bg-white rounded-2xl shadow-lg p-3">
            <div className="bg-gray-300  col-span-4 row-span-2 m-5 rounded-3xl shadow-lg">
                <h3 className="text-xl text-center font-semibold text-gray-500 m-4 border-b-2">
                    Schedule book basic information import
                </h3>
                <DataPopulationBookBasicInfoSchedule></DataPopulationBookBasicInfoSchedule>
                <div className="p-5">
                    <ListCard
                        data={schedules ?? []}
                        columns={columns} paginationEnabled={true}></ListCard>
                </div>
            </div>

            <div className="col-span-2 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <ExternalApiImport
                    title="Import book basic information"
                    jobPolicyName={POPULATE_BOOK_BASIC_INFO}
                />
            </div>

            <div className="col-span-2 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <ExternalApiImport
                    title="Import book details"
                    jobPolicyName={POPULATE_BOOK_DETAILS}
                />
            </div>

            <div className="col-span-2 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <ExternalApiImport
                    title="Crawl for book reviews"
                    jobPolicyName={CRAWL_BOOKS}
                />
            </div>


            <div className="col-span-2 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <ExternalApiImport
                    title="Crawl for book reviews on demand"
                    jobPolicyName={CRAWL_BOOKS_ON_DEMAND}
                />
            </div>

            <div className="col-span-3 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Ingestion source status indicators
                </h3>
                <div className="flex-1 flex items-center justify-center">
                    <IngestionSourceStatusIndicators></IngestionSourceStatusIndicators>
                </div>
            </div>
            <div className="row-start-3 col-span-2 bg-gray-300 h-fit m-5 rounded-3xl shadow-lg flex flex-col">
                <FileImport
                    title="Import authors from file"
                    eventName="authors-import"
                    useImportHook={useAuthorFileImport}
                />
            </div>
            <div className="row-start-3 col-span-2 bg-gray-300 h-fit m-5 rounded-3xl shadow-lg flex flex-col">
                <FileImport
                    title="Import Book Basic Info from file"
                    eventName="book-basic-info-import"
                    useImportHook={useBookBasicInfoImport}
                />
            </div>
            <div className="row-start-4 col-span-2 bg-gray-300 h-fit m-5 rounded-3xl shadow-lg flex flex-col">
                <FileImport
                    title="Import Book Basic Info Editions from file"
                    eventName="book-basic-info-edition-import"
                    useImportHook={useBookBasicInfoEditionsImport}
                />
            </div>
        </div>
    );
}