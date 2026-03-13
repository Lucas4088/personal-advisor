"use client";

import React from "react";
import {useUpdateJobPolicy} from "luksal/app/hook/job/useUpdateJobPolicy";
import {useJobPolicy} from "luksal/app/hook/job/useJobPolicy";
import {JobPolicy} from "luksal/app/types/jobPolicy";
import DataPopulationBookBasicInfoSchedule from "./DataPopulationBookBasicInfoSchedule";
import ListCard from "luksal/app/components/ListCard";
import {useBookBasicInfoSchedules} from "luksal/app/hook/datapopulation/useBookBasicInfoSchedules";
import {BookBasicInfoSchedule, SearchCriteriaBookBasicInfoSchedule} from "luksal/app/types/dataPopulation";
import {Column} from "luksal/app/types/list";
import EventStream from "luksal/app/components/EventStream";
import {useBookBasicInfoImport} from "luksal/app/hook/datapopulation/useBookBasicInfoImport";
import {useAuthorFileImport} from "luksal/app/hook/datapopulation/useAuthorFileImport";
import {useSetBreadcrumbs} from "luksal/app/context/BreadcrumbContext";

export default function Page() {
    useSetBreadcrumbs([
        { label: 'Configuration', href: '' },
        { label: 'Data population', href: '/data-population' }
    ]);

    const POPULATE_BOOK_BASIC_INFO = "POPULATE_BOOK_BASIC_INFO"
    const POPULATE_BOOK_DETAILS = "POPULATE_BOOK_DETAILS"
    const CRAWL_BOOKS = "CRAWL_BOOKS"

    const [importBookBasicInfoJobPolicyEnabled, setImportBookBasicInfoJobPolicyEnabled] = React.useState<boolean | null>(null);
    const [importBookDetailsJobPolicyEnabled, setImportBookDetailsJobPolicyEnabled] = React.useState<boolean | null>(null);
    const [crawlBooksJobPolicyEnabled, setCrawlBooksJobPolicyEnabled] = React.useState<boolean | null>(null);
    const [isAuthorsImporting, setIsAuthorsImporting] = React.useState(false);
    const [isBasicBookInfoImporting, setIsBasicBookInfoImporting] = React.useState(false);
    const [searchSchedule, setSearchSchedule] = React.useState<SearchCriteriaBookBasicInfoSchedule>(initSearchScheduleCriteria);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [pageSize, setPageSize] = React.useState<number>(5);

    const useUpdateJobPolicyHook = useUpdateJobPolicy();
    const useAuthorsImportHook = useAuthorFileImport({
        onSuccess: () => {
            setIsAuthorsImporting(true)
        }
    });
    const useBookBasicInfoImportHook = useBookBasicInfoImport({
        onSuccess: () => {
            setIsBasicBookInfoImporting(true)
        }
    });

    const {data: importBookBasicInfoJobPolicy} = useJobPolicy(POPULATE_BOOK_BASIC_INFO);
    const {data: importBookDetailsJobPolicy} = useJobPolicy(POPULATE_BOOK_DETAILS);
    const {data: crawlBooksJobPolicy} = useJobPolicy(CRAWL_BOOKS);
    const {data: schedules} = useBookBasicInfoSchedules(searchSchedule, currentPage - 1, pageSize)

    React.useEffect(() => {
        setImportBookBasicInfoJobPolicyEnabled(importBookBasicInfoJobPolicy?.enabled ?? false);
        setImportBookDetailsJobPolicyEnabled(importBookDetailsJobPolicy?.enabled ?? false);
    }, [importBookBasicInfoJobPolicy, importBookDetailsJobPolicy]);

    React.useEffect(() => {
        setCrawlBooksJobPolicyEnabled(crawlBooksJobPolicy?.enabled ?? false);
    }, [crawlBooksJobPolicy]);

    async function handleImportBookDetailsClick(name: typeof POPULATE_BOOK_BASIC_INFO | typeof POPULATE_BOOK_DETAILS) {
        const payload: JobPolicy = {
            name,
            enabled: name === POPULATE_BOOK_BASIC_INFO ? !importBookBasicInfoJobPolicyEnabled : !importBookDetailsJobPolicyEnabled,
        };
        await useUpdateJobPolicyHook.mutateAsync({payload});
    }

    async function handleCrawlBooksClick() {
        const payload: JobPolicy = {
            name: CRAWL_BOOKS,
            enabled: !crawlBooksJobPolicyEnabled,
        };
        await useUpdateJobPolicyHook.mutateAsync({payload});
    }

    function handleAuthorsImportMessage(message: string) {
        if (message === "100") {
            setIsAuthorsImporting(false);
        } else {
            setIsAuthorsImporting(true);
        }
    }

    function handleBasicBookInfoImportMessage(message: string) {
        if (message === "100") {
            setIsBasicBookInfoImporting(false);
        } else {
            setIsBasicBookInfoImporting(true);
        }
    }

    function handleImportAuthorsClick() {
        return useAuthorsImportHook.mutateAsync()
    }

    function handleImportBookBasicInfoClick() {
        return useBookBasicInfoImportHook.mutateAsync()
    }

    const columns: Column<BookBasicInfoSchedule>[] = [
        {header: "Year", accessor: "year"},
        {header: "Language", accessor: "lang"},
        {header: "status", accessor: "meta.status"}
    ];

    const baseButtonClassName = "rounded-3xl text-white text-shadow-md font-semibold text-xl shadow-xl p-4 w-40 m-2 backdrop-blur-md transition disabled:opacity-50 disabled:cursor-not-allowed";
    const startButtonClassName = "bg-emerald-600  hover:bg-emerald-600/80";
    const stopButtonClassName = "bg-rose-700  hover:bg-rose-600/80";

    function initSearchScheduleCriteria(): SearchCriteriaBookBasicInfoSchedule {
        return {
            fromYear: undefined,
            toYear: undefined,
            lang: undefined,
            status: undefined
        }
    }

    return (
        <div className="grid grid-cols-4 grid-rows-5 w-full min-h-screen bg-white rounded-2xl shadow-lg p-3">
            <div className="bg-gray-300  col-span-2 row-span-2 m-5 rounded-3xl shadow-lg">
                <h3 className="text-xl text-center font-semibold text-gray-500 m-4 border-b-2">
                    Schedule book basic information import
                </h3>
                <DataPopulationBookBasicInfoSchedule></DataPopulationBookBasicInfoSchedule>
                <div className="p-5">
                    <ListCard onChange={(data, currentPage, selectedPageSize) => {
                        setCurrentPage(currentPage);
                        setPageSize(selectedPageSize);
                    }} data={schedules ?? []} columns={columns} paginationEnabled={true}></ListCard>
                </div>
            </div>

            <div className="col-span-1 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Import book basic information
                </h3>
                <div className="flex-1 flex items-center justify-center">
                    <button
                        className={[
                            baseButtonClassName,
                            importBookBasicInfoJobPolicyEnabled ? stopButtonClassName : startButtonClassName
                        ].join(" ")}
                        onClick={() => handleImportBookDetailsClick(POPULATE_BOOK_BASIC_INFO)}
                    >
                        {importBookBasicInfoJobPolicyEnabled ? "Stop" : "Start"}
                    </button>
                </div>
            </div>

            <div className="col-span-1 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Import book details
                </h3>
                <div className="flex-1 flex items-center justify-center">
                    <button
                        className={[
                            baseButtonClassName,
                            importBookDetailsJobPolicyEnabled ? stopButtonClassName : startButtonClassName
                        ].join(" ")}
                        onClick={() => handleImportBookDetailsClick(POPULATE_BOOK_DETAILS)}
                    >
                        {importBookDetailsJobPolicyEnabled ? "Stop" : "Start"}
                    </button>
                </div>
            </div>
            <div className="col-span-1 bg-gray-300 h-40 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Crawl for book reviews
                </h3>
                <div className="flex-1 flex items-center justify-center">
                    <button
                        className={[
                            baseButtonClassName,
                            crawlBooksJobPolicyEnabled ? stopButtonClassName : startButtonClassName
                        ].join(" ")}
                        onClick={() => handleCrawlBooksClick()}
                    >
                        {crawlBooksJobPolicyEnabled ? "Stop" : "Start"}
                    </button>
                </div>
            </div>
            <div className="row-start-3 col-span-1 bg-gray-300 h-55 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Import authors from file
                </h3>
                <div className="flex-2 p-2 flex items-center justify-evenly">
                    <div className="flex flex-col flex-1 p-2 gap-2 items-center justify-center">
                        <button
                            className={[
                                baseButtonClassName, startButtonClassName
                            ].join(" ")}
                            disabled={isAuthorsImporting}
                            onClick={handleImportAuthorsClick}
                        >
                            Import
                        </button>
                        <div className="w-full bg-white py-2 px-2 text-center rounded-2xl">
                            <EventStream eventName="authors-import"
                                         onMessage={handleAuthorsImportMessage}></EventStream>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row-start-3 col-span-1 bg-gray-300 h-55 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Import Book Basic Info from file
                </h3>
                <div className="flex-2 p-2 flex items-center justify-evenly">
                    <div className="flex flex-col flex-1 p-2 gap-2 items-center justify-center">
                        <button
                            className={[baseButtonClassName, startButtonClassName].join(" ")}
                            disabled={isBasicBookInfoImporting}
                            onClick={handleImportBookBasicInfoClick}
                        >
                            Import
                        </button>
                        <div className="w-full bg-white py-2 px-2 text-center rounded-2xl">
                            <EventStream eventName="book-basic-info-import"
                                         onMessage={handleBasicBookInfoImportMessage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}