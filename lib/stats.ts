import { Project } from '@/types/project';
import { fetchProjects } from '@/lib/api/client';

interface Stat {
  label: string;
  value: string | number;
}

// キャッシュ用の変数
let statsCache: Stat[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5分間キャッシュを有効にする

export async function calculateStats(): Promise<Stat[]> {
  const now = Date.now();

  // キャッシュが有効な場合はキャッシュを返す
  if (statsCache && now - lastFetchTime < CACHE_TTL) {
    return statsCache;
  }

  try {
    // 既存のfetchProjectsを使用してデータを取得
    const response = await fetchProjects();
    if (response.status !== 'success' || !response.data?.apps) {
      throw new Error('Invalid response format');
    }

    const projects = response.data.apps;

    // 完了プロジェクト数を計算
    const completedProjects = projects.length;

    // 使用技術の種類を計算（重複を除外）
    const uniqueTechnologies = new Set<string>();
    projects.forEach((project) => {
      project.technologies.forEach((tech) => {
        uniqueTechnologies.add(tech);
      });
    });

    // 結果をキャッシュに保存
    statsCache = [
      {
        label: '完了プロジェクト',
        value: completedProjects,
      },
      {
        label: '使用技術',
        value: uniqueTechnologies.size,
      },
    ];

    lastFetchTime = now;
    return statsCache;
  } catch (error) {
    console.error('Failed to calculate project stats:', error);
    return [
      { label: '完了プロジェクト', value: '0' },
      { label: '使用技術', value: '0' },
    ];
  }
}
