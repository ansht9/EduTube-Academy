import React from 'react';
import { Play, Award, Star } from 'lucide-react';
import type { Playlist } from '../types';
import { motion } from 'framer-motion';

interface PlaylistCardProps {
  playlist: Playlist;
  onOpenModal: () => void;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, onOpenModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <img
        src={playlist.thumbnail}
        alt={playlist.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{playlist.title}</h3>
        <div className="flex items-center gap-4 text-gray-400 mb-4">
          <div className="flex items-center gap-2">
            <Play size={16} />
            <span>{playlist.videoCount} videos</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={16} />
            <span>{playlist.viewCount} views</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {playlist.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-green-600 text-white text-sm rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <button
          onClick={onOpenModal}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <Award size={20} />
          View Details
        </button>
      </div>
    </motion.div>
  );
};