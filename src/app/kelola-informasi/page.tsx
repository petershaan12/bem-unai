import Image from "next/image";
import Link from "next/link";
import { getAllPosts } from "../lib/pots";
import Delete from "./Delete";
// import Delete from "./Delete";

interface PostProps {
    id: string;
    title: string;
    bannerImage: string;
    date: string;
    published: boolean;
    image: string;
    type: string;
}

export default async function page() {
    const allPosts = await getAllPosts();

    return (
        <main className="container mx-auto p-4 my-16  flex flex-col items-center pt-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                Kelola Informasi
            </h2>
            <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
                Kelola berita seputar BEM disini
            </p>
            <Link href="/kelola-informasi/create" className="mb-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                Buat berita baru
            </Link>
            <section
                id="participant-table"
                className="mb-20 overflow-x-auto w-full md:w-auto"
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Banner Image</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Published</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center">Tidak ada data</td>
                                </tr>) : (
                                allPosts.map((post: any) => (
                                    <tr key={post.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <Image src={post.bannerImage} alt={post.title} width={200} height={100} className="object-cover w-full h-32" />
                                            </div>
                                        </td>
                                        <td className="font-bold">
                                            {post.title}
                                        </td>
                                        <td>
                                            {new Date(post.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td>
                                            <span className="badge badge-ghost badge-sm p-3">{post.published ? 'Published' : 'Draft'}</span>
                                        </td>
                                        <td>
                                            <Link href={`/berita/${post.slug}`} className="text-xs hover:underline">details</Link>
                                            <Link href={`/kelola-informasi/edit/${post.id}`} className="ml-3 text-xs hover:underline">edit</Link>
                                            <Delete id={post.id} />
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Name</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </main>
    )
}