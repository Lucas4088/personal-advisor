"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { inter } from './ui/fonts';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Personal Advisor",
  description: "Turn goals into doable next steps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {

    const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.className} antialiased`}>
      <QueryClientProvider client={queryClient}>
          {children}
      </QueryClientProvider>
      </body>
    </html>
  );
}
