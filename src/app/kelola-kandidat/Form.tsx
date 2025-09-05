"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });
import "react-quill-new/dist/quill.snow.css";
import { upsertCandidate } from "@/app/lib/candidate";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getAllCandidates } from "../lib/candidate";

interface Candidate {
  id: string;
  name: string;
  image: string | null;
  url: string | null;
}

type PrevData = {
  id: string;
  name: string;
  photo: string | null;
  url: string | null;
};

export default function Form({ prevData }: { prevData?: PrevData }) {
  const [name, setName] = useState(prevData?.name || "");
  const [url, setUrl] = useState(prevData?.url || "");
  const [error, setError] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    prevData?.photo || null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 3145728) {
        // 3MB in bytes
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
    if (prevData?.photo) {
      setImagePreview(prevData.photo);
    }
  }, [prevData]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("url", url);

    if (image) {
      formData.append("image", image);
    }

    let result;
    if (prevData) {
      result = await upsertCandidate(formData, prevData.id);
    } else {
      result = await upsertCandidate(formData);
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
      setName("");
      setUrl("");
      setImage(null);
      setImagePreview(null);
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Masukkan Nama"
          className="w-full text-black input input-bordered input-secondary"
          required
        />
      </div>
      <div className="mb-4">
        <label className="label">
          <span className="text-base label-text">URL</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Masukkan URL"
          className="w-full text-black input input-bordered input-secondary"
          required
        />
      </div>
      <div className="mb-4">
        <label className="label">
          <span className="text-base label-text">Image</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        {imagePreview && (
          <Image
            src={imagePreview}
            alt="Preview"
            className="mt-2 w-full h-64 object-cover"
            width={200}
            height={300}
          />
        )}
      </div>
      <button
        type="submit"
        className="w-full mt-5 bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 rounded-xl transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black"
      >
        {prevData ? "Edit Kandidat" : "Buat Kandidat"}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}
