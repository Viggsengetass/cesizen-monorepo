"use client"

import ProtectedRoute from "@/components/layout/ProtectedRoute"
import { Card } from "@/components/ui/Card"

const ExercisesPage = () => {
    return (
        <ProtectedRoute>
            <section className="max-w-4xl mx-auto py-10 px-4">
                <h1 className="text-2xl font-semibold mb-6">Exercices de respiration</h1>
                <Card>
                    <p className="text-base leading-relaxed">
                        Bienvenue dans votre espace de recentrage. 🌿
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                        Vous trouverez bientôt ici des exercices interactifs pour vous détendre, respirer profondément et vous reconnecter à vous-même.
                    </p>
                </Card>
            </section>
        </ProtectedRoute>
    )
}

export default ExercisesPage
