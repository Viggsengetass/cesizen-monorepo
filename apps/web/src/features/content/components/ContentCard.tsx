// src/features/content/components/ContentCard.tsx
import { Content } from "@/features/content/types/Content";

type Props = {
    content: Content;
};

export default function ContentCard({ content }: Props) {
    return (
        <div className="border p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{content.title}</h2>
            <p className="text-sm text-gray-600">{content.description}</p>
        </div>
    );
}
