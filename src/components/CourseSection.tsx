import React from 'react';
import { PlaylistCard } from './PlaylistCard';
import type { Playlist } from '../types';
import { motion } from 'framer-motion';

interface CourseSectionProps {
  title: string;
  playlists: Playlist[];
  horizontal?: boolean;
  onOpenModal: (playlist: Playlist) => void;
}

export const CourseSection: React.FC<CourseSectionProps> = ({
  title,
  playlists,
  horizontal = false,
  onOpenModal,
}) => {
  if (playlists.length === 0) return null;

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div
        className={`${
          horizontal
            ? 'flex space-x-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800'
            : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
        }`}
      >
        {playlists.map((playlist) => (
          <motion.div
            key={playlist.id}
            className={horizontal ? 'flex-none w-[400px]' : ''}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <PlaylistCard
              playlist={playlist}
              onOpenModal={() => onOpenModal(playlist)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};