"use client"

import React, {useEffect, useEffectEvent, useState} from "react"
import {API_DATA_EVENT_URL} from "luksal/app/lib/api";
import {useInitFileImport} from "luksal/app/hook/datapopulation/useInitFileImport";

export type EventStreamParams = {
    eventName: string,
    onMessage?: (message: string) => void
}

export default function EventStream({eventName, onMessage}: EventStreamParams) {
    const {data: initProgressStateData} = useInitFileImport(eventName)
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        const eventSource = new EventSource(API_DATA_EVENT_URL)

        eventSource.addEventListener(eventName, (event) => {
            console.log("Event received:", event)
            const msg = (event as MessageEvent).data
            if (msg){
                setMessage(msg);
            }
            if (onMessage) {
                onMessage(msg)
            }
        })

        eventSource.onerror = (err) => {
            console.error("EventSource failed:", err)
            eventSource.close()
        }

        return () => eventSource.close()
    }, [eventName, onMessage])

    const onInitProgress = useEffectEvent((initProgressStateData: string | undefined) => {
        if (!isNaN(parseFloat(initProgressStateData ?? "0"))) {
            setMessage(initProgressStateData ?? "0");
        }
    });

    useEffect(() => {
        onInitProgress(initProgressStateData)
    }, [initProgressStateData])

    return <div>
        <div className="flex justify-between">
            <span className="text-sm font-medium text-body">Progress</span>
            <span
                className="text-sm font-medium text-body">{message != null ? parseFloat(message).toFixed(2) : 0}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                style={{width: `${message != null ? parseFloat(message).toFixed(2) : 0}%`}}
            />
        </div>
    </div>

}