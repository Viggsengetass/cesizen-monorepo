"use client";

import { useEffect, useState } from "react";
import { fetchContents } from "../api/contentApi";
import { useAuth } from "@/context/AuthContext";
import ContentCard from "../components/ContentCard";
import { motion } from "framer-motion";

export default function IndexContentPage(): JSX.Element {
    const { token } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) return;

        fetchContents(token)
            .then((res) => setData(res["member"] || []))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    if (loading) {
        return (
            <div className="p-6 flex justify-center items-center text-xl text-[#2E2E2E] h-60 animate-pulse">
                Chargement des contenus...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-500 text-lg">
                Erreur lors du chargement : {error}
            </div>
        );
    }

    return (
        <div className="p-6 min-h-screen bg-[#F6F9FC]">
            <motion.h1
                className="text-3xl font-bold text-[#2E2E2E] mb-8 text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                🧘‍♀️ Découvrez nos contenus bien-être
            </motion.h1>

            {data.length === 0 ? (
                <p className="text-gray-500 italic text-center text-lg">
                    Aucun contenu disponible pour le moment...
                </p>
            ) : (
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        visible: { transition: { staggerChildren: 0.1 } },
                        hidden: {},
                    }}
                >
                    {data.map((item) => (
                        <motion.div
                            key={item["@id"] || item.id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                        >
                            <ContentCard
                                title={item.title || "Sans titre"}
                                slug={item.slug || "contenu-inconnu"}
                                type={item.type || "inconnu"}
                                coverImage={item.coverImage || undefined}
                                body={item.body || ""}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
