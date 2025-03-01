'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/types/project';
import { Fragment, type JSX, type ReactElement } from 'react';

const ProjectCard = ({ project }: { project: Project }): JSX.Element => {
  const { title, description, imageUrl, technologies, githubUrl, demoUrl } =
    project;

  const IconArrow = (): ReactElement => (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300"
    >
      <path
        d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );

  const renderProjectImage = (): ReactElement | null => {
    if (!imageUrl || imageUrl.includes('/apps/create')) return null;
    return (
      <Image
        src={imageUrl}
        alt={`${title}のスクリーンショット`}
        width={800}
        height={400}
        className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
        priority={true}
        quality={75}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAEtAJJXIDTjwAAAABJRU5ErkJggg=="
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    );
  };

  const renderTechnologies = (): ReactElement | null => {
    if (!technologies?.length) return null;
    return (
      <ul className="flex flex-wrap gap-2 mb-6">
        {technologies.map((tech) => (
          <Fragment key={tech}>
            <li>
              <span className="inline-block px-4 py-2 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-[#c5a572]/20 dark:hover:bg-[#c5a572]/20 transition-colors duration-300">
                {tech}
              </span>
            </li>
          </Fragment>
        ))}
      </ul>
    );
  };

  const renderLinks = (): ReactElement => (
    <div className="flex gap-6">
      {githubUrl && (
        <Link
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center gap-2 text-[#c5a572] hover:text-[#b39362] font-medium transition-all duration-300"
        >
          <span className="relative inline-block">GitHub</span>
          <IconArrow />
        </Link>
      )}
      {demoUrl && (
        <Link
          href={demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link flex items-center gap-2 text-[#c5a572] hover:text-[#b39362] font-medium transition-all duration-300"
        >
          <span className="relative inline-block">デモサイト</span>
          <IconArrow />
        </Link>
      )}
    </div>
  );

  return (
    <article className="rounded-lg overflow-hidden shadow-md group relative w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-[#c5a572]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="p-4 p-0">
        <div className="relative w-full h-56 overflow-hidden">
          {renderProjectImage()}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        <div className="relative p-6">
          <h3 className="text-lg font-semibold text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-[#c5a572] transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-500 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      <div className="p-4 p-6 pt-0">
        {renderTechnologies()}
        {renderLinks()}
      </div>
    </article>
  );
};

export default ProjectCard;
