import { ReactNode } from "react";

export function IconWrapper({ children }: { children: ReactNode }) {
    return (
        <div className="text-[var(--cesizen-green)]">{children}</div>
    );
}
