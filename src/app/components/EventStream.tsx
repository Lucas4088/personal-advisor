"use client"

import {useEffect, useState} from "react"
import {API_DATA_EVENT_URL} from "luksal/app/lib/api";

export type EventStreamParams = {
    eventName: string,
    onMessage?: (message: string) => void
}

export default function EventStream({eventName, onMessage}: EventStreamParams) {
    const [message, setMessage] = useState<string | null>(null)

    useEffect(() => {
        const eventSource = new EventSource(API_DATA_EVENT_URL)

        eventSource.addEventListener(eventName, (event) => {
            console.log("Event received:", event)
            const msg = (event as MessageEvent).data
            setMessage(msg)
            if (onMessage) {
                onMessage(msg)
            }
        })

        eventSource.onerror = (err) => {
            console.error("EventSource failed:", err);
            eventSource.close();
        };

        return () => eventSource.close()
    }, [eventName, onMessage])

    return <div>
        {message != null ? `${message}%` : '0%'}
    </div>
}