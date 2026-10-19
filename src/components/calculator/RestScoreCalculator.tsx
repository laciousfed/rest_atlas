'use client';

import React, { useState } from 'react';
import { calculateRestScore, getScoreDescriptor, SCORING_PILLARS } from '@/lib/scoring';
import { ScoreBreakdown } from '@/types/score';
import {
  BedDouble,
  VolumeX,
  SunMoon,
  Sparkles,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Info,
} from 'lucide-react';

export default function RestScoreCalculator() {
  const [bedComfort, setBedComfort] = useState<number>(9.5);
  const [quietness, setQuietness] = useState<number>(9.0);
  const [lightingClimate, setLightingClimate] = useState<number>(9.2);
  const [designWellness, setDesignWellness] = useState<number>(9.4);

  const breakdown: ScoreBreakdown = {
    bedComfort,
    quietness,
    lightingClimate,
    designWellness,
  };

  const calculatedScore = calculateRestScore(breakdown);
  const descriptor = getScoreDescriptor(calculatedScore);

  const setScenario = (scenario: 'transcendent' | 'exceptional' | 'average') => {
    if (scenario === 'transcendent') {
      setBedComfort(9.8);
      setQuietness(9.6);
      setLightingClimate(9.5);
      setDesignWellness(9.9);
    } else if (scenario === 'exceptional') {
      setBedComfort(9.2);
      setQuietness(9.0);
      setLightingClimate(9.1);
      setDesignWellness(9.0);
    } else {
      setBedComfort(7.0);
      setQuietness(6.5);
      setLightingClimate(6.8);
      setDesignWellness(7.2);
    }
  };

  const resetToDefault = () => {
    setBedComfort(9.0);
    setQuietness(8.5);
    setLightingClimate(9.0);
    setDesignWellness(9.5);
  };

  const getIcon = (key: keyof ScoreBreakdown) => {
    switch (key) {
      case 'bedComfort':
        return <BedDouble className="w-5 h-5 text-forest-700" />;
      case 'quietness':
        return <VolumeX className="w-5 h-5 text-forest-700" />;
      case 'lightingClimate':
        return <SunMoon className="w-5 h-5 text-forest-700" />;
      case 'designWellness':
        return <Sparkles className="w-5 h-5 text-forest-700" />;
    }
  };

  const getValue = (key: keyof ScoreBreakdown): number => {
    return breakdown[key];
  };

  const setValue = (key: keyof ScoreBreakdown, val: number) => {
    switch (key) {
      case 'bedComfort':
        setBedComfort(val);
        break;
      case 'quietness':
        setQuietness(val);
        break;
      case 'lightingClimate':
        setLightingClimate(val);
        break;
      case 'designWellness':
        setDesignWellness(val);
        break;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand-200 shadow-soft space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sand-100">
        <div>
          <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-forest-800 font-semibold mb-1">
            <ShieldCheck className="w-4 h-4 text-forest-700" />
            <span>Interactive Simulator</span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Simulate a 4-Pillar Rest Score
          </h3>
          <p className="text-xs text-charcoal-500 mt-1">
            Adjust the environmental sliders below to calculate the certified weighted score in real time.
          </p>
        </div>

        {/* Quick Scenario Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setScenario('transcendent')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sand-100 hover:bg-forest-100 hover:text-forest-900 text-charcoal-700 transition-colors"
          >
            Sanctuary (9.7)
          </button>
          <button
            type="button"
            onClick={() => setScenario('exceptional')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sand-100 hover:bg-forest-100 hover:text-forest-900 text-charcoal-700 transition-colors"
          >
            Exceptional (9.1)
          </button>
          <button
            type="button"
            onClick={() => setScenario('average')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-sand-100 hover:bg-forest-100 hover:text-forest-900 text-charcoal-700 transition-colors"
          >
            Standard (6.9)
          </button>
          <button
            type="button"
            onClick={resetToDefault}
            title="Reset to Baseline"
            className="p-1.5 rounded-lg text-charcoal-400 hover:text-charcoal-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Sliders on Left, Result Badge on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Sliders Column */}
        <div className="lg:col-span-2 space-y-6">
          {SCORING_PILLARS.map((pillar) => {
            const val = getValue(pillar.key);
            const weightedContribution = Math.round(val * pillar.weight * 100) / 100;

            return (
              <div
                key={pillar.key}
                className="p-5 rounded-2xl bg-sand-50/70 border border-sand-200/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 rounded-xl bg-white border border-sand-200">
                      {getIcon(pillar.key)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-forest-950">
                        {pillar.label}
                      </h4>
                      <span className="text-[11px] text-charcoal-400">
                        {pillar.percentage}% Weight • Contributes {weightedContribution.toFixed(2)} pts
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-serif font-bold text-forest-900">
                      {val.toFixed(1)}
                    </span>
                    <span className="text-xs text-charcoal-400"> / 10</span>
                  </div>
                </div>

                {/* Range Slider */}
                <div className="space-y-1">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={val}
                    onChange={(e) => setValue(pillar.key, parseFloat(e.target.value))}
                    className="w-full accent-forest-800 cursor-pointer h-2 bg-sand-200 rounded-lg appearance-none"
                    aria-label={pillar.label}
                  />
                  <div className="flex justify-between text-[10px] text-charcoal-400">
                    <span>0.0 (Severe Disruption)</span>
                    <span>5.0 (Basic)</span>
                    <span>10.0 (Flawless)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Calculation Results Card */}
        <div className="sticky top-28 bg-forest-950 text-sand-50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-soft-lg">
          <div>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-gold-400 block mb-1">
              Simulated Rest Score
            </span>
            <div className="flex items-baseline space-x-2">
              <span className="text-5xl font-serif font-bold text-sand-50">
                {calculatedScore.toFixed(1)}
              </span>
              <span className="text-sm text-sand-400">/ 10</span>
            </div>
          </div>

          <div>
            <span className="text-xs text-sand-300 block mb-1.5">Editorial Classification:</span>
            <span className={`inline-block px-3 py-1.5 text-xs font-semibold rounded-lg ${descriptor.badgeClass}`}>
              {descriptor.title}
            </span>
          </div>

          <div className="border-t border-forest-900 pt-4 space-y-2 text-xs text-sand-300">
            <span className="font-semibold text-sand-200 block text-[11px] uppercase tracking-wider">
              Mathematical Contribution:
            </span>
            <div className="space-y-1 text-[11px]">
              <div className="flex justify-between">
                <span>Bed Comfort (30%):</span>
                <span className="font-mono text-sand-100">{(bedComfort * 0.3).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Quietness (20%):</span>
                <span className="font-mono text-sand-100">{(quietness * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Lighting &amp; Climate (20%):</span>
                <span className="font-mono text-sand-100">{(lightingClimate * 0.2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Design &amp; Wellness (30%):</span>
                <span className="font-mono text-sand-100">{(designWellness * 0.3).toFixed(2)}</span>
              </div>
              <div className="border-t border-forest-800 pt-1 flex justify-between font-bold text-gold-300">
                <span>Exact Total:</span>
                <span className="font-mono">
                  {((bedComfort * 0.3) + (quietness * 0.2) + (lightingClimate * 0.2) + (designWellness * 0.3)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-forest-900 border border-forest-800 text-[11px] text-sand-300 flex items-start space-x-2">
            <Info className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
            <span>
              Rest Atlas scores round to exactly 1 decimal place. Stays scoring 9.5+ earn the coveted <em>Transcendent Sanctuary</em> seal.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
