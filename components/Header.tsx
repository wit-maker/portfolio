'use client';

import React, { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full bg-[#ffffff] dark:bg-[#1a1a1a] border-b border-[#e5e5e5] dark:border-[#333333] py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a
          href="/"
          className="text-2xl font-bold text-[#333333] dark:text-[#ffffff]"
        >
          制作1000本ノック
        </a>

        <nav className="hidden md:flex items-center space-x-6">
          {/* <a
            href="/"
            className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
          >
            ホーム
          </a>
          <a
            href="/projects"
            className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
          >
            プロジェクト
          </a>
          <a
            href="/skills"
            className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
          >
            スキル
          </a>
          <a
            href="/about"
            className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
          >
            自己紹介
          </a>
          <a
            href="/contact"
            className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
          >
            お問い合わせ
          </a> */}
          <ThemeToggle />
        </nav>

        <button
          className="md:hidden text-[#333333] dark:text-[#ffffff]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="メニューを開く"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#ffffff] dark:bg-[#1a1a1a] py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <a
              href="/"
              className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
            >
              ホーム
            </a>
            <a
              href="/projects"
              className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
            >
              プロジェクト
            </a>
            <a
              href="/skills"
              className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
            >
              スキル
            </a>
            <a
              href="/about"
              className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
            >
              自己紹介
            </a>
            <a
              href="/contact"
              className="text-[#333333] dark:text-[#ffffff] hover:text-[#666666] dark:hover:text-[#cccccc]"
            >
              お問い合わせ
            </a>
            <div className="pt-2">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
