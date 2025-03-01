'use client';

import React, { useState } from 'react';
import Button from './Button';
import { ArrowRightIcon } from '@radix-ui/react-icons';

interface Stat {
  label: string;
  value: string | number;
}

interface ClientHeroProps {
  initialStats: Stat[];
}

const ClientHero: React.FC<ClientHeroProps> = ({ initialStats }) => {
  const [stats] = useState<Stat[]>(initialStats);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // プラス記号を表示するかどうかを判断する関数
  const shouldShowPlus = (label: string): boolean => {
    return label === '完了プロジェクト' || label === '使用技術';
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden">
      {/* 背景のグラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />

      {/* デコレーション要素 */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#c5a572] rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-40 right-20 w-72 h-72 bg-[#a88a5c] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-[#d4b684] rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>

      {/* メインコンテンツ */}
      <div className="relative max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#c5a572] to-[#a88a5c] leading-tight">
          新たな可能性を創造する
          <br />
          クリエイター
        </h1>

        <p className="text-xl md:text-2xl mb-12 leading-relaxed text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          複雑さをシンプルに、ビジョンを現実に。
          <br className="hidden md:block" />
          {/* 革新的なデジタルエクスペリエンスを創造します。 */}
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-20">
          <Button
            onClick={() => scrollToSection('projects')}
            className="group bg-gradient-to-r from-[#c5a572] to-[#a88a5c] text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <span className="flex items-center gap-2">
              プロジェクトを見る
              <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
            </span>
          </Button>

          {/* <Button
            variant="outline"
            onClick={() => scrollToSection('contact')}
            className="border-2 border-[#c5a572] text-[#c5a572] hover:bg-[#c5a572] hover:text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            お問い合わせ
          </Button> */}
        </div>

        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <h3 className="text-5xl font-bold bg-gradient-to-r from-[#c5a572] to-[#a88a5c] bg-clip-text text-transparent mb-4 group-hover:scale-110 transition-transform">
                {stat.value}
                {shouldShowPlus(stat.label) && '+'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientHero;
