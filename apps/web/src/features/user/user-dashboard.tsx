"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";

export default function UserDashboard() {
    const { token } = useAuth();
    const [entries, setEntries] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) return;

        fetch("http://localhost:8080/api/emotion_entries", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erreur API");
                return res.json();
            })
            .then((data) => setEntries(data["hydra:member"]))
            .catch((err) => {
                console.error(err);
                setError("Erreur lors du chargement des données");
            });
    }, [token]);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold text-[#2E2E2E]">Bienvenue sur votre espace CESIZen</h1>
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                    <h2 className="text-xl font-semibold mb-2">Mes dernières humeurs</h2>
                    <ul className="text-sm space-y-1">
                        {entries.length === 0 && <li>Aucune donnée pour le moment.</li>}
                        {entries.map((entry: any) => (
                            <li key={entry.id}>
                                {entry.emotion} - {new Date(entry.createdAt).toLocaleString()}
                            </li>
                        ))}
                    </ul>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold mb-2">Mes diagnostics</h2>
                    <p>Retrouvez vos bilans et suivez votre évolution.</p>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold mb-2">Exercices</h2>
                    <p>Accédez à vos exercices de respiration personnalisés.</p>
                </Card>
                <Card>
                    <h2 className="text-xl font-semibold mb-2">Contenus</h2>
                    <p>Explorez les fiches informatives à votre rythme.</p>
                </Card>
            </div>
        </div>
    );
}
