"use client";

import { useState } from "react";
import { updateEligibility } from "./action";
import { toast } from "react-toastify";

interface ToggleEligibilityProps {
  voterId: string;
  currentStatus: boolean;
  hasVoted: boolean;
}

export default function ToggleEligibility({
  voterId,
  currentStatus,
  hasVoted,
}: ToggleEligibilityProps) {
  const [isEligible, setIsEligible] = useState(currentStatus);
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    // Prevent disabling eligibility if user has already voted
    if (hasVoted && isEligible) {
      toast.error(
        "Tidak dapat menonaktifkan kelayakan pemilih yang sudah memberikan suara",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        }
      );
      return;
    }

    setLoading(true);
    const newStatus = !isEligible;

    try {
      const result = await updateEligibility(voterId, newStatus);

      if (result.errors) {
        toast.error(result.errors.message, {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      } else {
        setIsEligible(newStatus);
        toast.success(result.success?.message || "Status berhasil diupdate", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error("Gagal mengupdate status", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <span
        className={`text-sm ${isEligible ? "text-green-400" : "text-red-400"}`}
      >
        {isEligible ? "Ya" : "Tidak"}
      </span>
      <input
        type="checkbox"
        checked={isEligible}
        onChange={handleToggle}
        disabled={loading || (hasVoted && isEligible)}
        className={`toggle toggle-sm ${
          isEligible ? "toggle-success" : "toggle-error"
        } ${hasVoted && isEligible ? "opacity-50 cursor-not-allowed" : ""}`}
        title={
          hasVoted && isEligible
            ? "Tidak dapat dinonaktifkan karena sudah memberikan suara"
            : "Toggle kelayakan pemilih"
        }
      />
      {loading && <div className="loading loading-spinner loading-xs"></div>}
    </div>
  );
}
