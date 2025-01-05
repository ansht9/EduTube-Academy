import React from 'react';
import { Bookmark } from 'lucide-react';
import { ProfilePlaylistCard } from './ProfilePlaylistCard';
import { useStore } from '../store/useStore';
import { motion } from 'framer-motion';
import type { UserPlaylist } from '../types';

interface ProfileSectionProps {
  onStartWatching: (playlist: UserPlaylist) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({ onStartWatching }) => {
  const { userPlaylists } = useStore();

  if (userPlaylists.length === 0) {
    return null;
  }

  return (
    <section className="mb-12">
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="text-green-500" size={24} />
        <h2 className="text-2xl font-bold text-white">Your Learning Journey</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {userPlaylists.map((playlist) => (
          <motion.div
            key={playlist.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProfilePlaylistCard
              playlist={playlist}
              onStartWatch={() => onStartWatching(playlist)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};