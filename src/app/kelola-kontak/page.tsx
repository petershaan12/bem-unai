import Link from "next/link";
import Delete from "./Delete";
import { getAllKontak } from "../lib/kontak";

export default async function page() {
    const allKontak = await getAllKontak();

    return (
        <main className="container mx-auto p-4 my-16  flex flex-col items-center pt-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                Kelola Kontak
            </h2>
            <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
                Berikut adalah daftar pesan yang dikirimkan oleh pengunjung
            </p>
            <section
                id="participant-table"
                className="mb-20 overflow-x-auto w-full md:w-auto"
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Pesan</th>
                            <th>Dibuat Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allKontak.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center">Tidak ada data</td>
                                </tr>) : (
                                allKontak.map((data: any) => (
                                    <tr key={data.id}>
                                        <td>
                                            {data.name}
                                        </td>
                                        <td>
                                            {data.email}
                                        </td>
                                        <td>
                                            {data.message}
                                        </td>
                                        <td>
                                            {new Date(data.createdAt).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td>
                                            <a href={`mailto:${data.email}`} target="_blank" rel="noopener noreferrer" className="mr-1 text-xs text-blue-500 hover:underline">
                                                balas
                                            </a>
                                            <Delete id={data.id} />
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Nama</th>
                            <th>Email</th>
                            <th>Pesan</th>
                            <th>Dibuat Tanggal</th>
                            <th>Aksi</th>
                        </tr>
                    </tfoot>
                </table>
            </section>
        </main>
    )
}