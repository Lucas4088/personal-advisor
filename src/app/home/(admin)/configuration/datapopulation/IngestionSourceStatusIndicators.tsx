"use client"

import React, {useEffect, useState} from "react";
import {API_DATA_EVENT_URL} from "luksal/app/lib/api";
import {IngestionSourceStatus} from "luksal/app/types/dataPopulation";

const STATUS_COLOR_CLASSES = {
    "AVAILABLE": "bg-green-500",
    "UNAVAILABLE": "bg-red-500",
    "SEMI_AVAILABLE": "bg-yellow-500",
    "UNKNOWN": "bg-gray-500",
}

export default function IngestionSourceStatusIndicators() {
    const [sourceStatuses, setSourceStatuses] = React.useState<IngestionSourceStatus[]>([]);

    useEffect(() => {
        const eventSource = new EventSource(API_DATA_EVENT_URL)
        eventSource.addEventListener("integration-source-status", (event) => {
            const eventData = (event as MessageEvent).data
            if (eventData) {
                try {
                    const parsedData = JSON.parse(eventData);
                    console.log(parsedData);
                    setSourceStatuses(parsedData);
                } catch (e) {
                    console.error("Failed to parse SSE data", e)
                }
            }
        })

        return () => {
            eventSource.close()
        }
    }, []);

    return (
        <div className="bg-gray-50 p-5 rounded-2xl" hidden={sourceStatuses.length === 0}>
            <div className="flex items-center gap-2">
                {sourceStatuses.map((status, index) => (
                    <div key={index} className="px-4 flex flex-col items-center gap-1" >
                        <div className="relative w-3 h-3">
                            <div className={[
                                STATUS_COLOR_CLASSES[status.status] ,
                                "absolute w-3 h-3 rounded-full animate-ping opacity-75"
                            ].join(" ")} />
                            <div className={[
                                STATUS_COLOR_CLASSES[status.status]?? "",
                                "w-3 h-3 rounded-full "
                            ].join(" ")} />
                        </div>
                        <span className="text-sm text-gray-600">{status.name}</span>
                    </div>
                ))}

            </div>
        </div>
    )
}