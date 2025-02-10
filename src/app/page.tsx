import React, { Suspense } from "react";
import Berita from "@/components/berita";
import { Hero } from "@/components/hero";
import Hitung from "@/components/hitung";
import Lanskap from "@/components/lanskap";
import Loading from "./loading";
import { getAllOrganisasi } from "./lib/organisasi";

export default async function Home() {
  const dataBem = await getAllOrganisasi();

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Hero />
        <div className="bg-logo"></div>
        <Hitung />
        <Lanskap dataBem={dataBem} />
        <Berita />
      </Suspense>
    </main>
  );
}
