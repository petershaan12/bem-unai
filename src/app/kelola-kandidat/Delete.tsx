"use client";
import { toast } from "react-toastify";
import { deleteCandidate } from "../lib/candidate";

interface DeleteProps {
  id: string;
}

export default function Delete({ id }: DeleteProps) {
  const handleDelete = async () => {
    toast.promise(
      deleteCandidate(id),
      {
        pending: "Menghapus kandidat...",
        success: "Kandidat berhasil dihapus! 🎉",
        error: "Gagal menghapus kandidat 😢",
      },
      {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      }
    );
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
