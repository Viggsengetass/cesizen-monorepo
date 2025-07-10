"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle, PlusCircle, Trash2 } from "lucide-react";
import { LogoutButton } from "@/components/ui/LogoutButton";
import ContentForm from "./ContentForm";
import { fetchContents } from "@/features/content/api/contentApi";
import { Content } from "@/types/content";

export default function AdminDashboard() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);
    const [contents, setContents] = useState<Content[]>([]);
    const [loading, setLoading] = useState(true);
    const [editContent, setEditContent] = useState<Content | null>(null);

    const loadContents = async () => {
        try {
            const data = await fetchContents();
            setContents(data);
        } catch (err) {
            console.error("Erreur lors du chargement des contenus :", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAuthenticated || !user?.roles.includes("ROLE_ADMIN")) {
            router.push("/login");
        } else {
            loadContents();
        }
    }, [isAuthenticated, user, router]);

    const handleDelete = async (id: number) => {
        const confirm = window.confirm("Êtes-vous sûr de vouloir supprimer ce contenu ?");
        if (!confirm) return;

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`http://localhost:8080/api/contents/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                alert("Contenu supprimé !");
                loadContents();
            } else {
                alert("Erreur lors de la suppression");
            }
        } catch (err) {
            console.error("Erreur réseau :", err);
            alert("Erreur réseau");
        }
    };

    if (!user) return null;

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-graphite">
                    Admin : <span className="text-[#A8D5BA]">{user.email}</span>
                </h1>
                <LogoutButton />
            </div>

            <Card className="flex items-center gap-4 bg-[#F6F9FC] border border-[#A8D5BA] shadow-sm p-4">
                <CheckCircle className="text-[#A8D5BA]" strokeWidth={1.5} size={24} />
                <p className="text-base text-graphite">
                    Vous avez les droits d'administration. Vous pouvez créer et gérer des contenus.
                </p>
            </Card>

            <Button
                className="btn-primary flex items-center gap-2"
                onClick={() => {
                    if (showForm && !editContent) {
                        setShowForm(false);
                    } else {
                        setShowForm(true);
                        setEditContent(null);
                    }
                }}
            >
                <PlusCircle size={18} />
                {showForm && !editContent ? "Fermer le formulaire" : "Créer un contenu"}
            </Button>

            {showForm && (
                <Card className="p-4 mt-4">
                    <ContentForm
                        onCreated={() => {
                            setShowForm(false);
                            setEditContent(null);
                            loadContents();
                        }}
                        existingContent={editContent}
                    />
                </Card>
            )}

            <div className="space-y-4">
                <h2 className="text-xl font-semibold mt-6">Contenus existants</h2>
                {loading ? (
                    <p>Chargement...</p>
                ) : contents.length === 0 ? (
                    <p>Aucun contenu pour l’instant.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {contents.map((content) => (
                            <Card key={content.id} className="flex justify-between items-start p-4">
                                <div>
                                    <h3 className="text-lg font-bold">{content.title}</h3>
                                    <p className="text-sm text-gray-500">{content.type}</p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        className="btn-outline text-sm"
                                        onClick={() => {
                                            setEditContent(content);
                                            setShowForm(true);
                                        }}
                                    >
                                        Modifier
                                    </Button>
                                    <Button
                                        className="btn-outline text-sm text-red-600 border-red-300 hover:bg-red-50"
                                        onClick={() => handleDelete(content.id)}
                                    >
                                        <Trash2 size={16} className="mr-1" />
                                        Supprimer
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
