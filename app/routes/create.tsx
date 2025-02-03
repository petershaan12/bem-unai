import { redirect, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { authenticator } from "~/utils/auth.server";
import { sessionStorage } from "~/utils/session.server";
import { User } from "~/utils/types.server";

export default function Create() {
    // const user = useLoaderData<User>();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        if (image) {
            formData.append("image", image);
        }

        // Kirim data ke backend (ganti URL dengan endpoint yang sesuai)
        await fetch("/api/posts", {
            method: "POST",
            body: formData,
        });

        // Reset form setelah pengiriman
        setTitle("");
        setContent("");
        setImage(null);
        setImagePreview(null);
    };

    return (
        <main className="container mx-auto p-4 my-16 flex flex-col items-center justify-center h-screen">
            <h2 className="text-4xl font-bold mb-4">Silahkan Buat Berita</h2>
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
                        className="w-full input input-bordered input-secondary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="label">
                        <span className="text-base label-text">Konten</span>
                    </label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Masukkan Konten"
                        className="w-full textarea textarea-bordered textarea-secondary"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="label">
                        <span className="text-base label-text">Unggah Gambar</span>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full input input-bordered input-secondary"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Preview" className="mt-2 w-full h-auto" />
                    )}
                </div>
                <button type="submit" className="bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
                    Buat Berita
                </button>
            </form>
        </main>
    );
}

export async function loader({ request }: { request: Request }) {
    let session = await sessionStorage.getSession(request.headers.get("cookie"));
    let user = session.get("user");
    if (!user) throw redirect("/");
    return user;
}
