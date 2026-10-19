'use client';

import React from 'react';
import { ScoreBreakdown, ConfidenceLevel } from '@/types/score';
import { SCORING_PILLARS, getScoreDescriptor } from '@/lib/scoring';
import { ShieldCheck, Info, CheckCircle2, BedDouble, VolumeX, SunMoon, Sparkles } from 'lucide-react';

interface ScoreBreakdownViewProps {
  scoreBreakdown: ScoreBreakdown;
  restScore: number;
  assessmentDate: string;
  assessmentNotes?: string;
  confidenceLevel: ConfidenceLevel;
  hotelName: string;
}

export default function ScoreBreakdownView({
  scoreBreakdown,
  restScore,
  assessmentDate,
  assessmentNotes,
  confidenceLevel,
  hotelName,
}: ScoreBreakdownViewProps) {
  const descriptor = getScoreDescriptor(restScore);

  const getPillarIcon = (key: keyof ScoreBreakdown) => {
    switch (key) {
      case 'bedComfort':
        return <BedDouble className="w-5 h-5 text-forest-700" />;
      case 'quietness':
        return <VolumeX className="w-5 h-5 text-forest-700" />;
      case 'lightingClimate':
        return <SunMoon className="w-5 h-5 text-forest-700" />;
      case 'designWellness':
        return <Sparkles className="w-5 h-5 text-forest-700" />;
    }
  };

  return (
    <section className="bg-sand-100/70 rounded-3xl p-6 sm:p-8 border border-sand-200/90 shadow-soft">
      {/* Header with Total Score and Descriptor */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-sand-200/80 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-800 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Rest Atlas Certified Sleep Assessment</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Sleep & Relaxation Scorecard
          </h2>
          <p className="text-xs text-charcoal-500 mt-1">
            Assessed {assessmentDate} • Confidence: <span className="font-medium text-forest-800">{confidenceLevel}</span>
          </p>
        </div>

        {/* Big Overall Rest Score Badge */}
        <div className="flex items-center space-x-4 bg-white px-5 py-3.5 rounded-2xl border border-sand-200 shadow-soft">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-charcoal-400 font-medium">
              Overall Rest Score
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-4xl font-serif font-bold text-forest-900">
                {restScore.toFixed(1)}
              </span>
              <span className="text-sm font-medium text-charcoal-400">/ 10</span>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-sand-200" />
          <div className="max-w-[130px]">
            <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${descriptor.badgeClass}`}>
              {descriptor.title}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Pillars Progress Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        {SCORING_PILLARS.map((pillar) => {
          const score = scoreBreakdown[pillar.key];
          const percentageFilled = (score / 10) * 100;

          return (
            <div
              key={pillar.key}
              className="bg-white rounded-2xl p-5 border border-sand-200/80 shadow-soft-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-forest-50 border border-forest-100/60">
                      {getPillarIcon(pillar.key)}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-forest-950 leading-tight">
                        {pillar.label}
                      </h3>
                      <span className="text-[11px] text-charcoal-400">
                        {pillar.percentage}% of overall Rest Score
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-forest-900">
                      {score.toFixed(1)}
                    </span>
                    <span className="text-xs text-charcoal-400">/10</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-sand-100 h-2.5 rounded-full overflow-hidden my-3">
                  <div
                    className="h-full bg-forest-700 rounded-full transition-all duration-500"
                    style={{ width: `${percentageFilled}%` }}
                  />
                </div>

                <p className="text-xs text-charcoal-600 leading-relaxed mb-3">
                  {pillar.description}
                </p>
              </div>

              {/* Subcriteria Checklist */}
              <div className="border-t border-sand-100 pt-3 space-y-1">
                {pillar.subcriteria.slice(0, 2).map((crit, idx) => (
                  <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-charcoal-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 flex-shrink-0 mt-0.5" />
                    <span>{crit}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Assessor Evidence & Verification Notes */}
      {assessmentNotes && (
        <div className="mt-6 bg-white/90 rounded-2xl p-4 sm:p-5 border border-forest-200/60 flex items-start space-x-3.5">
          <Info className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal-700 space-y-1">
            <h4 className="font-semibold text-forest-950 uppercase tracking-wider text-[11px]">
              Assessor Environmental Audit Notes
            </h4>
            <p className="leading-relaxed">{assessmentNotes}</p>
          </div>
        </div>
      )}

      {/* Transparent Disclaimer */}
      <div className="mt-4 text-[11px] text-charcoal-400 text-center leading-relaxed">
        * Weighted calculation: Rest Score = (Bed Comfort × 0.30) + (Quietness × 0.20) + (Lighting & Climate × 0.20) + (Design & Wellness × 0.30).
        This index measures documented architectural and sensory sleep features and is not a clinical medical diagnosis.
      </div>
    </section>
  );
}
