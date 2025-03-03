"use client"

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { upsertPost } from "@/app/lib/pots";
import { getAllOrganisasi } from "../lib/organisasi";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Image from "next/image";

interface Organisasi {
    id: string;
    title: string;
    abbreviation: string;
    type: string;
    image: string | null;
    description: string | null;
}

type PrevData = {
    id: string;
    title: string;
    content: string;
    date: Date;
    bannerImage: string | null;
    organisasiId: string;
    organisasi: {
        title: string;
        image: string | null;
        abbreviation: string;
    };
    authorId: string;
};


export default function Form({ prevData }: { prevData?: PrevData }) {
    const [title, setTitle] = useState(prevData?.title || "");
    const [content, setContent] = useState(prevData?.content || "");
    const [error, setError] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(prevData?.bannerImage || null);
    const [selectedOrganizer, setSelectedOrganizer] = useState(prevData?.organisasiId || "");
    const [dataBem, setDataBem] = useState<Organisasi[]>([]);
    const [date, setDate] = useState(prevData?.date ? new Date(prevData.date).toISOString().slice(0, 16) : "");

    useEffect(() => {
        const fetchData = async () => {
            const response = await getAllOrganisasi();
            setDataBem(response);
        };
        fetchData();
    }, []);

    const handleOrganizerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrganizer(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 3145728) { // 3MB in bytes
                setError("Ukuran gambar tidak boleh lebih dari 3MB");
                return;
            } else {
                setImage(file);
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreview(reader.result as string);
                };
                reader.readAsDataURL(file);
            }
        }
    };

    useEffect(() => {
        if (prevData?.bannerImage) {
            setImagePreview(prevData.bannerImage);
        }
    }, [prevData]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("organisasiId", selectedOrganizer);
        formData.append("date", date);

        if (image) {
            formData.append("image", image);
        }

        let result;
        if (prevData) {
            result = await upsertPost(formData, prevData.id);
        } else {
            result = await upsertPost(formData);
        }

        if (result && result.errors) {
            setError(result.errors.message);
        } else {
            toast.success(result?.success.message, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
            });
            setTimeout(() => {
                if (result?.success.redirect) {
                    redirect(result.success.redirect);
                }
            }, 1000);
            setTitle("");
            setContent("");
            setImage(null);
            setImagePreview(null);
            setSelectedOrganizer("");
        }

    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Judul</span>
                </label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan Judul"
                    className="w-full text-black input input-bordered input-secondary"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Tanggal Acara</span>
                </label>
                <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Masukkan Tanggal"
                    className="w-full text-black input input-bordered input-secondary"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Konten</span>
                </label>
                <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={{
                        toolbar: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "image"],
                            ["clean"],
                        ],
                    }}
                    placeholder="Masukkan Konten"
                    className="w-full bg-white text-black rounded-xl border-none"
                />
            </div>
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Organizer</span>
                </label>
                <select
                    value={selectedOrganizer}
                    onChange={handleOrganizerChange}
                    className="w-full text-black select select-bordered select-secondary"
                    required
                >
                    <option value="" disabled>Pilih Organizer</option>
                    {dataBem.map((organizer) => (
                        <option key={organizer.abbreviation} value={organizer.id}>
                            {organizer.title}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="label">
                    <span className="text-base label-text">Banner</span>
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                />
                {imagePreview && (
                    <Image src={imagePreview} alt="Preview" className="mt-2 w-full h-64 object-cover" width={200} height={300} />
                )}
            </div>
            <button type="submit" className="w-full mt-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                {prevData ? "Edit Berita" : "Buat Berita"}
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}
