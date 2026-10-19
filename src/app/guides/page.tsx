import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { GUIDE_ARTICLES } from '@/data/guides-data';
import { Moon, Clock, ArrowRight, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sleep Travel Journalism & Bedroom Architecture Guides',
  description:
    'In-depth architectural guides on acoustic soundproofing, Hästens natural horsehair bedding, 100% zero-light blackout sealing, and hotel sleep strategies.',
};

export default function GuidesDirectoryPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-14">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-forest-100 text-forest-900 text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-forest-700" />
          <span>Rest Atlas Sleep Journalism</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
          Bedroom Architecture &amp; Sleep Science Guides
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
          Rigorous investigations into hotel decibel isolation, organic bedding thermodynamics, circadian illumination, and sleep-restorative travel design.
        </p>
      </div>

      {/* Featured Flagship Article */}
      {GUIDE_ARTICLES.length > 0 && (
        <section className="bg-forest-950 text-sand-50 rounded-3xl overflow-hidden shadow-soft-lg grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[460px] bg-forest-900">
            <Image
              src={GUIDE_ARTICLES[0].coverImage}
              alt={GUIDE_ARTICLES[0].title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-forest-950 via-forest-950/40 to-transparent" />
          </div>

          <div className="p-8 sm:p-12 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-xs">
                <span className="px-3 py-1 rounded-full bg-forest-800 text-gold-400 font-semibold uppercase tracking-wider text-[10px]">
                  Featured Investigation
                </span>
                <span className="text-sand-400 flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{GUIDE_ARTICLES[0].readTime}</span>
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-snug text-sand-50">
                <Link
                  href={`/guides/${GUIDE_ARTICLES[0].slug}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {GUIDE_ARTICLES[0].title}
                </Link>
              </h2>

              <p className="text-xs sm:text-sm text-sand-300 leading-relaxed">
                {GUIDE_ARTICLES[0].excerpt}
              </p>
            </div>

            <div className="pt-4 border-t border-forest-900 flex items-center justify-between">
              <div className="text-xs">
                <span className="font-semibold text-sand-100 block">
                  {GUIDE_ARTICLES[0].author.name}
                </span>
                <span className="text-sand-400 text-[11px]">
                  {GUIDE_ARTICLES[0].author.role}
                </span>
              </div>

              <Link
                href={`/guides/${GUIDE_ARTICLES[0].slug}`}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-sand-50 hover:bg-white text-forest-950 font-bold rounded-xl text-xs transition-colors shadow-soft"
              >
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Grid of Remaining Articles */}
      <section className="space-y-6">
        <div className="border-b border-sand-200 pb-3">
          <h2 className="font-serif text-2xl font-bold text-forest-950">
            All Editorial Investigations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GUIDE_ARTICLES.slice(1).map((article) => (
            <article
              key={article.slug}
              className="bg-white rounded-3xl border border-sand-200/90 shadow-soft hover:shadow-soft-md transition-all duration-300 overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <Link
                  href={`/guides/${article.slug}`}
                  className="relative block aspect-[16/10] bg-sand-200 overflow-hidden"
                >
                  <Image
                    src={article.coverImage}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-forest-900/80 backdrop-blur-md text-sand-50">
                      {article.category}
                    </span>
                  </div>
                </Link>

                <div className="p-6 space-y-3">
                  <div className="flex items-center space-x-2 text-xs text-charcoal-400">
                    <Clock className="w-3.5 h-3.5 text-forest-700" />
                    <span>{article.readTime}</span>
                    <span>•</span>
                    <span>{article.publishedAt}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-forest-950 leading-snug group-hover:text-forest-700 transition-colors">
                    <Link href={`/guides/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-charcoal-600 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-sand-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-forest-900 block text-[11px]">
                    {article.author.name}
                  </span>
                  <span className="text-[10px] text-charcoal-400 block truncate max-w-[180px]">
                    {article.author.role}
                  </span>
                </div>

                <Link
                  href={`/guides/${article.slug}`}
                  className="p-2 rounded-lg bg-sand-100 hover:bg-forest-100 text-forest-800 transition-colors"
                  aria-label={`Read ${article.title}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Methodology Cross-Promotion Banner */}
      <section className="bg-sand-100 rounded-3xl p-8 sm:p-10 border border-sand-200/90 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-forest-800">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Rigorous Assessment Protocols</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-forest-950">
            Curious How We Score Hotels in Person?
          </h3>
          <p className="text-xs text-charcoal-600 leading-relaxed">
            Review the mathematical 4-pillar formula, midnight decibel thresholds, and on-site testing protocols used by certified sleep assessors.
          </p>
        </div>

        <Link
          href="/methodology"
          className="flex-shrink-0 px-5 py-3 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl text-xs font-semibold transition-colors shadow-soft"
        >
          Explore Scoring Methodology
        </Link>
      </section>
    </div>
  );
}
