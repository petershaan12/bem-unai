import React from 'react';  
  
interface CardProps {  
  title: string;  
  type: string;  
  description: string;  
  icon: React.ReactNode; // You can use an icon component or an image  
}  
  
const Card: React.FC<CardProps> = ({ title, type, description, icon }) => {  
  return (  
    <div className="bg-base-100 shadow-lg rounded-lg p-4 flex flex-col items-center">  
      <div className="text-3xl mb-2">{icon}</div>  
      <h3 className="text-xl font-bold">{title}</h3>  
      <p className="text-sm text-gray-500">{type}</p>  
      <p className="text-center text-gray-700">{description}</p>  
    </div>  
  );  
};  
  
export default Card;  
