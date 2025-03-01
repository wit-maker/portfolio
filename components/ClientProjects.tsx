'use client';

import React from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types/project';

interface ClientProjectsProps {
  initialProjects: Project[];
}

const ClientProjects: React.FC<ClientProjectsProps> = ({ initialProjects }) => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#c5a572] to-[#a88a5c]">
            プロジェクト
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            これまでに手がけた主要なプロジェクト
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialProjects.length > 0 ? (
            initialProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500">プロジェクトがありません</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientProjects;
