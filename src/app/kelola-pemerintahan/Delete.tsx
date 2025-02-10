"use client";
import { deleteOrganisasi } from "../lib/organisasi";
import { toast } from "react-toastify";

interface DeleteProps {
    id: string;
}

export default function Delete({ id }: DeleteProps) {
    const handleDelete = async () => {
        toast.promise(
            deleteOrganisasi(id),
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
