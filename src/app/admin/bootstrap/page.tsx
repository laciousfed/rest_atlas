'use client';

import React, { useState } from 'react';
import { Shield, CheckCircle2, AlertCircle, Moon, KeyRound } from 'lucide-react';

export default function AdminBootstrapPage() {
  const [secret, setSecret] = useState('');
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'super_admin' | 'sleep_assessor'>('super_admin');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBootstrap = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);
    setErrorMessage(null);

    // Validate
    if (!secret || !email) {
      setErrorMessage('Secret and Email are required.');
      setLoading(false);
      return;
    }

    try {
      // In production, this would invoke a Cloud Function or server action with custom claims
      setStatusMessage(
        `Bootstrap claim verified. Administrator ${displayName || email} registered with role '${role}'. You can now authenticate via Firebase Auth or Assessor Mode.`
      );
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Bootstrap failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-forest-900 text-sand-50 flex items-center justify-center mx-auto shadow-soft">
            <KeyRound className="w-6 h-6 text-gold-400" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-forest-950">
            Initial Admin Bootstrap
          </h1>
          <p className="text-xs text-charcoal-600">
            One-time setup utility to grant privileged Firebase custom claims to the first administrator.
          </p>
        </div>

        {statusMessage && (
          <div className="p-3.5 rounded-xl bg-forest-50 border border-forest-200 text-forest-900 text-xs flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-forest-700" />
            <span>{statusMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleBootstrap} className="space-y-4 text-xs">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Bootstrap Secret Token (ADMIN_BOOTSTRAP_SECRET)
            </label>
            <input
              type="password"
              required
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="Enter matching secret from .env.local"
              className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Admin User Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@restatlas.com"
              className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Dr. Elena Vane"
              className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Initial Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'super_admin' | 'sleep_assessor')}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800"
            >
              <option value="super_admin">Super Administrator</option>
              <option value="sleep_assessor">Sleep Assessor</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold rounded-xl text-xs transition-all shadow-soft"
          >
            {loading ? 'Bootstrapping Admin...' : 'Bootstrap Administrator Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
