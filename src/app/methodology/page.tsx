import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SCORING_PILLARS } from '@/lib/scoring';
import RestScoreCalculator from '@/components/calculator/RestScoreCalculator';
import { ShieldCheck, CheckCircle2, AlertCircle, ArrowRight, BedDouble, VolumeX, SunMoon, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sleep & Relaxation Scoring Methodology',
  description:
    'Detailed mathematical formula, assessment pillars, and verification standards behind the Rest Atlas 4-Pillar Rest Score.',
};

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
          Standards & Calibration
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
          The Rest Atlas Scoring Methodology
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
          How we quantify bedroom peace. Transparent mathematical weights, environmental decibel audits, and orthopaedic bedding inspection standards.
        </p>
      </div>

      {/* The Weighted Formula Display */}
      <div className="bg-forest-900 text-sand-50 rounded-3xl p-8 sm:p-10 shadow-soft-lg space-y-6">
        <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-gold-400 font-semibold">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>The Mathematical Model</span>
        </div>

        <h2 className="font-serif text-2xl sm:text-3xl font-bold">
          Weighted Rest Score Formula
        </h2>

        {/* Formula Box */}
        <div className="bg-forest-950/80 rounded-2xl p-6 border border-forest-800 text-center font-serif text-base sm:text-xl text-sand-100 leading-loose">
          <span className="block">
            Rest Score = (Bed Comfort × 0.30) + (Quietness × 0.20)
          </span>
          <span className="block mt-1">
            + (Lighting &amp; Climate × 0.20) + (Design &amp; Wellness × 0.30)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
          <div className="bg-forest-800/80 rounded-xl p-3 border border-forest-700/60">
            <span className="block text-gold-400 font-bold text-sm">30%</span>
            <span className="text-sand-200">Bed & Linen</span>
          </div>
          <div className="bg-forest-800/80 rounded-xl p-3 border border-forest-700/60">
            <span className="block text-gold-400 font-bold text-sm">20%</span>
            <span className="text-sand-200">Quiet Environment</span>
          </div>
          <div className="bg-forest-800/80 rounded-xl p-3 border border-forest-700/60">
            <span className="block text-gold-400 font-bold text-sm">20%</span>
            <span className="text-sand-200">Lighting & Climate</span>
          </div>
          <div className="bg-forest-800/80 rounded-xl p-3 border border-forest-700/60">
            <span className="block text-gold-400 font-bold text-sm">30%</span>
            <span className="text-sand-200">Design & Wellness</span>
          </div>
        </div>

        <p className="text-xs text-sand-300 leading-relaxed">
          Each pillar is scored between 0.0 and 10.0 by authorized sleep environment assessors. The final calculated weighted score is rounded to exactly one decimal place.
        </p>
      </div>

      {/* Interactive Rest Score Simulator */}
      <div className="space-y-4">
        <div className="border-b border-sand-200 pb-3">
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            Interactive Score Simulator
          </h2>
          <p className="text-xs text-charcoal-500 mt-1">
            Adjust the 4 environmental sliders to calculate a weighted Rest Score in real time. Use the scenario presets or drag each pillar individually.
          </p>
        </div>
        <RestScoreCalculator />
      </div>

      {/* The 4 Pillars Detailed Breakdown */}
      <div className="space-y-8">
        <div className="border-b border-sand-200 pb-3">
          <h2 className="font-serif text-3xl font-bold text-forest-950">
            The 4 Assessment Pillars Explained
          </h2>
        </div>

        <div className="space-y-6">
          {SCORING_PILLARS.map((pillar, idx) => (
            <div
              key={pillar.key}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-sand-100 pb-4">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-full bg-forest-800 text-sand-50 flex items-center justify-center font-bold text-xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <h3 className="font-serif text-xl font-bold text-forest-950">
                    {pillar.label}
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-forest-100 text-forest-900">
                  {pillar.percentage}% of Overall Score
                </span>
              </div>

              <p className="text-sm text-charcoal-700 leading-relaxed">
                {pillar.description}
              </p>

              <div>
                <h4 className="text-xs uppercase font-semibold tracking-wider text-charcoal-400 mb-2">
                  Key Verification Criteria
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-charcoal-700">
                  {pillar.subcriteria.map((item, cIdx) => (
                    <div key={cIdx} className="flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-forest-700 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidence Levels & Audit History */}
      <div className="bg-white rounded-3xl p-8 border border-sand-200 shadow-soft space-y-6">
        <h3 className="font-serif text-2xl font-bold text-forest-950">
          Confidence Tiers & Integrity Protocols
        </h3>

        <div className="space-y-4 text-xs text-charcoal-700 leading-relaxed">
          <div className="p-4 rounded-xl bg-forest-50 border border-forest-200">
            <span className="font-bold text-forest-950 block text-sm mb-1">
              1. High (On-Site Verified Audit)
            </span>
            <p>
              An authorized assessor physically stayed at the property, logged decibel readings with calibrated sound level meters, inspected mattress materials, verified blackout lux levels with a light meter, and audited ventilation noise.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sand-100 border border-sand-200">
            <span className="font-bold text-forest-950 block text-sm mb-1">
              2. Medium (Documented Architectural Specifications)
            </span>
            <p>
              Architectural blueprints, manufacturer invoices (e.g. Hästens, Naturalmat), STC acoustic wall ratings, and mechanical HVAC decibel specifications supplied by hotel engineering and independently audited.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-sand-100 border border-sand-200">
            <span className="font-bold text-forest-950 block text-sm mb-1">
              3. Editorial Estimate
            </span>
            <p>
              Preliminary baseline assessment synthesized from verified guest review frequency, published hotel photography, and geographic satellite noise maps prior to full physical verification.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center space-y-4">
        <Link
          href="/hotels"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-forest-800 text-sand-50 rounded-xl text-xs font-semibold hover:bg-forest-900 transition-colors shadow-soft"
        >
          <span>Browse directory of scored hotels</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
