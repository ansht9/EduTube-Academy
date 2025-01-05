import axios from 'axios';
import { YOUTUBE_API_KEY } from '../config/constants';
import { MOCK_PLAYLISTS } from '../config/mockPlaylists';
import type { Playlist } from '../types';

export const fetchYouTubePlaylists = async (playlistIds: string[]): Promise<Playlist[]> => {
  try {
    const playlistData = await Promise.all(
      playlistIds.map(async (id) => {
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&id=${id}&key=${YOUTUBE_API_KEY}`
        );
        const playlist = response.data.items[0];
        // Find matching mock playlist to get the skills
        const mockPlaylist = MOCK_PLAYLISTS.find(p => p.id === id);
        
        return {
          id: playlist.id,
          title: playlist.snippet.title,
          description: playlist.snippet.description,
          thumbnail: playlist.snippet.thumbnails.high.url,
          videoCount: playlist.contentDetails.itemCount,
          viewCount: Math.floor(Math.random() * 100000),
          skills: mockPlaylist?.skills || []
        };
      })
    );
    return playlistData;
  } catch (error) {
    console.error('Error fetching playlists, using mock data');
    return MOCK_PLAYLISTS;
  }
};