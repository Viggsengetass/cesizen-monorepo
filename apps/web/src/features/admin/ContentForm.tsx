"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

function slugify(text: string) {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export default function ContentForm() {
    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [body, setBody] = useState("");
    const [type, setType] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [mediaUrls, setMediaUrls] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const contentData = {
            title,
            slug: slugify(title),
            coverImage,
            body,
            type: type || null,
            videoUrl: videoUrl || null,
            mediaUrls: mediaUrls ? mediaUrls.split(",").map(url => url.trim()) : null,
        };

        console.log("Données envoyées au backend :", contentData);

        try {
            const res = await fetch("http://localhost:8080/api/contents", {
                method: "POST",
                headers: {
                    "Content-Type": "application/ld+json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(contentData),
            });

            const data = await res.json();
            console.log("Réponse serveur :", data);

            if (res.ok) {
                alert("Contenu créé !");
                setTitle("");
                setCoverImage("");
                setBody("");
                setType("");
                setVideoUrl("");
                setMediaUrls("");
            } else {
                alert("Erreur à la création");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur réseau lors de la création");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="title">Titre</Label>
                <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ex : Les bienfaits de la méditation"
                    required
                />
            </div>
            <div>
                <Label htmlFor="coverImage">URL de l’image</Label>
                <Input
                    id="coverImage"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    placeholder="Ex : https://images.unsplash.com/photo..."
                />
            </div>
            <div>
                <Label htmlFor="body">Contenu</Label>
                <Textarea
                    id="body"
                    rows={6}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="Ex : La méditation permet de réduire le stress..."
                    required
                />
            </div>
            <div>
                <Label htmlFor="type">Catégorie de contenu</Label>
                <select
                    id="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="border border-[#A3D2CA] rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-[#A8D5BA] bg-white"
                >
                    <option value="">-- Sélectionnez une catégorie --</option>
                    <option value="meditation">Méditation</option>
                    <option value="respiration">Respiration</option>
                    <option value="sommeil">Sommeil</option>
                    <option value="gestion-du-stress">Gestion du stress</option>
                    <option value="pleine-conscience">Pleine conscience</option>
                </select>
            </div>
            <div>
                <Label htmlFor="videoUrl">Vidéo (optionnelle)</Label>
                <Input
                    id="videoUrl"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    placeholder="Ex : https://www.youtube.com/embed/..."
                />
            </div>
            <div>
                <Label htmlFor="mediaUrls">URLs médias (séparées par des virgules)</Label>
                <Textarea
                    id="mediaUrls"
                    rows={3}
                    value={mediaUrls}
                    onChange={(e) => setMediaUrls(e.target.value)}
                    placeholder="Ex : https://image1.jpg, https://image2.jpg"
                />
            </div>
            <Button type="submit" className="btn-primary">
                Ajouter le contenu
            </Button>
        </form>
    );
}
