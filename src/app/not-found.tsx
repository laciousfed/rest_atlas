import React from 'react';
import Link from 'next/link';
import { Moon, Search, Compass, ArrowRight, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Brand Icon */}
        <div className="w-16 h-16 rounded-full bg-forest-800 text-sand-50 flex items-center justify-center mx-auto shadow-soft">
          <Moon className="w-8 h-8 text-gold-400 fill-gold-400/20" />
        </div>

        {/* 404 Headline */}
        <div className="space-y-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-forest-800">
            Error 404 • Destination Unknown
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
            Sanctuary Not Found
          </h1>
          <p className="text-sm sm:text-base text-charcoal-600 max-w-md mx-auto leading-relaxed">
            The hotel listing or quiet retreat you are looking for may have moved, been archived, or does not exist in our sleep directory.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto bg-white rounded-2xl p-2.5 shadow-soft border border-sand-200">
          <form action="/hotels" method="GET" className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="query"
                placeholder="Search sleep sanctuaries by name or city..."
                className="w-full pl-9 pr-3 py-2 bg-transparent text-xs text-forest-950 placeholder-charcoal-400 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold rounded-xl text-xs transition-colors flex items-center space-x-1.5"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Helpful Recovery Navigation */}
        <div className="pt-4 flex flex-wrap justify-center items-center gap-4 text-xs">
          <Link
            href="/"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-forest-900 text-sand-50 font-medium hover:bg-forest-950 transition-colors shadow-soft"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>

          <Link
            href="/hotels"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-sand-200 text-charcoal-800 font-medium hover:bg-sand-300 transition-colors"
          >
            <Compass className="w-4 h-4 text-forest-800" />
            <span>Browse Full Directory</span>
          </Link>

          <Link
            href="/methodology"
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-sand-100 text-charcoal-700 font-medium hover:bg-sand-200 transition-colors border border-sand-200"
          >
            <span>The 4-Pillar Rest Score</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
