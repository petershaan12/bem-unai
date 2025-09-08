import { getVotingResults, getIsResultsVisible } from "@/app/lib/vote";
import ResultChart from "./Chart";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hasil Pemungutan Suara | BEM UNAI",
  description:
    "Hasil real-time pemilihan Ketua & Wakil Ketua BEM UNAI. Dapatkan informasi terbaru seputar hasil pemungutan suara.",
  keywords: [
    "Hasil Voting BEM UNAI",
    "Pemilihan Ketua BEM UNAI",
    "Hasil Pemungutan Suara",
  ],
  openGraph: {
    title: "Hasil Pemungutan Suara",
    description: "Badan Eksekutif Mahasiswa Universitas Advent Indonesia",
    type: "website",
    url: "/result-vote",
    images: [
      {
        url: "/api/og?title=Hasil%20Pemungutan%20Suara%20%7C%20BEM%20UNAI",
        width: 1200,
        height: 630,
        alt: "Hasil Pemungutan Suara | BEM UNAI",
      },
    ],
  },
};

export default async function page() {
  const isVisible = await getIsResultsVisible();

  if (!isVisible) {
    return (
      <main className="relative container mx-auto p-8 py-20 sm:py-4 flex flex-col justify-center min-h-screen">
        <Image
          alt="cover"
          className="object-cover absolute inset-0 w-full h-full"
          src="/bg-pemerintahan.png"
          width={1920}
          height={1080}
        />{" "}
        <div className="text-center z-10">
          <h1 className="text-3xl font-bold text-white mb-4 mt-5">
            Hasil Pemungutan Suara
          </h1>
          <p className="text-gray-400 text-lg">
            Hasil akan ditampilkan setelah perizinan admin.
          </p>
        </div>
      </main>
    );
  }

  const results = await getVotingResults();

  return (
    <main className="container mx-auto pt-24 pb-28 px-4">
      <Image
        alt="cover"
        className="object-cover absolute inset-0 w-full h-full"
        src="/bg-pemerintahan.png"
        width={1920}
        height={1080}
      />{" "}
      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-center text-white mb-4 mt-5">
          Hasil Pemungutan Suara
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Hasil real-time pemilihan Ketua & Wakil Ketua BEM UNAI
        </p>
        <ResultChart data={results} />
      </div>
    </main>
  );
}
