import React from 'react';
import Link from 'next/link';
import HotelEditorForm from '@/components/admin/HotelEditorForm';
import { ArrowLeft } from 'lucide-react';

export default function NewHotelListingPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/hotels"
          className="inline-flex items-center space-x-1.5 text-xs text-forest-800 font-semibold mb-2 hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Hotel Directory</span>
        </Link>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Create New Hotel Listing
        </h1>
        <p className="text-xs text-charcoal-500 mt-0.5">
          Catalogue a new restful hotel property with verified bedroom acoustics and bedding amenities.
        </p>
      </div>

      <HotelEditorForm isNew={true} />
    </div>
  );
}
