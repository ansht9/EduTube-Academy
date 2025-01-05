import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizContent } from './QuizContent';
import type { Quiz } from '../../../types';

interface QuizSectionProps {
  quiz: Quiz;
  isAnswered: boolean;
  onComplete: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between bg-gray-700 hover:bg-gray-600 transition-colors duration-200"
      >
        <h3 className="text-xl font-bold text-white">Quiz</h3>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <QuizContent {...props} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};