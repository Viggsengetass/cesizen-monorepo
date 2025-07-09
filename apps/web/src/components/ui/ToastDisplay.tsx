"use client";

import { useToast } from "./use-toast";

export function ToastDisplay() {
    const { toasts } = useToast();

    return (
        <div className="fixed bottom-4 right-4 space-y-2 z-50">
            {toasts.map(({ id, title, description }) => (
                <div
                    key={id}
                    className="bg-[#A8D5BA] text-[#2E2E2E] px-4 py-3 rounded-2xl shadow-lg"
                >
                    {title && <div className="font-bold">{title}</div>}
                    {description && <div>{description}</div>}
                </div>
            ))}
        </div>
    );
}
