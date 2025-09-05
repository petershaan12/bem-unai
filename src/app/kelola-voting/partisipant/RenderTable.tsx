"use client";

import * as XLSX from "xlsx";

export default function RenderTable({
  allPartisipants,
}: {
  allPartisipants: any[];
}) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(allPartisipants);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Partisipants");
    XLSX.writeFile(workbook, "partisipants.xlsx");
  };

  return (
    <div>
      <button
        onClick={handleExport}
        className="mb-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black mb-10"
      >
        Export to Excel
      </button>
    </div>
  );
}
