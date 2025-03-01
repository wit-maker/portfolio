declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      NEXT_PUBLIC_API_BASE_URL?: string;
      NEXT_PUBLIC_FRONTEND_URL?: string;
      NEXT_PUBLIC_DASHBOARD_API_KEY?: string;
    }
  }
}

export {};
