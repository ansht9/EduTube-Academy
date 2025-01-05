// components/VideoPlayer/Quiz/QuizContent.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Quiz } from '../../../types';

interface QuizContentProps {
  quiz: Quiz;
  isAnswered: boolean;
  onComplete: () => void;
}

export const QuizContent: React.FC<QuizContentProps> = ({
  quiz,
  isAnswered,
  onComplete,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  return (
    <>
      <p className="text-gray-300 mb-6">{quiz.question}</p>
      <div className="space-y-3">
        {quiz.options.map((option) => (
          <button
            key={option}
            onClick={() => !isAnswered && setSelectedAnswer(option)}
            disabled={isAnswered}
            className={`w-full p-4 rounded-lg text-left transition-colors duration-200 ${
              selectedAnswer === option
                ? 'bg-green-600 text-white'
                : isAnswered
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedAnswer && !isAnswered && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
        >
          Submit Answer
        </motion.button>
      )}
    </>
  );
};
