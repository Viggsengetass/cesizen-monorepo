"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";

export default function ResetPassword({ params }: { params: { token: string } }) {
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (password !== confirm) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:8080/reset-password/reset/${params.token}`, {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({
                    plainPassword: password,
                }).toString(),
            });

            if (!res.ok) {
                setError("Lien expiré ou mot de passe invalide.");
                return;
            }

            setSuccess(true);
            setTimeout(() => router.push("/login"), 3000);
        } catch {
            setError("Erreur réseau.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-lg space-y-4">
            <h1 className="text-2xl font-bold text-center text-[#2E2E2E]">
                Nouveau mot de passe
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="password">Nouveau mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <Label htmlFor="confirm">Confirmer</Label>
                    <Input
                        id="confirm"
                        type="password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                    />
                </div>

                {error && <Alert variant="error">{error}</Alert>}
                {success && <Alert variant="success">Mot de passe réinitialisé avec succès !</Alert>}

                <Button type="submit" className="w-full">
                    Réinitialiser
                </Button>
            </form>
        </div>
    );
}
