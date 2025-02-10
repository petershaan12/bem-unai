import { getAllOrganisasi } from "@/app/lib/organisasi";
import Image from "next/image";
import Link from "next/link";
import Delete from "./Delete";

interface OrganisasiProps {
    id: string;
    title: string;
    abbreviation: string;
    type: string;
    image: string | null;
    description: string | null;
}

export default async function page() {
    const allOrganisasi = await getAllOrganisasi();

    return (
        <main className="container mx-auto p-4 my-16  flex flex-col items-center pt-20">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
                Kelola Pemerintahan BEM UNAI
            </h2>
            <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
                Kelola bagian pemerintahan BEM UNAI disini
            </p>
            <Link href="/kelola-pemerintahan/create" className="mb-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                Buat Pemerintahan Baru
            </Link>
            <section
                id="participant-table"
                className="mb-20"
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Deskripsi</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOrganisasi.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center">Tidak ada data</td>
                                </tr>) : (
                                allOrganisasi.map((organisasi: OrganisasiProps) => (
                                    <tr key={organisasi.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle h-12 w-12">
                                                        <Image src={`/icon/${organisasi.image}.svg`} alt={organisasi.title} width={32} height={32} className="w-8 h-8" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{organisasi.title}</div>
                                                    <div className="text-sm opacity-50">{organisasi.abbreviation}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {organisasi.description && organisasi.description.length > 40 ? `${organisasi.description.substring(0, 80)}...` : organisasi.description}
                                            <br />
                                            <span className="badge badge-ghost badge-sm">{organisasi.type}</span>
                                        </td>
                                        <td>
                                            <Link href={`/pemerintahan/${organisasi.abbreviation}`} className="text-xs hover:underline">details</Link>
                                            <Link href={`/kelola-pemerintahan/edit/${organisasi.abbreviation}`} className="ml-3 text-xs hover:underline">edit</Link>
                                            <Delete id={organisasi.id} />
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