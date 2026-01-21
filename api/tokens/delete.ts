import type { VercelRequest, VercelResponse } from '@vercel/node';
import { kv } from '@vercel/kv';

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

    let deletedCount = 0;

    if (deleteAll) {
      // Delete all tokens
      const keys = await kv.keys('demo_token:*');
      for (const key of keys) {
        await kv.del(key);
        deletedCount++;
      }
    } else if (deleteUsed || deleteExpired) {
      // Delete used or expired tokens
      const keys = await kv.keys('demo_token:*');
      const now = Date.now();
      
      for (const key of keys) {
        const tokenData = await kv.get<{ used: boolean; expiresAt: number }>(key);
        if (!tokenData) continue;

        const shouldDelete = 
          (deleteUsed && tokenData.used) || 
          (deleteExpired && now > tokenData.expiresAt);

        if (shouldDelete) {
          await kv.del(key);
          deletedCount++;
        }
      }
    } else if (token) {
      // Delete specific token
      const normalizedToken = token.toUpperCase().trim();
      const deleted = await kv.del(`demo_token:${normalizedToken}`);
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
