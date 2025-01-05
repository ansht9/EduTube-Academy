import React from 'react';
import { Award } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CertificateCard } from '../components/CertificateCard';

export const CertificatesPage: React.FC = () => {
  const { certificates } = useStore();

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Certificates</h1>
        <p className="text-gray-400">
          Showcase your achievements and completed courses
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((certificate) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <Award size={48} className="mx-auto mb-4" />
          <p>Complete courses to earn certificates</p>
        </div>
      )}
    </div>
  );
};