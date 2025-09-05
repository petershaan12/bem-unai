import Delete from "./Delete";
import { getAllPartisipants } from "@/app/lib/partisipant";
import ToggleEligibility from "./ToggleEligibility";
import RenderTable from "./RenderTable";

export default async function page() {
  const allPartisipants = await getAllPartisipants();

  return (
    <main className="container mx-auto p-4 my-16  flex flex-col items-center pt-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Kelola Partisipan
      </h2>
      <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
        Ini adalah orang orang yang sudah vote
      </p>
      {/* Render Table  Partisipan */}
      <RenderTable allPartisipants={allPartisipants} />
      <section
        id="participant-table"
        className="mb-20 overflow-x-auto w-full md:w-auto"
      >
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
            {allPartisipants.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              allPartisipants.map((participant: any) => (
                <tr key={participant.id}>
                  <td className="font-bold">{participant.email}</td>
                  <td className="font-bold">
                    {participant.votedAt
                      ? new Date(participant.votedAt).toLocaleString()
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
      </section>
    </main>
  );
}
