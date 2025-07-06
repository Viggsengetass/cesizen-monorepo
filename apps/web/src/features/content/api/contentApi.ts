export async function fetchContents() {
    const token = localStorage.getItem('token'); // ou 'authToken', selon ton app
    if (!token) {
        throw new Error("Aucun token d'authentification trouvé.");
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contents`, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/ld+json', // ✅ CORRIGÉ ICI
        },
    });

    if (!response.ok) {
        throw new Error(`Erreur lors du fetch : ${response.status}`);
    }

    return await response.json();
}
