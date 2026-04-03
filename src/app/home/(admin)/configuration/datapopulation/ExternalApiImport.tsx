"use client"

import React from "react";
import {JobPolicy} from "luksal/app/types/jobPolicy";
import {useJobPolicy} from "luksal/app/hook/job/useJobPolicy";
import {useUpdateJobPolicy} from "luksal/app/hook/job/useUpdateJobPolicy";

type Props = {
    title: string;
    jobPolicyName: "POPULATE_BOOK_BASIC_INFO" | "POPULATE_BOOK_DETAILS" | "CRAWL_BOOKS" | "CRAWL_BOOKS_ON_DEMAND";
}

const baseButtonClassName = "rounded-3xl text-white text-shadow-md font-semibold text-xl shadow-xl p-4 w-40 m-2 backdrop-blur-md transition disabled:opacity-50 disabled:cursor-not-allowed";
const startButtonClassName = "bg-emerald-600  hover:bg-emerald-600/80";
const stopButtonClassName = "bg-rose-700  hover:bg-rose-600/80";

export function ExternalApiImport({title, jobPolicyName}: Props) {
    const [importJobPolicyEnabled, setImportJobPolicyEnabled] = React.useState<boolean | null>(null);
    const useUpdateJobPolicyHook = useUpdateJobPolicy();
    const {data: crawlBooksJobPolicy} = useJobPolicy(jobPolicyName);

    React.useEffect(() => {
        setImportJobPolicyEnabled(crawlBooksJobPolicy?.enabled ?? false);
    }, [crawlBooksJobPolicy]);

    async function handleImportClick() {
        const payload: JobPolicy = {
            name: jobPolicyName,
            enabled: !importJobPolicyEnabled
        };
        console.log(payload);
        await useUpdateJobPolicyHook.mutateAsync({payload});
    }

    return (
        <div className="h-full flex flex-col">
            <h3 className="text-center text-lg font-semibold text-gray-500 m-4 mb-0">
                <span className="inline-block w-full border-b-2 pb-1">
                  {title}
                </span>
            </h3>
            <div className="flex-1 flex items-center justify-center">
                <button
                    className={[
                        baseButtonClassName,
                        importJobPolicyEnabled ? stopButtonClassName : startButtonClassName
                    ].join(" ")}
                    onClick={() => handleImportClick()}
                >
                    {importJobPolicyEnabled ? "Stop" : "Start"}
                </button>
            </div>
        </div>
    )
}