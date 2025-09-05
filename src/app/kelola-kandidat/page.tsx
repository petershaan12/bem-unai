import Image from "next/image";
import Link from "next/link";
import { getAllCandidates } from "../lib/candidate";
import Delete from "./Delete";

export default async function page() {
  const allCandidates = await getAllCandidates();

  return (
    <main className="container mx-auto p-4 my-16  flex flex-col items-center pt-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Kelola Kandidat
      </h2>
      <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
        Kelola berita seputar BEM disini
      </p>
      <Link
        href="/kelola-kandidat/create"
        className="mb-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black"
      >
        Buat Kandidat baru
      </Link>
      <section
        id="participant-table"
        className="mb-20 overflow-x-auto w-full md:w-auto"
      >
        <table className="table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Url</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {allCandidates.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center">
                  Tidak ada data
                </td>
              </tr>
            ) : (
              allCandidates.map((candidate: any) => (
                <tr key={candidate.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <Image
                        src={candidate.photo}
                        alt={candidate.name}
                        width={200}
                        height={100}
                        className="object-cover w-full h-32"
                      />
                    </div>
                  </td>
                  <td className="font-bold">{candidate.name}</td>
                  <td>
                    <Link
                      href={candidate.url}
                      className="text-blue-500 hover:underline"
                      target="_blank"
                    >
                      {candidate.url}
                    </Link>
                  </td>
                  <td>
                    <Link
                      href={`/kelola-kandidat/edit/${candidate.id}`}
                      className="ml-3 text-xs hover:underline"
                    >
                      edit
                    </Link>
                    <Delete id={candidate.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Url</th>
              <th>Aksi</th>
            </tr>
          </tfoot>
        </table>
      </section>
    </main>
  );
}
