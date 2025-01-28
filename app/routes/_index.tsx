import type { MetaFunction } from "@remix-run/node";  
import CountUp from "react-countup";  
import { useEffect, useState } from "react";  
import { Hero } from "~/components/hero";  
import { Navbar } from "~/components/navbar";  
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
    // Trigger the count-up animation on component mount  
    setStartCount(true);  
  }, []);  
  
  return (  
    <main>  
      <Hero />  
      <section className="container mx-auto p-4 my-12">  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">  
          <div>  
            <h2 className="text-6xl mb-2 font-bold">  
              {startCount && <CountUp end={299} duration={5} />}  
            </h2>  
            <p className="text-xl">Orang</p>  
          </div>  
          <div>  
            <h2 className="text-6xl mb-2 font-bold">  
              {startCount && <CountUp end={23} duration={5} />}  
            </h2>  
            <p className="text-xl">Kementerian</p>  
          </div>  
          <div>  
            <h2 className="text-6xl mb-2 font-bold">  
              {startCount && <CountUp end={6} duration={5} />}  
            </h2>  
            <p className="text-xl">Biro</p>  
          </div>  
          <div>  
            <h2 className="text-6xl mb-2 font-bold">  
              {startCount && <CountUp end={8} duration={5} />}  
            </h2>  
            <p className="text-xl">Bidang Koordinator</p>  
          </div>  
        </div>  
      </section>  
      <Lanskap />  
      <Berita />
    </main>  
  );  
}  
