// 環境変数の型定義
declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL?: string;
    NEXT_PUBLIC_DASHBOARD_API_KEY?: string;
    NODE_ENV: 'development' | 'production' | 'test';
  }
}
