import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-64 bg-gray-800 rounded-lg">
      <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
    </div>
  );
};