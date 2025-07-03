// ✅ index.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchProtectedContent } from "@/features/content/api/contentApi";
import { Content } from "@/features/content/types/Content";
import ContentCard from "@/features/content/components/ContentCard";

export default function IndexContentPage() {
    const [contents, setContents] = useState<Content[]>([]);

    useEffect(() => {
        fetchProtectedContent()
            .then(setContents)
            .catch(console.error);
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Fiches informatives</h1>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {contents.map((content) => (
                    <ContentCard key={content.id} content={content} />
                ))}
            </div>
        </div>
    );
}
