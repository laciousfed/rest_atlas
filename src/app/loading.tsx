import React from 'react';
import { Moon } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4 px-4 py-20">
      <div className="relative">
        <div className="w-14 h-14 rounded-full bg-forest-900 text-sand-50 flex items-center justify-center shadow-soft animate-pulse">
          <Moon className="w-6 h-6 text-gold-400" />
        </div>
        <div className="absolute inset-0 rounded-full border-2 border-forest-600 border-t-transparent animate-spin" />
      </div>
      <div className="text-center space-y-1">
        <span className="font-serif text-lg font-bold text-forest-950 block">
          Rest Atlas
        </span>
        <span className="text-xs text-charcoal-500 uppercase tracking-widest font-medium">
          Loading sleep sanctuary data...
        </span>
      </div>
    </div>
  );
}
