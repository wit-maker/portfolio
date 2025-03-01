import React from 'react';
import { getProjects } from '@/lib/api/server';
import ClientProjects from '@/components/ClientProjects';

// サーバーコンポーネント
export default async function Projects() {
  // サーバーサイドでデータを取得
  const projects = await getProjects();

  // クライアントコンポーネントにデータを渡す
  return <ClientProjects initialProjects={projects} />;
}
