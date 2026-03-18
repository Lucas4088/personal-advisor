"use client"

import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

export interface PieChartEntry {
    name: string;
    value: number;
    fill: string;
}

interface Props {
    title: string;
    total?: string;
    entries: PieChartEntry[]
}

export function AppPieChart({entries, title, total}: Props) {
    return (
        <div className="w-full">
            <h2 className="text-center text-base font-medium text-gray-700">
                {title}
            </h2>
            {total && <h1 className="text-center text-base font-medium text-amber-800">
                {total}
            </h1>
            }
            <div className="h-96 rounded-2xl" style={{ width: "100%", height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={entries}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                        >
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

    )
}