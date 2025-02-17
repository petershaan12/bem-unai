import { getAllPosts } from "@/app/lib/pots";
import CardBerita2 from "./cardBerita2";
import Link from "next/link";

export default async function Berita() {
  const allPosts = await getAllPosts();

  if (!allPosts) {
    return (
      <div>
        <h1>Belum ada berita</h1>
      </div>
    )
  }
  return (
    <section className="flex flex-col items-center mx-auto p-4 mt-16 mb-32">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Stay Connected With Us
      </h2>
      <p className="font-light text-base md:text-lg text-gray-400 text-center">
        Kunjungi blog kami untuk mendapatkan informasi terkini seputar kegiatan
        mahasiswa UNAI
      </p>

      <div className="grid grid-cols-1 gap-6 w-full p-6 md:p-2 md:w-[800px] ">
        <hr className="my-5" />
        {allPosts.slice(0, 3).map((post) => (
          <div key={post.id}>
            <Link href={`/berita/${post.slug}`}>
              <CardBerita2
                key={post.id}
                title={post.title}
                date={post.date.toISOString()}
                content={post.content}
                bannerImage={post.bannerImage}
                organizer={post.organisasi.title}
                views={post.views}
              />
            </Link>
            <hr className="my-5" />
          </div>
        ))}
      </div>
      <Link href={"/berita"} className="bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 mt-2 rounded-full transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
        Baca Selengkapnya
      </Link>
    </section>
  );
}
