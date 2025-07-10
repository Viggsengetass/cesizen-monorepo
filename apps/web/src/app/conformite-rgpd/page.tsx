export default function ConformiteRGPD() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-graphite space-y-6">
            <h1 className="text-3xl font-bold mb-4">Conformité RGPD</h1>

            <p>
                CESIZen s'engage pleinement à respecter le Règlement Général sur la Protection des Données (RGPD),
                entré en vigueur le 25 mai 2018.
            </p>

            <h2 className="text-2xl font-semibold">Responsable du traitement</h2>
            <p>
                Les données personnelles sont traitées sous la responsabilité de l'équipe CESIZen (projet académique au sein de CESI).
            </p>

            <h2 className="text-2xl font-semibold">Finalité du traitement</h2>
            <p>
                Les données collectées ont pour but exclusif d’offrir une expérience personnalisée, favoriser le bien-être émotionnel,
                et permettre le suivi des émotions et des exercices réalisés.
            </p>

            <h2 className="text-2xl font-semibold">Base légale</h2>
            <p>
                Le traitement est fondé sur le consentement explicite de l’utilisateur lors de son inscription.
            </p>

            <h2 className="text-2xl font-semibold">Droits de l’utilisateur</h2>
            <ul className="list-disc pl-5">
                <li>Droit à l'information</li>
                <li>Droit d'accès</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement ("droit à l'oubli")</li>
                <li>Droit à la portabilité</li>
                <li>Droit d’opposition</li>
            </ul>

            <h2 className="text-2xl font-semibold">Sous-traitants</h2>
            <p>
                Aucune donnée n’est transmise à des sous-traitants tiers.
                Toute donnée reste strictement interne à l’environnement sécurisé CESIZen.
            </p>

            <p>
                Pour toute demande RGPD, contactez-nous à <a href="mailto:rgpd@cesizen.app" className="underline text-[#A8D5BA]">rgpd@cesizen.app</a>
            </p>
        </main>
    )
}
