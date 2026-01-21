import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

interface TokenData {
  used: boolean;
  createdAt: number;
  expiresAt: number;
  usedAt?: number;
  note?: string;
}

interface TokenListItem {
  token: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
  note?: string;
  status: 'active' | 'used' | 'expired';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST (to include admin password)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { adminPassword } = req.body;

    // Verify admin password
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (!expectedPassword || adminPassword !== expectedPassword) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get all token keys
    const keys = await kv.keys('demo_token:*');
    
    const tokens: TokenListItem[] = [];
    const now = Date.now();

    for (const key of keys) {
      const tokenData = await kv.get<TokenData>(key);
      if (!tokenData) continue;

      const token = key.replace('demo_token:', '');
      
      let status: 'active' | 'used' | 'expired' = 'active';
      if (tokenData.used) {
        status = 'used';
      } else if (now > tokenData.expiresAt) {
        status = 'expired';
      }

      tokens.push({
        token,
        used: tokenData.used,
        createdAt: new Date(tokenData.createdAt).toISOString(),
        expiresAt: new Date(tokenData.expiresAt).toISOString(),
        usedAt: tokenData.usedAt ? new Date(tokenData.usedAt).toISOString() : undefined,
        note: tokenData.note,
        status,
      });
    }

    // Sort by createdAt descending (newest first)
    tokens.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return res.status(200).json({ 
      success: true,
      tokens,
      total: tokens.length,
      active: tokens.filter(t => t.status === 'active').length,
      used: tokens.filter(t => t.status === 'used').length,
      expired: tokens.filter(t => t.status === 'expired').length,
    });

  } catch (error) {
    console.error('Token list error:', error);
    return res.status(500).json({ error: 'Failed to list tokens' });
  }
}
