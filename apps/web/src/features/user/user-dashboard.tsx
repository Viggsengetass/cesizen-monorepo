"use client";

import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function UserDashboard() {
    const { user } = useAuth();

    if (!user) {
        return (
            <div className="p-6">
                <p className="text-red-500">Utilisateur non connecté.</p>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-2xl font-bold text-graphite">
                Bienvenue <span className="text-[#A8D5BA]">{user.email}</span> 👋
            </h1>

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
