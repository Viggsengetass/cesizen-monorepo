import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={cn("bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition", className)}>
            {children}
        </div>
    );
}
