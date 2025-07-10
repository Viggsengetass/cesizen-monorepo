"use client";

import { useEffect, useState } from "react";
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
import clsx from "clsx";

export default function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const pathname = usePathname();

    const [isInHero, setIsInHero] = useState(true);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const hero = document.getElementById("hero-video-section");

        const checkInitialHero = () => {
            if (!hero) return;
            const rect = hero.getBoundingClientRect();
            const isVisible = rect.top <= 80 && rect.bottom > 80; // au moins sous le header
            setIsInHero(isVisible);
        };

        // Setup observer
        const observer = new IntersectionObserver(
            ([entry]) => setIsInHero(entry.isIntersecting),
            {
                threshold: 0,
                rootMargin: "-80px 0px 0px 0px", // tient compte de la hauteur du header
            }
        );

        if (hero) {
            observer.observe(hero);
            checkInitialHero();
        }

        // Écoute le scroll pour le marquer comme déclenché
        const handleScroll = () => {
            setHasScrolled(window.scrollY > 0);
        };

        // Initial scroll check
        handleScroll();

        window.addEventListener("scroll", handleScroll);

        return () => {
            if (hero) observer.unobserve(hero);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isTransparent = !hasScrolled || isInHero;

    return (
        <nav
            className={clsx(
                "px-6 py-3 sticky top-0 z-50 w-full flex justify-between items-center transition-all duration-500 ease-in-out backdrop-blur-sm",
                isTransparent
                    ? "bg-transparent text-white"
                    : "bg-cloud/90 text-graphite shadow-md"
            )}
        >
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
                <span className="text-xl font-semibold">CESIZen</span>
            </Link>

            <div className="flex gap-3 items-center">
                <Link
                    href="/informations"
                    className={clsx(
                        "hover:text-[#A8D5BA] transition",
                        pathname === "/informations" && "font-bold underline"
                    )}
                >
                    Fiches Info
                </Link>

                {isAuthenticated ? (
                    <>
                        <Link
                            href="/content"
                            className={clsx(
                                "btn-outline flex items-center gap-2",
                                pathname === "/content" && "font-semibold underline"
                            )}
                        >
                            <BookText size={18} />
                            Contenus
                        </Link>

                        <Link
                            href="/exercises"
                            className={clsx(
                                "btn-outline flex items-center gap-2",
                                pathname === "/exercises" && "font-semibold underline"
                            )}
                        >
                            <Activity size={18} />
                            Exercices
                        </Link>

                        <Link
                            href="/dashboard"
                            className={clsx(
                                "btn-outline flex items-center gap-2",
                                pathname === "/dashboard" && "font-semibold underline"
                            )}
                        >
                            <LayoutDashboard size={18} />
                            Dashboard
                        </Link>

                        {user?.roles?.includes("ROLE_ADMIN") && (
                            <Link
                                href="/admin"
                                className={clsx(
                                    "btn-outline flex items-center gap-2",
                                    pathname === "/admin" && "font-semibold underline"
                                )}
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
