"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle } from "lucide-react";
import { LogoutButton } from "@/components/ui/LogoutButton";

export default function UserDashboard() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/login");
        }
    }, [isAuthenticated, router]);

    if (!user) return null;

    return (
        <div className="p-6 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-graphite">
                    Bienvenue <span className="text-[#A8D5BA]">{user.email}</span> 👋
                </h1>
                <LogoutButton />
            </div>

            <Card className="flex items-center gap-4 bg-[#F6F9FC] border border-[#A8D5BA] shadow-sm p-4">
                <CheckCircle className="text-[#A8D5BA]" strokeWidth={1.5} size={24} />
                <p className="text-base text-graphite">
                    Vous êtes connecté ! Vous pouvez désormais accéder aux <strong>ressources</strong> et <strong>exercices</strong> disponibles dans l'application.
                </p>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="space-y-2">
                    <h2 className="text-xl font-semibold text-graphite">Votre compte</h2>
                    <p><strong>Email :</strong> {user.email}</p>
                    <p><strong>Rôle :</strong> {user.roles?.join(", ")}</p>
                </Card>

                <Card className="space-y-2">
                    <h2 className="text-xl font-semibold text-graphite">Sécurité</h2>
                    <Button className="btn-primary w-fit">Réinitialiser mon mot de passe</Button>
                </Card>
            </div>
        </div>
    );
}
