"use client"

import {useState} from "react"
import Link from "next/link";
import {ChevronDown, Menu, X} from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="w-full border-b bg-teal-950 shadow-sm relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">


                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-xl font-extrabold text-slate-100">
                            PersonalAdvisor
                        </Link>
                        <div
                            className="relative"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-1 py-5 px-5 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold"
                            >
                                Admin
                            </button>
                            {open && (
                                <div className="absolute top-full left-0 mt-0 w-48 bg-teal-950 border rounded-md shadow-lg z-50">
                                    <Link
                                        href="/home/admin/dashboard"
                                        className="block px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold"
                                    >
                                        Statistics
                                    </Link>
                                    <Link
                                        href="/home/admin/crawler"
                                        className="block px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold"
                                    >
                                        Crawlers
                                    </Link>
                                    <Link
                                        href="/home/admin/settings"
                                        className="block px-4 py-2 rounded-md hover:text-gray-900 hover:bg-gray-100/40 hover:ring-white/40 text-slate-200 font-semibold"
                                    >
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link href="/blog" className="hover:text-blue-600 text-slate-200 font-semibold">
                            Blog
                        </Link>

                        <Link href="/contact" className="hover:text-blue-600 text-slate-200 font-semibold">
                            Contact
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    )
}
