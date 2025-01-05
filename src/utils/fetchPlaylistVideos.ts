// utils/youtubeApi.ts
import axios from 'axios';
import { YOUTUBE_API_KEY } from '../config/constants';

export const fetchPlaylistVideos = async (playlistId: string) => {
  const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,id&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`;
  const response = await axios.get(url);
  return response.data.items.map((item: any) => ({
    id: item.snippet.resourceId.videoId,
    title: item.snippet.title,
  }));
};
