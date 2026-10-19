'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Hotel } from '@/types/hotel';
import { getScoreDescriptor } from '@/lib/scoring';
import {
  Moon,
  VolumeX,
  BedDouble,
  SunMoon,
  Sparkles,
  MapPin,
  Star,
  CheckCircle,
} from 'lucide-react';

interface HotelCardProps {
  hotel: Hotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const descriptor = getScoreDescriptor(hotel.restScore);

  return (
    <article className="group bg-white rounded-2xl border border-sand-200/90 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col overflow-hidden">
      {/* Hotel Image with Badges */}
      <Link href={`/hotels/${hotel.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-sand-200">
        <Image
          src={hotel.coverImage}
          alt={`${hotel.name} sleep and relaxation sanctuary`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        
        {/* Gradient Overlay for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <div className="flex items-center space-x-1.5">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-forest-900/80 backdrop-blur-md text-sand-50 border border-forest-700/50">
              {hotel.settingType}
            </span>
            {hotel.adultsOnly && (
              <span className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-sand-900/80 backdrop-blur-md text-sand-100">
                Adults Only
              </span>
            )}
          </div>

          {/* Verified Seal */}
          {hotel.verifiedListing && (
            <div className="flex items-center space-x-1 px-2.5 py-1 text-xs font-medium rounded-full bg-sand-50/90 backdrop-blur-md text-forest-900 shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-forest-700" />
              <span>Verified Audit</span>
            </div>
          )}
        </div>

        {/* Bottom Image Overlay: Rest Score Display */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white pointer-events-none">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-sand-200 font-medium block">
              Rest Atlas Score
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-serif font-bold tracking-tight text-sand-50">
                {hotel.restScore.toFixed(1)}
              </span>
              <span className="text-xs text-sand-300">/ 10</span>
            </div>
          </div>
          
          <span className={`px-2.5 py-1 text-xs font-medium rounded-md backdrop-blur-md ${descriptor.badgeClass}`}>
            {descriptor.title}
          </span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
        <div>
          {/* Location & Guest Rating */}
          <div className="flex items-center justify-between text-xs text-charcoal-500 mb-1.5">
            <div className="flex items-center space-x-1 truncate">
              <MapPin className="w-3.5 h-3.5 text-forest-600 flex-shrink-0" />
              <span className="truncate">
                {hotel.city}, {hotel.country}
              </span>
            </div>
            {hotel.guestRating && (
              <div className="flex items-center space-x-1 text-charcoal-700 font-medium flex-shrink-0">
                <Star className="w-3.5 h-3.5 text-gold-500 fill-gold-500" />
                <span>{hotel.guestRating.toFixed(1)}</span>
                <span className="text-charcoal-400">({hotel.guestReviewCount})</span>
              </div>
            )}
          </div>

          {/* Hotel Name */}
          <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors leading-snug">
            <Link href={`/hotels/${hotel.slug}`}>{hotel.name}</Link>
          </h3>

          {/* Tagline */}
          <p className="text-xs text-charcoal-600 line-clamp-2 mt-1 leading-relaxed">
            {hotel.tagline || hotel.description}
          </p>
        </div>

        {/* 4 Scoring Category Progress Chips */}
        <div className="pt-2 border-t border-sand-100 grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center space-x-1.5 bg-sand-50/80 px-2.5 py-1.5 rounded-lg border border-sand-200/60">
            <BedDouble className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
            <span className="text-charcoal-600 truncate">Bed & Linen:</span>
            <span className="font-semibold text-forest-900 ml-auto">
              {hotel.scoreBreakdown.bedComfort.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-sand-50/80 px-2.5 py-1.5 rounded-lg border border-sand-200/60">
            <VolumeX className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
            <span className="text-charcoal-600 truncate">Quietness:</span>
            <span className="font-semibold text-forest-900 ml-auto">
              {hotel.scoreBreakdown.quietness.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-sand-50/80 px-2.5 py-1.5 rounded-lg border border-sand-200/60">
            <SunMoon className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
            <span className="text-charcoal-600 truncate">Lighting/HVAC:</span>
            <span className="font-semibold text-forest-900 ml-auto">
              {hotel.scoreBreakdown.lightingClimate.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center space-x-1.5 bg-sand-50/80 px-2.5 py-1.5 rounded-lg border border-sand-200/60">
            <Sparkles className="w-3.5 h-3.5 text-forest-700 flex-shrink-0" />
            <span className="text-charcoal-600 truncate">Design/Spa:</span>
            <span className="font-semibold text-forest-900 ml-auto">
              {hotel.scoreBreakdown.designWellness.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Selected Sleep Features Badges */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {hotel.sleepFriendlyFeatures.slice(0, 2).map((feature, idx) => (
            <span
              key={idx}
              className="text-[11px] text-forest-800 bg-forest-50 px-2 py-0.5 rounded border border-forest-100 truncate max-w-full"
            >
              • {feature}
            </span>
          ))}
        </div>

        {/* Footer Link */}
        <div className="pt-2 flex items-center justify-between">
          <span className="text-xs text-forest-700 font-medium group-hover:underline flex items-center">
            View Sleep Audit & Video &rarr;
          </span>
          <span className="text-[11px] text-charcoal-400">
            Assessed {hotel.assessmentDate.slice(0, 7)}
          </span>
        </div>
      </div>
    </article>
  );
}
