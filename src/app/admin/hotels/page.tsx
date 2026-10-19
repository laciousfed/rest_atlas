import React from 'react';
import Link from 'next/link';
import { getAllAdminHotels } from '@/lib/db/hotel-repository';
import {
  Building2,
  Plus,
  Sliders,
  Edit,
  ExternalLink,
  Search,
  CheckCircle2,
  Clock,
  Video,
} from 'lucide-react';

export const runtime = 'edge';

export const revalidate = 0;

export default async function AdminHotelsDirectoryPage() {
  const hotels = await getAllAdminHotels();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-forest-800 font-semibold">
            Catalog Management
          </span>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Hotel Listings Management
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Create, edit, preview, and update physical sleep audits across global properties.
          </p>
        </div>

        <Link
          href="/admin/hotels/new"
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl text-xs font-semibold transition-all shadow-soft"
        >
          <Plus className="w-4 h-4" />
          <span>New Hotel Listing</span>
        </Link>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sand-50 border-b border-sand-200 text-charcoal-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Property Name & Location</th>
                <th className="py-3.5 px-4">Category & Setting</th>
                <th className="py-3.5 px-4">Rest Score</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Video</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 text-charcoal-800">
              {hotels.map((hotel) => (
                <tr key={hotel.id} className="hover:bg-sand-50/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-forest-950 text-sm">{hotel.name}</div>
                    <div className="text-[11px] text-charcoal-500">
                      {hotel.city}, {hotel.country} ({hotel.continent})
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span className="font-medium text-forest-900">{hotel.hotelCategory}</span>
                    <div className="text-[11px] text-charcoal-400">{hotel.settingType}</div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-baseline space-x-1 font-serif font-bold text-base text-forest-900">
                      <span>{hotel.restScore.toFixed(1)}</span>
                      <span className="text-[10px] text-charcoal-400 font-sans">/ 10</span>
                    </div>
                    <div className="text-[10px] text-charcoal-500">
                      Confidence: {hotel.assessmentConfidence.split(' ')[0]}
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                        hotel.listingStatus === 'published'
                          ? 'bg-forest-100 text-forest-900'
                          : 'bg-sand-200 text-charcoal-700'
                      }`}
                    >
                      {hotel.listingStatus}
                    </span>
                  </td>

                  <td className="py-4 px-4">
                    {hotel.youtubeVideoId ? (
                      <span className="inline-flex items-center space-x-1 text-forest-700 font-semibold text-[11px]">
                        <Video className="w-3.5 h-3.5" />
                        <span>Connected</span>
                      </span>
                    ) : (
                      <span className="text-charcoal-400 text-[11px]">None</span>
                    )}
                  </td>

                  <td className="py-4 px-5 text-right space-x-2">
                    <Link
                      href={`/admin/hotels/${hotel.id}/scores`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-forest-100 hover:text-forest-900 text-charcoal-700 font-semibold transition-colors"
                      title="Adjust 4-Pillar Scores"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Scores</span>
                    </Link>

                    <Link
                      href={`/admin/hotels/${hotel.id}/edit`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold transition-colors"
                      title="Edit Hotel Listing"
                    >
                      <Edit className="w-3 h-3" />
                      <span>Edit</span>
                    </Link>

                    <Link
                      href={`/hotels/${hotel.slug}`}
                      target="_blank"
                      className="inline-flex items-center p-1.5 rounded-lg text-charcoal-400 hover:text-forest-900 hover:bg-sand-100 transition-colors"
                      title="Preview Public Page"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
