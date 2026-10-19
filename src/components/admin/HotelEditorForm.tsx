'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Hotel, HotelCategory } from '@/types/hotel';
import { parseYouTubeUrl } from '@/lib/youtube';
import YouTubePlayer from '@/components/hotels/YouTubePlayer';
import {
  Save,
  CheckCircle2,
  AlertCircle,
  Video,
  Globe,
  MapPin,
  Sparkles,
  BedDouble,
  ExternalLink,
  Plus,
  Trash2,
} from 'lucide-react';

interface HotelEditorFormProps {
  initialHotel?: Hotel;
  isNew?: boolean;
}

export default function HotelEditorForm({ initialHotel, isNew = false }: HotelEditorFormProps) {
  const router = useRouter();

  // Basic Information
  const [name, setName] = useState(initialHotel?.name || '');
  const [slug, setSlug] = useState(initialHotel?.slug || '');
  const [tagline, setTagline] = useState(initialHotel?.tagline || '');
  const [description, setDescription] = useState(initialHotel?.description || '');
  const [editorialDescription, setEditorialDescription] = useState(initialHotel?.editorialDescription || '');
  const [officialWebsite, setOfficialWebsite] = useState(initialHotel?.officialWebsite || '');

  // Geography
  const [address, setAddress] = useState(initialHotel?.address || '');
  const [city, setCity] = useState(initialHotel?.city || '');
  const [stateOrProvince, setStateOrProvince] = useState(initialHotel?.stateOrProvince || '');
  const [region, setRegion] = useState(initialHotel?.region || '');
  const [country, setCountry] = useState(initialHotel?.country || '');
  const [countryCode, setCountryCode] = useState(initialHotel?.countryCode || '');
  const [continent, setContinent] = useState(initialHotel?.continent || 'Europe');
  const [latitude, setLatitude] = useState(initialHotel?.latitude?.toString() || '0');
  const [longitude, setLongitude] = useState(initialHotel?.longitude?.toString() || '0');
  const [settingType, setSettingType] = useState(initialHotel?.settingType || 'Mountain');

  // Classification & Flags
  const [hotelCategory, setHotelCategory] = useState<HotelCategory>(
    initialHotel?.hotelCategory || 'Luxury Hotel'
  );
  const [adultsOnly, setAdultsOnly] = useState(initialHotel?.adultsOnly || false);
  const [verifiedListing, setVerifiedListing] = useState<boolean>(initialHotel?.verifiedListing ?? true);
  const [featuredStatus, setFeaturedStatus] = useState(initialHotel?.featuredStatus || false);
  const [listingStatus, setListingStatus] = useState<'published' | 'draft' | 'archived'>(
    initialHotel?.listingStatus || 'published'
  );

  // Media & YouTube
  const [coverImage, setCoverImage] = useState(
    initialHotel?.coverImage ||
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80'
  );
  const [galleryInput, setGalleryInput] = useState(initialHotel?.imageGallery.join('\n') || '');
  const [youtubeInput, setYoutubeInput] = useState(
    initialHotel?.youtubeVideoUrl || initialHotel?.youtubeVideoId || ''
  );

  // Third-Party Integrations
  const [googlePlaceId, setGooglePlaceId] = useState(initialHotel?.googlePlaceId || '');
  const [googleProfileUrl, setGoogleProfileUrl] = useState(initialHotel?.googleProfileUrl || '');
  const [guestRating, setGuestRating] = useState(initialHotel?.guestRating?.toString() || '4.8');
  const [guestReviewCount, setGuestReviewCount] = useState(
    initialHotel?.guestReviewCount?.toString() || '150'
  );

  // Sleep & Comfort Features (multiline inputs for clean editing)
  const [sleepFeaturesInput, setSleepFeaturesInput] = useState(
    initialHotel?.sleepFriendlyFeatures.join('\n') ||
      'Hästens Natural Horsehair & Wool Mattresses\n100% Motorised Blackout Blinds (Zero Light Leakage)\nTriple-Pane Acoustic Insulation (STC 52 rating)\nCircadian Bedside Amber Reading Lamps'
  );

  const [amenitiesInput, setAmenitiesInput] = useState(
    initialHotel?.amenities.join('\n') ||
      'Hydrotherapy & Thermal Spa\nSilent Whisper HVAC\nAcoustic Glass Windows\nOrganic Herbal Sleep Infusions'
  );

  // State
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Validate YouTube URL on the fly
  const youtubeParse = parseYouTubeUrl(youtubeInput);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    // Validation
    if (!name.trim()) {
      setError('Hotel name is required.');
      setSaving(false);
      return;
    }
    if (!city.trim() || !country.trim()) {
      setError('City and Country are required.');
      setSaving(false);
      return;
    }

    const generatedSlug = slug.trim()
      ? slug.trim()
      : name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

    const parsedGallery = galleryInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parsedSleepFeatures = sleepFeaturesInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const parsedAmenities = amenitiesInput
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const payload = {
      id: initialHotel?.id || generatedSlug,
      slug: generatedSlug,
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      editorialDescription: editorialDescription.trim(),
      officialWebsite: officialWebsite.trim(),
      address: address.trim(),
      city: city.trim(),
      stateOrProvince: stateOrProvince.trim(),
      region: region.trim(),
      country: country.trim(),
      countryCode: countryCode.trim() || 'US',
      continent,
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      settingType,
      hotelCategory,
      adultsOnly,
      verifiedListing,
      featuredStatus,
      listingStatus,
      coverImage: coverImage.trim(),
      imageGallery: parsedGallery.length > 0 ? parsedGallery : [coverImage.trim()],
      amenities: parsedAmenities,
      sleepFriendlyFeatures: parsedSleepFeatures,
      tags: [settingType, hotelCategory, 'Sleep Sanctuary'],
      guestRating: parseFloat(guestRating) || 4.8,
      guestReviewCount: parseInt(guestReviewCount, 10) || 100,
      googlePlaceId: googlePlaceId.trim(),
      googleProfileUrl: googleProfileUrl.trim(),
      youtubeVideoId: youtubeParse.valid ? youtubeParse.videoId : undefined,
      youtubeVideoUrl: youtubeParse.valid ? youtubeParse.watchUrl : undefined,
      // Default score breakdown for new hotels
      scoreBreakdown: initialHotel?.scoreBreakdown || {
        bedComfort: 9.0,
        quietness: 9.0,
        lightingClimate: 9.0,
        designWellness: 9.0,
      },
      assessmentDate: initialHotel?.assessmentDate || new Date().toISOString().slice(0, 10),
      assessmentNotes: initialHotel?.assessmentNotes || 'Preliminary audit pending physical verification.',
      assessmentConfidence: initialHotel?.assessmentConfidence || 'Editorial Estimate',
      scoringStatus: initialHotel?.scoringStatus || 'published',
    };

    try {
      const endpoint = isNew ? '/api/hotels' : `/api/hotels/${initialHotel?.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save hotel record.');
      }

      setSuccess('Hotel listing saved successfully.');
      if (isNew) {
        router.push(`/admin/hotels/${data.hotel.id}/scores`);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error saving hotel.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      {success && (
        <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 text-forest-900 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-forest-700" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* 1. Core Identity & Editorial */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4 text-xs">
        <h2 className="font-serif text-xl font-bold text-forest-950 border-b border-sand-100 pb-2">
          1. Property Identity & Narrative
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Hotel Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. The Chedi Andermatt"
              className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-forest-950 font-medium"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              URL Slug (Leave blank to generate automatically)
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="e.g. the-chedi-andermatt-switzerland"
              className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-forest-950 font-mono text-[11px]"
            />
          </div>
        </div>

        <div>
          <label className="block text-charcoal-700 font-semibold mb-1">Tagline</label>
          <input
            type="text"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="e.g. Alpine stillness crafted with Hästens beds and Japanese minimalist warmth."
            className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-forest-950"
          />
        </div>

        <div>
          <label className="block text-charcoal-700 font-semibold mb-1">
            General Overview Description
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-forest-950"
          />
        </div>

        <div>
          <label className="block text-charcoal-700 font-semibold mb-1">
            Rest Atlas Editorial Assessment Review
          </label>
          <textarea
            rows={3}
            value={editorialDescription}
            onChange={(e) => setEditorialDescription(e.target.value)}
            placeholder="Lead assessor editorial writeup highlighting acoustics, decibel tests, and sleep quality..."
            className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-forest-950"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">Category</label>
            <select
              value={hotelCategory}
              onChange={(e) => setHotelCategory(e.target.value as HotelCategory)}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800"
            >
              <option value="Wellness Resort">Wellness Resort</option>
              <option value="Luxury Hotel">Luxury Hotel</option>
              <option value="Boutique Hotel">Boutique Hotel</option>
              <option value="Historic Estate">Historic Estate</option>
              <option value="Ryokan / Sanctuary">Ryokan Sanctuary</option>
              <option value="Design Hotel">Design Hotel</option>
            </select>
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">Setting</label>
            <select
              value={settingType}
              onChange={(e) => setSettingType(e.target.value as Hotel['settingType'])}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800"
            >
              <option value="Mountain">Alpine & Mountain</option>
              <option value="Forest / Countryside">Forest & Countryside</option>
              <option value="Coastal">Coastal Horizons</option>
              <option value="Urban Sanctuary">Urban Sanctuary</option>
              <option value="Desert Retreat">Desert Oasis</option>
            </select>
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">Official Website</label>
            <input
              type="url"
              value={officialWebsite}
              onChange={(e) => setOfficialWebsite(e.target.value)}
              placeholder="https://..."
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-forest-950"
            />
          </div>
        </div>
      </div>

      {/* 2. Geography & Coordinates */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4 text-xs">
        <h2 className="font-serif text-xl font-bold text-forest-950 border-b border-sand-100 pb-2">
          2. Geography & Location
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Continent <span className="text-red-500">*</span>
            </label>
            <select
              value={continent}
              onChange={(e) => setContinent(e.target.value as Hotel['continent'])}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800"
            >
              <option value="Europe">Europe</option>
              <option value="Asia">Asia</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
              <option value="Africa">Africa</option>
              <option value="Oceania">Oceania</option>
            </select>
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Country <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="e.g. Switzerland"
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">Country Code (2 letters)</label>
            <input
              type="text"
              maxLength={2}
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value.toUpperCase())}
              placeholder="CH"
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg uppercase"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              City / Sanctuary <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g. Andermatt"
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">State / Province</label>
            <input
              type="text"
              value={stateOrProvince}
              onChange={(e) => setStateOrProvince(e.target.value)}
              placeholder="e.g. Uri"
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">Street Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Gotthardstrasse 4"
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* 3. YouTube Video Tour Management */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4 text-xs">
        <div className="flex items-center space-x-2 border-b border-sand-100 pb-2">
          <Video className="w-5 h-5 text-forest-700" />
          <h2 className="font-serif text-xl font-bold text-forest-950">
            3. YouTube Video Management
          </h2>
        </div>

        <div>
          <label className="block text-charcoal-700 font-semibold mb-1">
            YouTube Video URL or Video ID
          </label>
          <input
            type="text"
            value={youtubeInput}
            onChange={(e) => setYoutubeInput(e.target.value)}
            placeholder="e.g. https://www.youtube.com/watch?v=w-qgqgqC1qE or raw 11-char ID"
            className="w-full px-3.5 py-2.5 bg-sand-50 border border-sand-200 rounded-xl text-forest-950"
          />
          <span className="text-[11px] text-charcoal-400 mt-1 block">
            Supports standard YouTube links, youtu.be short links, and raw 11-character IDs. Embedded via privacy-enhanced youtube-nocookie.com.
          </span>
        </div>

        {/* Live Video Preview Box */}
        {youtubeInput.trim() !== '' && (
          <div className="mt-4 p-4 rounded-2xl bg-sand-50 border border-sand-200 space-y-3">
            <span className="font-bold text-forest-950 text-xs block">
              Live Embed Preview Status:
            </span>
            {youtubeParse.valid && youtubeParse.videoId ? (
              <div className="space-y-3">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-900 font-semibold text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-forest-700" />
                  <span>Valid Video ID: {youtubeParse.videoId}</span>
                </div>
                <div className="max-w-md">
                  <YouTubePlayer
                    videoId={youtubeParse.videoId}
                    hotelName={name || 'Preview Hotel'}
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-red-50 text-red-900 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <span>{youtubeParse.error || 'Invalid YouTube URL format.'}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. Google Reviews & Place ID Integration */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4 text-xs">
        <div className="flex items-center space-x-2 border-b border-sand-100 pb-2">
          <Globe className="w-5 h-5 text-forest-700" />
          <h2 className="font-serif text-xl font-bold text-forest-950">
            4. Google Reviews & Places Integration
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Google Place ID
            </label>
            <input
              type="text"
              value={googlePlaceId}
              onChange={(e) => setGooglePlaceId(e.target.value)}
              placeholder="e.g. ChIJX9Yg5b9QjEcR3wI2JtL9bF8"
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-forest-950 font-mono text-[11px]"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Google Maps Profile URL
            </label>
            <input
              type="url"
              value={googleProfileUrl}
              onChange={(e) => setGoogleProfileUrl(e.target.value)}
              placeholder="https://maps.google.com/..."
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-forest-950"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">Guest Rating (0.0 to 5.0)</label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={guestRating}
              onChange={(e) => setGuestRating(e.target.value)}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">Guest Review Count</label>
            <input
              type="number"
              value={guestReviewCount}
              onChange={(e) => setGuestReviewCount(e.target.value)}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* 5. Photos, Sleep Attributes & Status */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4 text-xs">
        <h2 className="font-serif text-xl font-bold text-forest-950 border-b border-sand-100 pb-2">
          5. Photography, Sleep Attributes & Publishing
        </h2>

        <div>
          <label className="block text-charcoal-700 font-semibold mb-1">
            Cover Photograph URL
          </label>
          <input
            type="url"
            required
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
          />
        </div>

        <div>
          <label className="block text-charcoal-700 font-semibold mb-1">
            Gallery Image URLs (One URL per line)
          </label>
          <textarea
            rows={3}
            value={galleryInput}
            onChange={(e) => setGalleryInput(e.target.value)}
            placeholder="https://...\nhttps://..."
            className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg font-mono text-[11px]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Sleep-Friendly Attributes (One feature per line)
            </label>
            <textarea
              rows={4}
              value={sleepFeaturesInput}
              onChange={(e) => setSleepFeaturesInput(e.target.value)}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              General Amenities (One amenity per line)
            </label>
            <textarea
              rows={4}
              value={amenitiesInput}
              onChange={(e) => setAmenitiesInput(e.target.value)}
              className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
            />
          </div>
        </div>

        {/* Toggles */}
        <div className="pt-2 flex flex-wrap gap-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={adultsOnly}
              onChange={(e) => setAdultsOnly(e.target.checked)}
              className="rounded text-forest-800"
            />
            <span className="font-semibold text-charcoal-800">Adults Only Sanctuary</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={verifiedListing}
              onChange={(e) => setVerifiedListing(e.target.checked)}
              className="rounded text-forest-800"
            />
            <span className="font-semibold text-charcoal-800">On-Site Verified Audit</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={featuredStatus}
              onChange={(e) => setFeaturedStatus(e.target.checked)}
              className="rounded text-forest-800"
            />
            <span className="font-semibold text-charcoal-800">Feature on Homepage</span>
          </label>
        </div>

        <div>
          <label className="block text-charcoal-700 font-semibold mb-1">Listing Status</label>
          <select
            value={listingStatus}
            onChange={(e) => setListingStatus(e.target.value as 'published' | 'draft' | 'archived')}
            className="w-full sm:w-64 px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg font-semibold text-forest-950"
          >
            <option value="published">Published (Public directory)</option>
            <option value="draft">Draft (Assessor preview only)</option>
            <option value="archived">Archived (Delisted)</option>
          </select>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end space-x-3 pt-4 border-t border-sand-200">
        <button
          type="button"
          onClick={() => router.push('/admin/hotels')}
          className="px-4 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-semibold text-xs"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold text-xs flex items-center space-x-2 shadow-soft"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Saving Property...' : 'Save Hotel Listing'}</span>
        </button>
      </div>
    </form>
  );
}
