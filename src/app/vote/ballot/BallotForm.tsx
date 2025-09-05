"use client";

import Image from "next/image";
import Link from "next/link";
import { submitVote } from "./action";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BallotForm({ candidates }: { candidates: any[] }) {
  const [loading, setLoading] = useState<string | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  function handleCandidateClick(candidate: any) {
    setSelectedCandidate(candidate);
    setShowConfirmation(true);
  }

  async function confirmVote() {
    if (!selectedCandidate) return;

    setLoading(selectedCandidate.id);
    setShowConfirmation(false);

    try {
      const res = await submitVote(selectedCandidate.id);
      if (res?.ok) {
        toast.success("Vote berhasil! Email receipt telah dikirim.", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
        setTimeout(() => {
          router.push("/vote/thankyou");
        }, 1500);
      }
    } catch (err: any) {
      // Handle different types of errors in production
      let errorMessage = "Terjadi kesalahan saat vote.";

      if (err?.message) {
        // Check for specific error messages
        if (err.message.includes("Unauthorized")) {
          errorMessage = "Anda tidak memiliki akses untuk vote.";
        } else if (err.message.includes("Voting is closed")) {
          errorMessage = "Periode voting telah berakhir.";
        } else if (err.message.includes("Candidate not found")) {
          errorMessage = "Kandidat tidak ditemukan.";
        } else if (
          err.message.includes("Tidak Layak Vote") ||
          err.message.includes("Sudah Memilih")
        ) {
          errorMessage = "Anda tidak layak vote atau sudah memilih sebelumnya.";
        } else if (
          err.message.includes("Network") ||
          err.message.includes("fetch")
        ) {
          errorMessage = "Masalah koneksi. Silakan coba lagi.";
        } else if (err.message.includes("digest")) {
          // Production error dengan digest
          errorMessage =
            "Terjadi kesalahan server. Silakan coba lagi atau hubungi admin.";
        }
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        theme: "dark",
      });
    } finally {
      setLoading(null);
      setSelectedCandidate(null);
    }
  }

  function cancelVote() {
    setShowConfirmation(false);
    setSelectedCandidate(null);
  }

  return (
    <>
      {/* Modal Konfirmasi */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-black mb-4 text-center">
              Konfirmasi Pilihan
            </h3>
            <div className="text-center mb-6">
              <Image
                src={selectedCandidate?.photo ?? ""}
                alt={selectedCandidate?.name ?? ""}
                width={150}
                height={150}
                className="mx-auto rounded-lg object-cover w-32 h-32 mb-3"
              />
              <p className="text-black">
                Apakah Anda yakin memilih{" "}
                <span className="font-bold text-secondary">
                  {selectedCandidate?.name}
                </span>
                ?
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Setelah memilih, Anda tidak dapat mengubah pilihan.
              </p>
              <p className="text-blue-600 text-sm mt-2">
                📧 Receipt akan dikirim ke email Anda.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={cancelVote}
                className="px-6 py-2 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition"
              >
                Batal
              </button>
              <button
                onClick={confirmVote}
                disabled={loading !== null}
                className="px-6 py-2 bg-secondary text-black rounded-lg hover:bg-opacity-90 transition disabled:opacity-50"
              >
                Ya, Saya Yakin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-secondary"></div>
              <p className="text-black">
                Memproses vote dan mengirim receipt...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Kandidat List */}
      <div className="flex flex-wrap items-center gap-20 justify-center">
        {candidates.map((c) => (
          <div key={c.id}>
            <Image
              src={c.photo ?? ""}
              alt={c.name}
              width={300}
              height={300}
              onClick={() => handleCandidateClick(c)}
              className="bg-gray-400 rounded-lg hover:scale-105 transition cursor-pointer object-cover w-full h-72"
            />
            <h2 className="text-2xl text-center font-bold text-white mt-5">
              {c.name}
            </h2>
            <Link
              href={c.url || "#"}
              target="_blank"
              className="text-secondary hover:underline font-light block text-center"
            >
              Visi & Misi
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
