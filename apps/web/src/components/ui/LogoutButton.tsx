"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "./Button";
import { useAuth } from "@/context/AuthContext";
import { ConfirmDialog } from "./ConfirmDialog";

export function LogoutButton(): JSX.Element {
    const { logout } = useAuth();
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);

    function handleConfirmLogout() {
        logout();
        router.push("/login");
    }

    return (
        <>
            <Button
                onClick={() => setShowDialog(true)}
                className="btn-outline flex items-center gap-2"
            >
                <LogOut className="w-4 h-4" />
                Se déconnecter
            </Button>

            <ConfirmDialog
                open={showDialog}
                title="Se déconnecter"
                message="Êtes-vous sûr de vouloir vous déconnecter ?"
                onConfirm={handleConfirmLogout}
                onCancel={() => setShowDialog(false)}
            />
        </>
    );
}
