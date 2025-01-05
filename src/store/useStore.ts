import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Playlist, UserPlaylist, Certificate } from '../types';

interface Store {
  selectedSkills: string[];
  userPlaylists: UserPlaylist[];
  certificates: Certificate[];
  toggleSkill: (skill: string) => void;
  addToProfile: (playlist: Playlist) => void;
  updateProgress: (playlistId: string, progress: number) => void;
  completeVideo: (playlistId: string, videoIndex: number) => void;
  addCertificate: (certificate: Certificate) => void;
}

const initialPlaylistState = {
  progress: 0,
  rewards: 0,
  milestoneRewards: 0,
  unclaimedRewards: 0,
  completedVideos: [],
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      selectedSkills: [],
      userPlaylists: [],
      certificates: [],
      toggleSkill: (skill) =>
        set((state) => ({
          selectedSkills: state.selectedSkills.includes(skill)
            ? state.selectedSkills.filter((s) => s !== skill)
            : [...state.selectedSkills, skill],
        })),
      addToProfile: (playlist) =>
        set((state) => ({
          userPlaylists: state.userPlaylists.some((p) => p.id === playlist.id)
            ? state.userPlaylists
            : [
                ...state.userPlaylists,
                {
                  ...playlist,
                  ...initialPlaylistState,
                },
              ],
        })),
      updateProgress: (playlistId, progress) =>
        set((state) => ({
          userPlaylists: state.userPlaylists.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  progress,
                  rewards: Math.floor(progress * 10),
                  unclaimedRewards: Math.floor(progress * 15),
                  milestoneRewards:
                    (progress >= 25 ? 100 : 0) +
                    (progress >= 50 ? 100 : 0) +
                    (progress >= 75 ? 100 : 0) +
                    (progress >= 100 ? 250 : 0),
                }
              : playlist
          ),
        })),
      completeVideo: (playlistId, videoIndex) =>
        set((state) => ({
          userPlaylists: state.userPlaylists.map((playlist) =>
            playlist.id === playlistId
              ? {
                  ...playlist,
                  completedVideos: [...(playlist.completedVideos || []), videoIndex],
                }
              : playlist
          ),
        })),
      addCertificate: (certificate) =>
        set((state) => ({
          certificates: [...state.certificates, certificate],
        })),
    }),
    {
      name: 'learning-platform-storage',
    }
  )
);