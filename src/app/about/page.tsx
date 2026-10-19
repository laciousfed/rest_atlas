import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Moon, ShieldCheck, BedDouble, VolumeX, SunMoon, Sparkles, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Rest Atlas — The Sleep & Sanctuary Mission',
  description:
    'Why Rest Atlas was founded: to replace superficial luxury hotel ratings with rigorous acoustic soundproofing, bed comfort, and sleep environment audits.',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-forest-800 text-sand-50 flex items-center justify-center mx-auto shadow-soft">
          <Moon className="w-6 h-6 text-gold-400" />
        </div>
        <span className="text-xs uppercase tracking-widest font-semibold text-forest-800">
          Our Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
          Why We Built Rest Atlas
        </h1>
        <p className="text-base text-charcoal-600 max-w-2xl mx-auto leading-relaxed">
          Hotels have spent a century competing over chandeliers, marble lobbies, and infinity pools. We evaluate what happens when the door shuts and the lights go out.
        </p>
      </div>

      {/* Main Narrative */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-sand-200 shadow-soft space-y-8 text-charcoal-800 leading-relaxed text-sm sm:text-base">
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-forest-950">
            The Broken Promise of the &ldquo;Luxury&rdquo; Hotel
          </h2>
          <p>
            Nearly every frequent traveller knows the quiet exhaustion of arriving at a five-star hotel only to be kept awake by an elevator dinging through thin plasterboard, a glaring air conditioning LED shining directly into the eyes, or cheap synthetic pillows on an over-sprung mattress.
          </p>
          <p>
            Traditional star classifications measure amenities—room service hours, bellhop presence, valet parking—not sleep quality. A hotel can hold five stars while suffering from 50-decibel traffic noise and paper-thin corridor doors.
          </p>
        </div>

        <div className="border-l-2 border-forest-800 pl-6 py-2 my-6 bg-sand-50/50 rounded-r-2xl space-y-2">
          <p className="font-serif text-lg font-bold text-forest-900">
            &ldquo;Travel should leave you restored, not depleted. We believe sleep is the true luxury.&rdquo;
          </p>
          <span className="text-xs text-charcoal-500 block">— The Rest Atlas Editorial Council</span>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-forest-950">
            The Difference: Architectural & Sensory Auditing
          </h2>
          <p>
            Rest Atlas approaches hotel reviews through an environmental and sensory lens. Our assessors examine physical specifications:
          </p>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-3">
              <BedDouble className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
              <span><strong>Bedding Architecture:</strong> Mattress construction (natural latex, horsehair, pocket springs), linen breathable thread counts, and ergonomic pillow options.</span>
            </li>
            <li className="flex items-start space-x-3">
              <VolumeX className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
              <span><strong>Sound Isolation:</strong> Structural STC ratings, double door vestibules, triple-glazed windows, and ambient midnight decibel readings.</span>
            </li>
            <li className="flex items-start space-x-3">
              <SunMoon className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
              <span><strong>Photometric & Climate Control:</strong> True zero-light blackout sealing, circadian amber lighting, and whisper-quiet HVAC operating below 25 dB.</span>
            </li>
            <li className="flex items-start space-x-3">
              <Sparkles className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
              <span><strong>Biophilic Wellness:</strong> Visual calm, natural materials, restorative thermal spas, and absence of visual clutter.</span>
            </li>
          </ul>
        </div>

        <div className="pt-6 border-t border-sand-200 space-y-3">
          <h3 className="font-serif text-lg font-bold text-forest-950">
            Medical Disclaimer
          </h3>
          <p className="text-xs text-charcoal-500 leading-relaxed">
            Rest Atlas provides independent architectural reviews and hotel assessments. The scoring system evaluates documented physical features associated with restful environments. Rest Atlas does not offer medical advice, diagnose clinical sleep disorders, or guarantee individual physiological responses.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center space-y-4">
        <Link
          href="/methodology"
          className="inline-flex items-center space-x-2 px-6 py-3 bg-forest-800 text-sand-50 rounded-xl text-xs font-semibold hover:bg-forest-900 transition-colors shadow-soft"
        >
          <span>Read our mathematical scoring methodology</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
