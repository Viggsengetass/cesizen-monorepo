"use client";

import { useEffect, useState } from "react";

type Diagnostic = {
    id: number;
    title: string;
    description: string;
};

export default function DiagnosticPage(): JSX.Element {
    const [diagnostics, setDiagnostics] = useState<Diagnostic[]>([]);

    useEffect(() => {
        const fetchDiagnostics = async () => {
            const res = await fetch("http://localhost:8080/api/diagnostics", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                setDiagnostics(data["hydra:member"] ?? []);
            }
        };

        fetchDiagnostics();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Diagnostic</h1>
            <ul className="space-y-4">
                {diagnostics.map((d) => (
                    <li key={d.id} className="border p-4 rounded-xl shadow">
                        <h2 className="text-xl font-semibold">{d.title}</h2>
                        <p>{d.description}</p>
                        <a
                            href={`/diagnostic/test?id=${d.id}`}
                            className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Commencer
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
