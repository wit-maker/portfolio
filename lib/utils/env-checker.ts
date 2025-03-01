/**
 * 環境変数をチェックするユーティリティ
 *
 * 必要な環境変数が設定されているかどうかを確認し、
 * 欠けている場合は開発者に対して指示を提供します。
 */

type EnvVar = {
  key: string;
  description: string;
};

// 重要な環境変数のリスト
const requiredEnvVars: EnvVar[] = [
  {
    key: 'NEXT_PUBLIC_API_BASE_URL',
    description: 'ダッシュボードAPIのベースURL',
  },
  {
    key: 'NEXT_PUBLIC_API_KEY',
    description: 'ダッシュボードAPIのアクセスキー',
  },
];

// 開発環境でのみ必要な環境変数のリスト
const devOnlyEnvVars: EnvVar[] = [
  {
    key: 'NEXT_PUBLIC_DASHBOARD_API_KEY',
    description:
      'ダッシュボードAPIのバックエンド用アクセスキー（開発環境のみ）',
  },
];

/**
 * 環境変数の状態をチェックし、結果を返します。
 *
 * @returns {Object} チェック結果
 */
export function checkEnvironmentVariables() {
  const missingVars: EnvVar[] = [];
  const warningVars: EnvVar[] = [];

  // 必須環境変数のチェック
  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar.key]) {
      if (process.env.NODE_ENV === 'production') {
        missingVars.push(envVar);
      } else {
        warningVars.push(envVar);
      }
    }
  }

  // 開発環境でのみ必要な変数のチェック
  if (process.env.NODE_ENV === 'development') {
    for (const envVar of devOnlyEnvVars) {
      if (!process.env[envVar.key]) {
        warningVars.push(envVar);
      }
    }
  }

  return {
    isValid: missingVars.length === 0,
    missingVars,
    warningVars,
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  };
}

/**
 * 環境変数の問題に関するメッセージを生成します。
 *
 * @returns {string} 環境変数の問題に関するメッセージ
 */
export function getEnvironmentWarningMessage() {
  const { isValid, missingVars, warningVars, isProduction } =
    checkEnvironmentVariables();

  if (isValid && warningVars.length === 0) {
    return null;
  }

  let message = '';

  if (missingVars.length > 0) {
    message += `🚨 重要: 以下の環境変数が設定されていません:\n\n`;
    missingVars.forEach((v) => {
      message += `- ${v.key}: ${v.description}\n`;
    });

    if (isProduction) {
      message +=
        '\nVercelデプロイの場合は、プロジェクト設定で環境変数を設定してください。';
    }
  }

  if (warningVars.length > 0) {
    if (message) message += '\n\n';
    message += `⚠️ 警告: 以下の環境変数が設定されていないため、一部の機能が動作しない可能性があります:\n\n`;
    warningVars.forEach((v) => {
      message += `- ${v.key}: ${v.description}\n`;
    });
  }

  return message;
}

/**
 * 現在の環境に関する情報を返します。
 */
export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV || 'unknown',
    isVercel: !!process.env.VERCEL,
    vercelEnv: process.env.VERCEL_ENV || null,
    vercelUrl: process.env.VERCEL_URL || null,
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || null,
    hasApiKey: !!process.env.NEXT_PUBLIC_API_KEY,
    hasDashboardApiKey: !!process.env.NEXT_PUBLIC_DASHBOARD_API_KEY,
  };
}
