"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BreadcrumbItem } from "luksal/app/components/Breadcrumb";

type BreadcrumbContextType = {
    items: BreadcrumbItem[];
    setItems: (items: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export function BreadcrumbProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<BreadcrumbItem[]>([]);

    return (
        <BreadcrumbContext.Provider value={{ items, setItems }}>
            {children}
        </BreadcrumbContext.Provider>
    );
}

export function useBreadcrumb() {
    const context = useContext(BreadcrumbContext);
    if (!context) {
        throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
    }
    return context;
}

// Helper hook to set breadcrumbs in a page
export function useSetBreadcrumbs(items: BreadcrumbItem[]) {
    const { setItems } = useBreadcrumb();
    
    // We use JSON.stringify to create a stable dependency key
    // This prevents infinite loops when passing a new array literal on every render
    const itemsKey = JSON.stringify(items);

    useEffect(() => {
        setItems(items);
        return () => setItems([]); // Clear on unmount
    }, [itemsKey, setItems]);
}
