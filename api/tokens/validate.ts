import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

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

    // Normalize token (uppercase, trim, handle common typos)
    const normalizedToken = token.toUpperCase().trim().replace(/\s+/g, '-');

    const tokenData = await kv.get<TokenData>(`demo_token:${normalizedToken}`);

    if (!tokenData) {
      return res.status(401).json({ valid: false, error: 'Invalid token' });
    }

    if (tokenData.used) {
      return res.status(401).json({ valid: false, error: 'Token already used' });
    }

    if (Date.now() > tokenData.expiresAt) {
      return res.status(401).json({ valid: false, error: 'Token expired' });
    }

    // Mark token as used
    await kv.set(`demo_token:${normalizedToken}`, {
      ...tokenData,
      used: true,
      usedAt: Date.now(),
    });

    return res.status(200).json({ valid: true });

  } catch (error) {
    console.error('Token validation error:', error);
    return res.status(500).json({ valid: false, error: 'Validation failed' });
  }
}
