import { InputHTMLAttributes } from "react";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            className="border border-[var(--cesizen-skyblue)] rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-[var(--cesizen-green)]"
        />
    );
}
