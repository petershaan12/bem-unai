import {
  AiFillYoutube,
  AiOutlineInstagram,
  AiOutlineTikTok,
} from "react-icons/ai";
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-black">
      <Image
        src="/batik.png"
        alt="Line Batik"
        className="md:w-full hidden md:block mb-5"
        width={1920}
        height={1080}
      />
      <Image
        src="/batik-2.png"
        alt="Line Batik"
        className="md:hidden mb-5"
        width={1920}
        height={1080}
      />
      <div className="footer text-base-content items-start md:justify-between px-5 md:px-20 py-10 flex flex-col md:flex-row">
        <div className="md:mx-0 mx-auto">
          <Image
            src="/bem-unai-dirsena.png"
            alt="UNAI-BEM-DIRSENA"
            width={400}
            height={200}
            className="w-56 md:w-72"
          />
        </div>
        <div className="flex items-end justify-end flex-col text-center md:text-end ">
          <Image
            src="/bem-24-25.svg"
            alt="Logo"
            className="mx-auto md:mx-0 hidden md:block w-80 "
            width={320}
            height={320}
          />
          <p className="md:mt-5  font-light text-gray-400">
            Jl. Kolonel Masturi No.288, Cihanjuang Rahayu, <br /> Kec. Parongpong,
            Kabupaten Bandung Barat, Jawa Barat 40559
          </p>
        </div>
      </div>
      <div className=" md:px-20 py-5 md:py-10 flex flex-col md:flex-row justify-between items-center">
        <p className="text-xs md:text-sm text-gray-300 mb-5 md:mb-0 order-2 md:order-1">
          Copyright © {new Date().getFullYear()} - Kementrian Komunikasi BEM UNAI
        </p>

        <div className="flex gap-5 order-1 md:order-2 mb-5 md:mb-0">
          <a
            href="https://www.instagram.com/bemunai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineInstagram className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a
            href="https://www.youtube.com/@bemunai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillYoutube className="w-6 h-6 md:w-8 md:h-8" />
          </a>
          <a
            href="https://www.tiktok.com/@bemunai"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiOutlineTikTok className="w-6 h-6 md:w-8 md:h-8" />
          </a>
        </div>
      </div>
    </footer>
  );
}
