"use client";

import React from "react";
import {useUpdateJobPolicy} from "luksal/app/hook/job/useUpdateJobPolicy";
import {useJobPolicy} from "luksal/app/hook/job/useJobPolicy";
import {JobPolicy} from "luksal/app/types/jobPolicy.ts";
import DataPopulationBookBasicInfoSchedule from "./DataPopulationBookBasicInfoSchedule";

export default function Page() {
    const [importBookBasicInfoJobPolicyEnabled, setImportBookBasicInfoJobPolicyEnabled] = React.useState<boolean | null>(null);
    const [importBookDetailsJobPolicyEnabled, setImportBookDetailsJobPolicyEnabled] = React.useState<boolean | null>(null);

    const useUpdateJobPolicyHook = useUpdateJobPolicy();

    const {data: importBookBasicInfoJobPolicy} = useJobPolicy("POPULATE_BOOK_BASIC_INFO");
    const {data: importBookDetailsJobPolicy} = useJobPolicy("POPULATE_BOOK_DETAILS");

    React.useEffect(() => {
        setImportBookBasicInfoJobPolicyEnabled(importBookBasicInfoJobPolicy?.enabled ?? false);
        setImportBookDetailsJobPolicyEnabled(importBookDetailsJobPolicy?.enabled ?? false);
    }, [importBookBasicInfoJobPolicy, importBookDetailsJobPolicy]);

    async function handleImportBookDetailsClick(name: string) {
        const payload: JobPolicy = {
            name,
            enabled: name === "POPULATE_BOOK_BASIC_INFO" ? !importBookBasicInfoJobPolicyEnabled : !importBookDetailsJobPolicyEnabled,
        };
        await useUpdateJobPolicyHook.mutateAsync({ payload });
    }

    const baseButtonClassName = "rounded-3xl text-white text-shadow-md font-semibold text-xl shadow-xl p-4 w-40 m-2 backdrop-blur-md transition";
    const startButtonClassName = "bg-emerald-600  hover:bg-emerald-600/80";
    const stopButtonClassName = "bg-rose-700  hover:bg-rose-600/80";

    return (
        <div className="grid grid-cols-4 grid-rows-5 w-full min-h-screen bg-white rounded-2xl shadow-lg p-3">
            <div className="bg-gray-300  col-span-2 row-span-2 m-5 rounded-3xl shadow-lg">
                <h3 className="text-xl text-center font-semibold text-gray-500 m-4 border-b-2">
                    Schedule book basic information import
                </h3>
                <DataPopulationBookBasicInfoSchedule></DataPopulationBookBasicInfoSchedule>
            </div>

            <div className="col-span-1 bg-gray-300 row-span-1 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Import book basic information
                </h3>
                <div className="flex-1 flex items-center justify-center">
                    <button
                        className={[
                            baseButtonClassName,
                            importBookBasicInfoJobPolicyEnabled ? stopButtonClassName : startButtonClassName
                        ].join(" ")}
                        onClick={() => handleImportBookDetailsClick("POPULATE_BOOK_BASIC_INFO")}
                    >
                        {importBookBasicInfoJobPolicyEnabled ? "Stop" : "Start"}
                    </button>
                </div>
            </div>

            <div className="col-span-1 bg-gray-300 row-span-1 m-5 rounded-3xl shadow-lg flex flex-col">
                <h3 className="h-8 text-center text-lg font-semibold text-gray-500 m-4 mb-0 border-b-2">
                    Import book details
                </h3>
                <div className="flex-1 flex items-center justify-center">
                    <button
                        className={[
                            baseButtonClassName,
                            importBookDetailsJobPolicyEnabled ? stopButtonClassName : startButtonClassName
                        ].join(" ")}
                        onClick={() => handleImportBookDetailsClick("POPULATE_BOOK_DETAILS")}
                    >
                        {importBookDetailsJobPolicyEnabled ? "Stop" : "Start"}
                    </button>
                </div>
            </div>
        </div>
    );
}