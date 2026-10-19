import { ScoreBreakdown } from '@/types/score';

export interface ScoreWeight {
  key: keyof ScoreBreakdown;
  label: string;
  weight: number;
  percentage: number;
  description: string;
  subcriteria: string[];
}

export const SCORING_PILLARS: ScoreWeight[] = [
  {
    key: 'bedComfort',
    label: 'Bed and Linen Comfort',
    weight: 0.30,
    percentage: 30,
    description: 'Mattress support, premium natural fiber linens, ergonomic pillow menu, and motion isolation.',
    subcriteria: [
      'Mattress quality (natural latex, pocket spring, horsehair, organic wool)',
      'Linen quality (minimum 400TC Egyptian cotton or washed French linen)',
      'Pillow menu with at least 4 distinct densities and fills',
      'Bed frame acoustic stability and motion isolation',
    ],
  },
  {
    key: 'quietness',
    label: 'Quiet and Sound Environment',
    weight: 0.20,
    percentage: 20,
    description: 'Structural soundproofing, acoustic glazing, corridor buffer zones, and ambient decibel levels.',
    subcriteria: [
      'Acoustic wall insulation and solid acoustic core doors',
      'Double or triple-glazed windows rated for high traffic/ambient noise isolation',
      'Corridor noise isolation (airlock or vestibule entry doors)',
      'Internal plumbing and elevator sound isolation',
    ],
  },
  {
    key: 'lightingClimate',
    label: 'Lighting and Climate',
    weight: 0.20,
    percentage: 20,
    description: '100% blackout blinds, circadian lighting controls, whisper-quiet HVAC, and clean air filtration.',
    subcriteria: [
      'Zero-light leakage blackout curtains or motorised cassette blinds',
      'Circadian amber/warm bedside lighting without harsh blue wavelengths',
      'Silent HVAC system operating below 25 dB in sleep mode',
      'Individual guest room temperature precision and HEPA air purification',
    ],
  },
  {
    key: 'designWellness',
    label: 'Interior Design and Wellness',
    weight: 0.30,
    percentage: 30,
    description: 'Biophilic bedroom aesthetics, visual calm, natural materials, and restorative wellness facilities.',
    subcriteria: [
      'Calm neutral palette, clutter-free architecture, and organic textures',
      'Expansive nature, garden, forest, or peaceful courtyard vistas',
      'Regenerative wellness amenities (sauna, cold plunge, mineral onsen, flotation)',
      'Mindfulness amenities, acoustic gardens, and evening sleep tea rituals',
    ],
  },
];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validates individual category score values.
 * All must be numbers between 0 and 10.
 */
export function validateScores(breakdown: Partial<ScoreBreakdown>): ValidationResult {
  const errors: string[] = [];
  const requiredKeys: (keyof ScoreBreakdown)[] = ['bedComfort', 'quietness', 'lightingClimate', 'designWellness'];

  for (const key of requiredKeys) {
    const val = breakdown[key];
    if (val === undefined || val === null || isNaN(val)) {
      errors.push(`Score category '${key}' is required and cannot be omitted.`);
    } else if (typeof val !== 'number') {
      errors.push(`Score category '${key}' must be a numeric value.`);
    } else if (val < 0 || val > 10) {
      errors.push(`Score category '${key}' must be between 0.0 and 10.0 (received ${val}).`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Calculates the weighted Rest Score from the 4 assessment pillars.
 * Formula:
 * Rest Score = (Bed Comfort * 0.30) + (Quietness * 0.20) + (Lighting * 0.20) + (Design * 0.30)
 * Result is rounded to 1 decimal place.
 */
export function calculateRestScore(breakdown: ScoreBreakdown): number {
  const validation = validateScores(breakdown);
  if (!validation.valid) {
    throw new Error(`Cannot calculate Rest Score with invalid inputs: ${validation.errors.join(', ')}`);
  }

  const rawWeighted =
    breakdown.bedComfort * 0.30 +
    breakdown.quietness * 0.20 +
    breakdown.lightingClimate * 0.20 +
    breakdown.designWellness * 0.30;

  // Round to exactly one decimal place
  return Math.round(rawWeighted * 10) / 10;
}

/**
 * Returns an editorial qualitative descriptor for a given Rest Score.
 */
export function getScoreDescriptor(score: number): { title: string; color: string; badgeClass: string } {
  if (score >= 9.5) {
    return {
      title: 'Transcendent Sanctuary',
      color: '#1B382B',
      badgeClass: 'bg-forest-800 text-sand-50 border-forest-900',
    };
  }
  if (score >= 9.0) {
    return {
      title: 'Exceptional Sleep Quality',
      color: '#26543A',
      badgeClass: 'bg-forest-700 text-sand-50 border-forest-800',
    };
  }
  if (score >= 8.5) {
    return {
      title: 'Superior Rest & Comfort',
      color: '#4B8863',
      badgeClass: 'bg-forest-600 text-white border-forest-700',
    };
  }
  if (score >= 8.0) {
    return {
      title: 'High Rest Standard',
      color: '#7E9987',
      badgeClass: 'bg-sage-600 text-white border-sage-700',
    };
  }
  if (score >= 7.0) {
    return {
      title: 'Moderate Rest Standard',
      color: '#A99577',
      badgeClass: 'bg-sand-600 text-white border-sand-700',
    };
  }
  return {
    title: 'Basic Sleep Environment',
    color: '#8C7A60',
    badgeClass: 'bg-sand-500 text-charcoal-900 border-sand-600',
  };
}
