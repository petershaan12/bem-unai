export default function Berita() {
    return (
      <section className="flex flex-col items-center mx-auto p-4 mt-16 mb-32">
        <h2 className="text-4xl font-bold mb-4">Stay Connected With Us</h2>
        <p className="mb-6 font-light text-lg text-gray-400">
          Kunjungi blog kami untuk mendapatkan informasi terkini seputar
          kegiatan mahasiswa UNAI
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            className="bg-cover bg-center rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
            style={{
              backgroundImage: 'url("path-to-your-background-image.jpg")',
              height: "300px",
            }}
          >
            <div className=" flex flex-col justify-between p-6">
              <div>
                <span className="text-xs text-white uppercase font-bold">
                  Divisi Olahraga
                </span>
                <h3 className="text-white text-2xl font-bold mt-2">
                  Sportvaganza
                </h3>
                <p className="text-white text-sm mt-2">January 28, 2025</p>
              </div>
            </div>
          </div>
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
          Baca Selengkapnya
        </button>
      </section>
    );
}