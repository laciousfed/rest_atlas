'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Moon, ArrowRight, ShieldCheck, Heart, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-forest-950 text-sand-200 border-t border-forest-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-forest-800/60">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-full bg-forest-800 text-sand-50 flex items-center justify-center border border-forest-700">
                <Moon className="w-4 h-4 text-gold-400 fill-gold-400/20" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-sand-50">
                Rest Atlas
              </span>
            </Link>
            <p className="text-sand-300 text-sm max-w-sm leading-relaxed">
              Find a stay that helps you truly rest. The independent global guide to hotels engineered for restorative sleep, acoustic quietness, and nervous system recovery.
            </p>
            <div className="flex items-center space-x-2 text-xs text-sage-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>Independent Editorial Standards & On-Site Acoustic Audits</span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-sand-400">Explore Stays</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/hotels?settingType=Mountain" className="hover:text-sand-50 transition-colors">
                  Alpine & Mountain Retreats
                </Link>
              </li>
              <li>
                <Link href="/hotels?settingType=Forest%20%2F%20Countryside" className="hover:text-sand-50 transition-colors">
                  Forest & Nature Sanctuaries
                </Link>
              </li>
              <li>
                <Link href="/hotels?settingType=Coastal" className="hover:text-sand-50 transition-colors">
                  Ocean Horizon Stays
                </Link>
              </li>
              <li>
                <Link href="/hotels?settingType=Urban%20Sanctuary" className="hover:text-sand-50 transition-colors">
                  Acoustic Urban Havens
                </Link>
              </li>
              <li>
                <Link href="/hotels?adultsOnly=true" className="hover:text-sand-50 transition-colors">
                  Adults-Only Quiet Escapes
                </Link>
              </li>
            </ul>
          </div>

          {/* Editorial & Methodology */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-sand-400">Methodology</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/methodology" className="hover:text-sand-50 transition-colors">
                  The 4-Pillar Rest Score
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-sand-50 transition-colors">
                  Our Mission &amp; Story
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-sand-50 transition-colors">
                  Editorial &amp; Affiliate Disclosure
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sand-50 transition-colors">
                  Suggest a Quiet Hotel
                </Link>
              </li>
              <li>
                <Link href="/contact?type=correction" className="hover:text-sand-50 transition-colors">
                  Report Listing Correction
                </Link>
              </li>
            </ul>
          </div>

          {/* Sleep Guides */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-sand-400">Sleep Guides</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="hover:text-sand-50 transition-colors">
                  All Editorial Guides
                </Link>
              </li>
              <li>
                <Link href="/guides/soundproof-doors-and-airlocks" className="hover:text-sand-50 transition-colors">
                  Acoustic Isolation
                </Link>
              </li>
              <li>
                <Link href="/guides/natural-horsehair-wool-bedding" className="hover:text-sand-50 transition-colors">
                  Natural Fibre Bedding
                </Link>
              </li>
              <li>
                <Link href="/guides/anatomy-of-100-percent-blackout" className="hover:text-sand-50 transition-colors">
                  Zero-Light Blackout
                </Link>
              </li>
              <li>
                <Link href="/guides/hotel-room-selection-strategies" className="hover:text-sand-50 transition-colors">
                  Room Selection Strategy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-sand-400">Quiet Dispatch</h4>
            <p className="text-xs text-sand-300 leading-relaxed">
              Curated quiet retreats, mattress benchmarks, and acoustic hotel discoveries delivered monthly.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-sage-300 bg-forest-900/80 p-3 rounded-lg border border-forest-800">
                <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <span>Thank you. You have been added to the Quiet Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full bg-forest-900 border border-forest-800 rounded-lg px-3 py-2 text-xs text-sand-100 placeholder-sand-500 focus:outline-none focus:border-gold-500 transition-colors"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to Quiet Dispatch"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-forest-800 hover:bg-forest-700 text-sand-50 rounded text-xs flex items-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-sand-500">No spam. Only deep rest recommendations.</p>
              </form>
            )}
          </div>
        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="py-6 border-b border-forest-900 text-xs text-sand-400 leading-relaxed space-y-2">
          <p>
            <strong>Editorial Disclaimer:</strong> Rest Atlas is an independent architectural and hotel assessment platform. Assessments are based on physical room specifications, acoustic soundproofing attributes, bedding construction, and documented environmental controls. Rest Atlas does not offer medical advice, diagnose sleep disorders, or guarantee individual clinical outcomes.
          </p>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-sand-400 gap-4">
          <p>© {new Date().getFullYear()} Rest Atlas. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy" className="hover:text-sand-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-sand-200 transition-colors">Terms of Service</Link>
            <Link href="/editorial-policy" className="hover:text-sand-200 transition-colors">Editorial Policies</Link>
            <Link href="/contact" className="hover:text-sand-200 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
