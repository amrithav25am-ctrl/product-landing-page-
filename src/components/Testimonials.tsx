import React, { useState } from 'react';
import { Testimonial } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Quote } from 'lucide-react';

const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote:
      'Replacing my dual monitor notification ticker with a single tactile dial changed my entire relationship with deep engineering. I write complex distributed systems code for 4 hours without touching a smartphone or checking Slack.',
    highlight: 'Cut daily context-switching events from 48 down to 9.',
    author: 'Marcus Lindqvist',
    role: 'Principal Systems Architect',
    company: 'Vektor Systems, Stockholm',
    metric: '+3.4 hrs',
    metricLabel: 'Uninterrupted daily flow',
    category: 'engineering',
  },
  {
    id: '2',
    quote:
      'The optical resistance on the dials is breathtaking. When you physically spin the dial to lock into a 50-minute sprint, your nervous system responds immediately. I completed a 92,000-word book manuscript in 14 weeks.',
    highlight: 'Zero digital screen fatigue during 10-hour writing days.',
    author: 'Elena Rostova',
    role: 'Author & Contributing Essayist',
    company: 'The Atlantic & Farrar, Straus and Giroux',
    metric: '92k words',
    metricLabel: 'Finished manuscript in 14 weeks',
    category: 'writing',
  },
  {
    id: '3',
    quote:
      'In our design studio, screen overload is the #1 killer of creative clarity. Kanso sits on my desk like an heirloom Dieter Rams device. It anchors the workspace, silences ambient chaos, and respects your attention span.',
    highlight: 'A masterclass in industrial restraint and tactile tactile damping.',
    author: 'Julian Thorne',
    role: 'Design Director & Founder',
    company: 'Monolith Spatial Studio, London',
    metric: '76% drop',
    metricLabel: 'In ambient distraction triggers',
    category: 'design',
  },
];

export const Testimonials: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [filter, setFilter] = useState<'all' | 'engineering' | 'writing' | 'design'>('all');

  const filteredTestimonials =
    filter === 'all'
      ? TESTIMONIALS
      : TESTIMONIALS.filter((t) => t.category === filter);

  return (
    <section id="testimonials" className="py-24 bg-[#0e1012] border-t border-white/[0.06] relative">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header & Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div className="max-w-xl">
            <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
              Tested Proof & Outcomes
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight [text-wrap:balance]">
              Tested by 1,200 pioneers who refuse to let algorithms hijack their minds.
            </h2>
          </div>

          {/* Interactive filter tabs (Buttons allowed with active/inactive states) */}
          <div className="mt-6 md:mt-0 flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-lg">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'all'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Disciplines
            </button>
            <button
              type="button"
              onClick={() => setFilter('engineering')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'engineering'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Engineering
            </button>
            <button
              type="button"
              onClick={() => setFilter('design')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'design'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Design
            </button>
            <button
              type="button"
              onClick={() => setFilter('writing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === 'writing'
                  ? 'bg-white text-black font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Writers
            </button>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-2xl bg-[#14161a] border border-white/[0.08] hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Quantified Metric Badge (Clean unboxed typography) */}
                <div className="mb-6 pb-4 border-b border-white/[0.07]">
                  <div className="font-display text-3xl font-extrabold text-amber-400 font-mono-numeric">
                    {item.metric}
                  </div>
                  <div className="text-xs text-neutral-400 mt-1 uppercase tracking-wider font-medium">
                    {item.metricLabel}
                  </div>
                </div>

                {/* Highlight line */}
                <div className="text-xs font-semibold text-white tracking-wide mb-3">
                  "{item.highlight}"
                </div>

                {/* Main Quote */}
                <p className="text-sm text-neutral-300 leading-relaxed italic mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author attribution (No pills, clean separators) */}
              <div className="pt-4 border-t border-white/[0.07]">
                <div className="font-semibold text-sm text-white">{item.author}</div>
                <div className="text-xs text-neutral-400 mt-0.5">
                  <span>{item.role}</span>
                  <span aria-hidden="true" className="mx-1.5 text-neutral-600">·</span>
                  <span>{item.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Quantitative Adjacency Bar */}
        <div className="mt-12 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="font-mono-numeric text-3xl font-bold text-white">98.4%</div>
            <div className="text-xs text-neutral-400 mt-1">Reported reduced daily fatigue</div>
          </div>
          <div>
            <div className="font-mono-numeric text-3xl font-bold text-white">1,200+</div>
            <div className="text-xs text-neutral-400 mt-1">Batch 01 units in daily use</div>
          </div>
          <div>
            <div className="font-mono-numeric text-3xl font-bold text-white">0 Cloud</div>
            <div className="text-xs text-neutral-400 mt-1">100% on-device firmware</div>
          </div>
          <div>
            <div className="font-mono-numeric text-3xl font-bold text-white">4.9 / 5.0</div>
            <div className="text-xs text-neutral-400 mt-1">Hardware satisfaction rating</div>
          </div>
        </div>

      </div>
    </section>
  );
};
