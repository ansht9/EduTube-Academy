import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileSection } from '../components/ProfileSection';
import type { UserPlaylist } from '../types';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStartWatching = (playlist: UserPlaylist) => {
    navigate(`/learning/${playlist.id}`);
  };

  return (
    <div>
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Your Learning Profile</h1>
        <p className="text-gray-400">
          Track your progress and continue your learning journey
        </p>
      </header>

      <ProfileSection onStartWatching={handleStartWatching} />
    </div>
  );
};