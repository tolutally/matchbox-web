import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

interface TokenData {
  used: boolean;
  createdAt: number;
  expiresAt: number;
  usedAt?: number;
  note?: string;
}

function generateToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, O, 0, 1 to avoid confusion
  const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `DEMO-${segment()}-${segment()}`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { adminPassword, count = 1, expiresInHours = 48, note = '' } = req.body;

    // Verify admin password
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedPassword || adminPassword !== expectedPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Check if Redis is configured
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      return res.status(400).json({ 
        error: 'Redis not configured. Please add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN environment variables.',
      });
    }

    // Initialize Redis
    const redis = Redis.fromEnv();

    // Validate count (max 20 at once)
    const tokenCount = Math.min(Math.max(1, parseInt(count) || 1), 20);
    const expireHours = Math.min(Math.max(1, parseInt(expiresInHours) || 48), 720); // Max 30 days

    const tokens: string[] = [];
    const expiresAt = Date.now() + expireHours * 60 * 60 * 1000;

    for (let i = 0; i < tokenCount; i++) {
      const token = generateToken();
      
      const tokenData: TokenData = {
        used: false,
        createdAt: Date.now(),
        expiresAt,
        note: note || undefined,
      };

      // Store with auto-expiration
      await redis.set(`demo_token:${token}`, JSON.stringify(tokenData), { 
        ex: expireHours * 60 * 60 
      });

      tokens.push(token);
    }

    return res.status(200).json({ 
      success: true,
      tokens,
      expiresAt: new Date(expiresAt).toISOString(),
      expiresInHours: expireHours,
    });

  } catch (error) {
    console.error('Token generation error:', error);
    return res.status(500).json({ error: 'Failed to generate tokens' });
  }
}
