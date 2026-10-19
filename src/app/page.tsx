import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  getHotels,
  getFeaturedHotels,
  getLocations,
} from '@/lib/db/hotel-repository';
import HotelCard from '@/components/hotels/HotelCard';
import {
  Moon,
  Sparkles,
  Search,
  BedDouble,
  VolumeX,
  SunMoon,
  ArrowRight,
  ShieldCheck,
  Compass,
  TreePine,
  Waves,
  Mountain,
  Building2,
  CheckCircle2,
} from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation every minute

export default async function HomePage() {
  const [featuredHotels, allHotelsResponse, locations] = await Promise.all([
    getFeaturedHotels(3),
    getHotels({ limit: 12 }),
    getLocations(),
  ]);

  const allHotels = allHotelsResponse.hotels;

  // Curations derived dynamically from database
  const highestScored = [...allHotels]
    .sort((a, b) => b.restScore - a.restScore)
    .slice(0, 3);

  const quietEscapes = [...allHotels]
    .sort((a, b) => b.scoreBreakdown.quietness - a.scoreBreakdown.quietness)
    .slice(0, 3);

  const bestBedding = [...allHotels]
    .sort((a, b) => b.scoreBreakdown.bedComfort - a.scoreBreakdown.bedComfort)
    .slice(0, 3);

  const wellnessRetreats = allHotels
    .filter((h) => h.hotelCategory === 'Wellness Resort' || h.settingType === 'Mountain')
    .slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[640px] flex items-center justify-center bg-forest-950 text-sand-50 overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
        {/* Subtle Ambient Background Image with Dark Vignette */}
        <div className="absolute inset-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=2000&q=80"
            alt="Alpine restful hotel sanctuary"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/80 via-forest-950/90 to-forest-950 pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-forest-700/60 backdrop-blur-md text-xs font-medium text-gold-400">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>The Global Sleep & Comfort Index</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-sand-50 leading-[1.1]">
            Find a stay that helps you <span className="italic font-normal text-gold-300">truly rest</span>.
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-sand-300 font-light leading-relaxed">
            The world’s first hotel guide designed specifically for restorative sleep. We evaluate acoustic decibels, mattress ergonomics, circadian lighting, and bedroom calm so you wake up revitalised.
          </p>

          {/* Prominent Hero Search Bar */}
          <div className="max-w-3xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border border-sand-200 text-charcoal-900">
            <form action="/hotels" method="GET" className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-grow w-full">
                <Search className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  name="query"
                  placeholder="Where do you want to rest? (e.g. Swiss Alps, Kyoto, Big Sur)..."
                  className="w-full pl-10 pr-4 py-3 bg-transparent rounded-xl text-sm placeholder-charcoal-400 focus:outline-none"
                />
              </div>

              <div className="w-full sm:w-44">
                <select
                  name="settingType"
                  className="w-full py-3 px-3 bg-sand-50 border border-sand-200 rounded-xl text-xs font-medium text-charcoal-800 focus:outline-none"
                >
                  <option value="">All Settings</option>
                  <option value="Mountain">Alpine & Mountain</option>
                  <option value="Forest / Countryside">Forest & Country</option>
                  <option value="Coastal">Coastal Horizons</option>
                  <option value="Urban Sanctuary">Urban Sanctuaries</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold rounded-xl text-sm transition-all shadow-soft flex items-center justify-center space-x-2"
              >
                <span>Discover Stays</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Quick Metrics */}
          <div className="pt-4 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs text-sand-300 font-light">
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>4-Pillar Rest Score</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>Acoustic Decibel Verification</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-400" />
              <span>Zero-Light Blackout Audits</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Restful Hotels */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-800 block mb-1">
              Curator’s Choice
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Featured Rest Sanctuaries
            </h2>
          </div>
          <Link
            href="/hotels?featuredOnly=true"
            className="text-sm font-semibold text-forest-800 hover:text-forest-950 flex items-center space-x-1 group"
          >
            <span>View all featured properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 3. The Rest Atlas 4-Pillar Methodology Banner */}
      <section className="bg-sand-100 border-y border-sand-200/90 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl mx-auto text-center space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-800">
              How We Evaluate Stays
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              The 4 Pillars of Rest Atlas Scoring
            </h2>
            <p className="text-sm text-charcoal-600 leading-relaxed">
              Conventional hotel star ratings reflect lobby crystal chandeliers and concierge desks. Our index evaluates what matters when the lights go off.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-sand-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <BedDouble className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-forest-800 uppercase tracking-wider block">
                  30% Weight
                </span>
                <h3 className="font-serif text-lg font-bold text-forest-950 mt-0.5">
                  Bed & Linen Comfort
                </h3>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Hästens, Hypnos, or Naturalmat mattresses, ergonomic pillow menus, and certified 400+ TC breathable natural fibers.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-sand-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <VolumeX className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-forest-800 uppercase tracking-wider block">
                  20% Weight
                </span>
                <h3 className="font-serif text-lg font-bold text-forest-950 mt-0.5">
                  Quiet & Soundscape
                </h3>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Acoustic double vestibule doors, triple-pane glazing, low ambient decibels, and isolation from corridor chatter.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-sand-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <SunMoon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-forest-800 uppercase tracking-wider block">
                  20% Weight
                </span>
                <h3 className="font-serif text-lg font-bold text-forest-950 mt-0.5">
                  Lighting & Climate
                </h3>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                True zero-light motorized blackout blinds, circadian amber bedside lamps, whisper-silent HVAC (&lt;25dB), and clean airflow.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-sand-200 shadow-soft space-y-3">
              <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center text-forest-800">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-forest-800 uppercase tracking-wider block">
                  30% Weight
                </span>
                <h3 className="font-serif text-lg font-bold text-forest-950 mt-0.5">
                  Design & Wellness
                </h3>
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Biophilic architecture, visual tranquility, nature vistas, hydrothermal spas, cold plunges, and evening turn-down sleep rituals.
              </p>
            </div>
          </div>

          <div className="text-center pt-2">
            <Link
              href="/methodology"
              className="inline-flex items-center space-x-2 text-sm font-semibold text-forest-800 hover:text-forest-950 underline underline-offset-4"
            >
              <span>Explore our full mathematical scoring and on-site audit protocol</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Deep Silence Escapes (Highest Quietness Scores) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-800 block mb-1">
              Acoustic Isolation
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Deep Silence Escapes
            </h2>
            <p className="text-xs text-charcoal-600 mt-1">
              Properties scoring 9.5+ for structural quietness, acoustic decoupling, and ambient serenity.
            </p>
          </div>
          <Link
            href="/hotels?sortBy=quietness"
            className="text-sm font-semibold text-forest-800 hover:text-forest-950 flex items-center space-x-1 group"
          >
            <span>Explore all quiet escapes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quietEscapes.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 5. Masterpiece Bedding & Linens */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-800 block mb-1">
              Orthopaedic & Ergonomic Excellence
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Masterpiece Bedding & Linens
            </h2>
            <p className="text-xs text-charcoal-600 mt-1">
              Hotels featuring hand-tufted natural latex, horsehair toppers, and temperature-regulating natural bedding.
            </p>
          </div>
          <Link
            href="/hotels?sortBy=bedComfort"
            className="text-sm font-semibold text-forest-800 hover:text-forest-950 flex items-center space-x-1 group"
          >
            <span>Explore best bed comfort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {bestBedding.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 6. Geographic Continents & Sanctuary Destinations */}
      <section className="bg-sand-100 py-16 border-y border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-800">
              Global Sanctuaries
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Explore by Continent & Setting
            </h2>
            <p className="text-xs text-charcoal-600">
              Discover verified sleep sanctuaries positioned in the world’s quietest landscapes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {locations.continents.map((continent) => (
              <Link
                key={continent}
                href={`/hotels?continent=${encodeURIComponent(continent)}`}
                className="group bg-white rounded-2xl p-5 border border-sand-200 shadow-soft text-center hover:border-forest-700 hover:shadow-soft-md transition-all flex flex-col items-center justify-center space-y-2"
              >
                <Compass className="w-6 h-6 text-forest-700 group-hover:scale-110 transition-transform" />
                <span className="font-serif font-bold text-sm text-forest-950 group-hover:text-forest-700">
                  {continent}
                </span>
                <span className="text-[11px] text-charcoal-400">
                  View Sanctuaries
                </span>
              </Link>
            ))}
          </div>

          {/* Setting Type Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            <Link
              href="/hotels?settingType=Mountain"
              className="bg-forest-900 text-sand-50 rounded-2xl p-6 hover:bg-forest-950 transition-colors flex items-center space-x-4 shadow-soft"
            >
              <Mountain className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <h3 className="font-serif font-bold text-base">Alpine Escapes</h3>
                <p className="text-xs text-sand-300 mt-0.5">High altitude & mountain air</p>
              </div>
            </Link>

            <Link
              href="/hotels?settingType=Forest%20%2F%20Countryside"
              className="bg-forest-900 text-sand-50 rounded-2xl p-6 hover:bg-forest-950 transition-colors flex items-center space-x-4 shadow-soft"
            >
              <TreePine className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <h3 className="font-serif font-bold text-base">Forest Bathing</h3>
                <p className="text-xs text-sand-300 mt-0.5">Woodland seclusion & silence</p>
              </div>
            </Link>

            <Link
              href="/hotels?settingType=Coastal"
              className="bg-forest-900 text-sand-50 rounded-2xl p-6 hover:bg-forest-950 transition-colors flex items-center space-x-4 shadow-soft"
            >
              <Waves className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <h3 className="font-serif font-bold text-base">Coastal Horizons</h3>
                <p className="text-xs text-sand-300 mt-0.5">Rhythmic ocean wave masking</p>
              </div>
            </Link>

            <Link
              href="/hotels?settingType=Urban%20Sanctuary"
              className="bg-forest-900 text-sand-50 rounded-2xl p-6 hover:bg-forest-950 transition-colors flex items-center space-x-4 shadow-soft"
            >
              <Building2 className="w-8 h-8 text-gold-400 flex-shrink-0" />
              <div>
                <h3 className="font-serif font-bold text-base">Urban Sanctuaries</h3>
                <p className="text-xs text-sand-300 mt-0.5">High-STC acoustic metropolitan havens</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Highest-Rated Stays (Rest Score 9.6+) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-800 block mb-1">
              The Pinnacle
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Highest Rest Scores in the World
            </h2>
            <p className="text-xs text-charcoal-600 mt-1">
              Properties achieving near-perfect marks across sound, climate, bedding, and biophilic design.
            </p>
          </div>
          <Link
            href="/hotels?minRestScore=9.5"
            className="text-sm font-semibold text-forest-800 hover:text-forest-950 flex items-center space-x-1 group"
          >
            <span>View all 9.5+ stays</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highestScored.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      </section>

      {/* 8. Editorial Articles & Sleep Travel Guides */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-800 block mb-1">
              Sleep Travel Journalism
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
              Editorial Dispatches &amp; Sleep Guides
            </h2>
          </div>
          <Link
            href="/guides"
            className="text-sm font-semibold text-forest-800 hover:text-forest-950 flex items-center space-x-1 group"
          >
            <span>Explore all sleep guides</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/guides/soundproof-doors-and-airlocks"
            className="group bg-white rounded-2xl p-6 border border-sand-200 shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase text-gold-600 tracking-wider">Acoustic Engineering</span>
              <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                Why Soundproof Doors and Airlock Vestibules Matter More Than Window Glazing
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Our decibel audits reveal that 70% of nocturnal hotel awakenings stem from corridor slamming doors and late-night guest arrivals.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-forest-800 pt-2 border-t border-sand-100">
              <span>5 min read • Dr. Elena Vane</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/guides/natural-horsehair-wool-bedding"
            className="group bg-white rounded-2xl p-6 border border-sand-200 shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase text-gold-600 tracking-wider">Bedding Analysis</span>
              <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                The Science of Natural Horsehair and Organic Wool in High-Performance Beds
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Why luxury hotel chains are moving away from synthetic memory foams to moisture-wicking natural fibres that regulate body temperature.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-forest-800 pt-2 border-t border-sand-100">
              <span>4 min read • Kenji Sato</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <Link
            href="/guides/anatomy-of-100-percent-blackout"
            className="group bg-white rounded-2xl p-6 border border-sand-200 shadow-soft hover:shadow-soft-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <span className="text-[11px] font-semibold uppercase text-gold-600 tracking-wider">Circadian Architecture</span>
              <h3 className="font-serif text-xl font-bold text-forest-950 group-hover:text-forest-700 transition-colors">
                The Anatomy of 100% Blackout: Why Magnetic Side Channels Are Critical
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed">
                Even 5 lux of light leakage can disrupt REM cycles. Here is how leading sleep hotels seal window margins from light bleeding.
              </p>
            </div>
            <div className="flex items-center justify-between text-xs font-medium text-forest-800 pt-2 border-t border-sand-100">
              <span>6 min read • Editorial Council</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* 9. Final Call to Action */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-forest-900 rounded-3xl p-10 sm:p-14 text-sand-50 shadow-soft-lg space-y-6">
        <Moon className="w-10 h-10 text-gold-400 mx-auto" />
        <h2 className="font-serif text-3xl sm:text-4xl font-bold max-w-xl mx-auto leading-tight">
          Ready to experience hotels designed for real nervous system recovery?
        </h2>
        <p className="text-xs sm:text-sm text-sand-300 max-w-lg mx-auto leading-relaxed">
          Search over dozens of audited luxury hotels, boutique sanctuaries, and alpine retreats verified for quietness and sleep comfort.
        </p>
        <div>
          <Link
            href="/hotels"
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-sand-50 hover:bg-white text-forest-950 font-bold rounded-xl text-sm transition-all shadow-md"
          >
            <span>Explore The Global Directory</span>
            <ArrowRight className="w-4 h-4 text-forest-900" />
          </Link>
        </div>
      </section>

    </div>
  );
}
