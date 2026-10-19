import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Scale, Award, HeartHandshake } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Editorial Standards & Affiliate Disclosure',
  description:
    'Our strict editorial independence policies, affiliate relationship disclosures, and listing correction procedures.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
          Transparency & Integrity
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
          Editorial Policies & Affiliate Disclosure
        </h1>
        <p className="text-xs text-charcoal-500">
          Guiding principles governing Rest Atlas reviews and commercial transparency.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-soft space-y-8 text-sm text-charcoal-700 leading-relaxed">
        
        {/* Pillar 1 */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2 text-forest-900 font-bold font-serif text-xl">
            <ShieldCheck className="w-5 h-5 text-forest-700" />
            <h2>1. Absolute Editorial Independence</h2>
          </div>
          <p>
            The Rest Atlas 4-Pillar Rest Score is purely an objective evaluation of bedroom ergonomics, acoustic decibels, blackout capabilities, and biophilic restorative design. No hotel, management group, PR firm, or hospitality brand can buy, influence, or negotiate an inflated Rest Score.
          </p>
          <p>
            Scores are assigned strictly by qualified assessors based on physical measurements and documented architectural specifications.
          </p>
        </section>

        {/* Pillar 2 */}
        <section className="space-y-3 border-t border-sand-100 pt-6">
          <div className="flex items-center space-x-2 text-forest-900 font-bold font-serif text-xl">
            <Scale className="w-5 h-5 text-forest-700" />
            <h2>2. Advertising & Affiliate Disclosure</h2>
          </div>
          <p>
            To fund independent travel and acoustic research, Rest Atlas may participate in select affiliate marketing programs. If you click an external link to check hotel availability or reserve a stay on an official booking website, we may earn a modest commission at zero additional cost to you.
          </p>
          <p>
            <strong>Crucial Rule:</strong> Commercial partnerships have zero bearing on our editorial scores or directory rankings. A hotel with an affiliate program will never receive an elevated score over an independent ryokan or remote alpine lodge without an affiliate program.
          </p>
        </section>

        {/* Pillar 3 */}
        <section className="space-y-3 border-t border-sand-100 pt-6">
          <div className="flex items-center space-x-2 text-forest-900 font-bold font-serif text-xl">
            <Award className="w-5 h-5 text-forest-700" />
            <h2>3. Sponsored Placements</h2>
          </div>
          <p>
            If any listing, guide, or curated collection is ever sponsored by an external partner, it will be prominently labeled with a visible &ldquo;Sponsored Placement&rdquo; tag. Sponsored hotels remain subject to the exact same rigorous Rest Score methodology; we do not accept sponsorships that require guaranteed minimum scores.
          </p>
        </section>

        {/* Pillar 4 */}
        <section className="space-y-3 border-t border-sand-100 pt-6">
          <div className="flex items-center space-x-2 text-forest-900 font-bold font-serif text-xl">
            <HeartHandshake className="w-5 h-5 text-forest-700" />
            <h2>4. Hotel Listing Correction Policy</h2>
          </div>
          <p>
            We take pride in factual precision. If a property upgrades its soundproofing, replaces synthetic bedding with organic certified mattresses, installs whisper-silent HVAC systems, or if noise conditions deteriorate due to local changes, we actively encourage hotel general managers and readers to notify us.
          </p>
          <p>
            Submit correction requests via our <Link href="/contact?type=correction" className="text-forest-800 underline font-semibold">listing correction portal</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
