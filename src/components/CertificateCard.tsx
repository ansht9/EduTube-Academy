import React from 'react';
import { Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Certificate } from '../types/certificate';

interface CertificateCardProps {
  certificate: Certificate;
}

export const CertificateCard: React.FC<CertificateCardProps> = ({ certificate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src={certificate.thumbnail}
        alt={certificate.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-4">{certificate.title}</h3>
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <Calendar size={16} />
          <span>
            {new Date(certificate.completedDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {certificate.skills.map((skill) => (
            <span
              key={`${certificate.id}-${skill}`}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};