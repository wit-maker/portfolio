/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      '1000honknock.vercel.app', // ポートフォリオサイト自身のドメイン
      'woqzibusj6wwewut.public.blob.vercel-storage.com', // Vercel Blob Storageのドメイン
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400, // 24時間のキャッシュ
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    serverComponentsExternalPackages: [],
    optimizePackageImports: ['@radix-ui/react-icons'],
  },

  compress: true,

  productionBrowserSourceMaps: false,

  // 開発時のハイドレーション警告を抑制（本番環境では推奨設定: true）
  reactStrictMode: process.env.NODE_ENV === 'production',

  swcMinify: true,

  i18n: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },

  // 静的アセットの処理を改善
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
