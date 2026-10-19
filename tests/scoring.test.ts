import { describe, it, expect } from 'vitest';
import { calculateRestScore, validateScores, getScoreDescriptor } from '../src/lib/scoring';
import { ScoreBreakdown } from '../src/types/score';

describe('Rest Atlas Scoring Engine', () => {
  it('correctly calculates the 4-pillar weighted Rest Score', () => {
    // Example from user specification:
    // Bed comfort: 9.0 (30% -> 2.7)
    // Quietness: 8.5 (20% -> 1.7)
    // Lighting & Climate: 9.0 (20% -> 1.8)
    // Design & Wellness: 9.5 (30% -> 2.85)
    // Weighted result: 2.7 + 1.7 + 1.8 + 2.85 = 9.05 -> rounded to 9.1 (or 9.0 depending on exact float)
    const breakdown: ScoreBreakdown = {
      bedComfort: 9.0,
      quietness: 8.5,
      lightingClimate: 9.0,
      designWellness: 9.5,
    };

    const score = calculateRestScore(breakdown);
    expect(score).toBe(9.1);
  });

  it('calculates perfect 10.0 for flawless scores', () => {
    const perfect: ScoreBreakdown = {
      bedComfort: 10.0,
      quietness: 10.0,
      lightingClimate: 10.0,
      designWellness: 10.0,
    };
    expect(calculateRestScore(perfect)).toBe(10.0);
  });

  it('calculates minimum 0.0 for zero scores', () => {
    const zero: ScoreBreakdown = {
      bedComfort: 0.0,
      quietness: 0.0,
      lightingClimate: 0.0,
      designWellness: 0.0,
    };
    expect(calculateRestScore(zero)).toBe(0.0);
  });

  it('rejects out of bounds score values', () => {
    const invalidHigh = {
      bedComfort: 11.0,
      quietness: 8.0,
      lightingClimate: 8.0,
      designWellness: 8.0,
    };
    const validation = validateScores(invalidHigh as unknown as ScoreBreakdown);
    expect(validation.valid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
    expect(() => calculateRestScore(invalidHigh as unknown as ScoreBreakdown)).toThrow();
  });

  it('rejects negative scores', () => {
    const negative = {
      bedComfort: -1.0,
      quietness: 8.0,
      lightingClimate: 8.0,
      designWellness: 8.0,
    };
    const validation = validateScores(negative as unknown as ScoreBreakdown);
    expect(validation.valid).toBe(false);
  });

  it('rejects missing or omitted score categories without treating them as zero', () => {
    const partial = {
      bedComfort: 9.0,
      quietness: 8.5,
    };
    const validation = validateScores(partial as unknown as ScoreBreakdown);
    expect(validation.valid).toBe(false);
  });

  it('provides appropriate editorial descriptors based on score brackets', () => {
    expect(getScoreDescriptor(9.8).title).toBe('Transcendent Sanctuary');
    expect(getScoreDescriptor(9.2).title).toBe('Exceptional Sleep Quality');
    expect(getScoreDescriptor(8.7).title).toBe('Superior Rest & Comfort');
    expect(getScoreDescriptor(8.2).title).toBe('High Rest Standard');
    expect(getScoreDescriptor(7.4).title).toBe('Moderate Rest Standard');
    expect(getScoreDescriptor(6.5).title).toBe('Basic Sleep Environment');
  });
});
