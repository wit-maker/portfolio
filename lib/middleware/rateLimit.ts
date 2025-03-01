import { NextRequest } from 'next/server';
import { LRUCache } from 'lru-cache';

interface RateLimitOptions {
  uniqueTokenPerInterval?: number;
  interval?: number;
  limit?: number;
}

export default function rateLimit(options?: RateLimitOptions) {
  const tokenCache = new LRUCache<string, number[]>({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (req: NextRequest, _: any, limit: number) =>
      new Promise<void>((resolve, reject) => {
        const token =
          req.headers.get('x-forwarded-for') || req.ip || 'anonymous';

        const tokenCount = tokenCache.get(token as string) || [0];
        if (tokenCount[0] === 0) {
          tokenCache.set(token as string, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= (limit || options?.limit || 10);

        if (isRateLimited) {
          reject(new Error('Too Many Requests'));
          return;
        }

        resolve();
      }),
  };
}
