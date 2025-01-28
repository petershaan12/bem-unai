export function Hero() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen mt-12 md:mt-0">
        <div className="flex flex-col justify-center p-5 md:pl-20 md:-mt-20">
          <p className="text-lg md:text-xl md:ml-24 my-5 text-gray-200">
            Kabinet 2024 - 2025
          </p>
          <h1 className="font-bigNoddle judul">
            Dirandra <span className="ml-5">Narwasena</span>
          </h1>
          <p className="text-lg md:text-xl my-5 leading-tight ">
            <span className="bg-secondary text-primary px-2 py-1">
              Selamat datang di portal informasi
            </span>{" "}
            <br />{" "}
            <span className="bg-secondary text-primary px-2 py-1">
              Badan Eksekutif Mahasiswa{" "}
            </span>{" "}
            <br />{" "}
            <span className="bg-secondary text-primary px-2 py-1">
              {" "}
              Universitas Advent Indonesia
            </span>
          </p>
        </div>
        <div className="mt-10 md:mt-20">
          <img src="/home.png" alt="Hero" className="" />
        </div>
      </div>
    );
}