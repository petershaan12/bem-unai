import CardBerita from "@/components/cardBerita";
import { getAllPosts } from "../lib/pots";

export default async function page() {
    const allPosts = await getAllPosts();

    if (!allPosts) {
        return (
            <div>
                <h1>Belum ada berita</h1>
            </div>
        )
    }

    return (
        <main className="container mx-auto p-4 my-16 flex flex-col items-center pt-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                Informasi Terbaru
            </h2>
            <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
                Kunjungi blog kami untuk mendapatkan informasi terkini seputar kegiatan
                mahasiswa UNAI
            </p>
            <div className="grid grid-cols-3 gap-6">
                {allPosts.map((post) => (
                    <CardBerita
                        key={post.id}
                        title={post.title}
                        content={post.content}
                        bannerImage={post.bannerImage}
                        organizer={post.orgnizer}
                    />
                ))}
            </div>
        </main>
    );
}