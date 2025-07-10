"use client";

import { FC, useState } from "react";
import { Dialog } from "@headlessui/react";

interface ContentCardProps {
    title: string;
    slug: string;
    type?: string;
    coverImage?: string;
    body?: string;
}

function getBadgeStyle(type: string) {
    switch (type) {
        case "meditation":
            return "bg-[#D5CFE1] text-[#2E2E2E]";
        case "respiration":
            return "bg-[#A3D2CA] text-[#2E2E2E]";
        case "sommeil":
            return "bg-[#FADADD] text-[#2E2E2E]";
        case "gestion-du-stress":
            return "bg-[#A8D5BA] text-white";
        case "pleine-conscience":
            return "bg-[#F6F9FC] text-[#2E2E2E] border border-[#D5CFE1]";
        default:
            return "bg-gray-300 text-gray-700";
    }
}

const ContentCard: FC<ContentCardProps> = ({ title, slug, type = "", coverImage, body }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="card cursor-pointer flex items-center gap-4 transition hover:scale-[1.02]"
                onClick={() => setIsOpen(true)}
            >
                {coverImage && (
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-20 h-20 object-cover rounded-xl"
                    />
                )}
                <div>
                    {type && (
                        <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-2xl mb-1 ${getBadgeStyle(type)}`}
                        >
                            {type.replace(/-/g, " ")}
                        </span>
                    )}
                    <h2 className="text-lg font-semibold text-[#2E2E2E]">{title}</h2>
                    <p className="text-xs text-gray-500 italic">/{slug}</p>
                </div>
            </div>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            >
                <Dialog.Panel className="card max-w-xl w-full bg-white rounded-2xl shadow-lg p-6 relative">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-[#2E2E2E] text-xl"
                    >
                        ×
                    </button>
                    {coverImage && (
                        <img
                            src={coverImage}
                            alt={title}
                            className="w-full h-48 object-cover rounded-xl mb-4"
                        />
                    )}
                    {type && (
                        <span
                            className={`inline-block px-3 py-1 text-xs font-semibold rounded-2xl mb-2 ${getBadgeStyle(type)}`}
                        >
                            {type.replace(/-/g, " ")}
                        </span>
                    )}
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-2">{title}</h2>
                    <p className="text-gray-600 text-base whitespace-pre-wrap">{body}</p>
                </Dialog.Panel>
            </Dialog>
        </>
    );
};

export default ContentCard;
