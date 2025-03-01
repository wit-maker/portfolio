export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  demoUrl: string;
  slug: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: '千ノック',
    description:
      'Next.js、TypeScript、Tailwind CSSを使用したモダンなポートフォリオサイト',
    image: '/images/portfolio.png',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/wit-maker/portfolio',
    demoUrl: 'https://portfolio.example.com',
    slug: 'portfolio',
  },
  // 必要に応じてプロジェクトを追加
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};
