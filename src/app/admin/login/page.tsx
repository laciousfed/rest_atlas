'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { auth, isFirebaseConfigured } from '@/lib/firebase/client';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Moon, ShieldCheck, Lock, Mail, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { loginAsDemoAssessor } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFirebaseLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!isFirebaseConfigured() || !auth) {
      setError(
        'Firebase client credentials are not configured in .env.local. You can use the Assessor Preview Mode below to evaluate the complete dashboard.'
      );
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: 'super_admin' | 'sleep_assessor' | 'hotel_editor') => {
    loginAsDemoAssessor(role);
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-sand-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        
        {/* Brand Card Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-forest-900 text-sand-50 flex items-center justify-center mx-auto shadow-soft">
            <Moon className="w-6 h-6 text-gold-400" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Assessor & Admin Access
          </h1>
          <p className="text-xs text-charcoal-600">
            Rest Atlas Sleep & Acoustic Evaluation Console
          </p>
        </div>

        {/* Login Form Box */}
        <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start space-x-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleFirebaseLogin} className="space-y-4 text-xs">
            <div>
              <label className="block text-charcoal-700 font-semibold mb-1">
                Assessor Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="assessor@restatlas.com"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-forest-950 placeholder-charcoal-400 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-charcoal-700 font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-forest-950 placeholder-charcoal-400 focus:outline-none focus:border-forest-700"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-forest-800 hover:bg-forest-900 disabled:opacity-50 text-sand-50 font-semibold rounded-xl text-xs transition-all shadow-soft"
            >
              {loading ? 'Authenticating claims...' : 'Sign In with Firebase Auth'}
            </button>
          </form>

          {/* Quick Development / Assessor Preview Mode */}
          <div className="pt-4 border-t border-sand-100 space-y-3 text-center">
            <span className="text-[11px] text-charcoal-400 font-medium block">
              Quick Evaluation Mode (Simulate Assessor Claim)
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => handleDemoLogin('super_admin')}
                className="py-2 px-3 bg-forest-50 hover:bg-forest-100 text-forest-900 font-semibold rounded-lg border border-forest-200 transition-colors"
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('sleep_assessor')}
                className="py-2 px-3 bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-semibold rounded-lg border border-sand-200 transition-colors"
              >
                Sleep Assessor
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
