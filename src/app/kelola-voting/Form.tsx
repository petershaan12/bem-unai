"use client";

import { useState } from "react";
import { updateElectionConfig } from "@/app/lib/election_config";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

interface ElectionConfig {
  id: string;
  opensAt: Date;
  closesAt: Date;
  isActive: boolean;
  isShowResultsAfterVotingEnds: boolean;
}

type PrevData = {
  id: string;
  opensAt: Date;
  closesAt: Date;
  isActive: boolean;
  isShowResultsAfterVotingEnds: boolean;
};

export default function Form({ prevData }: { prevData?: PrevData }) {
  const [startTime, setStartTime] = useState(
    prevData?.opensAt?.toISOString().slice(0, 16) ?? ""
  );
  const [endTime, setEndTime] = useState(
    prevData?.closesAt?.toISOString().slice(0, 16) ?? ""
  );
  const [isActive, setIsActive] = useState(prevData?.isActive ?? true);
  const [isShowResultsAfterVotingEnds, setIsShowResultsAfterVotingEnds] =
    useState(prevData?.isShowResultsAfterVotingEnds ?? true);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    // Validasi waktu
    if (new Date(startTime) >= new Date(endTime)) {
      setError("Waktu mulai harus lebih awal dari waktu berakhir");
      return;
    }

    const formData = new FormData();
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("isActive", isActive.toString());
    formData.append(
      "isShowResultsAfterVotingEnds",
      isShowResultsAfterVotingEnds.toString()
    );

    try {
      await updateElectionConfig(formData);

      toast.success("Konfigurasi waktu voting berhasil disimpan!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });

      setTimeout(() => {
        redirect("/kelola-voting");
      }, 1000);
    } catch (error: any) {
      setError(error.message || "Gagal menyimpan konfigurasi");
      toast.error("Gagal menyimpan konfigurasi", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="mb-4">
        <label className="label">
          <span className="text-base label-text">Waktu Mulai</span>
        </label>
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          className="w-full text-black input input-bordered input-secondary"
          required
        />
      </div>

      <div className="mb-4">
        <label className="label">
          <span className="text-base label-text">Waktu Berakhir</span>
        </label>
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          className="w-full text-black input input-bordered input-secondary"
          required
        />
      </div>

      <div className="mb-4">
        <label className="label cursor-pointer">
          <span className="text-base label-text">Aktifkan Pemilu</span>
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="label cursor-pointer">
          <span className="text-base label-text">
            Tampilkan Hasil Setelah Pemungutan Suara
          </span>
          <input
            type="checkbox"
            checked={isShowResultsAfterVotingEnds}
            onChange={(e) => setIsShowResultsAfterVotingEnds(e.target.checked)}
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full mt-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black"
      >
        {prevData ? "Update Konfigurasi" : "Simpan Konfigurasi"}
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
