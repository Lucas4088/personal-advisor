"use client"

import {useSetBreadcrumbs} from "luksal/app/context/BreadcrumbContext";
import React, {useEffect, useMemo, useState} from "react";
import {AppPieChart, PieChartEntry} from "luksal/app/components/AppPieChart";
import {useBookStatistics} from "luksal/app/hook/statistics/useBookStatistics";
import {useCrawlerEventStatistics} from "luksal/app/hook/statistics/useCrawlerEventStatistics";
import {BookDetailsFetchedStatisticsDto, BookRatingValue, RatingEventValue} from "luksal/app/types/statistics";
import {useBookRatingStatistics} from "luksal/app/hook/statistics/useBookRatingStatistics";
import {useBookDetailsFetchedStatistics} from "luksal/app/hook/statistics/useBookDetailsFetchedStatistics";
import {API_DATA_EVENT_URL} from "luksal/app/lib/api";
import {AppLineChart} from "luksal/app/components/AppLineChart";

const STATUS_COLORS = {
    PENDING: "#FFBB28",
    ERROR: "#FF4444",
    UNPROCESSABLE: "#1c0101",
    SUCCESS: "#00C49F"
} as const;

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#FF4444", "#FFBB28"]

type StatusKey = keyof typeof STATUS_COLORS;

const LINE_CHART_COLORS = {
    GOOGLE_BOOKS_SUCCESS: "#22c55e",
    GOOGLE_BOOKS_ERROR: "#ef4444",
    OPEN_LIBRARY_SUCCESS: "#3b82f6",
    OPEN_LIBRARY_ERROR: "#7a2aca",
    ARCHIVE_BOOKS_SUCCESS: "#3f35dd",
    ARCHIVE_BOOKS_ERROR: "#f97316"
}

