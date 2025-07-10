export default function PolitiqueConfidentialite() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-graphite space-y-6">
            <h1 className="text-3xl font-bold mb-4">Politique de confidentialité</h1>

            <p>
                La présente politique de confidentialité décrit comment l'application
                <strong> CESIZen </strong> collecte, utilise et protège vos données
                personnelles, conformément au Règlement Général sur la Protection des Données (RGPD).
            </p>

            <h2 className="text-2xl font-semibold">Données collectées</h2>
            <ul className="list-disc pl-5">
                <li>Adresse e-mail (lors de l’inscription)</li>
                <li>Données émotionnelles saisies par l’utilisateur</li>
                <li>Historique des exercices effectués</li>
            </ul>

            <h2 className="text-2xl font-semibold">Utilisation des données</h2>
            <p>Ces données sont utilisées uniquement pour :</p>
            <ul className="list-disc pl-5">
                <li>Personnaliser l'expérience utilisateur</li>
                <li>Suivre l’évolution émotionnelle de l’utilisateur</li>
                <li>Améliorer les fonctionnalités de l’application</li>
            </ul>

            <h2 className="text-2xl font-semibold">Durée de conservation</h2>
            <p>
                Les données sont conservées tant que le compte utilisateur est actif. Vous pouvez demander leur suppression à tout moment.
            </p>

            <h2 className="text-2xl font-semibold">Sécurité</h2>
            <p>
                Vos données sont stockées sur des serveurs sécurisés, et ne sont jamais partagées avec des tiers sans votre consentement.
            </p>

            <h2 className="text-2xl font-semibold">Vos droits</h2>
            <ul className="list-disc pl-5">
                <li>Accès à vos données</li>
                <li>Modification ou suppression</li>
                <li>Portabilité sur demande</li>
            </ul>

            <p>
                Pour toute question : contactez-nous à <a href="mailto:contact@cesizen.app" className="underline text-[#A8D5BA]">contact@cesizen.app</a>
            </p>
        </main>
    )
}
