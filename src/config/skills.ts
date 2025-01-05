// Technology Skills
export const TECH_SKILLS = [
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Python',
  'Vue.js',
  'Angular',
  'Next.js',
  'Express.js',
  'MongoDB',
] as const;

// Development Areas
export const DEV_AREAS = [
  'Frontend Development',
  'Backend Development',
  'Full Stack Development',
  'Mobile Development',
  'Cloud Computing',
  'DevOps',
  'System Design',
  'Software Architecture',
] as const;

// Tools and Platforms
export const TOOLS = [
  'Git',
  'Docker',
  'AWS',
  'Firebase',
  'GraphQL',
  'REST API',
  'Redux',
  'Webpack',
] as const;

// Combine all skills
export const ALL_SKILLS = [...TECH_SKILLS, ...DEV_AREAS, ...TOOLS] as const;

// Helper function to get random skills
export const getRandomSkills = (count: number = 3): string[] => {
  const shuffled = [...ALL_SKILLS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};