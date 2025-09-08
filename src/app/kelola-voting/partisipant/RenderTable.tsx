"use client";

import * as XLSX from "xlsx";
import { useState, useMemo, useEffect } from "react";
import Delete from "./Delete";
import Reset from "./Reset";
import ToggleEligibility from "./ToggleEligibility";

export default function RenderTable({
  allPartisipants,
}: {
  allPartisipants: any[];
}) {
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!mounted) return "-"; // Return placeholder during SSR
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  const handleExport = () => {
    const formattedData = allPartisipants.map((participant) => ({
      Email: participant.email,
      "Tanggal Vote": participant.votedAt
        ? formatDate(participant.votedAt)
        : "-",
      "Layak Vote": participant.isEligible ? "Ya" : "Tidak",
      "Sudah Vote": participant.hasVoted ? "Ya" : "Tidak",
      "Dibuat Pada": formatDate(participant.createdAt),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const columnWidths = [
      { wch: 25 },
      { wch: 20 },
      { wch: 12 },
      { wch: 12 },
      { wch: 20 },
    ];
    worksheet["!cols"] = columnWidths;
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Partisipan");
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:-]/g, "");
    XLSX.writeFile(workbook, `partisipan-voting-${timestamp}.xlsx`);
  };

  // Filter partisipan berdasarkan email
  const filteredPartisipants = useMemo(() => {
    if (!search) return allPartisipants;
    return allPartisipants.filter((p) =>
      p.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, allPartisipants]);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <div className="flex justify-center items-center p-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="flex md:flex-col md:items-center gap-5 mb-6">
        <button
          onClick={handleExport}
          className="bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black"
        >
          Export to Excel
        </button>
        <input
          type="text"
          placeholder="Cari partisipan berdasarkan email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-80 text-black"
        />
      </div>

      <div className="overflow-x-auto w-full md:w-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Tanggal Vote</th>
              <th>Layak Vote</th>
              <th>Sudah Vote</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartisipants.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              filteredPartisipants.map((participant: any) => (
                <tr key={participant.id}>
                  <td className="font-bold">{participant.email}</td>
                  <td className="font-bold">
                    {participant.votedAt
                      ? formatDate(participant.votedAt)
                      : "-"}
                  </td>
                  <td className="font-bold">
                    <ToggleEligibility
                      voterId={participant.id}
                      currentStatus={participant.isEligible}
                      hasVoted={participant.hasVoted}
                    />
                  </td>
                  <td className="font-bold">
                    {participant.hasVoted ? "Ya" : "Tidak"}
                  </td>
                  <td>
                    <Reset id={participant.id} />
                    <Delete id={participant.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Email</th>
              <th>Tanggal Vote</th>
              <th>Layak Vote</th>
              <th>Sudah Vote</th>
              <th>Aksi</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
