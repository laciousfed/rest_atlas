import { Hotel } from '@/types/hotel';

export function generateHotelJsonLd(hotel: Hotel, siteUrl: string) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    '@id': `${siteUrl}/hotels/${hotel.slug}`,
    name: hotel.name,
    description: hotel.description,
    url: `${siteUrl}/hotels/${hotel.slug}`,
    image: [hotel.coverImage, ...hotel.imageGallery],
    address: {
      '@type': 'PostalAddress',
      streetAddress: hotel.address,
      addressLocality: hotel.city,
      addressRegion: hotel.stateOrProvince || hotel.region,
      addressCountry: hotel.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: hotel.latitude,
      longitude: hotel.longitude,
    },
    amenityFeature: [
      ...hotel.amenities.map((a) => ({
        '@type': 'LocationFeatureSpecification',
        name: a,
        value: true,
      })),
      ...hotel.sleepFriendlyFeatures.map((s) => ({
        '@type': 'LocationFeatureSpecification',
        name: s,
        value: true,
      })),
    ],
  };

  // Only include aggregateRating if real guest reviews exist
  if (hotel.guestRating && hotel.guestReviewCount) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: hotel.guestRating,
      bestRating: 5,
      worstRating: 1,
      ratingCount: hotel.guestReviewCount,
    };
  }

  // Official hotel website if available
  if (hotel.officialWebsite) {
    schema.sameAs = [hotel.officialWebsite];
  }

  return schema;
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
