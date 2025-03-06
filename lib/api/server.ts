import 'server-only';
import { unstable_cache } from 'next/cache';
import { Project } from '@/types/project';
import { ApiResponseWrapper } from '@/types/api';

// モックプロジェクトデータ
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'ポートフォリオサイト',
    description:
      'Next.js、TypeScript、Tailwind CSSを使用したモダンなポートフォリオサイト',
    imageUrl: '/images/projects/portfolio.jpg',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/example/portfolio',
    demoUrl: 'https://portfolio-example.vercel.app',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
  {
    id: '2',
    title: 'ECサイト',
    description: 'React、Node.js、MongoDBを使用したECサイト',
    imageUrl: '/images/projects/ecommerce.jpg',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    githubUrl: 'https://github.com/example/ecommerce',
    demoUrl: 'https://ecommerce-example.vercel.app',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    publishedAt: new Date().toISOString(),
    status: 'published',
  },
];

// サーバーサイドでのデータフェッチング
export const fetchProjectsServer = async (): Promise<
  ApiResponseWrapper<Project>
> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;

  // 開発環境またはビルド時に環境変数が設定されていない場合はモックデータを返す
  if (!baseUrl || !apiKey) {
    console.warn('環境変数が設定されていません。モックデータを使用します。');
    return {
      status: 'success',
      data: {
        apps: mockProjects,
      },
    };
  }

  try {
    const response = await fetch(`${baseUrl}/api/apps/portfolio`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      next: { revalidate: 3600 }, // 1時間ごとに再検証
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    // エラー時もモックデータを返す
    return {
      status: 'success',
      data: {
        apps: mockProjects,
      },
    };
  }
};

// Next.jsのキャッシュを使用した最適化されたデータフェッチング
export const getProjects = unstable_cache(
  async () => {
    try {
      const response = await fetchProjectsServer();
      if (response.status === 'success' && response.data?.apps) {
        return response.data.apps;
      }
      return mockProjects; // エラー時はモックデータを返す
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      return mockProjects; // エラー時はモックデータを返す
    }
  },
  ['projects-data'],
  { revalidate: 3600 } // 1時間ごとに再検証
);

// 統計情報の計算
export const getStats = unstable_cache(
  async () => {
    try {
      const projects = await getProjects();

      // 完了プロジェクト数を計算
      const completedProjects = projects.length;

      // 使用技術の種類を計算（重複を除外）
      const uniqueTechnologies = new Set<string>();
      projects.forEach((project: Project) => {
        project.technologies.forEach((tech: string) => {
          uniqueTechnologies.add(tech);
        });
      });

      return [
        {
          label: '完了プロジェクト',
          value: completedProjects,
        },
        {
          label: '使用技術',
          value: uniqueTechnologies.size,
        },
      ];
    } catch (error) {
      console.error('Failed to calculate stats:', error);
      return [
        { label: '完了プロジェクト', value: 0 },
        { label: '使用技術', value: 0 },
      ];
    }
  },
  ['projects-data'],
  { revalidate: 3600 } // 1時間ごとに再検証
);
