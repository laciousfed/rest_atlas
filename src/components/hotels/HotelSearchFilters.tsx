'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Moon,
  VolumeX,
  BedDouble,
  SunMoon,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

interface FilterProps {
  locations: {
    continents: string[];
    countries: { name: string; code: string; continent: string }[];
    cities: { name: string; country: string }[];
  };
  totalResults: number;
}

export default function HotelSearchFilters({ locations, totalResults }: FilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Mobile drawer state
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [advancedExpanded, setAdvancedExpanded] = useState(false);

  // Read current query values from URL
  const query = searchParams.get('query') || '';
  const continent = searchParams.get('continent') || '';
  const country = searchParams.get('country') || '';
  const city = searchParams.get('city') || '';
  const settingType = searchParams.get('settingType') || '';
  const category = searchParams.get('category') || '';
  const minRestScore = searchParams.get('minRestScore') || '';
  const minBedComfort = searchParams.get('minBedComfort') || '';
  const minQuietness = searchParams.get('minQuietness') || '';
  const sortBy = searchParams.get('sortBy') || 'restScore';

  // Boolean flags
  const blackoutCurtains = searchParams.get('blackoutCurtains') === 'true';
  const soundproofing = searchParams.get('soundproofing') === 'true';
  const pillowSelection = searchParams.get('pillowSelection') === 'true';
  const quietRoomOption = searchParams.get('quietRoomOption') === 'true';
  const adultsOnly = searchParams.get('adultsOnly') === 'true';
  const spaWellness = searchParams.get('spaWellness') === 'true';
  const airConditioning = searchParams.get('airConditioning') === 'true';

  const updateParam = (key: string, value: string | boolean | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '' || value === false) {
      params.delete(key);
    } else {
      params.set(key, String(value));
    }
    // Reset to page 1 on filter modification
    params.delete('page');
    router.push(`/hotels?${params.toString()}`, { scroll: false });
  };

  const clearAllFilters = () => {
    router.push('/hotels', { scroll: false });
  };

  const activeFilterCount = [
    query,
    continent,
    country,
    city,
    settingType,
    category,
    minRestScore,
    minBedComfort,
    minQuietness,
    blackoutCurtains,
    soundproofing,
    pillowSelection,
    quietRoomOption,
    adultsOnly,
    spaWellness,
    airConditioning,
  ].filter(Boolean).length;

  const filteredCountries = continent
    ? locations.countries.filter((c) => c.continent === continent)
    : locations.countries;

  const filteredCities = country
    ? locations.cities.filter((c) => c.country === country)
    : locations.cities;

  return (
    <div className="space-y-4">
      {/* Search Bar & Quick Bar Header */}
      <div className="bg-white rounded-2xl p-4 border border-sand-200/90 shadow-soft">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          
          {/* Text Search Input */}
          <div className="relative flex-grow">
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by hotel name, sanctuary city, or sleep tag..."
              defaultValue={query}
              onChange={(e) => {
                const val = e.target.value;
                // Simple debounce
                const timeoutId = setTimeout(() => {
                  updateParam('query', val.trim() ? val : null);
                }, 350);
                return () => clearTimeout(timeoutId);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-sm text-forest-950 placeholder-charcoal-400 focus:outline-none focus:border-forest-600 focus:bg-white transition-colors"
            />
          </div>

          {/* Continent Dropdown */}
          <div className="w-full md:w-44 flex-shrink-0">
            <select
              value={continent}
              onChange={(e) => {
                updateParam('continent', e.target.value || null);
                updateParam('country', null); // Reset country when continent changes
                updateParam('city', null);
              }}
              className="w-full px-3 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-xs font-medium text-forest-950 focus:outline-none focus:border-forest-600"
            >
              <option value="">All Continents</option>
              {locations.continents.map((cont) => (
                <option key={cont} value={cont}>
                  {cont}
                </option>
              ))}
            </select>
          </div>

          {/* Minimum Rest Score Filter */}
          <div className="w-full md:w-48 flex-shrink-0">
            <select
              value={minRestScore}
              onChange={(e) => updateParam('minRestScore', e.target.value || null)}
              className="w-full px-3 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-xs font-medium text-forest-950 focus:outline-none focus:border-forest-600"
            >
              <option value="">Any Rest Score</option>
              <option value="9.5">Score 9.5+ (Transcendent)</option>
              <option value="9.0">Score 9.0+ (Exceptional)</option>
              <option value="8.5">Score 8.5+ (Superior)</option>
              <option value="8.0">Score 8.0+ (High Rest)</option>
            </select>
          </div>

          {/* Mobile Filter Toggle & Advanced Toggle */}
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setMobileDrawerOpen(true)}
              className="md:hidden flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-forest-800 text-sand-50 rounded-xl text-xs font-semibold"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters ({activeFilterCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setAdvancedExpanded(!advancedExpanded)}
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-2.5 bg-sand-100 hover:bg-sand-200/80 text-charcoal-700 rounded-xl text-xs font-medium transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>All Filters {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
              {advancedExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={clearAllFilters}
                title="Clear all filters"
                className="p-2.5 text-charcoal-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Desktop Advanced Filter Panel */}
        {advancedExpanded && (
          <div className="hidden md:block pt-4 mt-4 border-t border-sand-200/80 space-y-4">
            {/* Row 1: Country, City, Setting, Category */}
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-charcoal-500 font-medium mb-1">Country</label>
                <select
                  value={country}
                  onChange={(e) => {
                    updateParam('country', e.target.value || null);
                    updateParam('city', null);
                  }}
                  className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800 focus:outline-none focus:border-forest-600"
                >
                  <option value="">All Countries</option>
                  {filteredCountries.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-charcoal-500 font-medium mb-1">City / Sanctuary</label>
                <select
                  value={city}
                  onChange={(e) => updateParam('city', e.target.value || null)}
                  className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800 focus:outline-none focus:border-forest-600"
                >
                  <option value="">All Cities</option>
                  {filteredCities.map((ct) => (
                    <option key={ct.name} value={ct.name}>
                      {ct.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-charcoal-500 font-medium mb-1">Setting Type</label>
                <select
                  value={settingType}
                  onChange={(e) => updateParam('settingType', e.target.value || null)}
                  className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800 focus:outline-none focus:border-forest-600"
                >
                  <option value="">All Settings</option>
                  <option value="Mountain">Alpine & Mountain</option>
                  <option value="Forest / Countryside">Forest & Countryside</option>
                  <option value="Coastal">Coastal & Ocean</option>
                  <option value="Urban Sanctuary">Urban Sanctuary</option>
                  <option value="Desert Retreat">Desert Oasis</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal-500 font-medium mb-1">Property Category</label>
                <select
                  value={category}
                  onChange={(e) => updateParam('category', e.target.value || null)}
                  className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800 focus:outline-none focus:border-forest-600"
                >
                  <option value="">All Categories</option>
                  <option value="Wellness Resort">Wellness Resort</option>
                  <option value="Luxury Hotel">Luxury Hotel</option>
                  <option value="Boutique Hotel">Boutique Hotel</option>
                  <option value="Historic Estate">Historic Estate</option>
                  <option value="Ryokan / Sanctuary">Ryokan Sanctuary</option>
                  <option value="Design Hotel">Design Hotel</option>
                </select>
              </div>
            </div>

            {/* Row 2: Sleep & Comfort Checklist Toggles */}
            <div>
              <span className="block text-xs font-semibold text-forest-900 uppercase tracking-wider mb-2">
                Sleep Quality & Sensory Controls
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'blackoutCurtains', label: '100% Blackout Blinds', active: blackoutCurtains },
                  { key: 'soundproofing', label: 'Acoustic Soundproofing (STC 50+)', active: soundproofing },
                  { key: 'pillowSelection', label: 'Pillow Menu (4+ types)', active: pillowSelection },
                  { key: 'quietRoomOption', label: 'Ultra-Quiet Room Guarantee', active: quietRoomOption },
                  { key: 'airConditioning', label: 'Silent Climate Control (<25dB)', active: airConditioning },
                  { key: 'adultsOnly', label: 'Adults Only Sanctuary', active: adultsOnly },
                  { key: 'spaWellness', label: 'Hydrotherapy / Thermal Spa', active: spaWellness },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => updateParam(item.key, !item.active)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                      item.active
                        ? 'bg-forest-800 text-sand-50 border-forest-900 shadow-soft-sm'
                        : 'bg-sand-50 text-charcoal-700 border-sand-200 hover:border-sand-300 hover:bg-sand-100'
                    }`}
                  >
                    {item.active ? '✓ ' : '+ '}
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Header: Count and Sorting Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1 text-xs">
        <div className="text-charcoal-600 font-medium">
          Showing <span className="font-bold text-forest-950">{totalResults}</span> audited restful properties
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-charcoal-500 font-medium">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => updateParam('sortBy', e.target.value)}
            className="px-3 py-1.5 bg-white border border-sand-200 rounded-lg text-xs font-semibold text-forest-900 focus:outline-none focus:border-forest-600 shadow-soft-sm"
          >
            <option value="restScore">Highest Rest Score</option>
            <option value="bedComfort">Best Bed & Linen Comfort</option>
            <option value="quietness">Quietest Sound Environment</option>
            <option value="guestRating">Highest Guest Rating</option>
            <option value="recentlyAdded">Most Recently Reviewed</option>
            <option value="name">Alphabetical (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Mobile Drawer Modal */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-sand-200">
              <h3 className="font-serif text-lg font-bold text-forest-950">Filter Stays</h3>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1 rounded-md text-charcoal-400 hover:text-charcoal-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-charcoal-600 font-semibold mb-1">Continent</label>
                <select
                  value={continent}
                  onChange={(e) => updateParam('continent', e.target.value || null)}
                  className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
                >
                  <option value="">All Continents</option>
                  {locations.continents.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-charcoal-600 font-semibold mb-1">Min Rest Score</label>
                <select
                  value={minRestScore}
                  onChange={(e) => updateParam('minRestScore', e.target.value || null)}
                  className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg"
                >
                  <option value="">Any Score</option>
                  <option value="9.5">9.5+ (Transcendent)</option>
                  <option value="9.0">9.0+ (Exceptional)</option>
                  <option value="8.5">8.5+ (Superior)</option>
                </select>
              </div>

              <div>
                <label className="block text-charcoal-600 font-semibold mb-2">Sleep Features</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={blackoutCurtains}
                      onChange={(e) => updateParam('blackoutCurtains', e.target.checked)}
                      className="rounded text-forest-800"
                    />
                    <span>100% Blackout Blinds</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={soundproofing}
                      onChange={(e) => updateParam('soundproofing', e.target.checked)}
                      className="rounded text-forest-800"
                    />
                    <span>Acoustic Soundproofing</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={pillowSelection}
                      onChange={(e) => updateParam('pillowSelection', e.target.checked)}
                      className="rounded text-forest-800"
                    />
                    <span>Custom Pillow Menu</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={adultsOnly}
                      onChange={(e) => updateParam('adultsOnly', e.target.checked)}
                      className="rounded text-forest-800"
                    />
                    <span>Adults Only Property</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-sand-200 flex space-x-2">
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="w-full py-2.5 bg-forest-800 text-sand-50 rounded-xl text-xs font-semibold"
              >
                Apply Filters
              </button>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    clearAllFilters();
                    setMobileDrawerOpen(false);
                  }}
                  className="px-3 py-2.5 bg-sand-100 text-charcoal-700 rounded-xl text-xs font-medium"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
