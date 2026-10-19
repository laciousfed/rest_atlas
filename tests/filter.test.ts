import { describe, it, expect } from 'vitest';
import { getHotels, getHotelBySlug } from '../src/lib/db/hotel-repository';

describe('Hotel Repository Search & Filter Engine', () => {
  it('returns published hotels by default', async () => {
    const result = await getHotels();
    expect(result.hotels.length).toBeGreaterThan(0);
    for (const h of result.hotels) {
      expect(h.listingStatus).toBe('published');
    }
  });

  it('filters hotels by continent', async () => {
    const europeHotels = await getHotels({ continent: 'Europe' });
    expect(europeHotels.hotels.length).toBeGreaterThan(0);
    for (const h of europeHotels.hotels) {
      expect(h.continent).toBe('Europe');
    }
  });

  it('filters hotels by minimum Rest Score', async () => {
    const highScored = await getHotels({ minRestScore: 9.6 });
    expect(highScored.hotels.length).toBeGreaterThan(0);
    for (const h of highScored.hotels) {
      expect(h.restScore).toBeGreaterThanOrEqual(9.6);
    }
  });

  it('filters hotels by sleep features (e.g. blackout blinds)', async () => {
    const blackoutOnly = await getHotels({ blackoutCurtains: true });
    expect(blackoutOnly.hotels.length).toBeGreaterThan(0);
    for (const h of blackoutOnly.hotels) {
      const hasBlackout =
        h.sleepFriendlyFeatures.some((f) => f.toLowerCase().includes('blackout')) ||
        h.roomProfiles?.some((r) => r.hasBlackoutCurtains);
      expect(hasBlackout).toBe(true);
    }
  });

  it('filters hotels by soundproofing and adults-only attributes', async () => {
    const adultsOnlyHotels = await getHotels({ adultsOnly: true });
    expect(adultsOnlyHotels.hotels.length).toBeGreaterThan(0);
    for (const h of adultsOnlyHotels.hotels) {
      expect(h.adultsOnly).toBe(true);
    }
  });

  it('retrieves an individual hotel by slug', async () => {
    const hotel = await getHotelBySlug('the-chedi-andermatt-switzerland');
    expect(hotel).not.toBeNull();
    expect(hotel?.name).toBe('The Chedi Andermatt');
    expect(hotel?.restScore).toBe(9.7);
    expect(hotel?.scoreBreakdown.bedComfort).toBe(9.8);
  });
});
