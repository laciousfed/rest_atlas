import { Hotel, HotelFilterOptions } from '@/types/hotel';
import { ScoreAssessment, ScoreAuditLog } from '@/types/score';
import { calculateRestScore } from '@/lib/scoring';
import { SEED_HOTELS } from '@/data/seed-hotels';
import { getAdminFirestore, isAdminConfigured } from '@/lib/firebase/admin';

// In-memory working copy initialized with realistic verified seed dataset
let inMemoryHotels: Hotel[] = [...SEED_HOTELS];
let inMemoryAuditLogs: ScoreAuditLog[] = [
  {
    id: 'audit-seed-1',
    hotelId: 'chedi-andermatt-switzerland',
    hotelName: 'The Chedi Andermatt',
    assessorId: 'assessor-dr-elena-vane',
    assessorName: 'Dr. Elena Vane (Lead Sleep Acoustician)',
    newScores: {
      bedComfort: 9.8,
      quietness: 9.6,
      lightingClimate: 9.5,
      designWellness: 9.9,
    },
    newWeightedScore: 9.7,
    reasonOrNotes: 'On-site sonic decibel logging and Hästens Vividus bed inspection.',
    timestamp: '2026-03-12T14:30:00Z',
  },
  {
    id: 'audit-seed-2',
    hotelId: 'aman-tokyo-japan',
    hotelName: 'Aman Tokyo',
    assessorId: 'assessor-kenji-sato',
    assessorName: 'Kenji Sato (Architectural Reviewer)',
    newScores: {
      bedComfort: 9.5,
      quietness: 9.4,
      lightingClimate: 9.6,
      designWellness: 9.8,
    },
    newWeightedScore: 9.6,
    reasonOrNotes: 'Measured 100% blackout with dual washi motorized blinds and hospital-grade air ionisation.',
    timestamp: '2026-02-18T09:15:00Z',
  },
];

export async function getHotels(filters: HotelFilterOptions = {}): Promise<{
  hotels: Hotel[];
  total: number;
  page: number;
  totalPages: number;
}> {
  // If real Firestore is configured on the server, we can query it
  if (isAdminConfigured()) {
    const firestore = await getAdminFirestore();
    if (firestore) {
      try {
        let query = firestore.collection('hotels').where('listingStatus', '==', 'published');
        if (filters.continent) {
          query = query.where('continent', '==', filters.continent);
        }
        if (filters.country) {
          query = query.where('country', '==', filters.country);
        }
        const snapshot = await query.get();
        if (!snapshot.empty) {
          const liveHotels = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() } as Hotel));
          return filterAndPaginate(liveHotels, filters);
        }
      } catch (err) {
        console.warn('[Hotel Repository] Firestore query fallback to repository dataset:', err);
      }
    }
  }

  // Repository-level robust memory engine with full filter support
  return filterAndPaginate(inMemoryHotels, filters);
}

