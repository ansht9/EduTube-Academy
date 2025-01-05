import { useStore } from '../store/useStore';
import type { UserPlaylist } from '../types';

export const usePlaylist = (playlistId: string | undefined) => {
  const { userPlaylists } = useStore();
  
  const playlist = playlistId 
    ? userPlaylists.find((p) => p.id === playlistId)
    : undefined;

  return {
    playlist,
    isLoading: false,
    error: null
  };
};