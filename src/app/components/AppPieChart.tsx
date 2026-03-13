"use client"

import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip} from "recharts";

export interface PieChartEntry {
    name: string;
    value: number;
    fill: string;
}

interface Props {
    entries: PieChartEntry[]
}

export function AppPieChart({entries}: Props) {
    return (
        <div className="w-full h-96 rounded-2xl">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        data={entries}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        label
                        >
                    </Pie>
                    <Tooltip/>
                    <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}