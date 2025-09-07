"use client";

import * as XLSX from "xlsx";

export default function RenderTable({
  allPartisipants,
}: {
  allPartisipants: any[];
}) {
  const handleExport = () => {
    // Format data sebelum export
    const formattedData = allPartisipants.map((participant) => ({
      Email: participant.email,
      "Tanggal Vote": participant.votedAt
        ? new Date(participant.votedAt).toLocaleString("id-ID", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Asia/Jakarta",
          })
        : "-",
      "Layak Vote": participant.isEligible ? "Ya" : "Tidak",
      "Sudah Vote": participant.hasVoted ? "Ya" : "Tidak",
      "Dibuat Pada": new Date(participant.createdAt).toLocaleString("id-ID", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Jakarta",
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // Auto-resize columns
    const columnWidths = [
      { wch: 25 }, // Email
      { wch: 20 }, // Tanggal Vote
      { wch: 12 }, // Layak Vote
      { wch: 12 }, // Sudah Vote
      { wch: 20 }, // Dibuat Pada
    ];
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Partisipan");

    // Generate filename dengan timestamp
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:-]/g, "");
    XLSX.writeFile(workbook, `partisipan-voting-${timestamp}.xlsx`);
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black mb-10"
      >
        Export to Excel
      </button>
    </div>
  );
}
