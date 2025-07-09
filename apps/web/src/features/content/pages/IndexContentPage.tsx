"use client";

import { useEffect, useState } from "react";
import { fetchContents } from "../api/contentApi";
import { useAuth } from "@/context/AuthContext";
import ContentCard from "../components/ContentCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Select from "@/components/ui/Select";
import LoadingScreen from "@/components/ui/LoadingScreen";
import AnimatedWaves from "@/components/ui/AnimatedWaves";

export default function IndexContentPage() {
    const { token } = useAuth();
    const [data, setData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [selectedType, setSelectedType] = useState<string>("");

    useEffect(() => {
        if (!token) return;

        fetchContents()
            .then((res) => {
                setData(res);
                setFilteredData(res);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [token]);

    useEffect(() => {
        if (selectedType) {
            setFilteredData(data.filter((item) => item.type === selectedType));
        } else {
            setFilteredData(data);
        }
        setCurrentPage(1); // reset pagination on filter
    }, [selectedType, data]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(e.target.value);
        setItemsPerPage(value);
        setCurrentPage(1);
    };

    if (loading) return <LoadingScreen />;

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                Erreur lors du chargement : {error}
            </div>
        );
    }

    return (
        <motion.div
            className="relative min-h-screen bg-[#F6F9FC] py-12 px-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2E2E2E] mb-6 flex justify-center items-center gap-2">
                🌿 Contenus de bien-être
            </h1>

            {/* Filtres */}
            <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
                <Select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">Tous les types</option>
                    <option value="meditation">Méditation</option>
                    <option value="respiration">Respiration</option>
                    <option value="sommeil">Sommeil</option>
                    <option value="gestion-du-stress">Gestion du stress</option>
                    <option value="pleine-conscience">Pleine conscience</option>
                </Select>

                <Select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                    {[9, 18, 27, 36].map((count) => (
                        <option key={count} value={count}>
                            {count} articles par page
                        </option>
                    ))}
                </Select>
            </div>

            {filteredData.length === 0 ? (
                <p className="text-center text-gray-600">Aucun contenu disponible.</p>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {paginatedData.map((item, index) => (
                            <motion.div
                                key={item["@id"] || item.id || index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                            >
                                <ContentCard
                                    title={item.title}
                                    slug={item.slug}
                                    type={item.type}
                                    coverImage={item.coverImage}
                                    body={item.body}
                                />
                            </motion.div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-10 flex-wrap gap-2 items-center">
                        <Button
                            variant="outline"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4 text-[#A8D5BA] mr-1" />
                            Précédent
                        </Button>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                className={page === currentPage ? "btn-primary" : "btn-outline"}
                                onClick={() => handlePageChange(page)}
                            >
                                {page}
                            </Button>
                        ))}

                        <Button
                            variant="outline"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            Suivant
                            <ChevronRight className="w-4 h-4 text-[#A8D5BA] ml-1" />
                        </Button>
                    </div>
                </>
            )}

            <AnimatedWaves />
        </motion.div>
    );
}
