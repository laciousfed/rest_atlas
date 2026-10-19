import { describe, it, expect } from 'vitest';
import { GUIDE_ARTICLES, getGuideBySlug } from '../src/data/guides-data';
import { getHotelBySlug } from '../src/lib/db/hotel-repository';

describe('Editorial Guides & Sleep Journalism Data', () => {
  it('contains at least 4 in-depth guides with complete metadata', () => {
    expect(GUIDE_ARTICLES.length).toBeGreaterThanOrEqual(4);

    for (const guide of GUIDE_ARTICLES) {
      expect(guide.slug).toBeTruthy();
      expect(guide.title).toBeTruthy();
      expect(guide.subtitle).toBeTruthy();
      expect(guide.excerpt).toBeTruthy();
      expect(guide.author.name).toBeTruthy();
      expect(guide.readTime).toBeTruthy();
      expect(guide.coverImage).toBeTruthy();
      expect(guide.keyTakeaways.length).toBeGreaterThan(0);
      expect(guide.contentSections.length).toBeGreaterThan(0);
      expect(guide.relatedHotelSlugs.length).toBeGreaterThan(0);
    }
  });

  it('retrieves an individual guide by slug correctly', () => {
    const slug = 'soundproof-doors-and-airlocks';
    const guide = getGuideBySlug(slug);
    expect(guide).toBeDefined();
    expect(guide?.slug).toBe(slug);
    expect(guide?.category).toBe('Acoustic Engineering');
    expect(guide?.author.name).toContain('Elena Vane');
  });

  it('returns undefined for nonexistent guide slug', () => {
    expect(getGuideBySlug('nonexistent-sleep-guide')).toBeUndefined();
  });

  it('verifies all related hotels exist in the repository', async () => {
    for (const guide of GUIDE_ARTICLES) {
      for (const hotelSlug of guide.relatedHotelSlugs) {
        const hotel = await getHotelBySlug(hotelSlug);
        expect(hotel, `Hotel slug "${hotelSlug}" referenced in guide "${guide.slug}" should exist`).toBeDefined();
        expect(hotel?.slug).toBe(hotelSlug);
      }
    }
  });
});
