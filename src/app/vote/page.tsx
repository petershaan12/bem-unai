import { getServerSession } from "next-auth";
import LoginButton from "./LoginButton";
import { redirect } from "next/navigation";
import { ensureVoter } from "./actions";
import { getTimeLeft } from "../lib/election_config";
import TimeLeft from "./TimeLeft";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evoting Calon Ketua & Wakil Ketua BEM UNAI",
  description:
    "Ayo voting sekarang untuk memilih Calon Ketua dan Wakil Ketua BEM UNAI.",
  keywords: [
    "Evoting BEM UNAI",
    "Pemilihan Ketua BEM",
    "Voting Mahasiswa UNAI",
  ],
  openGraph: {
    title: "Evoting Calon Ketua & Wakil Ketua BEM UNAI",
    description: "Badan Eksekutif Mahasiswa Universitas Advent Indonesia",
    type: "website",
    url: "/vote",
    images: [
      {
        url: "/api/og?title=Evoting%20Calon%20Ketua%20%26%20Wakil%20Ketua%20BEM%20UNAI",
        width: 1200,
        height: 630,
        alt: "Evoting Calon Ketua & Wakil Ketua BEM UNAI",
      },
    ],
  },
};

export default async function page() {
  const session = await getServerSession();

  const timeLeft = await getTimeLeft();

  const email = session?.user?.email as string | null;

  if (email?.endsWith("@unai.edu")) {
    await ensureVoter();
    return redirect("/vote/ballot");
  } else if (email) {
    return (
      <main className="container mx-auto p-4 flex flex-col justify-center items-center h-screen">
        <p className="text-2xl font-light text-red-500">
          Akses ditolak. Hanya untuk pengguna UNAI.
        </p>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4 flex flex-col justify-center items-center h-screen">
      <Image
        alt="cover"
        className="object-cover absolute inset-0 w-full h-full"
        src="/bg-pemerintahan.png"
        width={1920}
        height={1080}
      />{" "}
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-6xl text-center text-secondary mb-4 font-bigNoddle mt-5">
          Evoting Calon Ketua & Wakil Ketua BEM UNAI
        </h1>
        <p className="text-xl mt-5 mb-10">Ayo Voting Sekarang</p>
        <LoginButton />
        <div className="mt-10">
          <TimeLeft initialTimeLeft={timeLeft} />
        </div>
      </div>
    </main>
  );
}
