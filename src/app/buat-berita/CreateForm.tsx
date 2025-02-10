"use client"

import dynamic from "next/dynamic";
import { useState } from "react";
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import dataBem from "../../../data_bem.json";
import { createPosts } from "@/app/lib/pots";

export default function CreateForm() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [selectedOrganizer, setSelectedOrganizer] = useState("");

    const handleOrganizerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOrganizer(event.target.value);
    };

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 1048576) { // 1MB in bytes
                setError("Ukuran gambar tidak boleh lebih dari 1MB");
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("organizer", selectedOrganizer);

        if (image) {
            formData.append("image", image);
        }

        const quillImages = content.match(/<img[^>]+src="([^">]+)"/g);
        if (quillImages) {
            quillImages.forEach((imgTag) => {
                const match = imgTag.match(/src="([^">]+)"/);
                const imgSrc = match ? match[1] : "";
                formData.append("quillImages", imgSrc);
            });
        }

        const result = await createPosts(formData);

        if (!result) {
            setError("Anda harus login terlebih dahulu");
            return;
        }

        if (result.errors) {
            setError(result.errors.message);
            console.error(result.errors.message);
        } else {
            alert("Berhasil membuat berita!");
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
                    className="w-full bg-white text-black rounded-xl border-none h-32"
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
                        <option key={organizer.abbreviation} value={organizer.abbreviation}>
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
                    <img src={imagePreview} alt="Preview" className="mt-2 w-full h-auto" />
                )}
            </div>
            <button type="submit" className="w-full mt-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                Buat Berita
            </button>
            {error && <p className="text-red-500 mt-2">{error}</p>}
        </form>
    );
}