function filterAndPaginate(
  dataset: Hotel[],
  filters: HotelFilterOptions
): { hotels: Hotel[]; total: number; page: number; totalPages: number } {
  let list = [...dataset];

  // Default: only published hotels unless specifically looking at all or draft
  list = list.filter((h) => h.listingStatus === 'published');

  // Text query search
  if (filters.query && filters.query.trim() !== '') {
    const q = filters.query.toLowerCase().trim();
    list = list.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.city.toLowerCase().includes(q) ||
        h.country.toLowerCase().includes(q) ||
        (h.stateOrProvince && h.stateOrProvince.toLowerCase().includes(q)) ||
        (h.neighbourhood && h.neighbourhood.toLowerCase().includes(q)) ||
        h.tags.some((t) => t.toLowerCase().includes(q)) ||
        h.tagline.toLowerCase().includes(q)
    );
  }

  // Geographic filters
  if (filters.continent) {
    list = list.filter((h) => h.continent.toLowerCase() === filters.continent?.toLowerCase());
  }
  if (filters.country) {
    list = list.filter((h) => h.country.toLowerCase() === filters.country?.toLowerCase());
  }
  if (filters.stateOrProvince) {
    list = list.filter((h) => h.stateOrProvince?.toLowerCase() === filters.stateOrProvince?.toLowerCase());
  }
  if (filters.city) {
    list = list.filter((h) => h.city.toLowerCase() === filters.city?.toLowerCase());
  }
  if (filters.neighbourhood) {
    list = list.filter((h) => h.neighbourhood?.toLowerCase() === filters.neighbourhood?.toLowerCase());
  }

  // Setting type & category
  if (filters.settingType) {
    list = list.filter((h) => h.settingType === filters.settingType);
  }
  if (filters.category) {
    list = list.filter((h) => h.hotelCategory === filters.category);
  }

  // Rest & sleep scores
  if (filters.minRestScore !== undefined && filters.minRestScore > 0) {
    list = list.filter((h) => h.restScore >= filters.minRestScore!);
  }
  if (filters.minBedComfort !== undefined && filters.minBedComfort > 0) {
    list = list.filter((h) => h.scoreBreakdown.bedComfort >= filters.minBedComfort!);
  }
  if (filters.minQuietness !== undefined && filters.minQuietness > 0) {
    list = list.filter((h) => h.scoreBreakdown.quietness >= filters.minQuietness!);
  }
  if (filters.minLightingClimate !== undefined && filters.minLightingClimate > 0) {
    list = list.filter((h) => h.scoreBreakdown.lightingClimate >= filters.minLightingClimate!);
  }
  if (filters.minDesignWellness !== undefined && filters.minDesignWellness > 0) {
    list = list.filter((h) => h.scoreBreakdown.designWellness >= filters.minDesignWellness!);
  }
  if (filters.minGuestRating !== undefined && filters.minGuestRating > 0) {
    list = list.filter((h) => (h.guestRating || 0) >= filters.minGuestRating!);
  }

  // Sleep feature flags
  if (filters.blackoutCurtains) {
    list = list.filter(
      (h) =>
        h.sleepFriendlyFeatures.some((f) => f.toLowerCase().includes('blackout')) ||
        h.roomProfiles?.some((r) => r.hasBlackoutCurtains)
    );
  }
  if (filters.soundproofing) {
    list = list.filter(
      (h) =>
        h.sleepFriendlyFeatures.some((f) => f.toLowerCase().includes('acoustic') || f.toLowerCase().includes('sound')) ||
        h.roomProfiles?.some((r) => r.isSoundproofed)
    );
  }
  if (filters.pillowSelection) {
    list = list.filter((h) =>
      h.sleepFriendlyFeatures.some((f) => f.toLowerCase().includes('pillow'))
    );
  }
  if (filters.airConditioning) {
    list = list.filter((h) =>
      h.sleepFriendlyFeatures.some(
        (f) => f.toLowerCase().includes('hvac') || f.toLowerCase().includes('air') || f.toLowerCase().includes('climate')
      )
    );
  }
  if (filters.quietRoomOption) {
    list = list.filter((h) =>
      h.roomProfiles?.some((r) => r.quietLevel.includes('Ultra Quiet'))
    );
  }
  if (filters.adultsOnly) {
    list = list.filter((h) => h.adultsOnly === true);
  }
  if (filters.spaWellness) {
    list = list.filter(
      (h) =>
        h.amenities.some((a) => a.toLowerCase().includes('spa') || a.toLowerCase().includes('pool')) ||
        h.hotelCategory === 'Wellness Resort'
    );
  }
  if (filters.featuredOnly) {
    list = list.filter((h) => h.featuredStatus === true);
  }
  if (filters.verifiedOnly) {
    list = list.filter((h) => h.verifiedListing === true);
  }

  // Sorting
  switch (filters.sortBy) {
    case 'guestRating':
      list.sort((a, b) => (b.guestRating || 0) - (a.guestRating || 0));
      break;
    case 'bedComfort':
      list.sort((a, b) => b.scoreBreakdown.bedComfort - a.scoreBreakdown.bedComfort);
      break;
    case 'quietness':
      list.sort((a, b) => b.scoreBreakdown.quietness - a.scoreBreakdown.quietness);
      break;
    case 'recentlyAdded':
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      break;
    case 'name':
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'restScore':
    default:
      list.sort((a, b) => b.restScore - a.restScore);
      break;
  }

  const total = list.length;
  const page = Math.max(1, filters.page || 1);
  const limit = Math.max(1, filters.limit || 9);
  const totalPages = Math.ceil(total / limit) || 1;
  const startIndex = (page - 1) * limit;
  const paginated = list.slice(startIndex, startIndex + limit);

  return {
    hotels: paginated,
    total,
    page,
    totalPages,
  };
}

