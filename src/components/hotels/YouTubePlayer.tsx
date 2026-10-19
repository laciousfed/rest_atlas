'use client';

import React, { useState } from 'react';
import { parseYouTubeUrl } from '@/lib/youtube';
import { Video, ExternalLink, Play, AlertCircle } from 'lucide-react';

interface YouTubePlayerProps {
  videoUrl?: string;
  videoId?: string;
  hotelName: string;
  description?: string;
}

export default function YouTubePlayer({
  videoUrl,
  videoId: initialVideoId,
  hotelName,
  description,
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const parsed = parseYouTubeUrl(initialVideoId || videoUrl || '');

  if (!parsed.valid || !parsed.videoId || hasError) {
    return (
      <div className="bg-sand-100 rounded-2xl border border-sand-200 p-8 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-sand-200 flex items-center justify-center text-charcoal-400">
          <Video className="w-6 h-6" />
        </div>
        <div className="max-w-md">
          <h4 className="font-serif text-lg font-bold text-forest-950">
            Acoustic & Suite Video Tour
          </h4>
          <p className="text-xs text-charcoal-500 mt-1">
            An official video walk-through is currently being audited and curated for {hotelName}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-sand-200 shadow-soft">
      {/* Video Container (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full bg-forest-950">
        {!isPlaying ? (
          <div className="relative w-full h-full group cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* YouTube High-Res Thumbnail */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={parsed.thumbnailUrl}
              alt={`Video tour preview of ${hotelName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setHasError(true)}
            />
            
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center" />

            {/* Play Button Trigger */}
            <button
              type="button"
              className="relative w-16 h-16 rounded-full bg-sand-50/90 text-forest-900 flex items-center justify-center shadow-soft-lg group-hover:scale-110 group-hover:bg-white transition-all focus:outline-none"
              aria-label={`Play video tour of ${hotelName}`}
            >
              <Play className="w-7 h-7 fill-forest-900 ml-1" />
            </button>

            {/* Caption in Preview Mode */}
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs pointer-events-none drop-shadow">
              <span className="font-semibold">{hotelName} — Suite & Acoustic Architecture Tour</span>
            </div>
          </div>
        ) : (
          <iframe
            src={`${parsed.embedUrl}&autoplay=1`}
            title={`Rest Atlas Hotel Tour — ${hotelName}`}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* Video Description & Direct Link Footer */}
      <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-sand-50 border-t border-sand-200">
        <div>
          <span className="font-semibold text-forest-950 block">
            {hotelName} Architecture & Bedroom Tour
          </span>
          <p className="text-charcoal-600 mt-0.5 max-w-xl">
            {description || 'Official video tour featuring bedroom layout, soundscape, window treatments, and restorative wellness facilities.'}
          </p>
        </div>

        {parsed.watchUrl && (
          <a
            href={parsed.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-charcoal-700 hover:text-forest-800 bg-white border border-sand-200 hover:border-sand-300 font-medium transition-colors flex-shrink-0"
          >
            <span>Watch on YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
}
