export async function fetchContents(): Promise<any> {
    const token = localStorage.getItem("token");

    console.log("[fetchContents] 🔐 Token récupéré :", token);

    if (!token) {
        throw new Error("Aucun token d'authentification trouvé.");
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/contents`;
    console.log("[fetchContents] 📡 Appel de :", url);

    const response = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/ld+json",
        },
        cache: "no-store",
    });

    console.log("[fetchContents] 📶 Status réponse :", response.status);

    if (!response.ok) {
        console.error("[fetchContents] ❌ Erreur HTTP :", response.statusText);
        throw new Error(`Erreur lors du fetch : ${response.status}`);
    }

    const data = await response.json();

    console.log("[fetchContents] 📦 Données JSON :", data);
    console.log("[fetchContents] ✅ Contents reçus :", data["hydra:member"]);

    return data;
}
