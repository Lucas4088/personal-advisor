"use client"

import {useState} from "react"
import Link from "next/link";
import {ChevronDown, Menu, X} from "lucide-react";

export default function Navbar() {
    const [open, setOpen] = useState(false)

    return (
        <nav className="w-full border-b bg-white shadow-sm relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">


                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-xl font-bold">
                            MyApp
                        </Link>
                        {/* Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex items-center gap-1 hover:text-blue-600"
                            >
                                Admin
                            </button>
                            {open && (
                                <div className="absolute top-full left-0 mt-0 w-48 bg-white border rounded-md shadow-lg z-50">
                                    <Link
                                        href="/admin/dashboard"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/admin/crawler"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Crawlers
                                    </Link>
                                    <Link
                                        href="/admin/settings"
                                        className="block px-4 py-2 hover:bg-gray-100"
                                    >
                                        Settings
                                    </Link>
                                </div>
                            )}
                        </div>

                        <Link href="/blog" className="hover:text-blue-600">
                            Blog
                        </Link>

                        <Link href="/contact" className="hover:text-blue-600">
                            Contact
                        </Link>

                    </div>
                </div>
            </div>
        </nav>
    )
}
