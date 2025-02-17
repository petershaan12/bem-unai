"use client";
import { toast } from "react-toastify";
import { deletePost } from "../lib/pots";

interface DeleteProps {
    id: string;
}

export default function Delete({ id }: DeleteProps) {
    const handleDelete = async () => {
        toast.promise(
            deletePost(id),
            {
                pending: "Menghapus data...",
                success: "Berita berhasil dihapus! 🎉",
                error: "Gagal menghapus berita 😢",
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
