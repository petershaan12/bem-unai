"use client"

import { saveOrganisasi, getAllOrganisasi } from "@/app/lib/organisasi";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Organisasi {
    id: string;
    title: string;
    abbreviation: string;
    type: string;
    description: string | null;
    familyId: string | null;
}

export default function Form({ prevData }: { prevData?: Organisasi }) {
    const [data, saveAction, pending] = useActionState(saveOrganisasi, undefined);
    const [organisasiList, setOrganisasiList] = useState<Organisasi[]>([]);

    useEffect(() => {
        const fetchOrganisasi = async () => {
            const data = await getAllOrganisasi();
            setOrganisasiList(data.filter(org => org.type === "Kementrian"));
        };
        fetchOrganisasi();
    }, []);

    useEffect(() => {
        if (data?.success) {
            toast.success(data.success.message, {
                position: "top-right",
                autoClose: 3000,
                theme:"dark"
            });
            redirect(data.success.redirect);
        } else if (data?.errors?.message) {
            toast.error(`Error: ${data.errors.message}`);
        }
    }, [data]);
    
    return (
        <form action={saveAction} className="w-full max-w-lg">
            <input type="hidden" name="id" className="text-black"defaultValue={prevData?.id || ""} />
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Nama</span>
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    defaultValue={prevData?.title || data?.data?.title}
                    placeholder="Masukkan Nama"
                    className="w-full text-black input input-bordered input-secondary"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Singkatan</span>
                </label>
                <input
                    type="text"
                    id="abbreviation"
                    name="abbreviation"
                    defaultValue={prevData?.abbreviation || data?.data?.abbreviation}
                    placeholder="Masukkan Nama"
                    className="w-full text-black input input-bordered input-secondary"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Type</span>
                </label>
                <select
                    id="type"
                    name="type"
                    className="w-full text-black select select-bordered select-secondary"
                    required
                    defaultValue={prevData?.type || data?.data?.type}
                >
                    <option value="" className="text-gray-500">Pilih Type</option>
                    <option value="Staff Inti">Staff Inti</option>
                    <option value="Kementrian">Kementrian</option>
                    <option value="Divisi">Divisi</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Deskripsi</span>
                </label>
                <textarea id="description" name="description" defaultValue={prevData?.description || data?.data?.description} className="textarea text-black textarea-bordered textarea-secondary w-full h-44" placeholder="Masukkan Deskripsi"></textarea>
            </div>

            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text flex items-end">{prevData ? (<span className="ml-2 text-secondary"> Parent:  <p>{organisasiList.find(org => org.id === prevData?.familyId)?.title || "Parent not found"}</p></span>) :  "Pilih Parent:"  }</span>
                    <span className="label-text-alt"> (Optional)</span>
                </label>

                <select
                    id="familyId"
                    name="familyId"
                    className="w-full text-black select select-bordered select-secondary"
                >
                    <option key="" value="" className="text-gray-500">Pilih Parent</option>
                    {organisasiList.map((org) => (
                        <option key={org.id} value={org.id}>
                            {org.title}
                        </option>
                    ))}
                </select>


            </div>

            <div className="flex justify-center">
                {pending ? <span className="loading loading-spinner loading-xl text-center mt-5"></span> :
                    <button className="bg-gradient-to-r w-full from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                        {prevData ? "Edit" : "Buat Baru"}
                    </button>
                }
            </div>
            {data?.errors?.message && (
                <p className="text-red-500 mt-2">{data.errors.message}</p>
            )}
        </form>
    );
}
