"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);

        try {
            const res = await fetch("http://localhost:8080/api/login_check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                setError("Identifiants incorrects");
                return;
            }

            const data = await res.json();
            login(data.token);
            router.push("/"); // rediriger vers home après connexion réussie
        } catch {
            setError("Erreur réseau");
        }
    }

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Connexion</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <label>Mot de passe</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                {error && <p className="text-red-600">{error}</p>}

                <button
                    type="submit"
                    className="btn btn-primary w-full"
                >
                    Se connecter
                </button>
            </form>
        </div>
    );
}
