import React from "react";
import Card from "./card";

const Lanskap: React.FC = () => {
  const data = [
    {
      title: "PRESIDEN",
      type: "Staff Inti",
      description: "Presiden",
      icon: "staff_inti",
    },
    {
      title: "WAKPRES",
      type: "Staff Inti",
      description: "Wakil Presiden",
      icon: "staff_inti",
    },
    {
      title: "SEKJEN",
      type: "Staff Inti",
      description: "Seketaris Jendral",
      icon: "staff_inti",
    },
    {
      title: "MENKU",
      type: "Staff Inti",
      description: "Bendahara",
      icon: "staff_inti",
    },
    {
      title: "MENDAGRI",
      type: "Kementrian",
      description: "Mentri Dalam Negri",
      icon: "kementrian",
    },
    {
      title: "SOSBUD",
      type: "Divisi",
      description: "Divisi Sosial Budaya",
      icon: "divisi",
    },
    {
      title: "CREATIVE",
      type: "Divisi",
      description: "Divisi Kreatifitas",
      icon: "divisi",
    },
    {
      title: "LOGISTIK",
      type: "Kementrian",
      description: "Mentri Logistik",
      icon: "kementrian",
    },
    {
      title: "PERLENGKAPAN",
      type: "Divisi",
      description: "Divisi Perlengkapan",
      icon: "divisi",
    },
    {
      title: "PENGABDIAN",
      type: "Kementrian",
      description: "Mentri Pengabdian Masyarakat",
      icon: "kementrian",
    },
    {
      title: "LINGKUNGAN",
      type: "Divisi",
      description: "Divisi Pengendalian Lingkungan",
      icon: "divisi",
    },
    {
      title: "BAKMAS",
      type: "Divisi",
      description: "Divisi Bakti Masyarakat",
      icon: "divisi",
    },
    {
      title: "OLAHRAGA",
      type: "Kementrian",
      description: "Mentri Olahraga",
      icon: "kementrian",
    },
    {
      title: "UKM",
      type: "Divisi",
      description: "Divisi Unit Kegiatan Mahasiswa",
      icon: "divisi",
    },
    {
      title: "MIBAK",
      type: "Divisi",
      description: "Divisi Minat & Bakat",
      icon: "divisi",
    },
  ];

  const data2 = [
    {
      title: "KOMINFO",
      type: "Kementrian",
      description: "Mentri Komunikasi",
      icon: "kementrian",
    },
    {
      title: "MULMED",
      type: "Divisi",
      description: "Divisi Multimedia",
      icon: "divisi",
    },
    {
      title: "SOSMED",
      type: "Divisi",
      description: "Divisi Sosial Media",
      icon: "divisi",
    },
    {
      title: "HUMAS",
      type: "Divisi",
      description: "Divisi Humas",
      icon: "divisi",
    },
    {
      title: "HAM",
      type: "Kementrian",
      description: "Mentri Hak Asasi Manusia",
      icon: "kementrian",
    },
    {
      title: "ADVOKASI",
      type: "Divisi",
      description: "Divisi Advokasi",
      icon: "divisi",
    },
    {
      title: "KESEHATAN",
      type: "Kementrian",
      description: "Mentri Kesehatan",
      icon: "kementrian",
    },
    {
      title: "EDUKASI",
      type: "Divisi",
      description: "Divisi Edukasi & Penyuluhan",
      icon: "divisi",
    },
    {
      title: "LUNEG",
      type: "Kementrian",
      description: "Mentri Luar Negri",
      icon: "kementrian",
    },
    {
      title: "DIPLOMASI",
      type: "Divisi",
      description: "Divisi Diplomasi",
      icon: "divisi",
    },
    {
      title: "IA",
      type: "Divisi",
      description: "Divisi Ikatan Alumni",
      icon: "divisi",
    },
    {
      title: "AGAMA",
      type: "Kementrian",
      description: "Mentri Agama",
      icon: "kementrian",
    },
    {
      title: "PENGKAR",
      type: "Divisi",
      description: "Divisi Pengembangan Karakter",
      icon: "divisi",
    },
    {
      title: "PENDIK",
      type: "Kementrian",
      description: "Mentri Pendidikan",
      icon: "kementrian",
    },
    {
      title: "MUKU",
      type: "Divisi",
      description: "Divisi Mutu & Kualitas",
      icon: "divisi",
    },
  ];

  return (
    <section className="flex flex-col items-center mx-auto p-4">
      <h2 className="text-4xl font-bold mb-4">
        Lanskap Kementerian, Divisi, & Staff Inti BEM Unai
      </h2>
      <p className="mb-6 font-light text-lg text-gray-400">
        Terdapat beberapa staff inti, kementerian, dan divisi diberbagai bidang
        yang hadir di BEM Unai saat ini
      </p>

      {/* Marquee Container */}
      <div className="max-w-7xl mx-auto relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary z-10"></div>
        {/* <div className="absolute inset-0 right-0 bg-gradient-to-r from-primary to-transparent pointer-events-none z-10"></div> */}

        <div className="relative flex overflow-x-hidden">
          <div className="py-5 animate-marquee whitespace-nowrap flex">
            {data.map((item, index) => (
              <div key={index} className="mx-4">
                <Card {...item} />
              </div>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex py-5">
            {data.map((item, index) => (
              <div key={index} className="mx-4">
                <Card {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee3 whitespace-nowrap flex reverse py-5">
            {data2.map((item, index) => (
              <div key={index} className="mx-4">
                <Card {...item} />
              </div>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee4 whitespace-nowrap flex py-5">
            {data2.map((item, index) => (
              <div key={index} className="mx-4">
                <Card {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lanskap;
