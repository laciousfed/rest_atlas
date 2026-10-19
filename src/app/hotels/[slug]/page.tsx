import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHotelBySlug, getRelatedHotels } from '@/lib/db/hotel-repository';
import ScoreBreakdownView from '@/components/hotels/ScoreBreakdownView';
import YouTubePlayer from '@/components/hotels/YouTubePlayer';
import GoogleReviewsCard from '@/components/hotels/GoogleReviewsCard';
import HotelCard from '@/components/hotels/HotelCard';
import { generateHotelJsonLd, generateBreadcrumbJsonLd } from '@/lib/seo';
import {
  MapPin,
  ExternalLink,
  ShieldCheck,
  Share2,
  Bookmark,
  Calendar,
  BedDouble,
  VolumeX,
  SunMoon,
  Sparkles,
  CheckCircle2,
  Flag,
  Globe,
  Star,
  Check,
} from 'lucide-react';

interface HotelPageProps {
  params: { slug: string };
}

export const runtime = 'edge';
export const revalidate = 60;

export async function generateMetadata({ params }: HotelPageProps): Promise<Metadata> {
  const hotel = await getHotelBySlug(params.slug);
  if (!hotel) {
    return { title: 'Hotel Not Found' };
  }

  const title = `${hotel.name} (${hotel.city}, ${hotel.country}) — Sleep & Rest Review`;
  const description = `${hotel.name} Rest Atlas Score: ${hotel.restScore.toFixed(1)}/10. Detailed acoustic soundproofing, bed comfort, blackout quality, and wellness audit.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: hotel.coverImage, alt: hotel.name }],
      url: `https://restatlas.com/hotels/${hotel.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [hotel.coverImage],
    },
  };
}

