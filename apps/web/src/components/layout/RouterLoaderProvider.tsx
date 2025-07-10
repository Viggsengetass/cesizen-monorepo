"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function RouterLoaderProvider({
                                                 children,
                                             }: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Lance le loader à chaque changement de route
        setIsLoading(true);

        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 700); // Durée du faux chargement

        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            {isLoading && <LoadingScreen />}
            {children}
        </>
    );
}
