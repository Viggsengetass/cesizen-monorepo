import { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea({ className, ...props }: TextareaProps) {
    return (
        <textarea
            {...props}
            className={cn(
                "border border-[var(--cesizen-skyblue)] rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-[var(--cesizen-green)] resize-none min-h-[100px]",
                className
            )}
        />
    );
}
