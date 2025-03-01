import React from 'react';
import Image from 'next/image';
import Card, { CardHeader, CardTitle, CardContent } from './Card';
import Button from './Button';

const About: React.FC = () => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 py-16">
      <div className="max-w-4xl mx-auto px-4">
        <Card className="bg-card">
          <CardHeader className="bg-card">
            <CardTitle className="text-2xl font-bold text-[#2c3e50] dark:text-[#e0e0e0]">
              私について
            </CardTitle>
            {/* <CardDescription className="text-[#666666] dark:text-[#a0a0a0]">
              フロントエンド開発者として活動しています
            </CardDescription> */}
          </CardHeader>
          <CardContent className="bg-card">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src="/images/profile.png"
                    alt="プロフィール画像"
                    width={128}
                    height={128}
                    priority
                    className="rounded-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                {/* <h3 className="text-xl font-semibold mb-4 text-[#34495e] dark:text-[#d0d0d0]">
                  経歴
                </h3>
                <p className="mb-4 text-[#4a4a4a] dark:text-[#c0c0c0]">
                  5年以上のWeb開発経験を持つフロントエンドエンジニアです。
                  React、TypeScript、Next.jsを中心に、モダンなWeb技術を活用した開発に従事しています。
                </p>

                <h3 className="text-xl font-semibold mb-4 text-[#34495e] dark:text-[#d0d0d0]">
                  強み
                </h3>
                <ul className="list-disc list-inside mb-4 text-[#4a4a4a] dark:text-[#c0c0c0]">
                  <li>フロントエンド開発における深い技術知識</li>
                  <li>ユーザー体験を重視したUI/UXデザイン</li>
                  <li>効率的なコード設計とパフォーマンス最適化</li>
                </ul> */}

                <h3 className="text-xl font-semibold mb-4 text-[#34495e] dark:text-[#d0d0d0]">
                  連絡先
                </h3>
                <div className="flex gap-4">
                  <a
                    href="https://x.com/witmake1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md bg-[#2c3e50] text-white hover:bg-[#34495e] transition-colors"
                  >
                    X (Twitter)
                  </a>
                  <a
                    href="https://github.com/wit-maker"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-md border-[#2c3e50] text-[#2c3e50] dark:border-[#d0d0d0] dark:text-[#d0d0d0] border-2 hover:bg-[#2c3e50] hover:text-white dark:hover:bg-[#d0d0d0] dark:hover:text-[#2c3e50] transition-colors"
                  >
                    GitHubをチェック
                  </a>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