export default function Page() {
    useSetBreadcrumbs([
        {label: 'Statistics', href: '/statistics'}
    ]);

    const {data: bookStatistics} = useBookStatistics()
    const {data: crawlerEventStatistics} = useCrawlerEventStatistics()
    const {data: bookRatingStatistics} = useBookRatingStatistics()
    const {data: bookDetailsFetchedStatistics} = useBookDetailsFetchedStatistics()
    const [liveStatisticsData, setLiveStatisticsData] = useState<BookDetailsFetchedStatisticsDto | undefined>()

    useEffect(() => {
        const eventSource = new EventSource(API_DATA_EVENT_URL)
        eventSource.addEventListener("book-details-fetched-statistics", (event) => {
            const eventData = (event as MessageEvent).data
            if (eventData) {
                try {
                    const parsedData = JSON.parse(eventData);
                    setLiveStatisticsData(parsedData)
                } catch (e) {
                    console.error("Failed to parse SSE data", e)
                }
            }
        })

        return () => {
            eventSource.close()
        }
    }, []);

    function mapToPieChartEntries(values?: RatingEventValue[]): PieChartEntry[] {
        return values?.filter((value) => value.status).map((value, index) => {
            return {
                name: value.status!,
                value: value.value!,
                fill: STATUS_COLORS[value.status as StatusKey]
            }
        }) ?? []
    }

    function mapBookRatingStatisticsToPieChartEntries(values?: BookRatingValue[]): PieChartEntry[] {
        return values?.map((value, index) => {
            return {
                name: value.numberOfRatings.toString(),
                value: value.value,
                fill: COLORS[index]
            }
        }) ?? []
    }

    function mapBookDetailsFetchedStatistics(
        data?: BookDetailsFetchedStatisticsDto
    ) {
        if (!data?.values) {
            return {entries: [], keys: []};
        }

        const keys = new Set<string>();
        data.values.forEach(item => {
            Object.keys(item).forEach(key => {
                if (key !== "time") {
                    keys.add(key);
                }
            });
        });

        const formattedData = data.values.map(item => ({
            ...item,
            time: new Date(item.time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
            })
        }));

        return {
            entries: formattedData,
            keys: Array.from(keys)
        };
    }

    const displayedStatistics = liveStatisticsData ?? bookDetailsFetchedStatistics;

    const {entries, keys} = useMemo(
        () => mapBookDetailsFetchedStatistics(displayedStatistics),
        [displayedStatistics]
    );

    function aggregateFetchedBookDetailsStatistics(data?: BookDetailsFetchedStatisticsDto) {
        if (!data?.values.length) return []

        // find latest bucket by time
        const latest = data.values.reduce((a, b) =>
            new Date(a.time) > new Date(b.time) ? a : b
        )

        // sum SUCCESS + ERROR per source group from latest bucket
        const result = Object.entries(latest)
            .filter(([key]) => key !== "time")
            .reduce<Record<string, number>>((acc, [key, value]) => {
                const group = key.replace(/_SUCCESS$|_ERROR$/, "")
                acc[group] = (acc[group] || 0) + (value as number)
                return acc
            }, {})

        return Object.entries(result)
    }

    function groupByCrawlerName(): Partial<Record<string, RatingEventValue[]>> {
        return Object.groupBy(crawlerEventStatistics?.values ?? [], (value) => value.crawlerName);
    }

    function formatNumber(num: number | undefined): string {
        if (num === undefined) {
            return '0';
        }
        if (num >= 1_000_000) {
            return `${(num / 1_000_000).toFixed(2)}M`
        }
        if (num >= 1_000) {
            return `${(num / 1_000).toFixed(2)}K`
        }
        return num.toString()
    }


    function formatPercentage(num: number | undefined): string {
        if (num === undefined) {
            return '0';
        }
        return `${num.toFixed(2)}%`
    }


    return <div className="grid grid-cols-5 grid-rows-5 w-full min-h-screen bg-white rounded-2xl shadow-lg p-3">
        <div
            className="col-span-1 row-span-1 h-2/3 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col justify-between p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Total Authors count
            </h3>
            <div className="text-5xl font-bold text-amber-800 text-center">
                {formatNumber(bookStatistics?.authorCount)}
            </div>
        </div>

        <div
            className="col-span-1 row-span-1 h-2/3 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col justify-between p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Total Book basic info count
            </h3>
            <div className="text-5xl font-bold text-amber-800 text-center">
                {formatNumber(bookStatistics?.bookBasicInfoCount)}
            </div>
        </div>

        <div
            className="col-span-1 row-span-1 h-2/3 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col justify-between p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Total Book documents count
            </h3>
            <div className="text-5xl font-bold text-amber-800 text-center">
                {formatNumber(bookStatistics?.bookDocumentCount)}
            </div>
        </div>

        <div
            className="col-span-1 row-span-1 h-2/3 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col justify-between p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Total Book records count
            </h3>
            <div className="text-5xl font-bold text-amber-800 text-center">
                {formatNumber(bookStatistics?.bookRecordCount)}
            </div>
        </div>

        <div
            className="col-span-1 row-span-1 h-2/3 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col justify-between p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Total Book synchronised
            </h3>
            <div className="text-5xl font-bold text-amber-800 text-center">
                {formatPercentage(bookStatistics?.bookSyncPercentage)}
            </div>
        </div>

        <div className="col-span-3 row-span-2 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Crawler ratings stats
            </h3>
            <h5 className="text-center text-2xl font-semibold text-amber-800">
                {formatNumber(crawlerEventStatistics?.total)}
            </h5>
            <div className="flex-1 flex items-center justify-center">
                {Object.entries(groupByCrawlerName()).map(([key, value]) => (
                    <AppPieChart
                        key={key}
                        entries={mapToPieChartEntries(value)}
                        title={key}
                        total={value?.reduce((acc, val) => acc + val.value, 0).toString() ?? '0'}
                    />
                ))}
            </div>
        </div>

        <div className="col-span-2 row-span-2 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Book ratings number stats
            </h3>
            <h5 className="text-center text-2xl font-semibold text-amber-800">
                {formatNumber(bookRatingStatistics?.totalRatings)}
            </h5>
            <div className="flex-1 flex items-center justify-center">
                <AppPieChart
                    entries={mapBookRatingStatisticsToPieChartEntries(bookRatingStatistics?.values)}
                    title=""
                />
            </div>
        </div>
        <div className="col-span-3 row-span-2 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Book fetched details statistics
            </h3>
            <h5 className="pt-1 text-center text-xl font-semibold">
                {aggregateFetchedBookDetailsStatistics(bookDetailsFetchedStatistics).sort((a, b) => a[0].localeCompare(b[0])).map(
                    (item, index) =>
                        (<span key={index}>
                            <span className="text-gray-700">{item[0]}: </span>
                            <span className="text-amber-800"> {formatNumber(item[1])} </span>
                        </span>)
                )}
            </h5>
            <div className=" flex-1 flex items-center justify-center">
                <AppLineChart entries={entries} keys={keys} colors={LINE_CHART_COLORS}></AppLineChart>
            </div>
        </div>
    </div>
}