import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTikTok,
} from "react-icons/ai";

export function Footer() {
  return (
    <footer className="bg-black">
      <img
        src="/batik.png"
        alt="Line Batik"
        className="md:w-full hidden md:block mb-5"
      />
      <img src="/batik-2.png" alt="Line Batik" className="md:hidden mb-5" />
      <div className="footer text-base-content items-start md:justify-between px-5 md:px-20 py-10 flex flex-col md:flex-row">
        <div className="md:mx-0 mx-auto">
          <img
            src="/bem-unai-dirsena.png"
            alt="UNAI-BEM-DIRSENA"
            width={300}
            className="w-56 md:w-72"
          />
        </div>
        <div className="flex items-end justify-end flex-col text-center md:text-end ">
          <img
            src="/bem-24-25.svg"
            alt="Logo"
            className="mx-auto md:mx-0 hidden md:block w-80 "
          />
          <p className="md:mt-5  font-light text-gray-400">
            Jl. Kolonel Masturi No.288, Cihanjuang Rahayu, <br /> Kec.
            Parongpong, Kabupaten Bandung Barat, Jawa Barat 40559
          </p>
        </div>
      </div>
      <div className=" md:px-20 py-5 md:py-10 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs md:text-sm text-gray-300 mb-5 md:mb-0 order-2 md:order-1">
          Copyright © {new Date().getFullYear()} - Kementrian Komunikasi BEM
          UNAI
        </p>

        <div className="flex gap-5 order-1 md:order-2 mb-5 md:mb-0">
          <AiOutlineInstagram className="w-6 h-6 md:w-8 md:h-8" />
          <AiFillYoutube className="w-6 h-6 md:w-8 md:h-8" />
          <AiOutlineTikTok className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>
    </footer>
  );
}
