import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getGuideBySlug, GUIDE_ARTICLES } from '@/data/guides-data';
import { getHotelBySlug } from '@/lib/db/hotel-repository';
import HotelCard from '@/components/hotels/HotelCard';
import {
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Building2,
  ChevronRight,
} from 'lucide-react';

interface GuidePageProps {
  params: { slug: string };
}

export const runtime = 'edge';
export const dynamicParams = false;

export async function generateStaticParams() {
  return GUIDE_ARTICLES.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    return { title: 'Guide Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://restatlas.com';

  return {
    title: `${guide.title} — Rest Atlas Sleep Architecture Guide`,
    description: guide.excerpt,
    openGraph: {
      title: guide.title,
      description: guide.excerpt,
      images: [{ url: guide.coverImage, alt: guide.title }],
      url: `${siteUrl}/guides/${guide.slug}`,
      type: 'article',
      publishedTime: guide.publishedAt,
      authors: [guide.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.excerpt,
      images: [guide.coverImage],
    },
  };
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug);
  if (!guide) {
    notFound();
  }

  // Load related hotels mentioned in the guide
  const relatedHotels = (
    await Promise.all(guide.relatedHotelSlugs.map((slug) => getHotelBySlug(slug)))
  ).filter((h): h is NonNullable<typeof h> => Boolean(h));

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://restatlas.com';

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.excerpt,
    image: [guide.coverImage],
    datePublished: guide.publishedAt,
    author: {
      '@type': 'Person',
      name: guide.author.name,
      jobTitle: guide.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Rest Atlas',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/guides/${guide.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <article className="pb-20 space-y-12">
        {/* Breadcrumb Header */}
        <div className="bg-sand-100 border-b border-sand-200 py-3">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-charcoal-500">
            <nav aria-label="Breadcrumb" className="flex items-center space-x-2 truncate">
              <Link href="/" className="hover:text-forest-800 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-forest-800 transition-colors">Guides</Link>
              <span>/</span>
              <span className="text-forest-950 font-semibold truncate">{guide.title}</span>
            </nav>
            <Link
              href="/guides"
              className="inline-flex items-center space-x-1 text-forest-800 hover:underline flex-shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All Guides</span>
            </Link>
          </div>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 rounded-full bg-forest-800 text-sand-50 font-semibold uppercase tracking-wider text-[10px]">
              {guide.category}
            </span>
            <span className="text-charcoal-500 flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-forest-700" />
              <span>{guide.readTime}</span>
            </span>
            <span className="text-charcoal-300">•</span>
            <span className="text-charcoal-500">Published {guide.publishedAt}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-charcoal-600 font-light leading-relaxed">
            {guide.subtitle}
          </p>

          {/* Author Card */}
          <div className="pt-4 border-t border-sand-200 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 rounded-full bg-forest-800 text-gold-400 font-serif font-bold text-base flex items-center justify-center">
                {guide.author.name.charAt(0)}
              </div>
              <div className="text-xs">
                <span className="font-bold text-forest-950 block">{guide.author.name}</span>
                <span className="text-charcoal-500 text-[11px] block">{guide.author.role}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs text-charcoal-400">
              <ShieldCheck className="w-4 h-4 text-forest-700" />
              <span>Rest Atlas Certified Research</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-soft-lg bg-sand-200">
            <Image
              src={guide.coverImage}
              alt={guide.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Article Body */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Key Takeaways Box */}
          <div className="bg-forest-50 border border-forest-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center space-x-2 text-forest-900 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-gold-600" />
              <span>Key Takeaways &amp; Architectural Rules</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-forest-950">
              {guide.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-forest-700 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Content Sections */}
          <div className="space-y-10 text-charcoal-800 leading-relaxed text-sm sm:text-base">
            {guide.contentSections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950 pt-2">
                  {section.heading}
                </h2>

                <div className="space-y-4 text-charcoal-700 font-normal">
                  {section.body.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {section.callout && (
                  <div
                    className={`p-5 rounded-2xl border text-xs sm:text-sm leading-relaxed my-4 flex items-start space-x-3 ${
                      section.callout.type === 'benchmark'
                        ? 'bg-forest-900 text-sand-50 border-forest-800'
                        : section.callout.type === 'warning'
                        ? 'bg-amber-50 text-amber-950 border-amber-200'
                        : 'bg-sand-100 text-charcoal-800 border-sand-200'
                    }`}
                  >
                    {section.callout.type === 'benchmark' && (
                      <ShieldCheck className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5" />
                    )}
                    {section.callout.type === 'warning' && (
                      <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                    {section.callout.type === 'tip' && (
                      <Lightbulb className="w-5 h-5 text-forest-700 flex-shrink-0 mt-0.5" />
                    )}
                    <div>{section.callout.text}</div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Exemplary Stays Mentioned in this Guide */}
          {relatedHotels.length > 0 && (
            <div className="pt-10 border-t border-sand-200 space-y-6">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-forest-800">
                <Building2 className="w-4 h-4 text-forest-700" />
                <span>Exemplary Sanctuaries In Rest Atlas</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-forest-950">
                Hotels Implementing These Standards
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            </div>
          )}

          {/* Footer Navigation */}
          <div className="pt-8 border-t border-sand-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <Link
              href="/guides"
              className="inline-flex items-center space-x-2 text-forest-800 font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all sleep journalism guides</span>
            </Link>

            <Link
              href="/hotels"
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-forest-800 hover:bg-forest-900 text-sand-50 rounded-xl font-semibold transition-colors shadow-soft"
            >
              <span>Explore All Verified Hotels</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
