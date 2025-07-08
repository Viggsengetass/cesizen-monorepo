export default function PolitiqueCookies() {
    return (
        <main className="max-w-3xl mx-auto py-16 px-4 text-graphite">
            <h1 className="text-3xl font-bold mb-8">Politique de cookies</h1>

            <section className="mb-8 space-y-4">
                <p>
                    Cette politique de cookies explique comment <strong>CESIZen</strong> utilise des cookies
                    et technologies similaires pour vous garantir une expérience optimale sur notre
                    application web.
                </p>
                <p>
                    En accédant à notre site, vous consentez à l’utilisation de cookies conformément à cette
                    politique, sauf si vous choisissez de les désactiver.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Qu’est-ce qu’un cookie ?</h2>
                <p>
                    Un cookie est un petit fichier texte enregistré sur votre appareil (ordinateur,
                    smartphone…) lors de votre visite. Il permet à un site web de se souvenir de vos actions
                    et préférences pendant un certain temps.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Pourquoi utilisons-nous des cookies ?</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Fonctionnement</strong> : garantir un bon fonctionnement de l’application (ex :
                        authentification, navigation).
                    </li>
                    <li>
                        <strong>Préférences</strong> : enregistrer vos choix (ex : thème clair/sombre, langue).
                    </li>
                    <li>
                        <strong>Statistiques</strong> : collecter des données anonymes pour améliorer les
                        contenus et l’expérience utilisateur.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Quels cookies utilisons-nous ?</h2>
                <ul className="list-disc list-inside space-y-2">
                    <li>
                        <strong>Cookies essentiels</strong> : nécessaires pour se connecter et accéder aux
                        services.
                    </li>
                    <li>
                        <strong>Cookies de performance</strong> : utilisés pour analyser l’usage de la
                        plateforme, via des outils anonymisés.
                    </li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Accepter ou refuser les cookies</h2>
                <p>
                    Lors de votre première visite, une bannière vous permet d’accepter ou de refuser les
                    cookies. Vous pouvez également modifier vos préférences à tout moment en vidant le cache
                    ou en ajustant vos paramètres de navigateur.
                </p>
            </section>

            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-2">Contact</h2>
                <p>
                    Pour toute question sur notre politique de cookies, contactez-nous à :{" "}
                    <a
                        href="mailto:contact@cesizen.app"
                        className="underline text-[var(--cesizen-green)] hover:text-[#92c6a5]"
                    >
                        contact@cesizen.app
                    </a>
                </p>
            </section>
        </main>
    );
}
