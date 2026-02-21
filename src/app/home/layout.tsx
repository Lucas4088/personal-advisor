import "../ui/globals.css";
import Navbar from "luksal/app/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="w-full">
                <Navbar />
            </div>
            <div className="p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
    );
}