'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import { useProjects } from '@/lib/hooks/useProjects';
import { Project } from '@/types/project';

export function ClientProjectGrid() {
  const { projects, loading, error } = useProjects();

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.length > 0 ? (
        <>
          {projects.map((project: Project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </>
      ) : (
        <div className="text-center p-4">No projects found</div>
      )}
    </div>
  );
}
