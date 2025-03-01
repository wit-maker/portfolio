import React from 'react';
import Image from 'next/image';
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '../../../components/Card';
import { getProjectBySlug } from '../../../lib/projects';
import { notFound } from 'next/navigation';
import { Metadata, ResolvingMetadata } from 'next';
import { Project } from '../../../types/project';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'プロジェクトが見つかりません',
    };
  }

  return {
    title: `${project.title} | ポートフォリオ`,
    description: project.description,
  };
}

export default async function ProjectDetail({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 p-8">
      <Card className="max-w-4xl mx-auto bg-card">
        <CardHeader className="bg-card">
          <CardTitle className="text-2xl font-bold text-[#333333] dark:text-[#ffffff]">
            {project.title}
          </CardTitle>
          <CardDescription className="text-[#666666] dark:text-[#cccccc]">
            {project.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-card">
          {project.image && (
            <div className="mb-6 relative rounded-lg overflow-hidden h-64 w-full">
              <Image
                src={project.image}
                alt={project.title}
                layout="fill"
                objectFit="cover"
                priority
              />
            </div>
          )}

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-[#333333] dark:text-[#ffffff]">
              使用技術
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack?.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-[#e5e7eb] dark:bg-[#4b5563] text-[#333333] dark:text-[#ffffff] rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-[#333333] dark:text-[#ffffff]">
              詳細説明
            </h3>
            <p className="text-[#4b5563] dark:text-[#d1d5db] whitespace-pre-line">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#1f2937] text-white rounded-md hover:bg-[#111827] transition-colors"
              >
                GitHub
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#3b82f6] text-white rounded-md hover:bg-[#2563eb] transition-colors"
              >
                デモサイト
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
