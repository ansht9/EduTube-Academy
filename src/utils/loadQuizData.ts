// utils/loadQuizData.ts
import quizData from '../components/questions.json';

export const getQuizForVideo = (playlistId: string, videoIndex: number) => {
  if (!quizData[playlistId] || !quizData[playlistId][videoIndex]) {
    return null; // Return null or a default quiz if the data is not found
  }
  return quizData[playlistId][videoIndex];
};
