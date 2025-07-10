// apps/web/src/features/content/pages/protected.tsx
import { useEffect, useState } from "react";
import { fetchContents } from "../api/contentApi";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedContentPage() {
    const { token } = useAuth();
    const [contents, setContents] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;
        fetchContents(token)
            .then((data) => setContents(data["hydra:member"] || []))
            .catch((err) => setError(err.message));
    }, [token]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Contenus protégés</h1>
            {error && <p className="text-red-500">Erreur : {error}</p>}
            <ul className="space-y-4">
                {contents.map((content) => (
                    <li key={content.id} className="card">
                        <h2 className="text-xl font-semibold">{content.title}</h2>
                        <p>{content.body}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
