import Link from "next/link";
import { getAllPortal } from "../lib/portal";
import Delete from "./Delete";

interface PortalProps {
    id: string;
    title: string;
    link: string;
}

export default async function page() {
    const allPortal = await getAllPortal();

    return (
        <main className="container mx-auto p-4 my-16  flex flex-col items-center pt-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                Kelola Portal
            </h2>
            <Link href="/kelola-portal/create" className="mb-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                Buat Potal Baru
            </Link>
            <section
                id="participant-table"
                className="mb-20"
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allPortal.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center">Tidak ada data</td>
                                </tr>) : (
                                allPortal.map((portal: PortalProps) => (
                                    <tr key={portal.id}>
                                        <td>

                                            <div className="font-bold">{portal.title}</div>
                                        </td>
                                        <td>
                                            {portal.link && portal.link.length > 40 ? `${portal.link.substring(0, 80)}...` : portal.link}

                                        </td>
                                        <td>
                                            <Link href={`/kelola-portal/edit/${portal.id}`} className="text-xs hover:underline">edit</Link>
                                            <Delete id={portal.id} />
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Aksi</th>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </main>
    )
}