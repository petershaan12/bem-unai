import React from 'react';  
  
interface CardProps {
  title: string;
  abbreviation: string;
  type: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ title, type, abbreviation, image }) => {
  return (
    <div className="bg-transparent rounded-xl p-5 border border-secondary w-72 shadow-[0_0_2px_#CECA83,0_0_5px_#CECA83,0_0_10px_#ceca8399,0_0_20px_#ceca834c] transition-shadow duration-300">
      <div className="flex items-center gap-4">
        <img src={`/icon/${image}.svg`} alt={title} className="w-8 h-8" />
        <div className="leading-tight">
          <h3 className="font-bold uppercase">{abbreviation}</h3>
          <p className="text-sm font-light">{type}</p>
        </div>
      </div>
      <p className=" mt-2 font-light">{title}</p>
    </div>
  );
};  
  
export default Card;  
