import React from 'react';
import Link from 'next/link';
import { getAdminStats, getAuditLogs, getAllAdminHotels } from '@/lib/db/hotel-repository';
import {
  Building2,
  CheckCircle2,
  Clock,
  Video,
  Plus,
  Star,
  ShieldCheck,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export const revalidate = 0; // Dynamic admin metrics

export default async function AdminDashboardOverviewPage() {
  const [stats, auditLogs, hotels] = await Promise.all([
    getAdminStats(),
    getAuditLogs(),
    getAllAdminHotels(),
  ]);

  const recentHotels = hotels.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Page Title & Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-forest-800 font-semibold">
            Console Metrics
          </span>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Assessor Dashboard Overview
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Real-time status of audited sleep sanctuaries, draft evaluations, and acoustic assessments.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            href="/admin/hotels/new"
            className="inline-flex items-center space-x-2 px-4 py-2.5 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl text-xs font-semibold transition-all shadow-soft"
          >
            <Plus className="w-4 h-4" />
            <span>Create Hotel Listing</span>
          </Link>
        </div>
      </div>

      {/* Database-Derived Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Listings</span>
            <Building2 className="w-4 h-4 text-forest-700" />
          </div>
          <div className="text-3xl font-serif font-bold text-forest-950">
            {stats.total}
          </div>
          <span className="text-[11px] text-charcoal-500 block">Catalogued properties</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Published</span>
            <CheckCircle2 className="w-4 h-4 text-forest-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-forest-700">
            {stats.published}
          </div>
          <span className="text-[11px] text-charcoal-500 block">Publicly accessible</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Awaiting Audit</span>
            <Clock className="w-4 h-4 text-gold-600" />
          </div>
          <div className="text-3xl font-serif font-bold text-gold-700">
            {stats.underReview}
          </div>
          <span className="text-[11px] text-charcoal-500 block">Draft / under assessment</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Video Coverage</span>
            <Video className="w-4 h-4 text-forest-700" />
          </div>
          <div className="text-3xl font-serif font-bold text-forest-950">
            {stats.videoCoverage} / {stats.total}
          </div>
          <span className="text-[11px] text-charcoal-500 block">With YouTube walkthrough</span>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-sand-200 shadow-soft space-y-2">
          <div className="flex items-center justify-between text-charcoal-400">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Avg Rest Score</span>
            <Star className="w-4 h-4 text-gold-500 fill-gold-500" />
          </div>
          <div className="text-3xl font-serif font-bold text-forest-900">
            {stats.avgRestScore.toFixed(1)}
          </div>
          <span className="text-[11px] text-charcoal-500 block">Platform global benchmark</span>
        </div>
      </div>

      {/* Two Column Layout: Recent Hotel Listings & Score Audit Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Columns: Recently Updated Listings */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sand-100">
            <div>
              <h2 className="font-serif text-xl font-bold text-forest-950">
                Recently Updated Properties
              </h2>
              <span className="text-xs text-charcoal-400">
                Quick access to score and amenity editors
              </span>
            </div>
            <Link
              href="/admin/hotels"
              className="text-xs font-semibold text-forest-800 hover:text-forest-950 flex items-center space-x-1"
            >
              <span>View all ({stats.total})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-sand-100">
            {recentHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-forest-950 text-sm">{hotel.name}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        hotel.listingStatus === 'published'
                          ? 'bg-forest-100 text-forest-900'
                          : 'bg-sand-200 text-charcoal-700'
                      }`}
                    >
                      {hotel.listingStatus}
                    </span>
                  </div>
                  <span className="text-charcoal-500">
                    {hotel.city}, {hotel.country} • Rest Score: <strong className="text-forest-900">{hotel.restScore.toFixed(1)}</strong>
                  </span>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <Link
                    href={`/admin/hotels/${hotel.id}/scores`}
                    className="px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-forest-50 hover:text-forest-900 font-semibold text-charcoal-700 transition-colors"
                  >
                    Adjust Scores
                  </Link>
                  <Link
                    href={`/admin/hotels/${hotel.id}/edit`}
                    className="px-3 py-1.5 rounded-lg bg-forest-800 hover:bg-forest-900 font-semibold text-sand-50 transition-colors"
                  >
                    Edit Listing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Score Change Audit Log */}
        <div className="bg-white rounded-3xl p-6 border border-sand-200 shadow-soft space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sand-100">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <h2 className="font-serif text-lg font-bold text-forest-950">
                Score Audit Trail
              </h2>
            </div>
            <Link
              href="/admin/audit"
              className="text-xs text-forest-800 font-medium hover:underline"
            >
              Full Log
            </Link>
          </div>

          <div className="space-y-4">
            {auditLogs.slice(0, 4).map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-sand-50 border border-sand-200/80 space-y-1.5 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-forest-950 truncate max-w-[150px]">
                    {log.hotelName}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-forest-800 text-sand-50 text-[10px] font-bold">
                    Score: {log.newWeightedScore.toFixed(1)}
                  </span>
                </div>
                <p className="text-[11px] text-charcoal-600 line-clamp-2">
                  {log.reasonOrNotes}
                </p>
                <div className="flex items-center justify-between text-[10px] text-charcoal-400 pt-1 border-t border-sand-200/50">
                  <span>Assessor: {log.assessorName}</span>
                  <span>{log.timestamp.slice(0, 10)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
