export interface ScoreBreakdown {
  bedComfort: number; // 30% weight: Mattress, pillow options, linens, comfort acoustics
  quietness: number; // 20% weight: Soundproofing, traffic/corridor noise, decibel control
  lightingClimate: number; // 20% weight: 100% blackout blinds, circadian lighting, HVAC sound & airflow
  designWellness: number; // 30% weight: Visual serenity, natural materials, biophilia, spa & hydrotherapy
}

export type ConfidenceLevel = 'High (On-Site Verified)' | 'Medium (Documented Specifications)' | 'Editorial Estimate';

export interface ScoreAssessment {
  id?: string;
  hotelId: string;
  bedComfortScore: number;
  quietnessScore: number;
  lightingClimateScore: number;
  designWellnessScore: number;
  weightedRestScore: number;
  confidenceLevel: ConfidenceLevel;
  evidenceNotes: string;
  assessmentDate: string;
  assessorId: string;
  assessorName: string;
  status: 'draft' | 'published';
  previousScoreReference?: string;
  createdAt: string;
}

export interface ScoreAuditLog {
  id: string;
  hotelId: string;
  hotelName: string;
  assessorId: string;
  assessorName: string;
  previousScores?: ScoreBreakdown;
  newScores: ScoreBreakdown;
  previousWeightedScore?: number;
  newWeightedScore: number;
  reasonOrNotes: string;
  timestamp: string;
}
