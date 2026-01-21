import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

interface TokenData {
  used: boolean;
  expiresAt: number;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { adminPassword, token, deleteAll, deleteUsed, deleteExpired } = req.body;

    // Verify admin password
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedPassword || adminPassword !== expectedPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return res.status(400).json({ 
        error: 'Redis not configured. Token management unavailable.'
      });
    }

    // Initialize Redis
    const redis = Redis.fromEnv();

    let deletedCount = 0;

    if (deleteAll) {
      // Delete all tokens
      const keys = await redis.keys('demo_token:*');
      for (const key of keys) {
        await redis.del(key);
        deletedCount++;
      }
    } else if (deleteUsed || deleteExpired) {
      // Delete used or expired tokens
      const keys = await redis.keys('demo_token:*');
      const now = Date.now();
      
      for (const key of keys) {
        const tokenDataStr = await redis.get<string>(key);
        if (!tokenDataStr) continue;

        const tokenData: TokenData = typeof tokenDataStr === 'string' 
          ? JSON.parse(tokenDataStr) 
          : tokenDataStr;

        const shouldDelete = 
          (deleteUsed && tokenData.used) || 
          (deleteExpired && now > tokenData.expiresAt);

        if (shouldDelete) {
          await redis.del(key);
          deletedCount++;
        }
      }
    } else if (token) {
      // Delete specific token
      const normalizedToken = token.toUpperCase().trim();
      const deleted = await redis.del(`demo_token:${normalizedToken}`);
      deletedCount = deleted;
    } else {
      return res.status(400).json({ error: 'Specify token, deleteAll, deleteUsed, or deleteExpired' });
    }

    return res.status(200).json({ 
      success: true,
      deleted: deletedCount,
    });

  } catch (error) {
    console.error('Token delete error:', error);
    return res.status(500).json({ error: 'Failed to delete tokens' });
  }
}
