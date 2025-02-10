"use client";
import { deletePortal } from "../lib/portal";
import { toast } from "react-toastify";

interface DeletePortalProps {
    id: string;
}

export default function DeletePortal({ id }: DeletePortalProps) {
    const handleDelete = async () => {
        toast.promise(
            deletePortal(id),
            {
                pending: "Menghapus data...",
                success: "Portal berhasil dihapus! 🎉",
                error: "Gagal menghapus portal 😢",
            },
            {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            }
        );
    };

    return (
        <button onClick={handleDelete} className="ml-3 text-xs hover:underline text-red-500">
            delete
        </button>
    );
}
