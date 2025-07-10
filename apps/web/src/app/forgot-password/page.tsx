'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('http://localhost:8080/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        });

        if (response.ok) {
            setSubmitted(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F6F9FC] p-4">
            <div className="card w-full max-w-md">
                <h1 className="text-2xl font-bold text-[#2E2E2E] mb-4 text-center">Mot de passe oublié</h1>

                {submitted ? (
                    <div className="bg-[#A3D2CA] text-[#2E2E2E] p-4 rounded-xl text-center">
                        Si cet email est connu, un lien de réinitialisation a été envoyé.
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <label className="block text-sm font-medium text-[#2E2E2E]">Email</label>
                        <input
                            type="email"
                            required
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button type="submit" className="btn-primary w-full">Envoyer le lien</button>
                    </form>
                )}
            </div>
        </div>
    );
}
