import type { Quiz } from './quiz';

export interface Video {
  id: string;
  title: string;
  description: string;
  quiz: Quiz;
}