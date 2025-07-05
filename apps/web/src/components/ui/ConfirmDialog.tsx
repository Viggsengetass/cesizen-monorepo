"use client";

import { Dialog } from "@headlessui/react";
import { Button } from "./Button";

interface ConfirmDialogProps {
    open: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

export function ConfirmDialog({ open, title, message, onConfirm, onCancel }: ConfirmDialogProps) {
    return (
        <Dialog open={open} onClose={onCancel} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="card w-full max-w-md space-y-4">
                    <Dialog.Title className="text-lg font-bold text-graphite">
                        {title}
                    </Dialog.Title>
                    <p className="text-base text-gray-600">{message}</p>
                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={onCancel}>Annuler</Button>
                        <Button className="btn-primary" onClick={onConfirm}>Oui</Button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
