import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "outline";
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
    const base = "font-semibold py-2 px-4 rounded-2xl transition";
    const variants = {
        primary: "bg-[var(--cesizen-green)] text-white hover:bg-[#92c6a5]",
        secondary: "bg-[var(--cesizen-skyblue)] text-graphite hover:bg-[#8ec2c2]",
        outline: "border border-[var(--cesizen-green)] text-graphite hover:bg-[var(--cesizen-green)]/10",
    };

    return (
        <button className={cn(base, variants[variant], className)} {...props} />
    );
}
