import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTikTok,
} from "react-icons/ai";

export function Footer() {
  return (
    <footer className="bg-black">
      <img src="/batik.png" alt="Line Batik" className="w-full mb-5" />
      <div className="footer  text-base-content items-start justify-between px-5 md:px-20 py-10">
        <div>
          <img src="/bem-unai-dirsena.png" alt="UNAI-BEM-DIRSENA" width={300} />
        </div>
        <div>
          <img src="/bem-24-25.svg" alt="Logo" />
          <p className="text-end mt-5 font-light text-gray-400">
            Jl. Kolonel Masturi No.288, Cihanjuang Rahayu, <br /> Kec.
            Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559
          </p>
        </div>
      </div>
      <div className="px-5 md:px-20 py-10 flex justify-between items-center">
        <p className="text-sm text-gray-300">
          Copyright © {new Date().getFullYear()} - Kementrian Komunikasi BEM
          UNAI
        </p>

        <div className="flex gap-5">
          <AiOutlineInstagram className="w-8 h-8" />
          <AiFillYoutube className="w-8 h-8" />
          <AiOutlineTikTok className="w-8 h-8" />
        </div>
      </div>
    </footer>
  );
}
