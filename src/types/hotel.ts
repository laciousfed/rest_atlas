import { ScoreBreakdown, ConfidenceLevel } from './score';

export type HotelCategory =
  | 'Boutique Hotel'
  | 'Luxury Hotel'
  | 'Wellness Resort'
  | 'Nature Retreat'
  | 'Historic Estate'
  | 'Design Hotel'
  | 'Ryokan / Sanctuary';

export type ListingStatus = 'published' | 'draft' | 'archived';

export interface RoomProfile {
  id: string;
  name: string;
  description: string;
  bedType: string;
  isSoundproofed: boolean;
  quietLevel: 'Ultra Quiet (Courtyard/Forest)' | 'Quiet' | 'Moderate';
  hasBlackoutCurtains: boolean;
  airPurifier: boolean;
}

export interface Hotel {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  editorialDescription: string;
  officialWebsite: string;
  contactInformation?: {
    email?: string;
    phone?: string;
  };
  
  // Geography
  address: string;
  neighbourhood?: string;
  city: string;
  stateOrProvince?: string;
  region?: string;
  country: string;
  countryCode: string;
  continent: 'Europe' | 'Asia' | 'North America' | 'South America' | 'Africa' | 'Oceania';
  latitude: number;
  longitude: number;
  settingType: 'Mountain' | 'Forest / Countryside' | 'Coastal' | 'Urban Sanctuary' | 'Desert Retreat';

  // Classification
  hotelCategory: HotelCategory;
  starClassification?: 3 | 4 | 5;
  adultsOnly?: boolean;
  verifiedListing: boolean;

  // Media
  coverImage: string;
  imageGallery: string[];

  // Sleep & Comfort Features
  amenities: string[];
  sleepFriendlyFeatures: string[];
  roomProfiles?: RoomProfile[];
  tags: string[];

  // Scoring
  restScore: number;
  scoringStatus: 'draft' | 'published' | 'under_review';
  scoreBreakdown: ScoreBreakdown;
  assessmentDate: string;
  assessmentNotes: string;
  assessmentConfidence: ConfidenceLevel;

  // Third-party integrations
  guestRating?: number;
  guestReviewCount?: number;
  googlePlaceId?: string;
  googleProfileUrl?: string;
  youtubeVideoId?: string;
  youtubeVideoUrl?: string;

  // Admin & Publishing
  listingStatus: ListingStatus;
  featuredStatus: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
  updatedBy?: string;
}

export interface HotelFilterOptions {
  query?: string;
  continent?: string;
  country?: string;
  stateOrProvince?: string;
  city?: string;
  neighbourhood?: string;
  settingType?: string;
  category?: string;
  minRestScore?: number;
  minBedComfort?: number;
  minQuietness?: number;
  minLightingClimate?: number;
  minDesignWellness?: number;
  minGuestRating?: number;
  blackoutCurtains?: boolean;
  soundproofing?: boolean;
  quietRoomOption?: boolean;
  pillowSelection?: boolean;
  airConditioning?: boolean;
  natureViews?: boolean;
  spaWellness?: boolean;
  adultsOnly?: boolean;
  featuredOnly?: boolean;
  verifiedOnly?: boolean;
  sortBy?: 'restScore' | 'guestRating' | 'bedComfort' | 'quietness' | 'recentlyAdded' | 'name';
  page?: number;
  limit?: number;
}
