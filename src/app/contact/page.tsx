import { Metadata } from "next";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Kontak Kami | BEM UNAI",
  description:
    "Hubungi kami untuk informasi atau masukan. Kirim pesan melalui formulir kontak resmi BEM UNAI. Email dan nama Anda tidak akan dipublikasikan.",
  keywords: ["Kontak BEM UNAI", "Formulir Kontak", "Masukan Mahasiswa"],
  openGraph: {
    title: "Kontak BEM UNAI",
    description: "Badan Eksekutif Mahasiswa Universitas Advent Indonesia",
    type: "website",
    url: "/contact",
    images: [
      {
        url: "/api/og?title=Kontak%20%7C%20BEM%20UNAI",
        width: 1200,
        height: 630,
        alt: "Kontak BEM UNAI",
      },
    ],
  },
};

export default function page() {
  return (
    <main className="container mx-auto p-4 flex flex-col pt-32 pb-20 items-center min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold mb-2 text-center">
        Kirim Kami Informasi / Masukan
      </h2>
      <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center w-full md:w-[600px]">
        Email dan Nama kamu tidak akan di publikasikan dan hanya akan digunakan
        untuk keperluan balasan dari kami.
      </p>
      <ContactForm />
    </main>
  );
}
