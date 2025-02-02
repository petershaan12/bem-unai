import type { MetaFunction } from "@remix-run/node";  
import CountUp from "react-countup";  
import { useEffect, useState } from "react";  
import { Hero } from "~/components/hero";
import Lanskap from "~/components/lanskap";
import Berita from "~/components/berita";

export const meta: MetaFunction = () => {
  return [
    { title: "BEM UNAI" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    setStartCount(true);
  }, []);

  return (
    <main>
      <Hero />
      <div className="bg-logo"></div>
      <section className="container mx-auto p-2 md:p-4 my-10 md:my-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              {startCount && <CountUp end={30} duration={5} />}
            </h2>
            <p className="text-xl font-light text-gray-400">Orang</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              {startCount && <CountUp end={10} duration={5} />}
            </h2>
            <p className="text-xl font-light text-gray-400">Kementerian</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              {startCount && <CountUp end={14} duration={5} />}
            </h2>
            <p className="text-xl font-light text-gray-400">Divisi</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              {startCount && <CountUp end={4} duration={5} />}
            </h2>
            <p className="text-xl font-light text-gray-400">Staff Inti</p>
          </div>
        </div>
      </section>
      <Lanskap />
      <Berita />
    </main>
  );
}  
