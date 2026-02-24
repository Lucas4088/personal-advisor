import Navbar from "luksal/app/components/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="p-6 md:overflow-y-auto md:p-8">{children}</div>
        </div>
    );
}