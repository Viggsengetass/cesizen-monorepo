"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
    LogOut,
    LogIn,
    LayoutDashboard,
    UserCircle,
    Activity,
    BookText,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const pathname = usePathname();

    return (
        <nav className="bg-cloud/90 backdrop-blur-sm px-6 py-3 shadow-md sticky top-0 z-50 w-full flex justify-between items-center transition-all">
            {/* Logo CESIZen */}
            <Link
                href="/"
                className="flex items-center gap-2 hover:opacity-90 transition"
            >
                <Image
                    src="/logo_cesizen.png"
                    alt="Logo CESIZen"
                    width={32}
                    height={32}
                    priority
                />
                <span className="text-xl font-semibold text-graphite">CESIZen</span>
            </Link>

            {/* Liens conditionnels */}
            <div className="flex gap-3 items-center">
                <Link
                    href="/informations"
                    className={`text-graphite hover:text-[#A8D5BA] transition ${
                        pathname === "/informations" ? "font-bold underline" : ""
                    }`}
                >
                    Fiches Info
                </Link>

                {isAuthenticated ? (
                    <>
                        <Link
                            href="/content"
                            className={`btn-outline flex items-center gap-2 ${
                                pathname === "/content" ? "font-semibold underline" : ""
                            }`}
                        >
                            <BookText size={18} />
                            Contenus
                        </Link>

                        <Link
                            href="/exercises"
                            className={`btn-outline flex items-center gap-2 ${
                                pathname === "/exercises" ? "font-semibold underline" : ""
                            }`}
                        >
                            <Activity size={18} />
                            Exercices
                        </Link>

                        <Link
                            href="/dashboard"
                            className={`btn-outline flex items-center gap-2 ${
                                pathname === "/dashboard" ? "font-semibold underline" : ""
                            }`}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        {user?.roles?.includes("ROLE_ADMIN") && (
                            <Link
                                href="/admin"
                                className={`btn-outline flex items-center gap-2 ${
                                    pathname === "/admin" ? "font-semibold underline" : ""
                                }`}
                            >
                                <UserCircle size={18} />
                                Admin
                            </Link>
                        )}

                        <Button
                            variant="outline"
                            onClick={logout}
                            className="flex items-center gap-2"
                        >
                            <LogOut size={18} />
                            Déconnexion
                        </Button>
                    </>
                ) : (
                    <Link href="/login" className="btn-primary flex items-center gap-2">
                        <LogIn size={18} />
                        Connexion
                    </Link>
                )}
            </div>
        </nav>
    );
}
