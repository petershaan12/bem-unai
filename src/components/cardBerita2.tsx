import Image from 'next/image';
import React from 'react';
import { CgEye } from 'react-icons/cg';

interface CardProps {
  title: string;
  date: string;
  bannerImage: string | null;
  organizer: string | null;
  views: number;
}

const CardBerita2: React.FC<CardProps> = ({ title, date, bannerImage, organizer, views }: CardProps) => {
  return (
    <div className="flex flex-col md:flex-row md:p-0 gap-10 -mt-5 justify-start items-center ">
      <Image
       src={bannerImage || '/default-image-path.jpg'}
        alt="Berita 1"
        className=" object-cover w-72"
        width={280}
        height={100}
      />
      <div>
        <h3 className="text-white text-4xl font-bigNoddle mt-2">
          {title}
        </h3>
        <p className="text-gray-300 mt-2 text-sm font-light">{new Date(date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <div className='flex justify-between items-center mt-4 gap-10' >
            <div className="flex items-center gap-4">
            <Image
              src={`/icon/divisi.svg`}
              alt="divisi"
              className="w-8 h-8"
              width={32}
              height={32}
            />
            <span className="text-sm text-white">{organizer}</span>
            </div>
          <div className="flex items-center gap-2 ">
            <CgEye className="inline-block" />
            <span className="font-light">{views} dilihat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBerita2;  
