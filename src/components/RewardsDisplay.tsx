import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';
import type { UserPlaylist } from '../types';
import { motion } from 'framer-motion';

interface RewardsDisplayProps {
  playlist: UserPlaylist;
}

export const RewardsDisplay: React.FC<RewardsDisplayProps> = ({ playlist }) => {
  const totalRewards = playlist.rewards + playlist.milestoneRewards;
  const milestones = [
    { threshold: 25, reward: 100, achieved: playlist.progress >= 25 },
    { threshold: 50, reward: 100, achieved: playlist.progress >= 50 },
    { threshold: 75, reward: 100, achieved: playlist.progress >= 75 },
    { threshold: 100, reward: 250, achieved: playlist.progress >= 100 },
  ];

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
      <div className="grid grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-700 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="text-yellow-400" size={24} />
            <h3 className="text-lg font-bold text-white">Total Rewards</h3>
          </div>
          <p className="text-3xl font-bold text-green-400">{totalRewards}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
            <Award size={16} />
            <span>Base: {playlist.rewards}</span>
            <Star size={16} className="ml-2" />
            <span>Milestone: {playlist.milestoneRewards}</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-700 rounded-lg p-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <Star className="text-yellow-400" size={24} />
            <h3 className="text-lg font-bold text-white">Milestones</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {milestones.map(({ threshold, reward, achieved }) => (
              <div
                key={threshold}
                className={`text-center p-2 rounded ${
                  achieved ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <div className="text-sm font-bold">{threshold}%</div>
                <div className="text-xs text-gray-300">+{reward}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};