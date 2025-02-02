export default function Berita() {
  return (
    <section className="flex flex-col items-center mx-auto p-4 mt-16 mb-32">
      <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center">
        Stay Connected With Us
      </h2>
      <p className="mb-6 font-light text-base md:text-lg text-gray-400 text-center">
        Kunjungi blog kami untuk mendapatkan informasi terkini seputar kegiatan
        mahasiswa UNAI
      </p>

      <div className="grid grid-cols-1 gap-6">
        <div className="w-full md:w-[800px]">
          <hr />
          <div className="flex flex-col md:flex-row p-6 gap-10">
            <img
              src="/posts/1.png"
              alt="Berita 1"
              className="rounded-lg w-full md:w-auto"
            />
            <div>
              <h3 className="text-white text-5xl font-bigNoddle mt-2">
                Sportvaganza
              </h3>
              <p className="text-gray-300 mt-2 font-light">January 28, 2025</p>
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={`/icon/divisi.svg`}
                  alt="divisi"
                  className="w-8 h-8"
                />
                <span className="text-sm text-white">Divisi Olahraga</span>
              </div>
            </div>
          </div>
          <hr />
        </div>
      </div>

      <button className="bg-gradient-to-r from-secondary to-[#9C8C38] text-primary px-4 py-2 mt-16 rounded-full transition duration-300 transform hover:scale-105 hover:from-[#9C8C38] hover:to-secondary hover:text-black">
        Baca Selengkapnya
      </button>
    </section>
  );
}
