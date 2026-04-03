"use client"

import {MdOutlineAdd, MdOutlineSearch} from "react-icons/md";
import React, {FormEvent} from "react";
import clsx from "clsx";

type Props = {
    searchCriteria?: Criteria[];
    search: (criteria?: Record<string, unknown>) => void;
    onCreate?: () => void;
    children?: React.ReactNode;
};

export type Criteria = {
    type: "text" | "number" | "date" | "select",
    value?: string,
    id: string,
    placeholder: string,
    props?: React.InputHTMLAttributes<HTMLInputElement>
    transform?: (value: string) => unknown
}

export default function ListToolbar({onCreate, search, searchCriteria}: Props) {
    const [criteria, setCriteria] = React.useState<Criteria[] | undefined>(searchCriteria);

    const handleChange = (fieldId: string, value: string, type: Criteria['type']) => {
        if (type === 'number' && !/^\d*$/.test(value)) {
            return;
        }
        setCriteria(prevCriteria =>
            prevCriteria?.map(item =>
                item.id === fieldId ? { ...item, value } : item
            )
        );
    };

    function handleOnSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const activeCriteria = criteria
            ?.reduce((acc, item) => {
                let finalValue: unknown = item.value;
                if (!item.value) {
                    finalValue = null;
                } else if (item.transform) {
                    finalValue = item.transform(item.value);
                } else if (item.type === 'number') {
                    finalValue = Number(item.value);
                }
                return { ...acc, [item.id]: finalValue };
            }, {} as Record<string, unknown>);
        if (search) {
            search(activeCriteria);
        }
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="flex justify-between bg-white rounded-2xl shadow-2xl p-3">
                <div className="flex flex-row items-center px-3">
                    {criteria?.map((c: Criteria) => (
                        <div key={c.id} className="relative pr-4">
                            <input
                                {...c.props}
                                type={c.type === 'number' ? 'text' : c.type}
                                inputMode={c.type === 'number' ? 'numeric' : undefined}
                                id={c.id}
                                value={c.value || ""}
                                placeholder=" "
                                onChange={(e) => handleChange(c.id, e.target.value, c.type)}
                                className={
                                    clsx("peer w-full border border-gray-300 rounded-lg px-3 pt-5 pb-2 text-sm focus:outline-none focus:border-teal-600",
                                        c.props?.className)
                                }
                            />
                            <label
                                htmlFor={c.id}
                                className="absolute left-3 top-2 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-teal-600"
                            >
                                {c.placeholder}
                            </label>
                        </div>
                    ))}
                </div>
                <div>
                    <button type="submit" className="p-3 m-2 text-black/70 hover:bg-cyan-100/50 active:brightness-70 transition-all duration-100 rounded-full">
                        <MdOutlineSearch size={20} className="h-6 w-6"></MdOutlineSearch>
                    </button>
                    {onCreate && (
                         <button type="button" className="rounded-full p-3 m-2 text-emerald-500 hover:bg-green-100/50 active:brightness-70 transition-all duration-100 text"
                            onClick={onCreate}>
                            <MdOutlineAdd size={20} className="h-6 w-6"/>
                        </button>
                    )}
                </div>
            </div>
        </form>
    )
}