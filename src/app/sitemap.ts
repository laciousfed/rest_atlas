import { MetadataRoute } from 'next';
import { getHotels } from '@/lib/db/hotel-repository';
import { GUIDE_ARTICLES } from '@/data/guides-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://restatlas.com';
  const { hotels } = await getHotels({ limit: 100 });

  const hotelUrls: MetadataRoute.Sitemap = hotels.map((hotel) => ({
    url: `${siteUrl}/hotels/${hotel.slug}`,
    lastModified: new Date(hotel.updatedAt),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/hotels`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/methodology`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/editorial-policy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${siteUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  const guideUrls: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...GUIDE_ARTICLES.map((guide) => ({
      url: `${siteUrl}/guides/${guide.slug}`,
      lastModified: new Date(guide.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];

  return [...staticUrls, ...hotelUrls, ...guideUrls];
}
