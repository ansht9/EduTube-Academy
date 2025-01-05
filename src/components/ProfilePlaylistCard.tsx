import React from 'react';
import { Play, Award, Star, RefreshCw } from 'lucide-react';
import type { UserPlaylist } from '../types';
import { motion } from 'framer-motion';

interface ProfilePlaylistCardProps {
  playlist: UserPlaylist;
  onStartWatch: () => void;
}

export const ProfilePlaylistCard: React.FC<ProfilePlaylistCardProps> = ({
  playlist,
  onStartWatch,
}) => {
  const totalRewards = playlist.rewards + playlist.milestoneRewards;

  const getButtonContent = () => {
    if (playlist.progress === 100) {
      return (
        <>
          <RefreshCw size={20} />
          Revise
        </>
      );
    }
    if (playlist.progress > 0) {
      return (
        <>
          <Play size={20} />
          Continue Watching
        </>
      );
    }
    return (
      <>
        <Play size={20} />
        Start Watching
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 m-4 bg-green-600 text-white px-3 py-1 rounded-full">
          {playlist.progress}% Complete
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{playlist.title}</h3>
        <div className="flex items-center gap-4 text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Award size={16} />
            <span>{totalRewards} rewards</span>
          </div>
        </div>
        <button
          onClick={onStartWatch}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          {getButtonContent()}
        </button>
      </div>
    </motion.div>
  );
};