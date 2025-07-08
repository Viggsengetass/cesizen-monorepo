// apps/web/src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import RouterLoaderProvider from "@/components/layout/RouterLoaderProvider"; // ✅ import ajouté

const geistSans = Geist({
    subsets: ["latin"],
    variable: "--font-geist-sans",
    display: "swap",
});

const geistMono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "CESIZen",
    description: "Application de bien-être pour CESI",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body className="antialiased bg-cloud text-graphite font-sans">
        <AuthProvider>
            <RouterLoaderProvider>
                <Navbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </RouterLoaderProvider>
        </AuthProvider>
        </body>
        </html>
    );
}
