"use client";

import { useState } from "react";
import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Variant = "primary" | "secondary" | "outline" | "soft";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
};

const base = "font-semibold py-2 px-4 rounded-2xl border focus:outline-none";

const variants: Record<Variant, string> = {
    primary: "bg-[var(--cesizen-green)] text-white border-transparent",
    secondary: "bg-[var(--cesizen-skyblue)] text-graphite border-transparent",
    outline: "bg-transparent text-graphite border-[var(--cesizen-green)]",
    soft: "bg-[#fefefe] text-graphite border-[var(--cesizen-green)]",
};

const hoverMap: Record<Variant, Variant> = {
    primary: "secondary",
    secondary: "outline",
    outline: "primary",
    soft: "primary",
};

export function Button({ variant = "primary", className, ...props }: ButtonProps) {
    const [isHovered, setHovered] = useState(false);
    const currentVariant = isHovered ? hoverMap[variant] : variant;

    return (
        <motion.button
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
                duration: 0.3,
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={cn(base, variants[currentVariant], "transition-colors duration-300", className)}
            {...props}
        />
    );
}
