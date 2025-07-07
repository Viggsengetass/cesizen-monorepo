export function cn(...classes: (string | undefined | false)[]) {
    return classes.filter(Boolean).join(" ");
}
export function getJwtToken(): string | null {
    if (typeof window !== "undefined") {
        return localStorage.getItem("token");
    }
    return null;
}
