import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | Creative Developer',
  description:
    '複雑さをシンプルに、ビジョンを現実に。革新的なデジタルエクスペリエンスを創造します。',
};

export const revalidate = 3600; // 1時間ごとに再検証

export default function Home() {
  return (
    <main>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center">
            Loading...
          </div>
        }
      >
        <Hero />
      </Suspense>
      <Suspense
        fallback={
          <div className="py-20 bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
            Loading projects...
          </div>
        }
      >
        <Projects />
      </Suspense>
    </main>
  );
}