export async function getHotelBySlug(slug: string): Promise<Hotel | null> {
  const found = inMemoryHotels.find((h) => h.slug === slug || h.id === slug);
  return found || null;
}

export async function getHotelById(id: string): Promise<Hotel | null> {
  const found = inMemoryHotels.find((h) => h.id === id);
  return found || null;
}

export async function getFeaturedHotels(limit = 3): Promise<Hotel[]> {
  const featured = inMemoryHotels.filter((h) => h.featuredStatus && h.listingStatus === 'published');
  return featured.slice(0, limit);
}

export async function getRelatedHotels(currentHotel: Hotel, limit = 3): Promise<Hotel[]> {
  return inMemoryHotels
    .filter(
      (h) =>
        h.id !== currentHotel.id &&
        h.listingStatus === 'published' &&
        (h.continent === currentHotel.continent || h.settingType === currentHotel.settingType)
    )
    .slice(0, limit);
}

export async function getLocations(): Promise<{
  continents: string[];
  countries: { name: string; code: string; continent: string }[];
  cities: { name: string; country: string }[];
}> {
  const continents = Array.from(new Set(inMemoryHotels.map((h) => h.continent))).sort();
  const countryMap = new Map<string, { name: string; code: string; continent: string }>();
  const cityMap = new Map<string, { name: string; country: string }>();

  for (const hotel of inMemoryHotels) {
    if (!countryMap.has(hotel.country)) {
      countryMap.set(hotel.country, {
        name: hotel.country,
        code: hotel.countryCode,
        continent: hotel.continent,
      });
    }
    const cityKey = `${hotel.city}-${hotel.country}`;
    if (!cityMap.has(cityKey)) {
      cityMap.set(cityKey, {
        name: hotel.city,
        country: hotel.country,
      });
    }
  }

  return {
    continents,
    countries: Array.from(countryMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
    cities: Array.from(cityMap.values()).sort((a, b) => a.name.localeCompare(b.name)),
  };
}

// -----------------------------------------------------------------------------
// Admin & Mutation Operations
// -----------------------------------------------------------------------------

export async function getAllAdminHotels(): Promise<Hotel[]> {
  return [...inMemoryHotels].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

export async function createHotel(
  hotelData: Omit<Hotel, 'id' | 'createdAt' | 'updatedAt'>,
  authorId: string
): Promise<Hotel> {
  const id = hotelData.slug || `hotel-${Date.now()}`;
  const now = new Date().toISOString();

  const newHotel: Hotel = {
    ...hotelData,
    id,
    restScore: calculateRestScore(hotelData.scoreBreakdown),
    createdAt: now,
    updatedAt: now,
    createdBy: authorId,
    updatedBy: authorId,
  };

  inMemoryHotels.unshift(newHotel);

  // If Firestore is available, mirror there
  if (isAdminConfigured()) {
    const firestore = await getAdminFirestore();
    if (firestore) {
      await firestore.collection('hotels').doc(id).set(newHotel);
    }
  }

  return newHotel;
}

export async function updateHotel(
  id: string,
  updates: Partial<Hotel>,
  updaterId: string
): Promise<Hotel | null> {
  const index = inMemoryHotels.findIndex((h) => h.id === id);
  if (index === -1) {
    return null;
  }

  const existing = inMemoryHotels[index]!;
  const now = new Date().toISOString();

  // If scores were updated, recalculate weighted rest score
  let restScore = existing.restScore;
  if (updates.scoreBreakdown) {
    restScore = calculateRestScore(updates.scoreBreakdown);
  }

  const updated: Hotel = {
    ...existing,
    ...updates,
    restScore,
    updatedAt: now,
    updatedBy: updaterId,
  };

  inMemoryHotels[index] = updated;

  // Mirror to Firestore
  if (isAdminConfigured()) {
    const firestore = await getAdminFirestore();
    if (firestore) {
      await firestore.collection('hotels').doc(id).set(updated, { merge: true });
    }
  }

  return updated;
}

export async function updateHotelScore(
  id: string,
  assessment: ScoreAssessment,
  assessorId: string
): Promise<Hotel | null> {
  const hotel = await getHotelById(id);
  if (!hotel) return null;

  const previousScores = { ...hotel.scoreBreakdown };
  const previousWeighted = hotel.restScore;

  const newBreakdown = {
    bedComfort: assessment.bedComfortScore,
    quietness: assessment.quietnessScore,
    lightingClimate: assessment.lightingClimateScore,
    designWellness: assessment.designWellnessScore,
  };

  const calculatedWeighted = calculateRestScore(newBreakdown);

  // Update hotel
  const updatedHotel = await updateHotel(
    id,
    {
      scoreBreakdown: newBreakdown,
      restScore: calculatedWeighted,
      assessmentDate: assessment.assessmentDate,
      assessmentNotes: assessment.evidenceNotes,
      assessmentConfidence: assessment.confidenceLevel,
      scoringStatus: assessment.status === 'published' ? 'published' : 'draft',
    },
    assessorId
  );

  // Append to audit log
  const auditEntry: ScoreAuditLog = {
    id: `audit-${Date.now()}`,
    hotelId: id,
    hotelName: hotel.name,
    assessorId,
    assessorName: assessment.assessorName || 'Lead Sleep Assessor',
    previousScores,
    newScores: newBreakdown,
    previousWeightedScore: previousWeighted,
    newWeightedScore: calculatedWeighted,
    reasonOrNotes: assessment.evidenceNotes,
    timestamp: new Date().toISOString(),
  };

  inMemoryAuditLogs.unshift(auditEntry);

  // Mirror audit log to Firestore if available
  if (isAdminConfigured()) {
    const firestore = await getAdminFirestore();
    if (firestore) {
      await firestore.collection('auditLogs').add(auditEntry);
    }
  }

  return updatedHotel;
}

export async function getAdminStats() {
  const total = inMemoryHotels.length;
  const published = inMemoryHotels.filter((h) => h.listingStatus === 'published').length;
  const draft = inMemoryHotels.filter((h) => h.listingStatus === 'draft').length;
  const underReview = inMemoryHotels.filter((h) => h.scoringStatus === 'under_review' || h.scoringStatus === 'draft').length;
  const videoCoverage = inMemoryHotels.filter((h) => Boolean(h.youtubeVideoId)).length;
  const sumScores = inMemoryHotels.reduce((acc, h) => acc + h.restScore, 0);
  const avgRestScore = total > 0 ? Math.round((sumScores / total) * 10) / 10 : 0;

  return {
    total,
    published,
    draft,
    underReview,
    videoCoverage,
    avgRestScore,
  };
}

export async function getAuditLogs(): Promise<ScoreAuditLog[]> {
  return [...inMemoryAuditLogs];
}
