"use client";

import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import {Textarea} from "@/components/ui/Textarea";

export default function ContentForm() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        const res = await fetch("http://localhost:8080/api/contents", {
            method: "POST",
            headers: {
                "Content-Type": "application/ld+json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                title,
                image,
                content,
            }),
        });

        if (res.ok) {
            alert("Contenu créé !");
            setTitle("");
            setImage("");
            setContent("");
        } else {
            alert("Erreur à la création");
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
                    required
                />
            </div>
            <div>
                <Label htmlFor="image">URL de l’image</Label>
                <Input
                    id="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    required
                />
            </div>
            <div>
                <Label htmlFor="content">Contenu</Label>
                <Textarea
                    id="content"
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <Button type="submit" className="btn-primary">
                Ajouter le contenu
            </Button>
        </form>
    );
}
