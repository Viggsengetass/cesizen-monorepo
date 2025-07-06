import { FC, useState } from "react";
import { Dialog } from "@headlessui/react";

interface ContentCardProps {
    title: string;
    slug: string;
    type?: string;
    coverImage?: string;
    body?: string;
}

const ContentCard: FC<ContentCardProps> = ({ title, slug, type, coverImage, body }) => {
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
                    <h2 className="text-lg font-semibold text-[#2E2E2E]">{title}</h2>
                    <p className="text-sm text-[#A3D2CA]">{type}</p>
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
                    <h2 className="text-xl font-bold text-[#2E2E2E] mb-2">{title}</h2>
                    <p className="text-sm text-[#A3D2CA] mb-1">{type}</p>
                    <p className="text-gray-600 text-base">{body}</p>
                </Dialog.Panel>
            </Dialog>
        </>
    );
};

export default ContentCard;
