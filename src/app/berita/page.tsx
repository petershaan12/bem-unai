import CardBerita from "@/components/cardBerita";
import { getAllPosts } from "../lib/pots";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Berita & Informasi | BEM UNAI",
  description:
    "Dapatkan informasi terbaru seputar kegiatan mahasiswa UNAI melalui blog resmi kami. Temukan berita, artikel, dan pembaruan terkini di sini.",
  keywords: ["Berita BEM UNAI", "Informasi Kegiatan Mahasiswa"],
  openGraph: {
    title: "Berita & Informasi",
    description: "Badan Eksekutif Mahasiswa Universitas Advent Indonesia",
    type: "website",
    url: "/berita",
    images: [
      {
        url: "/api/og?title=Berita%20%26%20Informasi%20%7C%20BEM%20UNAI",
        width: 1200,
        height: 630,
        alt: "Berita & Informasi | BEM UNAI",
      },
    ],
  },
};

export default async function page() {
  const allPosts = await getAllPosts();

  if (!allPosts) {
    return (
      <div>
        <h1>Belum ada berita</h1>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-4 my-16 flex flex-col items-center pt-20 min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">
        Informasi Terbaru
      </h2>
      <p className="mb-10 font-light text-base md:text-lg text-gray-400 text-center">
        Kunjungi blog kami untuk mendapatkan informasi terkini seputar kegiatan
        mahasiswa UNAI
      </p>
      <div
        className={`grid grid-cols-1 auto-rows-fr ${
          allPosts.length === 1 ? "md:grid-cols-1" : "md:grid-cols-3"
        } gap-6 px-0 md:px-32`}
      >
        {allPosts.map((post) => (
          <Link href={`/berita/${post.slug}`} key={post.id}>
            <CardBerita
              key={post.id}
              title={post.title}
              date={post.date.toISOString()}
              bannerImage={post.bannerImage}
              organizer={post.organisasi.title}
              views={post.views}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
