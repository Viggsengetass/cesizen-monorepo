'use client';

import { useEffect, useState } from 'react';
import { fetchProtectedContent } from '../api/contentApi';

export default function ProtectedContentPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProtectedContent()
            .then((res) => {
                setData(res['hydra:member'] || []);
                setLoading(false);
            })
            .catch((err) => {
                setError('Erreur lors du chargement des données');
                setLoading(false);
                console.error(err);
            });
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Contenus protégés</h1>

            {loading && <p>Chargement...</p>}
            {error && <p className="text-red-500">{error}</p>}
            <ul className="space-y-2">
                {data.map((item, index) => (
                    <li key={index} className="p-2 border rounded">
                        {JSON.stringify(item)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
