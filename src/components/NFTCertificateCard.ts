// components/NFTCertificateCard.tsx
import React from 'react';

interface NFTCertificateCardProps {
  name: string;
  description: string;
  image: string;
}

const NFTCertificateCard: React.FC<NFTCertificateCardProps> = ({ name, description, image }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 text-center">
      <img src={image} alt={name} className="mb-4 rounded-lg" />
      <h2 className="text-2xl font-bold text-white mb-2">{name}</h2>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default NFTCertificateCard;
