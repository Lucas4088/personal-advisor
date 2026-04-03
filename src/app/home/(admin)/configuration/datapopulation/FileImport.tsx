"use client"


import EventStreamProgressBar from "luksal/app/components/EventStream";
import React from "react";

type UseImportHook<T> = (options: {
    onSuccess?: () => void
}) => {
    mutateAsync: () => Promise<void>;
    isPending: boolean
    isSuccess: boolean
}
type Props<T> = {
    title: string;
    eventName: string;
    useImportHook: UseImportHook<T>
}

const baseButtonClassName = "rounded-3xl text-white text-shadow-md font-semibold text-xl shadow-xl p-4 w-40 m-2 backdrop-blur-md transition disabled:opacity-50 disabled:cursor-not-allowed";
const startButtonClassName = "bg-emerald-600  hover:bg-emerald-600/80";

export function FileImport<T>({title, eventName, useImportHook}: Props<T>) {
    const [isFileImporting, setIsFileImporting] = React.useState(false);

    const mutation = useImportHook({
        onSuccess: () => {
            setIsFileImporting(true)
        }
    })

    function handleFileImportMessage(message: string) {
        if (message === "100") {
            setIsFileImporting(false);
        } else {
            setIsFileImporting(true);
        }
    }

    return (
        <div>
            <h3 className="text-center text-lg font-semibold text-gray-500 m-4 mb-0">
            <span className="inline-block w-full border-b-2 pb-1">
              {title}
            </span>
            </h3>

            <div className="p-2 flex items-stretch justify-evenly">
                <div className="flex flex-col flex-1 p-2 gap-4 items-center justify-between h-full">
                    <button
                        className={[baseButtonClassName, startButtonClassName].join(" ")}
                        disabled={isFileImporting}
                        onClick={mutation.mutateAsync}
                    >
                        Import
                    </button>

                    <div className="w-full bg-white py-2 px-2 text-center rounded-2xl">
                        <EventStreamProgressBar
                            eventName={eventName}
                            onMessage={handleFileImportMessage}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}