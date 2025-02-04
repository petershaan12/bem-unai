import React, { Suspense } from "react";
import Berita from "@/components/berita";
import { Hero } from "@/components/hero";
import Hitung from "@/components/hitung";
import Lanskap from "@/components/lanskap";
import Loading from "./loading";

export default function Home() {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Hero />
        <div className="bg-logo"></div>
        <Hitung />
        <Lanskap />
        <Berita />
      </Suspense>
    </main>
  );
}
