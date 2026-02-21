import Link from 'next/link';
import { roboto_slab } from './ui/fonts';
import Image from 'next/image';

export default function Home() {
    return (
        <div className="min-h-screen bg-emerald-950 text-zinc-900">
            <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center justify-center gap-8 px-6 py-16 text-center">
                <div className="w-full rounded-2xl bg-white/100 p-10 shadow-sm ring-1 ring-emerald-300">
                    <div className="flex flex-col items-center gap-3">
                        <h2 className="text-4xl font-semibold tracking-tight sm:text-3xl">
                            Welcome to
                        </h2>
                        <Image
                            src="/app-logo.png"
                            width={100}
                            height={100}
                            className="hidden md:block"
                            alt="Personal Advisor Logo"
                            />
                        <h1 className={`${roboto_slab.className} text-4xl font-semibold tracking-tight sm:text-5xl `}>
                             Personal Advisor
                        </h1>
                        <Link
                            href="/login"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-800/10 px-6 py-3 text-sm font-medium text-emerald-950 backdrop-blur-md ring-1 ring-white/30 shadow-sm transition hover:bg-white/20 hover:ring-white/40 active:bg-white/25 md:text-base">
                            <span>Log in</span>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
