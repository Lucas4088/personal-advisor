"use client"

import Link from "next/link"
import React from "react";
import { useBreadcrumb } from "luksal/app/context/BreadcrumbContext";
import { MdOutlineHome } from "react-icons/md";

export type BreadcrumbItem = {
    label: string
    href?: string
    icon?: React.ReactNode
}

const homeItem: BreadcrumbItem = {
    label: "",
    href: "/",
    icon: <MdOutlineHome />,
};

function BreadcrumbDisplay({ items }: { items: BreadcrumbItem[] }) {
    if (items.length === 0) return null;
    return (
        <nav className="flex w-auto mt-2 mx-9 items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                
                return (
                    <div key={index} className="flex items-center relative">
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-teal-600 hover:bg-gray-50 transition-colors gap-2"
                            >
                                {item.icon && <span className="text-lg">{item.icon}</span>}
                                {item.label}
                            </Link>
                        ) : (
                            <span className={`flex items-center px-4 py-2 text-sm font-semibold ${isLast ? 'text-teal-700 bg-teal-50/50' : 'text-gray-700'} gap-2`}>
                                {item.icon && <span className="text-lg">{item.icon}</span>}
                                {item.label}
                            </span>
                        )}
                        
                        {!isLast && (
                            <div className="h-full absolute right-0 top-0 translate-x-1/2 z-10 flex items-center text-gray-300">
                                <svg width="10" height="30" viewBox="0 0 10 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 0L10 15L0 30H2L12 15L2 0H0Z" fill="currentColor"/>
                                </svg>
                            </div>
                        )}
                    </div>
                );
            })}
        </nav>
    )
}

// This is the component you'll place in your layout
export default function Breadcrumb() {
    const { items } = useBreadcrumb();
    const allItems = [homeItem, ...items];
    return <BreadcrumbDisplay items={allItems} />;
}
