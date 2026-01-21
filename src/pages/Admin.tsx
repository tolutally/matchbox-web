import { useState, useEffect, useCallback } from 'react';
import './Admin.css';

interface TokenItem {
  token: string;
  used: boolean;
  createdAt: string;
  expiresAt: string;
  usedAt?: string;
  note?: string;
  status: 'active' | 'used' | 'expired';
}

interface TokenStats {
  total: number;
  active: number;
  used: number;
  expired: number;
}

const Admin = () => {
  // Auth state
  const [adminPassword, setAdminPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  // Token list state
  const [tokens, setTokens] = useState<TokenItem[]>([]);
  const [stats, setStats] = useState<TokenStats>({ total: 0, active: 0, used: 0, expired: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [listError, setListError] = useState('');
  const [kvWarning, setKvWarning] = useState<string | null>(null);

  // Generate form state
  const [generateCount, setGenerateCount] = useState(1);
  const [generateExpiry, setGenerateExpiry] = useState(48);
  const [generateNote, setGenerateNote] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState<string[]>([]);
  const [generateError, setGenerateError] = useState('');

  // Delete state
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState('');

  // Filter state
  const [filter, setFilter] = useState<'all' | 'active' | 'used' | 'expired'>('all');

  // Copy state
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Fetch tokens
  const fetchTokens = useCallback(async () => {
    if (!adminPassword) return;
    
    setIsLoading(true);
    setListError('');

    try {
      const response = await fetch('/api/tokens/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword }),
      });

      // Handle 404 - API not available (local dev)
      if (response.status === 404) {
        setListError('Token API not available. The admin panel only works in production (Vercel). For local testing, use the static password from .env');
        return;
      }

      const data = await response.json();

      if (response.ok && data.success) {
        setTokens(data.tokens);
        setStats({
          total: data.total,
          active: data.active,
          used: data.used,
          expired: data.expired,
        });
        setIsAuthenticated(true);
        // Check for KV warning
        if (data.warning) {
          setKvWarning(data.warning);
        } else {
          setKvWarning(null);
        }
      } else {
        setListError(data.error || 'Failed to fetch tokens');
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      setListError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [adminPassword]);

  // Login handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    await fetchTokens();
  };

  // Generate tokens
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setGenerateError('');
    setGeneratedTokens([]);

    try {
      const response = await fetch('/api/tokens/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          adminPassword,
          count: generateCount,
          expiresInHours: generateExpiry,
          note: generateNote,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setGeneratedTokens(data.tokens);
        setGenerateNote('');
        await fetchTokens(); // Refresh list
      } else {
        setGenerateError(data.error || 'Failed to generate tokens');
      }
    } catch (err) {
      setGenerateError('Network error. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  // Delete token
  const handleDelete = async (token: string) => {
    if (!confirm(`Delete token ${token}?`)) return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      const response = await fetch('/api/tokens/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ adminPassword, token }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchTokens();
      } else {
        setDeleteError(data.error || 'Failed to delete token');
      }
    } catch (err) {
      setDeleteError('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Bulk delete
  const handleBulkDelete = async (type: 'used' | 'expired' | 'all') => {
    const messages = {
      used: 'Delete all USED tokens?',
      expired: 'Delete all EXPIRED tokens?',
      all: 'Delete ALL tokens? This cannot be undone!',
    };

    if (!confirm(messages[type])) return;

    setIsDeleting(true);
    setDeleteError('');

    try {
      const body: Record<string, unknown> = { adminPassword };
      if (type === 'all') body.deleteAll = true;
      if (type === 'used') body.deleteUsed = true;
      if (type === 'expired') body.deleteExpired = true;

      const response = await fetch('/api/tokens/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await fetchTokens();
      } else {
        setDeleteError(data.error || 'Failed to delete tokens');
      }
    } catch (err) {
      setDeleteError('Network error. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  // Copy token to clipboard
  const copyToken = async (token: string) => {
    try {
      await navigator.clipboard.writeText(token);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    } catch (err) {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = token;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopiedToken(token);
      setTimeout(() => setCopiedToken(null), 2000);
    }
  };

  // Copy all generated tokens
  const copyAllGenerated = async () => {
    const text = generatedTokens.join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedToken('all');
    setTimeout(() => setCopiedToken(null), 2000);
  };

  // Filter tokens
  const filteredTokens = tokens.filter(t => filter === 'all' || t.status === filter);

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Time remaining
  const timeRemaining = (expiresAt: string) => {
    const now = Date.now();
    const expires = new Date(expiresAt).getTime();
    const diff = expires - now;
    
    if (diff <= 0) return 'Expired';
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ${hours % 24}h`;
    return `${hours}h`;
  };

  // Auto-refresh every 30 seconds when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(fetchTokens, 30000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchTokens]);

  // Login screen
  if (!isAuthenticated) {
    return (
      <section className="admin-section">
        <div className="admin-bg">
          <div className="admin-glow-orb admin-glow-1" />
          <div className="admin-glow-orb admin-glow-2" />
        </div>

        <div className="admin-container">
          <div className="admin-login-card">
            <div className="admin-login-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1 className="admin-login-title">Token Admin</h1>
            <p className="admin-login-subtitle">Enter admin password to manage demo tokens</p>

            <form className="admin-login-form" onSubmit={handleLogin}>
              <div className="admin-field">
                <label htmlFor="admin-password">Admin Password</label>
                <input
                  type="password"
                  id="admin-password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter password"
                  autoComplete="current-password"
                />
              </div>

              {(authError || listError) && (
                <p className="admin-error">{authError || listError}</p>
              )}

              <button 
                type="submit" 
                className="admin-btn admin-btn-primary"
                disabled={isLoading || !adminPassword}
              >
                {isLoading ? 'Authenticating...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  // Admin dashboard
  return (
    <section className="admin-section">
      <div className="admin-bg">
        <div className="admin-glow-orb admin-glow-1" />
        <div className="admin-glow-orb admin-glow-2" />
      </div>

      <div className="admin-container admin-dashboard">
        {/* Header */}
        <div className="admin-header">
          <h1 className="admin-title">Token Management</h1>
          <button 
            className="admin-btn admin-btn-secondary admin-logout"
            onClick={() => {
              setIsAuthenticated(false);
              setAdminPassword('');
              setTokens([]);
            }}
          >
            Logout
          </button>
        </div>

        {/* KV Warning */}
        {kvWarning && (
          <div className="admin-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
              <path d="M12 9v4"/>
              <path d="M12 17h.01"/>
            </svg>
            <div>
              <strong>Database Not Configured</strong>
              <p>{kvWarning}</p>
              <p className="admin-warning-hint">
                To enable token generation: Vercel Dashboard → Storage → Marketplace → Upstash Redis → Create & Connect
              </p>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="admin-stats">
          <div className="admin-stat">
            <span className="admin-stat-value">{stats.total}</span>
            <span className="admin-stat-label">Total</span>
          </div>
          <div className="admin-stat admin-stat-active">
            <span className="admin-stat-value">{stats.active}</span>
            <span className="admin-stat-label">Active</span>
          </div>
          <div className="admin-stat admin-stat-used">
            <span className="admin-stat-value">{stats.used}</span>
            <span className="admin-stat-label">Used</span>
          </div>
          <div className="admin-stat admin-stat-expired">
            <span className="admin-stat-value">{stats.expired}</span>
            <span className="admin-stat-label">Expired</span>
          </div>
        </div>

        {/* Generate Form */}
        <div className="admin-card">
          <h2 className="admin-card-title">Generate Tokens</h2>
          <form className="admin-generate-form" onSubmit={handleGenerate}>
            <div className="admin-generate-row">
              <div className="admin-field">
                <label htmlFor="gen-count">Count</label>
                <input
                  type="number"
                  id="gen-count"
                  min="1"
                  max="20"
                  value={generateCount}
                  onChange={(e) => setGenerateCount(parseInt(e.target.value) || 1)}
                />
              </div>
              <div className="admin-field">
                <label htmlFor="gen-expiry">Expires in (hours)</label>
                <input
                  type="number"
                  id="gen-expiry"
                  min="1"
                  max="720"
                  value={generateExpiry}
                  onChange={(e) => setGenerateExpiry(parseInt(e.target.value) || 48)}
                />
              </div>
              <div className="admin-field admin-field-note">
                <label htmlFor="gen-note">Note (optional)</label>
                <input
                  type="text"
                  id="gen-note"
                  value={generateNote}
                  onChange={(e) => setGenerateNote(e.target.value)}
                  placeholder="e.g., Client name"
                />
              </div>
            </div>
            
            {generateError && <p className="admin-error">{generateError}</p>}

            <button 
              type="submit" 
              className="admin-btn admin-btn-primary"
              disabled={isGenerating}
            >
              {isGenerating ? 'Generating...' : `Generate ${generateCount} Token${generateCount > 1 ? 's' : ''}`}
            </button>
          </form>

          {/* Generated tokens */}
          {generatedTokens.length > 0 && (
            <div className="admin-generated">
              <div className="admin-generated-header">
                <h3>Generated Tokens</h3>
                <button 
                  className="admin-btn admin-btn-small"
                  onClick={copyAllGenerated}
                >
                  {copiedToken === 'all' ? '✓ Copied!' : 'Copy All'}
                </button>
              </div>
              <div className="admin-generated-list">
                {generatedTokens.map((token) => (
                  <div key={token} className="admin-generated-item">
                    <code className="admin-token-code">{token}</code>
                    <button 
                      className="admin-btn admin-btn-small"
                      onClick={() => copyToken(token)}
                    >
                      {copiedToken === token ? '✓' : 'Copy'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Token List */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">Tokens</h2>
            <div className="admin-card-actions">
              <button 
                className="admin-btn admin-btn-small"
                onClick={fetchTokens}
                disabled={isLoading}
              >
                {isLoading ? '...' : 'Refresh'}
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="admin-filters">
            {(['all', 'active', 'used', 'expired'] as const).map((f) => (
              <button
                key={f}
                className={`admin-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
                {f !== 'all' && (
                  <span className="admin-filter-count">
                    {f === 'active' ? stats.active : f === 'used' ? stats.used : stats.expired}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Bulk actions */}
          {tokens.length > 0 && (
            <div className="admin-bulk-actions">
              {stats.used > 0 && (
                <button 
                  className="admin-btn admin-btn-small admin-btn-danger"
                  onClick={() => handleBulkDelete('used')}
                  disabled={isDeleting}
                >
                  Delete Used ({stats.used})
                </button>
              )}
              {stats.expired > 0 && (
                <button 
                  className="admin-btn admin-btn-small admin-btn-danger"
                  onClick={() => handleBulkDelete('expired')}
                  disabled={isDeleting}
                >
                  Delete Expired ({stats.expired})
                </button>
              )}
            </div>
          )}

          {deleteError && <p className="admin-error">{deleteError}</p>}

          {/* Token table */}
          {filteredTokens.length === 0 ? (
            <p className="admin-empty">No tokens found. Generate some above!</p>
          ) : (
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Status</th>
                    <th>Created</th>
                    <th>Expires</th>
                    <th>Note</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTokens.map((t) => (
                    <tr key={t.token} className={`admin-row-${t.status}`}>
                      <td>
                        <code className="admin-token-code">{t.token}</code>
                      </td>
                      <td>
                        <span className={`admin-status admin-status-${t.status}`}>
                          {t.status}
                        </span>
                      </td>
                      <td className="admin-date">{formatDate(t.createdAt)}</td>
                      <td className="admin-date">
                        {t.status === 'used' 
                          ? `Used ${formatDate(t.usedAt!)}` 
                          : t.status === 'expired' 
                            ? 'Expired' 
                            : timeRemaining(t.expiresAt)}
                      </td>
                      <td className="admin-note">{t.note || '—'}</td>
                      <td>
                        <div className="admin-row-actions">
                          <button 
                            className="admin-btn admin-btn-tiny"
                            onClick={() => copyToken(t.token)}
                            title="Copy token"
                          >
                            {copiedToken === t.token ? '✓' : 
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
                              </svg>
                            }
                          </button>
                          <button 
                            className="admin-btn admin-btn-tiny admin-btn-danger"
                            onClick={() => handleDelete(t.token)}
                            disabled={isDeleting}
                            title="Delete token"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"/>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Admin;
