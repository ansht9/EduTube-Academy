import type { Video } from '../types';

const MOCK_VIDEOS: Video[] = [
  {
    id: 'dGcsHMXbSOA',
    title: 'Introduction to React',
    description: 'Learn the basics of React',
    quiz: {
      question: 'What is React?',
      options: [
        'A JavaScript library for building user interfaces',
        'A database management system',
        'A programming language',
        'An operating system'
      ],
      correctAnswer: 'A JavaScript library for building user interfaces'
    }
  },
  // ... rest of the mock videos
];

export const getMockVideos = (): Video[] => MOCK_VIDEOS;