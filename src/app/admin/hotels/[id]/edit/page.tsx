import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getHotelById } from '@/lib/db/hotel-repository';
import HotelEditorForm from '@/components/admin/HotelEditorForm';
import { ArrowLeft, Sliders, ExternalLink } from 'lucide-react';

interface EditPageProps {
  params: { id: string };
}

export const revalidate = 0;

export default async function EditHotelListingPage({ params }: EditPageProps) {
  const hotel = await getHotelById(params.id);
  if (!hotel) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/hotels"
            className="inline-flex items-center space-x-1.5 text-xs text-forest-800 font-semibold mb-2 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Hotel Directory</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Edit Hotel: {hotel.name}
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {hotel.city}, {hotel.country} • Current Rest Score: {hotel.restScore.toFixed(1)}/10
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            href={`/admin/hotels/${hotel.id}/scores`}
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-semibold rounded-xl text-xs transition-colors"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Score Manager</span>
          </Link>

          <Link
            href={`/hotels/${hotel.slug}`}
            target="_blank"
            className="inline-flex items-center space-x-1.5 px-4 py-2 bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold rounded-xl text-xs transition-colors shadow-soft"
          >
            <span>Preview Public</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <HotelEditorForm initialHotel={hotel} isNew={false} />
    </div>
  );
}
