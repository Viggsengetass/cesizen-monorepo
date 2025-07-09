"use client";

import { useCallback, useState } from "react";


type Toast = {
    id: number;
    title?: string;
    description?: string;
};

let idCounter = 0;

export function useToast() {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = useCallback(({ title, description }: Omit<Toast, "id">) => {
        const id = ++idCounter;
        setToasts((prev) => [...prev, { id, title, description }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    return { toast, toasts };
}
