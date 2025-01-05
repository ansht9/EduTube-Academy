import React from 'react';
import { Tag } from 'lucide-react';
import { ALL_SKILLS } from '../config/skills';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';

export const SkillFilter: React.FC = () => {
  const { selectedSkills, toggleSkill } = useStore();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <Tag className="text-green-500" />
        <h2 className="text-xl font-bold text-white">Filter by Skills</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {ALL_SKILLS.map((skill) => (
          <motion.button
            key={skill}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => toggleSkill(skill)}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
              selectedSkills.includes(skill)
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {skill}
          </motion.button>
        ))}
      </div>
    </div>
  );
};