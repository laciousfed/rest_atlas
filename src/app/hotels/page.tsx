import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getHotels, getLocations } from '@/lib/db/hotel-repository';
import HotelCard from '@/components/hotels/HotelCard';
import HotelSearchFilters from '@/components/hotels/HotelSearchFilters';
import { HotelFilterOptions } from '@/types/hotel';
import { Compass, Moon, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Global Directory of Sleep, Comfort & Quiet Hotels',
  description:
    'Search and filter world-class restful hotels by acoustic quietness, Hästens and Naturalmat bedding, 100% blackout blinds, and biophilic wellness design.',
};

export const runtime = 'edge';
export const revalidate = 60;

interface ExplorePageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ExploreHotelsPage({ searchParams }: ExplorePageProps) {
  // Parse search params into strongly-typed filter options
  const filters: HotelFilterOptions = {
    query: typeof searchParams.query === 'string' ? searchParams.query : undefined,
    continent: typeof searchParams.continent === 'string' ? searchParams.continent : undefined,
    country: typeof searchParams.country === 'string' ? searchParams.country : undefined,
    stateOrProvince: typeof searchParams.stateOrProvince === 'string' ? searchParams.stateOrProvince : undefined,
    city: typeof searchParams.city === 'string' ? searchParams.city : undefined,
    neighbourhood: typeof searchParams.neighbourhood === 'string' ? searchParams.neighbourhood : undefined,
    settingType: typeof searchParams.settingType === 'string' ? searchParams.settingType : undefined,
    category: typeof searchParams.category === 'string' ? searchParams.category : undefined,
    minRestScore: searchParams.minRestScore ? parseFloat(searchParams.minRestScore as string) : undefined,
    minBedComfort: searchParams.minBedComfort ? parseFloat(searchParams.minBedComfort as string) : undefined,
    minQuietness: searchParams.minQuietness ? parseFloat(searchParams.minQuietness as string) : undefined,
    sortBy: typeof searchParams.sortBy === 'string' ? (searchParams.sortBy as HotelFilterOptions['sortBy']) : 'restScore',
    blackoutCurtains: searchParams.blackoutCurtains === 'true',
    soundproofing: searchParams.soundproofing === 'true',
    pillowSelection: searchParams.pillowSelection === 'true',
    quietRoomOption: searchParams.quietRoomOption === 'true',
    adultsOnly: searchParams.adultsOnly === 'true',
    spaWellness: searchParams.spaWellness === 'true',
    airConditioning: searchParams.airConditioning === 'true',
    featuredOnly: searchParams.featuredOnly === 'true',
    verifiedOnly: searchParams.verifiedOnly === 'true',
    page: searchParams.page ? parseInt(searchParams.page as string, 10) : 1,
    limit: 9,
  };

  const [hotelsData, locations] = await Promise.all([
    getHotels(filters),
    getLocations(),
  ]);

  const { hotels, total, page, totalPages } = hotelsData;

  const buildPageUrl = (targetPage: number) => {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(searchParams)) {
      if (val && typeof val === 'string' && key !== 'page') {
        params.set(key, val);
      }
    }
    params.set('page', targetPage.toString());
    return `/hotels?${params.toString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Breadcrumbs */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs text-charcoal-500">
          <Link href="/" className="hover:text-forest-800 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-forest-900 font-semibold">Directory</span>
          {filters.continent && (
            <>
              <span>/</span>
              <span className="text-forest-800">{filters.continent}</span>
            </>
          )}
          {filters.country && (
            <>
              <span>/</span>
              <span className="text-forest-800">{filters.country}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-950">
              The Rest Atlas Directory
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-600 max-w-2xl mt-1 leading-relaxed">
              Discover audited sanctuaries worldwide evaluated for structural quietness, mattress ergonomics, circadian lighting controls, and biological restoration.
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <HotelSearchFilters locations={locations} totalResults={total} />

      {/* Hotel Cards Grid or Empty State */}
      {hotels.length > 0 ? (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-sand-200 pt-6 text-xs text-charcoal-600">
              <div>
                Page <span className="font-semibold text-forest-950">{page}</span> of{' '}
                <span className="font-semibold text-forest-950">{totalPages}</span>
              </div>

              <div className="flex items-center space-x-2">
                {page > 1 ? (
                  <Link
                    href={buildPageUrl(page - 1)}
                    className="inline-flex items-center space-x-1 px-4 py-2 bg-white border border-sand-200 rounded-lg hover:bg-sand-50 transition-colors font-medium text-forest-950 shadow-soft-sm"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </Link>
                ) : (
                  <span className="inline-flex items-center space-x-1 px-4 py-2 bg-sand-100 text-charcoal-400 border border-sand-200 rounded-lg cursor-not-allowed">
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </span>
                )}

                {page < totalPages ? (
                  <Link
                    href={buildPageUrl(page + 1)}
                    className="inline-flex items-center space-x-1 px-4 py-2 bg-forest-800 text-sand-50 rounded-lg hover:bg-forest-900 transition-colors font-medium shadow-soft-sm"
                  >
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center space-x-1 px-4 py-2 bg-sand-100 text-charcoal-400 border border-sand-200 rounded-lg cursor-not-allowed">
                    <span>Next</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Empty Results Notice */
        <div className="bg-white rounded-3xl p-12 text-center border border-sand-200 shadow-soft max-w-lg mx-auto space-y-4 my-12">
          <div className="w-14 h-14 rounded-full bg-sand-100 text-charcoal-400 flex items-center justify-center mx-auto">
            <Moon className="w-7 h-7" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-forest-950">
            No matching stays found
          </h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            We couldn&apos;t find any restful hotels matching your current combination of filters. Try broadening your score thresholds or clearing sleep feature constraints.
          </p>
          <div>
            <Link
              href="/hotels"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl text-xs font-semibold transition-all shadow-soft"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
