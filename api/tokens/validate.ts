import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

interface TokenData {
  used: boolean;
  createdAt: number;
  expiresAt: number;
  usedAt?: number;
  note?: string;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ valid: false, error: 'Token required' });
    }

    // Normalize token (uppercase, trim)
    const normalizedToken = token.toUpperCase().trim().replace(/\s+/g, '-');

    // Check if Redis is configured - if not, fall back to static password
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      // Fall back to static password check
      const staticPassword = process.env.VITE_PRIVATE_DEMO_PASSWORD || 'demo2025';
      if (normalizedToken === staticPassword.toUpperCase() || token === staticPassword) {
        return res.status(200).json({ valid: true });
      }
      return res.status(401).json({ valid: false, error: 'Invalid token' });
    }

    // Initialize Redis
    const redis = Redis.fromEnv();

    const tokenDataStr = await redis.get<string>(`demo_token:${normalizedToken}`);

    if (!tokenDataStr) {
      // Also check static password as fallback
      const staticPassword = process.env.VITE_PRIVATE_DEMO_PASSWORD || 'demo2025';
      if (token === staticPassword) {
        return res.status(200).json({ valid: true });
      }
      return res.status(401).json({ valid: false, error: 'Invalid token' });
    }

    const tokenData: TokenData = typeof tokenDataStr === 'string' 
      ? JSON.parse(tokenDataStr) 
      : tokenDataStr;

    if (tokenData.used) {
      return res.status(401).json({ valid: false, error: 'Token already used' });
    }

    if (Date.now() > tokenData.expiresAt) {
      return res.status(401).json({ valid: false, error: 'Token expired' });
    }

    // Mark token as used
    const updatedData: TokenData = {
      ...tokenData,
      used: true,
      usedAt: Date.now(),
    };
    await redis.set(`demo_token:${normalizedToken}`, JSON.stringify(updatedData));

    return res.status(200).json({ valid: true });

  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({ valid: false, error: 'Validation failed' });
  }
}
