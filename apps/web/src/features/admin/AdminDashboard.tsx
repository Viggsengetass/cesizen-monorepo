"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle, PlusCircle } from "lucide-react";
import { LogoutButton } from "@/components/ui/LogoutButton";
import ContentForm from "./ContentForm";

export default function AdminDashboard() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!isAuthenticated || !user?.roles.includes("ROLE_ADMIN")) {
            router.push("/login");
        }
    }, [isAuthenticated, router, user]);

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
                onClick={() => setShowForm(!showForm)}
            >
                <PlusCircle size={18} />
                {showForm ? "Fermer le formulaire" : "Créer un contenu"}
            </Button>

            {showForm && (
                <Card className="p-4 mt-4">
                    <ContentForm />
                </Card>
            )}
        </div>
    );
}
