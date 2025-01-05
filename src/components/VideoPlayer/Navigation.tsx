import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface NavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
  isNextEnabled: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  onPrevious,
  onNext,
  hasPrevious,
  hasNext,
  isNextEnabled,
}) => {
  return (
    <div className="flex justify-between gap-4 mt-4">
      {hasPrevious ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <ChevronLeft size={20} />
          Previous Video
        </motion.button>
      ) : (
        <div className="flex-1" />
      )}

      {hasNext && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={!isNextEnabled}
          className={`flex-1 font-bold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 ${
            isNextEnabled
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          Next Video
          <ChevronRight size={20} />
        </motion.button>
      )}
    </div>
  );
};