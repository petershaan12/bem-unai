"use client";

import React, { useEffect, useState } from "react";
import Card from "./card";

interface Data {
  title: string;
  abbreviation: string;
  type: string;
  description: string;
  image: string;
}

export function Lanskap({dataBem}: any) {
  const [data, setData] = useState<Data[]>([]);
  const [data2, setData2] = useState<Data[]>([]);

  useEffect(() => {
    const first15Entries = (dataBem as Data[]).slice(0, 15);
    const remainingEntries = (dataBem as Data[]).slice(15);

    setData(first15Entries);
    setData2(remainingEntries);
  }, []);

  return (
    <section className="flex flex-col items-center mx-auto p-4">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Susunan Organisasi BEM Unai
      </h2>
      <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
        Terdapat beberapa staff inti, kementerian, dan divisi diberbagai bidang
        yang hadir di BEM Unai saat ini
      </p>

      {/* Marquee Container */}
      <div className="max-w-full lg:max-w-auto mx-auto relative mt-12">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-primary z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-primary z-10"></div>
        <div className="relative flex overflow-x-hidden">
          <div className="py-5 animate-marquee whitespace-nowrap flex">
            {data.map((item, index) => (
              <div key={index} className="mx-2 md:mx-4">
                <Card key={index} {...item} />
              </div>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex py-5">
            {data.map((item, index) => (
              <div key={index} className="mx-2 md:mx-4">
                <Card key={index + 15} {...item} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative flex overflow-x-hidden">
          <div className="animate-marquee3 whitespace-nowrap flex reverse py-5">
            {data2.map((item, index) => (
              <div key={index} className="mx-2 md:mx-4">
                <Card {...item} />
              </div>
            ))}
          </div>

          <div className="absolute top-0 animate-marquee4 whitespace-nowrap flex py-5">
            {data2.map((item, index) => (
              <div key={index} className="mx-2 md:mx-4">
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
