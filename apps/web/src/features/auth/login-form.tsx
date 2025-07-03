"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/api/login_check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!res.ok) {
                setError("Identifiants incorrects.");
                return;
            }

            const data = await res.json();
            localStorage.setItem("token", data.token);

            router.push("/");
        } catch (err) {
            setError("Erreur lors de la connexion.");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium mb-1">Email</label>
                <input
                    type="email"
                    className="border p-2 rounded w-full"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label className="block font-medium mb-1">Mot de passe</label>
                <input
                    type="password"
                    className="border p-2 rounded w-full"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Se connecter
            </button>
        </form>
    );
}
