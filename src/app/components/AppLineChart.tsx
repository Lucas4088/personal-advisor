"use client"

import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

export interface LineChartEntry {
    name: string;
    value: number;
    fill: string;
}

type ColorMap = Record<string, string>

interface Props {
    title: string;
    total?: string;
    keys: string[];
    entries: LineChartEntry[];
    colors: ColorMap;
}

export function AppLineChart({entries, title, keys, colors, total}: Props) {
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
                    <LineChart data={entries}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="time" />
                        <YAxis />

                        <Tooltip />
                        <Legend />

                        {keys.map((key) => (
                            <Line
                                key={key}
                                type="monotone"
                                dataKey={key}
                                stroke={colors[key] ?? "#8884d8"}
                                strokeWidth={3}
                                dot={false}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

    )
}