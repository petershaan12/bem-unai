"use client"

import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { savePortal } from "../lib/portal";

interface Portal {
    id: string;
    title: string;
    link: string;
}

export default function Form({ prevData }: { prevData?: Portal }) {
    const [data, saveAction, pending] = useActionState(savePortal, undefined);

    useEffect(() => {
        if (data?.success) {
            toast.success(data.success.message, {
                position: "top-right",
                autoClose: 3000,
                theme:"dark"
            });
            setTimeout(() => {
                redirect(data.success.redirect);
            }, 1000);
        } else if (data?.errors?.message) {
            toast.error(`Error: ${data.errors.message}`);
        }
    }, [data]);
    
    return (
        <form action={saveAction} className="w-full max-w-lg">
            <input type="hidden" name="id" defaultValue={prevData?.id || ""} />
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
                    id="link"
                    name="link"
                    defaultValue={prevData?.link || data?.data?.link}
                    placeholder="Masukkan Nama"
                    className="w-full text-black input input-bordered input-secondary"
                    required
                />
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