export default async function HotelDetailPage({ params }: HotelPageProps) {
  const hotel = await getHotelBySlug(params.slug);
  if (!hotel) {
    notFound();
  }

  const relatedHotels = await getRelatedHotels(hotel, 3);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://restatlas.com';
  const hotelJsonLd = generateHotelJsonLd(hotel, siteUrl);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: 'Home', url: siteUrl },
    { name: 'Directory', url: `${siteUrl}/hotels` },
    { name: hotel.continent, url: `${siteUrl}/hotels?continent=${encodeURIComponent(hotel.continent)}` },
    { name: hotel.name, url: `${siteUrl}/hotels/${hotel.slug}` },
  ]);

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="pb-20 space-y-12">
        {/* Breadcrumb Navigation Header */}
        <div className="bg-sand-100 border-b border-sand-200 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-charcoal-500">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 truncate">
              <Link href="/" className="hover:text-forest-800 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/hotels" className="hover:text-forest-800 transition-colors">Hotels</Link>
              <span>/</span>
              <Link
                href={`/hotels?continent=${encodeURIComponent(hotel.continent)}`}
                className="hover:text-forest-800 transition-colors"
              >
                {hotel.continent}
              </Link>
              <span>/</span>
              <span className="text-forest-950 font-semibold truncate">{hotel.name}</span>
            </nav>

            <div className="flex items-center space-x-3 flex-shrink-0">
              <span className="text-[11px] text-charcoal-400 hidden sm:inline">
                Listing ID: {hotel.id}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Section: Title, Location, Header Actions */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-800 text-sand-50">
                  {hotel.hotelCategory}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-sand-200 text-charcoal-800">
                  {hotel.settingType}
                </span>
                {hotel.adultsOnly && (
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-sand-900 text-sand-100">
                    Adults Only
                  </span>
                )}
                {hotel.verifiedListing && (
                  <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold bg-forest-100 text-forest-900 border border-forest-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                    <span>On-Site Verified Audit</span>
                  </span>
                )}
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-forest-950 tracking-tight leading-tight">
                {hotel.name}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-charcoal-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-forest-700 flex-shrink-0" />
                  <span>
                    {hotel.address}, {hotel.city}, {hotel.stateOrProvince || hotel.region}, {hotel.country}
                  </span>
                </div>

                {hotel.guestRating && (
                  <div className="flex items-center space-x-1 font-semibold text-forest-900">
                    <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
                    <span>{hotel.guestRating.toFixed(1)}</span>
                    <span className="font-normal text-charcoal-400">
                      ({hotel.guestReviewCount} guest ratings)
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center space-x-3">
              {hotel.officialWebsite && (
                <a
                  href={hotel.officialWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl text-xs font-semibold transition-all shadow-soft"
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>Official Website</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 rounded-3xl overflow-hidden shadow-soft-md">
            {/* Main Cover Image */}
            <div className="md:col-span-2 relative aspect-[16/11] bg-sand-200">
              <Image
                src={hotel.coverImage}
                alt={`${hotel.name} bedroom sanctuary`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Secondary Gallery Images */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {hotel.imageGallery.slice(0, 4).map((imgUrl, idx) => (
                <div key={idx} className="relative aspect-[4/3] bg-sand-200 overflow-hidden">
                  <Image
                    src={imgUrl}
                    alt={`${hotel.name} gallery image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Layout: Two Columns */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left 2 Columns: Scorecard, Editorial Description, Features, Video */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Rest Atlas Certified Scorecard */}
              <ScoreBreakdownView
                scoreBreakdown={hotel.scoreBreakdown}
                restScore={hotel.restScore}
                assessmentDate={hotel.assessmentDate}
                assessmentNotes={hotel.assessmentNotes}
                confidenceLevel={hotel.assessmentConfidence}
                hotelName={hotel.name}
              />

              {/* Editorial Assessment Review */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4">
                <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-forest-800">
                  <ShieldCheck className="w-4 h-4 text-gold-600" />
                  <span>Rest Atlas Editorial Assessment</span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
                  The Sleep & Relaxation Experience
                </h2>
                <div className="text-sm text-charcoal-700 leading-relaxed space-y-4 font-normal">
                  <p className="text-base text-charcoal-800 font-serif italic border-l-2 border-forest-800 pl-4 py-1">
                    &ldquo;{hotel.editorialDescription}&rdquo;
                  </p>
                  <p>{hotel.description}</p>
                </div>

                <div className="pt-4 border-t border-sand-100 flex flex-wrap items-center justify-between text-xs text-charcoal-500 gap-2">
                  <span>Audit conducted by Rest Atlas Sleep Advisory Board</span>
                  <span>Last listing review: {hotel.updatedAt.slice(0, 10)}</span>
                </div>
              </div>

              {/* Sleep & Comfort Amenities Checklist */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
                <h3 className="font-serif text-2xl font-bold text-forest-950">
                  Documented Sleep-Friendly Attributes
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {hotel.sleepFriendlyFeatures.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start space-x-3 p-3.5 rounded-2xl bg-sand-50/80 border border-sand-200/70"
                    >
                      <Check className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                      <span className="text-xs font-medium text-forest-950 leading-relaxed">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Additional Resort & Wellness Amenities */}
                <div className="pt-4 border-t border-sand-100 space-y-3">
                  <h4 className="text-xs font-semibold text-charcoal-500 uppercase tracking-wider">
                    General Resort & Hydrotherapy Facilities
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sand-100 text-charcoal-700 border border-sand-200"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Room Specific Profiles (Distinguishing Quiet Suites from Standard Rooms) */}
              {hotel.roomProfiles && hotel.roomProfiles.length > 0 && (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold text-forest-950">
                      Verified Room Profiles
                    </h3>
                    <p className="text-xs text-charcoal-600 mt-1">
                      Acoustic quietness and bedding specifications can vary by wing and floor. Below are the verified room profiles for this property.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {hotel.roomProfiles.map((room) => (
                      <div
                        key={room.id}
                        className="p-5 rounded-2xl bg-sand-50 border border-sand-200 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <h4 className="font-serif text-lg font-bold text-forest-950">
                            {room.name}
                          </h4>
                          <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-forest-800 text-sand-50">
                            {room.quietLevel}
                          </span>
                        </div>
                        <p className="text-xs text-charcoal-600 leading-relaxed">
                          {room.description}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-forest-900 font-medium pt-1">
                          <span>• Bed: {room.bedType}</span>
                          <span>• Soundproofed: {room.isSoundproofed ? 'Yes' : 'Standard'}</span>
                          <span>• Blackout: {room.hasBlackoutCurtains ? '100% Blinds' : 'Drapes'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* YouTube Video Tour & Acoustic Walkthrough */}
              <div className="space-y-3">
                <h3 className="font-serif text-2xl font-bold text-forest-950">
                  Video Walkthrough & Architecture
                </h3>
                <YouTubePlayer
                  videoUrl={hotel.youtubeVideoUrl}
                  videoId={hotel.youtubeVideoId}
                  hotelName={hotel.name}
                />
              </div>

              {/* Google Reviews Integration Card */}
              <GoogleReviewsCard
                hotelName={hotel.name}
                guestRating={hotel.guestRating}
                guestReviewCount={hotel.guestReviewCount}
                googlePlaceId={hotel.googlePlaceId}
                googleProfileUrl={hotel.googleProfileUrl}
              />
            </div>

            {/* Right Column: Sticky Reservation / Quick Summary / Report Listing */}
            <div className="space-y-6">
              
              {/* Quick Summary Card */}
              <div className="sticky top-28 bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-400">
                    Rest Atlas Evaluation
                  </span>
                  <div className="flex items-baseline space-x-2 mt-1">
                    <span className="text-4xl font-serif font-bold text-forest-900">
                      {hotel.restScore.toFixed(1)}
                    </span>
                    <span className="text-xs text-charcoal-400">/ 10 Rest Score</span>
                  </div>
                </div>

                <div className="space-y-3 text-xs border-y border-sand-100 py-4">
                  <div className="flex justify-between text-charcoal-600">
                    <span>Category:</span>
                    <span className="font-semibold text-forest-950">{hotel.hotelCategory}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Setting:</span>
                    <span className="font-semibold text-forest-950">{hotel.settingType}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Adults Only:</span>
                    <span className="font-semibold text-forest-950">{hotel.adultsOnly ? 'Yes' : 'No'}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Assessed Date:</span>
                    <span className="font-semibold text-forest-950">{hotel.assessmentDate}</span>
                  </div>
                  <div className="flex justify-between text-charcoal-600">
                    <span>Confidence:</span>
                    <span className="font-semibold text-forest-950">{hotel.assessmentConfidence}</span>
                  </div>
                </div>

                {/* Primary Booking Link */}
                <div className="space-y-3">
                  {hotel.officialWebsite && (
                    <a
                      href={hotel.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl text-xs font-semibold text-center flex items-center justify-center space-x-2 transition-all shadow-soft"
                    >
                      <span>Check Availability on Official Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  <p className="text-[11px] text-charcoal-400 text-center leading-relaxed">
                    Rest Atlas evaluates hotel sleep quality independently. We never accept payment to inflate sleep scores.
                  </p>
                </div>

                {/* Report Listing Correction Button */}
                <div className="pt-2 border-t border-sand-100 text-center">
                  <Link
                    href={`/contact?type=correction&hotel=${encodeURIComponent(hotel.name)}`}
                    className="inline-flex items-center space-x-1 text-[11px] text-charcoal-500 hover:text-forest-800 transition-colors"
                  >
                    <Flag className="w-3 h-3 text-charcoal-400" />
                    <span>Report inaccuracy or request sleep re-audit</span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Related Restful Hotels Section */}
        {relatedHotels.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-sand-200 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
                Similar Sanctuaries
              </span>
              <h3 className="font-serif text-3xl font-bold text-forest-950 mt-1">
                Other Restful Stays in {hotel.continent}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedHotels.map((rel) => (
                <HotelCard key={rel.id} hotel={rel} />
              ))}
            </div>
          </section>
        )}
      </article>
    </>
  );
}
