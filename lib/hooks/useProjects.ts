'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { fetchProjects } from '@/lib/api/client';
import { ApiResponseError } from '@/types/api';

// グローバルキャッシュ
let projectsCache: Project[] | null = null;
let lastFetchTime = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30分間キャッシュを有効にする（5分から30分に延長）

// 画像のプリロード関数
const preloadImages = (projects: Project[]) => {
  if (typeof window === 'undefined') return;

  // 最初の6つのプロジェクト画像のみをプリロード（パフォーマンスのため）
  projects.slice(0, 6).forEach((project) => {
    if (project.imageUrl && !project.imageUrl.includes('/apps/create')) {
      const img = new Image();
      img.src = project.imageUrl;
    }
  });
};

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(projectsCache || []);
  const [loading, setLoading] = useState(!projectsCache);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      // キャッシュが有効な場合は早期リターン
      const now = Date.now();
      if (projectsCache && now - lastFetchTime < CACHE_TTL) {
        setProjects(projectsCache);
        setLoading(false);
        // キャッシュされたプロジェクトの画像もプリロード
        preloadImages(projectsCache);
        return;
      }

      try {
        setLoading(true);
        const response = await fetchProjects();
        if (response.status === 'success' && response.data?.apps) {
          // キャッシュを更新
          projectsCache = response.data.apps;
          lastFetchTime = now;

          setProjects(response.data.apps);
          setError(null);

          // 新しく取得したプロジェクトの画像をプリロード
          preloadImages(response.data.apps);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (err) {
        console.error('Error loading projects:', err);
        const message =
          err instanceof ApiResponseError
            ? `API Error: ${err.message}`
            : 'プロジェクトの取得に失敗しました';
        setError(message);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return { projects, loading, error };
}
