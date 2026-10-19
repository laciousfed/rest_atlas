import React from 'react';
import Link from 'next/link';
import { getAuditLogs } from '@/lib/db/hotel-repository';
import { ShieldCheck, History, ArrowLeft, ArrowRight, Sliders } from 'lucide-react';

export const runtime = 'edge';
export const revalidate = 0;

export default async function AdminAuditTrailPage() {
  const auditLogs = await getAuditLogs();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-forest-800 font-semibold">
            Accountability & Calibration
          </span>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            System Audit Trail
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            Chronological record of certified sleep score calculations, assessor changes, and acoustic updates.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-sand-200 shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-sand-50 border-b border-sand-200 text-charcoal-500 font-semibold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-5">Timestamp & Assessor</th>
                <th className="py-3.5 px-4">Property</th>
                <th className="py-3.5 px-4">Score Transition</th>
                <th className="py-3.5 px-6">Evidence / Reason</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 text-charcoal-800">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-sand-50/60 transition-colors">
                  <td className="py-4 px-5">
                    <div className="font-bold text-forest-950">{log.timestamp.slice(0, 16).replace('T', ' ')}</div>
                    <div className="text-[11px] text-charcoal-500">{log.assessorName}</div>
                  </td>

                  <td className="py-4 px-4 font-semibold text-forest-900">
                    {log.hotelName}
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      {log.previousWeightedScore !== undefined ? (
                        <span className="text-charcoal-400 line-through">
                          {log.previousWeightedScore.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-charcoal-400">New</span>
                      )}
                      <ArrowRight className="w-3 h-3 text-forest-700" />
                      <span className="font-serif font-bold text-sm text-forest-900 px-2 py-0.5 bg-forest-100 rounded">
                        {log.newWeightedScore.toFixed(1)}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-6 max-w-xs text-charcoal-600 line-clamp-2">
                    {log.reasonOrNotes}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <Link
                      href={`/admin/hotels/${log.hotelId}/scores`}
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-sand-100 hover:bg-forest-100 hover:text-forest-900 text-charcoal-700 font-semibold transition-colors"
                    >
                      <Sliders className="w-3 h-3" />
                      <span>Audit</span>
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
