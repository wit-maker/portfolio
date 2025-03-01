import { AppResponse } from '../../types/app';
import { ApiResponseWrapper } from '../../types/api';
import { Project } from '../../types/project';

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

// キャッシュ用の変数
let appsCache: ApiResponseWrapper<Project> | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30分間キャッシュを有効にする（5分から30分に延長）

export const fetchApps = async (): Promise<ApiResponseWrapper<Project>> => {
  const now = Date.now();

  // キャッシュが有効な場合はキャッシュを返す
  if (appsCache && now - lastFetchTime < CACHE_TTL) {
    return appsCache;
  }

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const apiKey = process.env.NEXT_PUBLIC_DASHBOARD_API_KEY;

  if (!baseUrl || !apiKey) {
    console.warn('環境変数が設定されていません。モックデータを使用します。');
    const mockResponse: ApiResponseWrapper<Project> = {
      status: 'success',
      data: {
        apps: mockProjects,
      },
    };

    // モックデータもキャッシュに保存
    appsCache = mockResponse;
    lastFetchTime = now;

    return mockResponse;
  }

  try {
    const response = await fetch(`${baseUrl}/api/apps/portfolio`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      // キャッシュ戦略を改善
      cache: 'force-cache',
      next: { revalidate: 3600 }, // 1時間ごとに再検証
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    // 結果をキャッシュに保存
    appsCache = data;
    lastFetchTime = now;

    return data;
  } catch (error) {
    console.error('API request failed:', error);

    // エラー時はモックデータを返す
    const mockResponse: ApiResponseWrapper<Project> = {
      status: 'success',
      data: {
        apps: mockProjects,
      },
    };

    return mockResponse;
  }
};

export const fetchProjects = fetchApps;
