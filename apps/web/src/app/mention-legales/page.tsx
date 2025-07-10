export default function MentionsLegales() {
    return (
        <main className="max-w-3xl mx-auto px-4 py-10 text-graphite space-y-6">
            <h1 className="text-3xl font-bold mb-4">Mentions légales</h1>

            <p>
                Conformément à la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique,
                il est précisé aux utilisateurs de l’application <strong>CESIZen</strong> l'identité des différents intervenants
                dans le cadre de sa réalisation et de son suivi.
            </p>

            <h2 className="text-2xl font-semibold">Éditeur de l’application</h2>
            <p>
                <strong>CESIZen</strong> est un projet pédagogique développé dans le cadre de la formation Concepteur Développeur d’Applications au CESI.
            </p>
            <p>
                Responsable de publication : Paul Antoine – Étudiant CDA CESI<br />
                Email : <a href="mailto:contact@cesizen.app" className="underline text-[#A8D5BA]">contact@cesizen.app</a>
            </p>

            <h2 className="text-2xl font-semibold">Hébergement</h2>
            <p>
                L’application est hébergée localement dans un environnement Docker à des fins d’évaluation pédagogique.
                Aucun hébergeur externe n’est impliqué pour l’instant.
            </p>

            <h2 className="text-2xl font-semibold">Propriété intellectuelle</h2>
            <p>
                Le contenu de l’application CESIZen est original et protégé par le droit d’auteur.
                Toute reproduction non autorisée est interdite.
            </p>

            <h2 className="text-2xl font-semibold">Limitation de responsabilité</h2>
            <p>
                L’application CESIZen est un outil d’aide au bien-être sans valeur médicale.
                Elle ne se substitue en aucun cas à un avis ou un suivi professionnel.
            </p>

            <h2 className="text-2xl font-semibold">Contact</h2>
            <p>
                Pour toute question, vous pouvez nous écrire à <a href="mailto:contact@cesizen.app" className="underline text-[#A8D5BA]">contact@cesizen.app</a>
            </p>
        </main>
    )
}
