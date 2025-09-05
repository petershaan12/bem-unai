"use client";
import { toast } from "react-toastify";
import { deletePartisipant } from "@/app/lib/partisipant";

interface DeleteProps {
  id: string;
}

export default function Delete({ id }: DeleteProps) {
  const handleDelete = async () => {
    toast.promise(
      deletePartisipant(id),
      {
        pending: "Menghapus partisipan...",
        success: "Partisipan berhasil dihapus! 🎉",
        error: "Gagal menghapus partisipan 😢",
      },
      {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      }
    );

    // Setelah penghapusan, refresh halaman
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };

  return (
    <button
      onClick={handleDelete}
      className="ml-3 text-xs hover:underline text-red-500"
    >
      delete
    </button>
  );
}
