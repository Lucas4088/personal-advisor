"use client"

import "luksal/app/ui/globals.css";
import { MdOutlineAdd } from "react-icons/md";

type Props = {
    search: string;
    onSearchChange?: (value: string) => void;
    onCreate?: () => void;
    children?: React.ReactNode;
};

export default function ListToolbar<T>({ onCreate, children }: Props) {
    return (
        <div className="grid grid-cols-2 items-center bg-white rounded-2xl shadow-2xl p-3">
            <div className="col-1 rounded px-1 py-1">
                <input type="text"  className="p-2" placeholder="Search..." />
            </div>
                <button className="col-2 justify-self-end rounded-full p-2 text-emerald-500 hover:bg-green-100/50 text"
                        onClick={onCreate}>
                    <MdOutlineAdd size={20} className="h-6 w-6"/>
                </button>
        </div>
    )
}