import React from 'react';
import { Cpu, Battery, EyeOff, Radio, RefreshCw, Feather } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const Features: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="engineering" className="py-24 bg-[#0c0d0e] relative">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="max-w-2xl mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Industrial Engineering
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 [text-wrap:balance]">
            Built with the permanence of fine horology, not disposable consumer gadgets.
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed [text-wrap:balance]">
            Every micro-mechanism inside Kanso Dial is engineered to outlive your laptop. No glued lithium pouches, no locked bootloaders, and zero planned obsolescence.
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 (Span 2): Optical Ceramic Encoders */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-[#121417] border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                01. PHYSICAL INTERACTION
              </span>
              <div className="p-2 rounded-lg bg-white/5 text-neutral-300 group-hover:text-amber-400 transition-colors">
                <RefreshCw size={20} />
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Stepless Ceramic Optical Encoders
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6 max-w-xl">
              Traditional potentiometers wear out after 10,000 cycles. Kanso utilizes dual contactless infrared optical sensors paired with micro-milled ceramic bearing tracks rated for 5,000,000 tactile rotations.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.06] text-xs">
              <div>
                <div className="font-mono-numeric text-lg font-bold text-white">64 Detents</div>
                <div className="text-neutral-400 mt-0.5">Tactile resolution / 360°</div>
              </div>
              <div>
                <div className="font-mono-numeric text-lg font-bold text-white">&lt;1.2 ms</div>
                <div className="text-neutral-400 mt-0.5">Hardware interrupt latency</div>
              </div>
              <div>
                <div className="font-mono-numeric text-lg font-bold text-white">5M+ Cycles</div>
                <div className="text-neutral-400 mt-0.5">Tested life endurance</div>
              </div>
            </div>
          </div>

          {/* Card 2: 300 PPI Reflective E-Paper */}
          <div className="p-8 rounded-2xl bg-[#121417] border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative group">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                02. VISUAL REST
              </span>
              <div className="p-2 rounded-lg bg-white/5 text-neutral-300 group-hover:text-amber-400 transition-colors">
                <EyeOff size={20} />
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Reflective E-Paper
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              True pigment micro-capsules physically rearrange to form crisp black typography on a warm stone-white background. Completely zero blue light, glare, or LED refresh flicker.
            </p>

            <div className="pt-4 border-t border-white/[0.06]">
              <div className="text-xs text-neutral-400 font-mono">
                <span className="text-white font-semibold">300 PPI Resolution</span> · Micro-etched anti-glare tempered mineral glass lens.
              </div>
            </div>
          </div>

          {/* Card 3: 45-Day Bi-Stable Power Reserve */}
          <div className="p-8 rounded-2xl bg-[#121417] border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative group">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                03. ZERO POWER DRAIN
              </span>
              <div className="p-2 rounded-lg bg-white/5 text-neutral-300 group-hover:text-amber-400 transition-colors">
                <Battery size={20} />
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">
              45-Day Power Reserve
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6">
              Electrophoretic ink only consumes electrical current when flipping pigment states. Static displays consume exactly zero microamps, allowing weeks of untethered focus.
            </p>

            <div className="pt-4 border-t border-white/[0.06]">
              <div className="text-xs text-neutral-400 font-mono">
                <span className="text-white font-semibold">USB-C + Qi Induction</span> · Fast charges in 40 minutes on its solid walnut dock.
              </div>
            </div>
          </div>

          {/* Card 4 (Span 2): Absolute Offline Sovereignty */}
          <div className="md:col-span-2 p-8 rounded-2xl bg-[#121417] border border-white/[0.08] hover:border-white/20 transition-all duration-300 relative group overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs font-mono text-amber-400 font-semibold tracking-wider">
                04. DATA PRIVACY & CONTROL
              </span>
              <div className="p-2 rounded-lg bg-white/5 text-neutral-300 group-hover:text-amber-400 transition-colors">
                <Radio size={20} />
              </div>
            </div>

            <h3 className="font-display text-2xl font-bold text-white mb-3">
              Sovereign Local Architecture
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed mb-6 max-w-xl">
              We did not include an omnipresent Wi-Fi modem. Your calendar integration and focus ledger communicate via local USB HID or encrypted Bluetooth Low Energy directly with your computer. No external servers ever receive your work routines.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/[0.06] text-xs">
              <div>
                <div className="font-mono-numeric text-lg font-bold text-white">0 KB</div>
                <div className="text-neutral-400 mt-0.5">Cloud data harvested</div>
              </div>
              <div>
                <div className="font-mono-numeric text-lg font-bold text-white">Open HID</div>
                <div className="text-neutral-400 mt-0.5">Cross-platform driverless</div>
              </div>
              <div>
                <div className="font-mono-numeric text-lg font-bold text-white">Rust SDK</div>
                <div className="text-neutral-400 mt-0.5">Write custom desk widgets</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
