import React from 'react';
import { getStats } from '@/lib/api/server';
import ClientHero from '@/components/ClientHero';

// サーバーコンポーネント
export default async function Hero() {
  // サーバーサイドでデータを取得
  const stats = await getStats();

  // クライアントコンポーネントにデータを渡す
  return <ClientHero initialStats={stats} />;
}
