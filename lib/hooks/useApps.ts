import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { fetchApps } from '../api/client';

export const useApps = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadApps = async () => {
      try {
        const response = await fetchApps();
        const transformedProjects: Project[] = response.data.apps
          .filter((app) => app.status === 'ACTIVE')
          .map((app) => ({
            id: app.id,
            title: app.title,
            description: app.description,
            imageUrl: app.imageUrl,
            technologies: app.technologies,
            githubUrl: app.githubUrl,
            demoUrl: app.demoUrl,
            createdAt: app.createdAt,
            updatedAt: app.updatedAt,
            publishedAt: app.publishedAt,
            status: app.status,
          }));
        setProjects(transformedProjects);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('Failed to fetch apps')
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadApps();
  }, []);

  return { projects, isLoading, error };
};
