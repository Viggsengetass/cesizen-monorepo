import Link from "next/link"

export default function Footer() {
    return (
        <footer className="bg-cloud text-sm text-graphite py-6 px-4 mt-10 border-t border-[#A3D2CA]">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 items-center text-center md:text-left">
                {/* Marque */}
                <p>
                    © {new Date().getFullYear()} <span className="font-medium">CESIZen</span>. Tous droits réservés.
                </p>

                {/* Liens RGPD */}
                <div className="flex justify-center md:justify-end gap-4">
                    <Link
                        href="/politique-de-confidentialite"
                        className="hover:text-[#A8D5BA] transition"
                    >
                        Politique de confidentialité
                    </Link>
                    <Link
                        href="/conformite-rgpd"
                        className="hover:text-[#A8D5BA] transition"
                    >
                        Conformité RGPD
                    </Link>
                    <Link
                        href="/mention-legales"
                        className="hover:text-[#A8D5BA] transition"
                    >
                        Mentions légales
                    </Link>
                </div>
            </div>
        </footer>
    )
}
