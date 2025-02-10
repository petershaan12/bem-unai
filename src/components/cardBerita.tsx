import Image from 'next/image';
import React from 'react';

interface CardProps {
 title: string;
 content: string;
 bannerImage: string | null;
 organizer: string | null;
}

const CardBerita: React.FC<CardProps> = ({title, content, bannerImage, organizer}: CardProps) => {
  return (
    <div className="flex flex-col p-6 gap-10 border rounded-xl border-white/40 bg-black">
      <img
        src={`/posts${bannerImage}`}
        alt="Berita 1"
        className="rounded-lg w-full md:w-auto"
      />
      <div>
        <h3 className="text-white text-5xl font-bigNoddle mt-2">
          {title}
        </h3>
        <p className="text-gray-300 mt-2 font-light">January 28, 2025</p>
        <div className="flex items-center gap-4 mt-4">
          <img
            src={`/icon/divisi.svg`}
            alt="divisi"
            className="w-8 h-8"
          />
          <span className="text-sm text-white">{organizer}</span>
        </div>
      </div>
    </div>
  );
};

export default CardBerita;  
