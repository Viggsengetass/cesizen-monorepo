"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

function slugify(text: string) {
    return text
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

type Content = {
    id: number;
    title: string;
    coverImage?: string;
    body: string;
    type?: string;
    videoUrl?: string;
    mediaUrls?: string[];
};

export default function ContentForm({
                                        onCreated,
                                        existingContent,
                                    }: {
    onCreated?: () => void;
    existingContent?: Content | null;
}) {
    const [title, setTitle] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [body, setBody] = useState("");
    const [type, setType] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [mediaUrls, setMediaUrls] = useState("");

    useEffect(() => {
        if (existingContent) {
            setTitle(existingContent.title || "");
            setCoverImage(existingContent.coverImage || "");
            setBody(existingContent.body || "");
            setType(existingContent.type || "");
            setVideoUrl(existingContent.videoUrl || "");
            setMediaUrls(existingContent.mediaUrls?.join(", ") || "");
        }
    }, [existingContent]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        const contentData = {
            title,
            slug: slugify(title),
            coverImage: coverImage || null,
            body,
            type: type || null,
            videoUrl: videoUrl || null,
            mediaUrls: mediaUrls
                ? mediaUrls.split(",").map((url) => url.trim())
                : null,
        };

        const url = existingContent
            ? `http://localhost:8080/api/contents/${existingContent.id}`
            : `http://localhost:8080/api/contents`;

        const method = existingContent ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/ld+json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(contentData),
            });

            if (res.ok) {
                alert(existingContent ? "Contenu modifié !" : "Contenu créé !");
                setTitle("");
                setCoverImage("");
                setBody("");
                setType("");
                setVideoUrl("");
                setMediaUrls("");
                onCreated?.();
            } else {
                alert("Erreur lors de l'enregistrement du contenu");
            }
        } catch (error) {
            console.error("Erreur réseau :", error);
            alert("Erreur réseau");
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
                    className="input bg-white"
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
                {existingContent ? "Modifier le contenu" : "Ajouter le contenu"}
            </Button>
        </form>
    );
}
