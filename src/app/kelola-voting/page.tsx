// app/vote/config/page.tsx
import { getElectionConfig } from "@/app/lib/election_config";
import Form from "./Form";
import Link from "next/link";

export default async function ConfigPage() {
  const config = (await getElectionConfig()) || undefined;

  return (
    <main className="container mx-auto p-4 my-16 flex flex-col items-center pt-20">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Kelola Voting
      </h2>
      <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
        Mengatur kapan voting dimulai dan berakhir
      </p>
      <Link
        href="/kelola-voting/partisipant"
        className="mb-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black"
      >
        Kelola Partisipant
      </Link>
      <Form prevData={config} />
    </main>
  );
}
