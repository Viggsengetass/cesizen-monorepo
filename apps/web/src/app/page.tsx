"use client";

import IndexContentPage from "@/features/content/pages";
import CookieAccessButton from "@/components/ui/CookieAccessButton";

export default function Page(): JSX.Element {
    return (
        <>
            <IndexContentPage />
            <CookieAccessButton />
        </>
    );
}
