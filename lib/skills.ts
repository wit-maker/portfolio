export interface Skill {
  name: string;
  level: number;
  category: string;
}

export const skills: Skill[] = [
  // { name: 'React', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Language' },
  // { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Next.js', level: 85, category: 'Frontend' },
  // { name: 'Python', level: 75, category: 'Language' },
  // { name: 'AWS', level: 70, category: 'Infrastructure' },
  // 必要に応じてスキルを追加
];
