export type AppStatus = 'ACTIVE' | 'INACTIVE' | 'DEVELOPMENT' | 'ARCHIVED';

export interface Language {
  id: string;
  name: string;
}

export interface App {
  id: string;
  name: string;
  description: string;
  status: AppStatus;
  githubUrl: string | null;
  appUrl: string | null;
  imageUrl: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  languages: Language[];
}

export interface AppResponse {
  apps: App[];
}