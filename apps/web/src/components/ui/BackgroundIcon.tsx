"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
    children: ReactNode;
    className?: string;
    color?: string;
    size?: string;
    opacity?: string;
    style?: React.CSSProperties;
};

export default function BackgroundIcon({
                                           children,
                                           className = "",
                                           color = "#D5CFE1",
                                           size = "w-32 h-32",
                                           opacity = "opacity-20",
                                           style = {},
                                       }: Props) {
    return (
        <div
            className={cn("absolute pointer-events-none z-0", size, opacity, className)}
            style={{ color, ...style }}
        >
            {children}
        </div>
    );
}
