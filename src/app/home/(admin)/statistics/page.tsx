"use client"

import {useSetBreadcrumbs} from "luksal/app/context/BreadcrumbContext";
import React from "react";
import {AppPieChart, PieChartEntry} from "luksal/app/components/AppPieChart";
import {useBookStatistics} from "luksal/app/hook/statistics/useBookStatistics";

export default function Page() {
    useSetBreadcrumbs([
        {label: 'Statistics', href: '/statistics'}
    ]);

    const {data: bookStatistics} = useBookStatistics()

    const entries: PieChartEntry[] = [
        {name: "Sci-Fi", value: 120, fill: "#6366F1"},
        {name: "Fantasy", value: 90, fill: "#10B981"},
        {name: "Drama", value: 40, fill: "#F59E0B"}
    ]

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
        if(num < 1){
            return `${num.toFixed(3)}%`
        }
        return num.toString()
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
                {formatNumber(bookStatistics?.bookSyncPercentage)}
            </div>
        </div>

        <div className="col-span-2 row-span-2 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Crawler ratings stats
            </h3>
            <h5 className="text-center text-2xl font-semibold text-amber-800">
                10K
            </h5>
            <div className="flex-1 flex items-center justify-center">
                <AppPieChart entries={entries}></AppPieChart>
            </div>
        </div>

        <div className="col-span-2 row-span-2 bg-gray-100 m-5 rounded-3xl shadow-lg flex flex-col p-4">
            <h3 className="text-center text-xl font-semibold text-gray-500">
                Crawler events stats
            </h3>
            <h5 className="text-center text-2xl font-semibold text-amber-800">
                10K
            </h5>
            <div className="flex-1 flex items-center justify-center">
                <AppPieChart entries={entries}></AppPieChart>
            </div>
        </div>
    </div>
}