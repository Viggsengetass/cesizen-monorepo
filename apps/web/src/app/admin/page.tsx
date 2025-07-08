"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import AdminDashboard from "@/features/admin/AdminDashboard";

export default function AdminPage() {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || !user?.roles?.includes("ROLE_ADMIN")) {
            router.push("/login");
        }
    }, [isAuthenticated, user, router]);

    return <AdminDashboard />;
}
