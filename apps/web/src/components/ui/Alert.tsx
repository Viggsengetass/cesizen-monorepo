import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AlertProps = {
    type?: "info" | "success" | "error";
    children: ReactNode;
    className?: string;
};

const variantStyles = {
    info: "bg-[var(--cesizen-skyblue)] text-[var(--cesizen-graphite)]",
    success: "bg-[var(--cesizen-green)]/20 text-[var(--cesizen-graphite)]",
    error: "bg-[var(--cesizen-softpink)] text-[var(--cesizen-graphite)]",
};

export function Alert({ type = "info", children, className }: AlertProps) {
    return (
        <div
            className={cn(
                "p-4 rounded-xl text-sm",
                variantStyles[type],
                className
            )}
        >
            {children}
        </div>
    );
}
