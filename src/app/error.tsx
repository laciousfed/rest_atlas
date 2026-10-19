'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home, Moon } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log unexpected errors
    console.error('[Rest Atlas Application Error]:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-soft text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-sand-100 text-forest-900 flex items-center justify-center mx-auto border border-sand-200">
          <Moon className="w-6 h-6 text-gold-500" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
            System Notice
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            A Temporary Disruption
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            We encountered an unexpected error while preparing this sleep environment view. The editorial database remains fully intact.
          </p>
        </div>

        {error?.digest && (
          <div className="p-2.5 rounded-xl bg-sand-50 border border-sand-200 text-[11px] text-charcoal-500 font-mono">
            Error Digest: {error.digest}
          </div>
        )}

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl text-xs font-semibold transition-colors shadow-soft"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-2.5 bg-sand-100 hover:bg-sand-200 text-charcoal-800 rounded-xl text-xs font-semibold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
