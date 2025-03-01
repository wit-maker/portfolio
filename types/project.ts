export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status?: string;
  longDescription?: string;
}

export interface ProjectsResponse {
  projects: Project[];
  totalCount: number;
}
