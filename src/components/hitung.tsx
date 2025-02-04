"use client"

import CountUp from "react-countup";

export default function Hitung() {
    return (
        <section className="container mx-auto p-2 md:p-4 my-10 md:my-16">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              <CountUp end={30} duration={5} />
            </h2>
            <p className="text-xl font-light text-gray-400">Orang</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              <CountUp end={10} duration={5} />
            </h2>
            <p className="text-xl font-light text-gray-400">Kementerian</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              <CountUp end={14} duration={5} />
            </h2>
            <p className="text-xl font-light text-gray-400">Divisi</p>
          </div>
          <div>
            <h2 className="text-4xl md:text-7xl mb-2 font-bold">
              <CountUp end={4} duration={5} />
            </h2>
            <p className="text-xl font-light text-gray-400">Staff Inti</p>
          </div>
        </div>
      </section>
    )
}