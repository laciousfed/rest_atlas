'use client';

import React from 'react';
import { Star, ExternalLink, ShieldCheck, MessageSquare } from 'lucide-react';

interface GoogleReviewsCardProps {
  hotelName: string;
  guestRating?: number;
  guestReviewCount?: number;
  googlePlaceId?: string;
  googleProfileUrl?: string;
}

export default function GoogleReviewsCard({
  hotelName,
  guestRating,
  guestReviewCount,
  googlePlaceId,
  googleProfileUrl,
}: GoogleReviewsCardProps) {
  const mapLink =
    googleProfileUrl ||
    (googlePlaceId
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}&query_place_id=${googlePlaceId}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelName)}`);

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 border border-sand-200 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-sand-100 gap-4">
        <div>
          <div className="flex items-center space-x-1.5 text-xs text-charcoal-500 font-medium">
            <MessageSquare className="w-4 h-4 text-forest-700" />
            <span>Public Guest Sentiment & Verification</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-forest-950 mt-1">
            Google Guest Reviews & Ratings
          </h3>
        </div>

        {/* Google Places Rating Badge */}
        {guestRating ? (
          <div className="flex items-center space-x-3 bg-sand-50 px-4 py-2 rounded-2xl border border-sand-200">
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-forest-900 font-serif">
                {guestRating.toFixed(1)}
              </span>
              <span className="text-xs text-charcoal-400">/ 5.0</span>
            </div>
            <div className="flex items-center text-gold-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(guestRating)
                      ? 'fill-gold-500 text-gold-500'
                      : i < guestRating
                      ? 'fill-gold-300 text-gold-400'
                      : 'text-sand-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-charcoal-500">
              ({guestReviewCount?.toLocaleString() || '100+'} reviews)
            </span>
          </div>
        ) : (
          <span className="text-xs text-charcoal-500 bg-sand-50 px-3 py-1.5 rounded-lg border border-sand-200">
            Ratings accessible via Google Profile
          </span>
        )}
      </div>

      <div className="py-4 text-xs text-charcoal-600 leading-relaxed space-y-2">
        <p>
          In accordance with Google Maps Platform policies, third-party guest reviews are linked directly to Google rather than scraped or stored permanently. Guest ratings provide real-world traveler feedback that complements Rest Atlas&apos;s independent on-site acoustic and sleep comfort audits.
        </p>
      </div>

      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-2 text-charcoal-500">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          <span>Independent from Rest Atlas Editorial Sleep Scores</span>
        </div>

        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 text-forest-800 font-semibold hover:text-forest-950 transition-colors"
        >
          <span>Read all verified reviews on Google Maps</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
