'use client';

export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { calculateRestScore, SCORING_PILLARS, getScoreDescriptor, validateScores } from '@/lib/scoring';
import { Hotel } from '@/types/hotel';
import { ScoreBreakdown, ConfidenceLevel } from '@/types/score';
import {
  ShieldCheck,
  ArrowLeft,
  Save,
  CheckCircle2,
  AlertCircle,
  BedDouble,
  VolumeX,
  SunMoon,
  Sparkles,
  Info,
} from 'lucide-react';

export default function AdminScoreManagerPage() {
  const router = useRouter();
  const params = useParams();
  const hotelId = params.id as string;
  const { user } = useAuth();

  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Editable score dimensions
  const [bedComfort, setBedComfort] = useState(9.0);
  const [quietness, setQuietness] = useState(9.0);
  const [lightingClimate, setLightingClimate] = useState(9.0);
  const [designWellness, setDesignWellness] = useState(9.0);

  const [evidenceNotes, setEvidenceNotes] = useState('');
  const [confidenceLevel, setConfidenceLevel] = useState<ConfidenceLevel>('High (On-Site Verified)');
  const [assessmentDate, setAssessmentDate] = useState(new Date().toISOString().slice(0, 10));
  const [scoringStatus, setScoringStatus] = useState<'published' | 'draft'>('published');

  useEffect(() => {
    async function loadHotel() {
      try {
        const res = await fetch(`/api/hotels/${hotelId}`);
        const data = await res.json();
        if (data.success && data.hotel) {
          const h: Hotel = data.hotel;
          setHotel(h);
          setBedComfort(h.scoreBreakdown.bedComfort);
          setQuietness(h.scoreBreakdown.quietness);
          setLightingClimate(h.scoreBreakdown.lightingClimate);
          setDesignWellness(h.scoreBreakdown.designWellness);
          setEvidenceNotes(h.assessmentNotes || '');
          setConfidenceLevel(h.assessmentConfidence);
          setAssessmentDate(h.assessmentDate || new Date().toISOString().slice(0, 10));
          setScoringStatus(h.scoringStatus === 'draft' ? 'draft' : 'published');
        } else {
          setError('Failed to retrieve hotel data.');
        }
      } catch (e) {
        setError('Failed to connect to hotel service.');
      } finally {
        setLoading(false);
      }
    }
    loadHotel();
  }, [hotelId]);

  // Live calculation of weighted Rest Score
  const currentBreakdown: ScoreBreakdown = {
    bedComfort,
    quietness,
    lightingClimate,
    designWellness,
  };

  const validation = validateScores(currentBreakdown);
  let liveWeightedScore = 0;
  if (validation.valid) {
    try {
      liveWeightedScore = calculateRestScore(currentBreakdown);
    } catch {
      // fallback
    }
  }

  const descriptor = getScoreDescriptor(liveWeightedScore);

  const handleSaveAssessment = async (statusOverride?: 'published' | 'draft') => {
    if (!validation.valid) {
      setError(`Cannot save with invalid scores: ${validation.errors.join(' ')}`);
      return;
    }

    const targetStatus = statusOverride || scoringStatus;
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const assessmentPayload = {
        hotelId,
        bedComfortScore: bedComfort,
        quietnessScore: quietness,
        lightingClimateScore: lightingClimate,
        designWellnessScore: designWellness,
        weightedRestScore: liveWeightedScore,
        confidenceLevel,
        evidenceNotes,
        assessmentDate,
        assessorId: user?.uid || 'assessor-console',
        assessorName: user?.displayName || 'Lead Sleep Acoustician',
        status: targetStatus,
      };

      const res = await fetch(`/api/hotels/${hotelId}/score`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assessmentPayload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to persist assessment.');
      }

      setHotel(data.hotel);
      setSuccess(
        `Sleep score updated successfully to ${liveWeightedScore.toFixed(1)}/10 (${targetStatus.toUpperCase()}).`
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error updating score.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-xs text-charcoal-500">
        Loading hotel scorecard...
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="py-20 text-center text-xs text-red-600">
        Property not found or invalid ID.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/hotels"
            className="inline-flex items-center space-x-1.5 text-xs text-forest-800 font-semibold mb-2 hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Hotel Directory</span>
          </Link>
          <h1 className="font-serif text-3xl font-bold text-forest-950">
            Sleep Score Assessor: {hotel.name}
          </h1>
          <p className="text-xs text-charcoal-500 mt-0.5">
            {hotel.city}, {hotel.country} • Category: {hotel.hotelCategory}
          </p>
        </div>

        {/* Live Weighted Rest Score Display */}
        <div className="flex items-center space-x-4 bg-white px-5 py-3 rounded-2xl border border-sand-200 shadow-soft">
          <div>
            <div className="text-[10px] uppercase font-bold text-charcoal-400">
              Live Weighted Score
            </div>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-serif font-bold text-forest-900">
                {liveWeightedScore.toFixed(1)}
              </span>
              <span className="text-xs text-charcoal-400">/ 10</span>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-sand-200" />
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-md ${descriptor.badgeClass}`}>
            {descriptor.title}
          </span>
        </div>
      </div>

      {success && (
        <div className="p-4 rounded-2xl bg-forest-50 border border-forest-200 flex items-start space-x-3 text-forest-900 text-xs">
          <CheckCircle2 className="w-5 h-5 text-forest-700 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start space-x-3 text-red-900 text-xs">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Scoring Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-sand-200 shadow-soft space-y-8">
        
        {/* Previous vs Current Comparison Notice */}
        <div className="p-4 rounded-2xl bg-sand-50 border border-sand-200 flex items-start space-x-3 text-xs text-charcoal-700">
          <Info className="w-4 h-4 text-forest-700 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-forest-950 block">Current Database Baseline:</span>
            <span>
              Bed: {hotel.scoreBreakdown.bedComfort.toFixed(1)} | Quiet: {hotel.scoreBreakdown.quietness.toFixed(1)} | Lighting: {hotel.scoreBreakdown.lightingClimate.toFixed(1)} | Design: {hotel.scoreBreakdown.designWellness.toFixed(1)} &rarr; Published Rest Score: <strong>{hotel.restScore.toFixed(1)}</strong> ({hotel.scoringStatus})
            </span>
          </div>
        </div>

        {/* 4 Interactive Category Sliders & Steppers */}
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-forest-950 border-b border-sand-100 pb-2">
            The 4 Category Scoring Sliders (0.0 to 10.0)
          </h2>

          {/* Dimension 1: Bed Comfort (30%) */}
          <div className="p-5 rounded-2xl bg-sand-50/70 border border-sand-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <BedDouble className="w-4 h-4 text-forest-700" />
                <label className="font-bold text-forest-950 text-sm">
                  1. Bed and Linen Comfort (30% Weight)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={bedComfort}
                  onChange={(e) => setBedComfort(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-white border border-sand-300 rounded text-right font-bold text-forest-900 text-sm"
                />
                <span className="text-xs text-charcoal-500">/ 10</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={bedComfort}
              onChange={(e) => setBedComfort(parseFloat(e.target.value))}
              className="w-full accent-forest-700"
            />
            <span className="text-[11px] text-charcoal-500 block">
              Evaluates mattress support, natural latex/wool/horsehair layers, pillow density options, and motion isolation.
            </span>
          </div>

          {/* Dimension 2: Quietness (20%) */}
          <div className="p-5 rounded-2xl bg-sand-50/70 border border-sand-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <VolumeX className="w-4 h-4 text-forest-700" />
                <label className="font-bold text-forest-950 text-sm">
                  2. Quiet and Sound Environment (20% Weight)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={quietness}
                  onChange={(e) => setQuietness(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-white border border-sand-300 rounded text-right font-bold text-forest-900 text-sm"
                />
                <span className="text-xs text-charcoal-500">/ 10</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={quietness}
              onChange={(e) => setQuietness(parseFloat(e.target.value))}
              className="w-full accent-forest-700"
            />
            <span className="text-[11px] text-charcoal-500 block">
              Structural soundproofing (STC), acoustic vestibule buffer doors, triple glazing, and low ambient midnight decibels.
            </span>
          </div>

          {/* Dimension 3: Lighting & Climate (20%) */}
          <div className="p-5 rounded-2xl bg-sand-50/70 border border-sand-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SunMoon className="w-4 h-4 text-forest-700" />
                <label className="font-bold text-forest-950 text-sm">
                  3. Lighting and Climate (20% Weight)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={lightingClimate}
                  onChange={(e) => setLightingClimate(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-white border border-sand-300 rounded text-right font-bold text-forest-900 text-sm"
                />
                <span className="text-xs text-charcoal-500">/ 10</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={lightingClimate}
              onChange={(e) => setLightingClimate(parseFloat(e.target.value))}
              className="w-full accent-forest-700"
            />
            <span className="text-[11px] text-charcoal-500 block">
              100% blackout blinds with side track seals, circadian amber illumination, whisper HVAC (&lt;25dB), and air filtration.
            </span>
          </div>

          {/* Dimension 4: Design & Wellness (30%) */}
          <div className="p-5 rounded-2xl bg-sand-50/70 border border-sand-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-forest-700" />
                <label className="font-bold text-forest-950 text-sm">
                  4. Interior Design and Wellness (30% Weight)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  value={designWellness}
                  onChange={(e) => setDesignWellness(parseFloat(e.target.value) || 0)}
                  className="w-20 px-2 py-1 bg-white border border-sand-300 rounded text-right font-bold text-forest-900 text-sm"
                />
                <span className="text-xs text-charcoal-500">/ 10</span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="10"
              step="0.1"
              value={designWellness}
              onChange={(e) => setDesignWellness(parseFloat(e.target.value))}
              className="w-full accent-forest-700"
            />
            <span className="text-[11px] text-charcoal-500 block">
              Biophilic architecture, visual tranquility, nature views, hydrotherapy/thermal spas, and evening sleep rituals.
            </span>
          </div>
        </div>

        {/* Metadata: Notes, Confidence, Date */}
        <div className="space-y-4 pt-4 border-t border-sand-200 text-xs">
          <h3 className="font-serif text-lg font-bold text-forest-950">
            Assessor Evidence & Audit Verification
          </h3>

          <div>
            <label className="block text-charcoal-700 font-semibold mb-1">
              Evidence Notes & Measurement Observations <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={4}
              value={evidenceNotes}
              onChange={(e) => setEvidenceNotes(e.target.value)}
              placeholder="Record physical decibel readings, mattress manufacturer verification, blackout lux measurements, and reason for score change..."
              className="w-full px-3.5 py-2.5 bg-sand-50/70 border border-sand-200 rounded-xl text-forest-950 focus:outline-none focus:border-forest-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-charcoal-700 font-semibold mb-1">
                Confidence Tier
              </label>
              <select
                value={confidenceLevel}
                onChange={(e) => setConfidenceLevel(e.target.value as ConfidenceLevel)}
                className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800"
              >
                <option value="High (On-Site Verified)">High (On-Site Verified)</option>
                <option value="Medium (Documented Specifications)">Medium (Documented Specs)</option>
                <option value="Editorial Estimate">Editorial Estimate</option>
              </select>
            </div>

            <div>
              <label className="block text-charcoal-700 font-semibold mb-1">
                Assessment Date
              </label>
              <input
                type="date"
                value={assessmentDate}
                onChange={(e) => setAssessmentDate(e.target.value)}
                className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800"
              >
              </input>
            </div>

            <div>
              <label className="block text-charcoal-700 font-semibold mb-1">
                Publication Status
              </label>
              <select
                value={scoringStatus}
                onChange={(e) => setScoringStatus(e.target.value as 'published' | 'draft')}
                className="w-full px-3 py-2 bg-sand-50 border border-sand-200 rounded-lg text-charcoal-800 font-semibold"
              >
                <option value="published">Published (Visible in directory)</option>
                <option value="draft">Draft (Internal review only)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-sand-200">
          <div className="text-xs text-charcoal-500">
            Assessor: <span className="font-semibold text-forest-900">{user?.displayName || 'Lead Acoustician'}</span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              disabled={saving}
              onClick={() => handleSaveAssessment('draft')}
              className="px-4 py-2.5 rounded-xl bg-sand-100 hover:bg-sand-200 text-charcoal-800 font-semibold text-xs transition-colors"
            >
              Save as Draft
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => handleSaveAssessment('published')}
              className="px-6 py-2.5 rounded-xl bg-forest-800 hover:bg-forest-900 text-sand-50 font-semibold text-xs flex items-center space-x-2 transition-all shadow-soft"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Publishing...' : 'Publish Assessment'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
