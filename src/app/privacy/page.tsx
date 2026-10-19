import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy and data protection practices for Rest Atlas.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
          Legal & Compliance
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest-950">
          Privacy Policy
        </h1>
        <p className="text-xs text-charcoal-500">
          Effective Date: January 1, 2026 • Last Reviewed: October 2026
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-sand-200 shadow-soft space-y-6 text-sm text-charcoal-700 leading-relaxed">
        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            1. Overview & Commitment to Data Minimization
          </h2>
          <p>
            Rest Atlas (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) operates an independent global hotel sleep assessment platform. We respect the privacy of our visitors and adhere strictly to data minimization principles. We do not sell user data, track users across third-party websites, or retain personal information beyond what is necessary to serve our readers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            2. Information We Collect
          </h2>
          <p>We collect information only in the following contexts:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong>Inquiry & Contact Submissions:</strong> Your name, email address, subject, and message content when submitting contact forms.</li>
            <li><strong>Newsletter Subscriptions:</strong> Your email address when optionally subscribing to the Quiet Dispatch newsletter.</li>
            <li><strong>Technical Telemetry:</strong> Standard non-identifying server log data including IP addresses, browser user-agent, and requested URLs to maintain platform security.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            3. Third-Party Services & Integrations
          </h2>
          <p>
            Our website integrates third-party tools to enrich hotel listings:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li><strong>YouTube:</strong> Embedded using privacy-enhanced mode (youtube-nocookie.com), preventing YouTube from setting tracking cookies until the user initiates video playback.</li>
            <li><strong>Google Maps Platform:</strong> Used server-side to resolve hotel place IDs and direct visitors to original Google Maps profiles without scraping user review data.</li>
            <li><strong>Firebase:</strong> Used for secure cloud data hosting, database security rules, and authenticated assessor dashboard sessions.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            4. Data Retention & Your Rights
          </h2>
          <p>
            Under the GDPR, CCPA, and applicable global privacy regulations, you have the right to request access to, correction of, or permanent deletion of any personal communications sent to us. To submit a data request, please use our <a href="/contact" className="text-forest-800 underline">contact page</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-serif text-xl font-bold text-forest-950">
            5. Operator Details
          </h2>
          <p className="text-xs text-charcoal-500">
            Rest Atlas is operated by an independent editorial organisation dedicated to sleep environment journalism and hotel comfort assessment. For privacy-related enquiries, data access requests, or deletion requests, please use the <a href="/contact" className="text-forest-800 underline">contact page</a> and include "Privacy Request" in your subject line. We aim to respond within 30 business days in accordance with applicable data protection regulations.
          </p>
        </section>
      </div>
    </div>
  );
}
