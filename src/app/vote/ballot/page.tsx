import { getAllCandidates } from "@/app/lib/candidate";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import BallotForm from "./BallotForm";
import TimeLeft from "../TimeLeft";
import { getTimeLeft } from "@/app/lib/election_config";

export default async function ballot() {
  const session = await getServerSession();
  const email = session?.user?.email ?? "";
  if (!email.endsWith("@unai.edu")) redirect("/vote");

  const candidate = await getAllCandidates();

  const name = session?.user?.name ?? "";

  const timeLeft = await getTimeLeft();

  return (
    <main className="container mx-auto pt-24 pb-28">
      <h1 className="text-3xl font-bold text-center text-white mb-4 mt-5">
        Haii <span className="text-secondary">{name}</span> Silahkan pilih
        kandidatmu
      </h1>
      <p className="mt-5 mb-10 text-center">
        Ingat Suara Kamu 🫵 Menentukan Kedepannya Kegiatan BEM Universitas Advent
        Indonesia, memilih dengan mengklik foto
      </p>

      <BallotForm candidates={candidate} />

      <div className="mt-20">
        <TimeLeft initialTimeLeft={timeLeft} />
      </div>
    </main>
  );
}
