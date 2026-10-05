import React, { useState, useEffect } from 'react';
import { ArrowRight, Play, ShieldCheck, Zap, Compass } from 'lucide-react';
import heroImage from '../assets/images/hero_kanso_dial_1791195180612.jpg';

interface HeroProps {
  onPreOrderClick: () => void;
  onExploreShowcase: () => void;
}

const ROTATING_WORDS = ['Deep Work', 'Flow State', 'Creative Craft', 'Undivided Focus'];

export const Hero: React.FC<HeroProps> = ({ onPreOrderClick, onExploreShowcase }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
        setIsAnimating(false);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  const hotspots = [
    {
      id: 1,
      x: '34%',
      y: '48%',
      title: 'Ceramic Optical Encoders',
      detail: '64 calibrated physical detents with smooth fluid damping and zero digital latency.',
    },
    {
      id: 2,
      x: '62%',
      y: '42%',
      title: '300 PPI E-Paper Canvas',
      detail: 'Sunlight-readable bi-stable electrophoretic display. Completely zero blue-light emission.',
    },
    {
      id: 3,
      x: '50%',
      y: '78%',
      title: 'CNC 6061-T6 Aluminum',
      detail: 'Precision-milled unibody with low center of gravity and high-friction silicone desk pads.',
    },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Subtle radial ambient light */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/[0.04] blur-[140px] pointer-events-none rounded-full" 
        aria-hidden="true" 
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Natural editorial kicker (clean text, no pills) */}
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-6">
            <span>Hardware Architecture</span>
            <span aria-hidden="true" className="text-neutral-600">/</span>
            <span>Batch 02 Now Open</span>
          </div>

          {/* Animated Hero Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6 [text-wrap:balance]">
            Silence the digital noise.
            <br />
            Reclaim your{' '}
            <span className="inline-block relative min-w-[280px] sm:min-w-[340px] text-left text-amber-400">
              <span
                className={`inline-block transition-all duration-300 transform ${
                  isAnimating
                    ? '-translate-y-3 opacity-0'
                    : 'translate-y-0 opacity-100'
                }`}
              >
                {ROTATING_WORDS[wordIndex]}
              </span>
              <span className="inline-block w-1.5 h-9 sm:h-12 bg-amber-400 ml-1.5 align-middle animate-pulse" />
            </span>
          </h1>

          {/* Value proposition paragraph */}
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-10 max-w-2xl mx-auto [text-wrap:balance]">
            A dedicated physical desktop console engineered to replace chaotic browser tabs and phone distractions. Dual stepless rotary dials, a 300 PPI paper-like canvas, and zero cloud telemetry.
          </p>

          {/* Conversion Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              type="button"
              onClick={onPreOrderClick}
              className="w-full sm:w-auto px-8 py-3.5 text-sm font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-all duration-200 shadow-md shadow-amber-400/20 active:translate-y-0.5 flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>Reserve Batch 02 — $289</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              type="button"
              onClick={onExploreShowcase}
              className="w-full sm:w-auto px-6 py-3.5 text-sm font-medium text-neutral-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 rounded-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Play size={15} className="text-amber-400 fill-amber-400" />
              <span>Interactive Console Simulator</span>
            </button>
          </div>

          {/* Proof metrics row (Claim-to-proof adjacency, unboxed text) */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-neutral-400 pt-2 border-t border-white/[0.07] max-w-xl mx-auto">
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-amber-400" />
              <span>Batch 01 Delivered to 1,200 Studios</span>
            </div>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <div className="flex items-center gap-1.5">
              <Zap size={14} className="text-amber-400" />
              <span>45-Day Bi-Stable Battery</span>
            </div>
            <span aria-hidden="true" className="text-neutral-700">·</span>
            <div className="flex items-center gap-1.5">
              <Compass size={14} className="text-amber-400" />
              <span>100% Offline Local Control</span>
            </div>
          </div>
        </div>

        {/* Hero Product Frame with Interactive Hotspots */}
        <div className="mt-14 relative max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121417] shadow-2xl shadow-black/80 aspect-[16/9]">
            <img
              src={heroImage}
              alt="Kanso Dial desktop hardware console with dual rotary dials and crisp e-paper focus display"
              className="w-full h-full object-cover select-none"
              referrerPolicy="no-referrer"
              loading="eager"
            />
            {/* Subtle contrast gradient scrim for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d0e]/60 via-transparent to-black/20 pointer-events-none" />

            {/* Interactive Hotspots */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{ left: spot.x, top: spot.y }}
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                  aria-label={`Inspect ${spot.title}`}
                  className={`group relative flex items-center justify-center w-8 h-8 rounded-full transition-transform ${
                    activeHotspot === spot.id ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <span className="absolute w-full h-full rounded-full bg-amber-400/30 animate-ping opacity-75" />
                  <span className="relative w-5 h-5 rounded-full bg-black/80 border-2 border-amber-400 flex items-center justify-center text-[10px] font-bold text-amber-400 shadow-md">
                    +
                  </span>
                </button>

                {/* Hotspot details popover */}
                {activeHotspot === spot.id && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-64 p-3.5 rounded-lg bg-[#181b20]/95 backdrop-blur-md border border-white/20 shadow-xl text-left z-30 animate-fadeIn">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-xs font-semibold text-white tracking-wide">
                        {spot.title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveHotspot(null);
                        }}
                        className="text-neutral-400 hover:text-white text-xs px-1"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[11px] leading-relaxed text-neutral-300">
                      {spot.detail}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Micro hint overlay */}
            <div className="absolute bottom-3 right-4 z-10 hidden sm:flex items-center gap-1.5 text-[11px] text-neutral-300 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Click markers to inspect components</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
