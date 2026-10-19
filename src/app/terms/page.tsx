import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service and usage conditions for Rest Atlas.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
          Legal & Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
          Terms of Service
        </h1>
        <p className="text-xs text-charcoal-500">
          Last Updated: October 2026
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-soft space-y-6 text-sm text-charcoal-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            1. Nature of the Platform
          </h2>
          <p>
            Rest Atlas provides independent editorial reviews, architectural analyses, and environmental assessments of global hotel properties. Rest Atlas is not a travel agency, booking broker, or direct hotel operator.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            2. Medical & Health Disclaimer
          </h2>
          <p>
            The Rest Atlas scoring index evaluates physical bedroom attributes—including mattress specifications, sound decibels, light leakage, and air filtration. Content published on this website is for informational and educational travel purposes only and does not constitute medical, psychiatric, or sleep-health diagnosis or treatment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            3. Accuracy & Listing Corrections
          </h2>
          <p>
            While our assessors strive for physical verification, hotels periodically remodel rooms, change mattress suppliers, or undergo adjacent municipal construction. If you discover an outdated feature or score discrepancy, we welcome corrections through our contact form.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            4. Intellectual Property
          </h2>
          <p>
            The proprietary Rest Atlas 4-Pillar Scoring formula, editorial essays, and original audit reports are the intellectual property of Rest Atlas. All hotel trademarks and brand imagery remain the property of their respective owners.
          </p>
        </section>
      </div>
    </div>
  );
}
