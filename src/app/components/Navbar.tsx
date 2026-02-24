"use client"

import {useState} from "react"
import Link from "next/link";
import {FiLogOut} from "react-icons/fi";

export default function Navbar() {
    const [open, setOpen] = useState(false)

    const navTabDiv =
        "flex items-center gap-1 py-5 px-3 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold";

    return (
        <nav className="w-full border-b bg-teal-950 shadow-sm relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-row items-center h-16">
                    <Link href="/" className="text-xl font-extrabold text-slate-100">
                        PersonalAdvisor
                    </Link>

                    <div className="flex-1 flex justify-left pl-10">
                        <div className="flex flex-row items-center whitespace-nowrap">
                            <div
                                className="relative"
                                onMouseEnter={() => setOpen(true)}
                                onMouseLeave={() => setOpen(false)}
                            >
                                <button
                                    onClick={() => setOpen(!open)}
                                    className={navTabDiv}
                                >
                                    Configuration
                                </button>
                                {open && (
                                    <div className="absolute top-full left-0 mt-0 w-48 bg-teal-950 border rounded-md shadow-lg z-50">
                                        <Link
                                            href="/home/admin/configuration/crawler"
                                            className="block px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold"
                                        >
                                            Crawlers
                                        </Link>
                                        <Link
                                            href="/home/admin/configuration/datapopulation"
                                            className="block px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold"
                                        >
                                            Data Population
                                        </Link>
                                        <Link
                                            href="/home/admin/configuration/general"
                                            className="block px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold"
                                        >
                                            General
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <div className={navTabDiv}>
                                <Link href="/statistics" >
                                    Statistics
                                </Link>
                            </div>

                            <div  className={navTabDiv}>
                                <Link href="/books" >
                                    Books
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center gap-4">
                        <button>
                            <FiLogOut className="text-slate-200 hover:text-red-500" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
