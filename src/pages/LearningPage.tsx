// page/LearningPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoPlayer } from '../components/VideoPlayer';
import { RewardsDisplay } from '../components/RewardsDisplay';
import { useStore } from '../store/useStore';
import { fetchPlaylistVideos } from '../utils/fetchPlaylistVideos';
import { getQuizForVideo } from '../utils/loadQuizData';
import { usePlaylist } from '../hooks/usePlaylist';

export const LearningPage: React.FC = () => {
  const { playlistId } = useParams<{ playlistId: string }>();
  const navigate = useNavigate();
  const { updateProgress, completeVideo } = useStore();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [videos, setVideos] = useState([]);

  const { playlist } = usePlaylist(playlistId);

  useEffect(() => {
    const loadVideos = async () => {
      const videosData = await fetchPlaylistVideos(playlistId);
      setVideos(videosData);
    };

    loadVideos();
  }, [playlistId]);

  useEffect(() => {
    if (!playlist?.completedVideos) return;

    const nextVideoIndex = videos.findIndex((_, index) =>
      !playlist.completedVideos.includes(index)
    );

    if (nextVideoIndex !== -1) {
      setCurrentVideoIndex(nextVideoIndex);
    }
  }, [playlist, videos]);

  if (!playlist) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">Playlist not found</p>
      </div>
    );
  }

  const handleQuizComplete = () => {
    if (!playlistId) return;

    completeVideo(playlistId, currentVideoIndex);

    const newCompletedCount = (playlist.completedVideos?.length || 0) + 1;
    const progress = (newCompletedCount / videos.length) * 100;

    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
      updateProgress(playlistId, progress);
    } else {
      updateProgress(playlistId, 100);
      navigate(`/congrats/${playlistId}`);
    }
  };

  const currentQuiz = getQuizForVideo(playlistId, currentVideoIndex);

  if (!currentQuiz) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-400">Quiz not found for this video</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <RewardsDisplay playlist={playlist} />

      <VideoPlayer
        videoId={videos[currentVideoIndex]?.id}
        quiz={currentQuiz}
        onComplete={handleQuizComplete}
      />
    </div>
  );
};
