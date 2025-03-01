# 画像の取り扱いについて

## 概要

ポートフォリオサイトでは、ダッシュボードシステムから提供される画像を表示します。
画像の取り扱いは開発環境と本番環境で異なる方法を採用しています。

## 実装方針

### 1. 開発環境での画像取得

- ダッシュボードAPIから取得した画像URLは相対パス（例：`/uploads/image.png`）
- プロキシエンドポイント（`/api/proxy/dashboard`）経由で画像を取得
- Next.jsの画像最適化機能を使用

#### next.config.jsの設定

```javascript
{
  images: {
    remotePatterns: [
      {
        // 開発環境用（プロキシ経由）
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/proxy/dashboard/**',
      },
    ],
  },
}
```

### 2. 本番環境での画像取得

- `NEXT_PUBLIC_API_BASE_URL`環境変数を使用して絶対パスを生成
- 画像URLは`${NEXT_PUBLIC_API_BASE_URL}/uploads/image.png`の形式
- Next.jsの画像最適化機能で自動的にリサイズ・最適化

#### next.config.jsの設定

```javascript
{
  images: {
    remotePatterns: [
      {
        // 本番環境用
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API_BASE_URL
          ? new URL(process.env.NEXT_PUBLIC_API_BASE_URL).hostname
          : '',
        pathname: '/**',
      },
    ],
  },
}
```

### 3. 画像URLの変換ロジック

```typescript
// DashboardProjects.tsxでの画像URL変換
const imageUrl = project.imageUrl
  ? project.imageUrl.startsWith('http')
    ? project.imageUrl // 既に絶対パスの場合はそのまま
    : process.env.NODE_ENV === 'production' &&
        process.env.NEXT_PUBLIC_API_BASE_URL
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${project.imageUrl}` // 本番環境
      : `/api/proxy/dashboard${project.imageUrl}` // 開発環境（プロキシ経由）
  : '';
```

## 注意点

1. 開発環境

   - ダッシュボードシステムが起動していることを確認
   - プロキシエンドポイントが正しく設定されていることを確認
   - 画像パスは必ずプロキシを経由する必要がある

2. 本番環境
   - `NEXT_PUBLIC_API_BASE_URL`が正しく設定されていることを確認
   - ダッシュボードシステムのCORSが正しく設定されていることを確認
   - 画像のホスティング先のドメインがNext.jsの`remotePatterns`に登録されていることを確認
