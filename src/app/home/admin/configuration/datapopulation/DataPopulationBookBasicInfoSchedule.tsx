// `src/app/home/admin/configuration/datapopulation/DataPopulationBookBasicInfoSchedule.tsx`
"use client";

import React, {FormEvent} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useCreateBookBasicInfoSchedule} from "luksal/app/hook/datapopulation/useCreateBookBasicInfoSchedule";
import {CreateBookBasicInfoSchedule} from "luksal/app/types/dataPopulation";

export default function DataPopulationBookBasicInfoSchedule() {
    const [fromYear, setFromYear] = React.useState<Date | null>(null);
    const [toYear, setToYear] = React.useState<Date | null>(null);
    const [selectedLang, setSelectedLang] = React.useState<string>("");

    const useCreateBookBasicInfoScheduleHook = useCreateBookBasicInfoSchedule();

    const labelClassName = "flex items-center gap-2 min-w-0 flex-1";
    const inputClassName =
        "w-full p-3 rounded-3xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500";

    async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const payload: CreateBookBasicInfoSchedule = {
            yearFrom: Number(formData.get("yearFrom")),
            yearTo: Number(formData.get("yearTo")),
            lang: formData.get("lang")?.toString() ?? ""
        };
        await createSchedule(payload);

    }

    async function createSchedule(payload: CreateBookBasicInfoSchedule): Promise<void> {
        return await useCreateBookBasicInfoScheduleHook.mutateAsync(payload);
    }

    return (
        <div className="flex p-2 px-5 w-full">
            <form onSubmit={(data) => submit(data)} className="flex items-center gap-3 w-full">
                <label className={labelClassName}>
                    <span className="text-xl text-gray-800 shrink-0">From:</span>
                    <DatePicker
                        selected={fromYear}
                        onChange={(d: React.SetStateAction<Date | null>) => setFromYear(d)}
                        showYearPicker
                        dateFormat="yyyy"
                        className={inputClassName}
                        wrapperClassName="flex-1 w-full"
                        popperClassName="z-50"
                        calendarClassName="rounded-xl shadow-xl border border-slate-200"
                        yearClassName={() => "px-3 py-2 rounded-lg hover:bg-emerald-50"}
                    />
                </label>

                <label className={labelClassName}>
                    <span className="text-xl text-gray-800 shrink-0">To:</span>
                    <DatePicker
                        selected={toYear}
                        onChange={(d: React.SetStateAction<Date | null>) => setToYear(d)}
                        showYearPicker
                        dateFormat="yyyy"
                        className={inputClassName}
                        wrapperClassName="flex-1 w-full"
                        popperClassName="z-50"
                        calendarClassName="rounded-xl shadow-xl border border-slate-200"
                        yearClassName={() => "px-3 py-2 rounded-lg hover:bg-emerald-50"}
                    />
                </label>

                <label className={labelClassName}>
                    <span className="text-xl text-gray-800 shrink-0">Lang:</span>
                    <select
                        value={selectedLang}
                        onChange={e => setSelectedLang(e.target.value)}
                        className={inputClassName}>
                        <option value="eng">English</option>
                        <option value="pl">Polish</option>
                    </select>
                </label>

                <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-600/80 text-white text-xl font-semibold text-shadow-md shadow-xl p-3 rounded-3xl backdrop-blur-md transition shrink-0"
                >
                    Schedule
                </button>
            </form>
        </div>
    );
}