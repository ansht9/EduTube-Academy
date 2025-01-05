// pages/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { PlaylistModal } from '../components/PlaylistModal';
import { SearchBar } from '../components/SearchBar';
import { CourseSection } from '../components/CourseSection';
import { SkillFilter } from '../components/SkillFilter';
import { useStore } from '../store/useStore';
import { fetchYouTubePlaylists } from '../services/youtube';
import { PLAYLIST_IDS } from '../config/constants';
import type { Playlist } from '../types';
import LoginButton from '../components/LoginButton';
import { useOCAuth } from '@opencampus/ocid-connect-js';

export const HomePage: React.FC = () => {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedSkills } = useStore();
  const { authState, ocAuth, isInitialized } = useOCAuth();

  useEffect(() => {
    const loadPlaylists = async () => {
      const data = await fetchYouTubePlaylists(PLAYLIST_IDS);
      setPlaylists(data);
    };

    loadPlaylists();
  }, []);

  // Filter playlists based on search and skills
  const filteredPlaylists = playlists.filter((playlist) => {
    const matchesSearch = playlist.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSkills = selectedSkills.length === 0 ||
      playlist.skills.some((skill) => selectedSkills.includes(skill));
    return matchesSearch && matchesSkills;
  });

  // Only show featured sections when no filters are active
  const showFeaturedSections = searchQuery === '' && selectedSkills.length === 0;

  const newCourses = showFeaturedSections
    ? [...playlists].sort(() => Math.random() - 0.5).slice(0, 3)
    : [];

  const popularCourses = showFeaturedSections
    ? [...playlists].sort((a, b) => b.viewCount - a.viewCount).slice(0, 3)
    : [];

  const handleOpenModal = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
    setIsModalOpen(true);
  };

  if (!isInitialized) {
    return <div>Loading...</div>;
  }

  if (authState && authState.error) {
    return <div>Error: {authState.error.message}</div>;
  }

  // Add a loading state
  if (authState && authState.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Learning Playlists</h1>
        <p className="text-gray-400">
          Explore curated playlists and start your learning journey
        </p>
      </header> */}

      {authState && authState.isAuthenticated ? (
        <>
        <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Discover Learning Playlists</h1>
        <p className="text-gray-400">
          Explore curated playlists and start your learning journey
        </p>
      </header>
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          <SkillFilter />

          {showFeaturedSections && (
            <>
              <CourseSection
                title="New Courses"
                playlists={newCourses}
                horizontal={true}
                onOpenModal={handleOpenModal}
              />

              <CourseSection
                title="Popular Courses"
                playlists={popularCourses}
                horizontal={true}
                onOpenModal={handleOpenModal}
              />
            </>
          )}

          <CourseSection
            title={showFeaturedSections ? "All Courses" : "Courses"}
            playlists={filteredPlaylists}
            onOpenModal={handleOpenModal}
          />

          {selectedPlaylist && (
            <PlaylistModal
              playlist={selectedPlaylist}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setSelectedPlaylist(null);
              }}
            />
          )}
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};
