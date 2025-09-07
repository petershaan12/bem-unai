"use client";
import { toast } from "react-toastify";
import { resetPartisipant } from "@/app/lib/partisipant";

interface ResetProps {
  id: string;
}

export default function Reset({ id }: ResetProps) {
  const handleReset = async () => {
    toast.promise(
      resetPartisipant(id),
      {
        pending: "Mereset partisipan...",
        success: "Partisipan berhasil direset! 🎉",
        error: "Gagal mereset partisipan 😢",
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
      onClick={handleReset}
      className="ml-3 text-xs hover:underline text-blue-500"
    >
      reset
    </button>
  );
}
