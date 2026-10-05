import React, { useState } from 'react';
import { Check, Shield, Truck, Clock, Sparkles } from 'lucide-react';
import { PricingTier } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface PricingProps {
  onSelectTier: (tierId: string) => void;
}

export const TIERS: PricingTier[] = [
  {
    id: 'solo',
    name: 'Solo Edition',
    tagline: 'The pure console for single-desk deep workers.',
    priceUsd: 289,
    priceEur: 269,
    priceGbp: 239,
    shippingDate: 'Ships November 2026',
    batchCountRemaining: 42,
    features: [
      'Kanso Dial Hardware Console (Matte Charcoal or Silver)',
      'Dual Ceramic Optical Encoders',
      '300 PPI Reflective E-Paper Display',
      'Braided 1.8m Silicone USB-C to USB-C Cable',
      'Standard 1-Year Craftsmanship Warranty',
      'Open-source Rust / Python Local SDK',
    ],
  },
  {
    id: 'studio',
    name: 'Studio Kit',
    tagline: 'The complete desk centerpiece with solid walnut induction dock.',
    priceUsd: 349,
    priceEur: 329,
    priceGbp: 289,
    popular: true,
    shippingDate: 'Ships November 2026',
    batchCountRemaining: 18,
    features: [
      'Everything in Solo Edition',
      'Solid CNC Oiled American Walnut Qi Induction Dock',
      '2x Interchangeable Knurled Patina Brass Dials',
      'Custom Top-Grain Leather Desk Coaster',
      'Extended 3-Year Zero-Hassle Hardware Warranty',
      'Priority Batch 02 Fulfillment Window',
      'Founder Inscription on Base Plate',
    ],
  },
  {
    id: 'atelier',
    name: 'Atelier Duo',
    tagline: 'Twin consoles for collaborative studio founders or dual home/office setups.',
    priceUsd: 599,
    priceEur: 559,
    priceGbp: 495,
    shippingDate: 'Ships November 2026',
    batchCountRemaining: 7,
    features: [
      'Two (2) Kanso Dial Consoles (Any Finish Combination)',
      'Two (2) Solid Walnut Qi Magnetic Induction Docks',
      'Four (4) Custom Knurled Replacement Dials (Brass + Aluminum)',
      'Two (2) Hard-shell Waxed Canvas Travel Sleeves',
      'Lifetime Hardware Replacement Guarantee',
      'Dedicated Hardware Engineering Support Channel',
    ],
  },
];

export const Pricing: React.FC<PricingProps> = ({ onSelectTier }) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [showMatrix, setShowMatrix] = useState(false);

  const getPrice = (tier: PricingTier) => {
    switch (currency) {
      case 'EUR':
        return `€${tier.priceEur}`;
      case 'GBP':
        return `£${tier.priceGbp}`;
      default:
        return `$${tier.priceUsd}`;
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#0c0d0e] relative">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Header & Currency Switcher */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Batch 02 Reservation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4 [text-wrap:balance]">
            Invest in clarity. Never pay another subscription fee.
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed mb-8 [text-wrap:balance]">
            One-time hardware purchase. No locked features, no cloud paywalls, and no recurring monthly invoices. Batch 02 is limited to 500 numbered units worldwide.
          </p>

          {/* Currency Segmented Control (Allowed functional buttons) */}
          <div className="inline-flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-lg">
            <button
              type="button"
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                currency === 'USD' ? 'bg-amber-400 text-black shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('EUR')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                currency === 'EUR' ? 'bg-amber-400 text-black shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              EUR (€)
            </button>
            <button
              type="button"
              onClick={() => setCurrency('GBP')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                currency === 'GBP' ? 'bg-amber-400 text-black shadow-sm' : 'text-neutral-400 hover:text-white'
              }`}
            >
              GBP (£)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                tier.popular
                  ? 'bg-[#15181d] border-2 border-amber-400/80 shadow-[0_10px_40px_rgba(245,158,11,0.12)] -translate-y-2'
                  : 'bg-[#121417] border border-white/[0.08] hover:border-white/20'
              }`}
            >
              {/* Popular Kicker (Text only, clean typography) */}
              {tier.popular && (
                <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-3 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>Founder's Choice · Most Popular</span>
                </div>
              )}

              <div>
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-2xl font-bold text-white">{tier.name}</h3>
                  <span className="text-xs font-mono text-neutral-400">
                    {tier.batchCountRemaining} units left
                  </span>
                </div>

                <p className="text-xs text-neutral-300 mt-2 mb-6 min-h-[32px]">
                  {tier.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-6 pb-6 border-b border-white/[0.08]">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-4xl sm:text-5xl text-white font-mono-numeric">
                      {getPrice(tier)}
                    </span>
                    <span className="text-xs text-neutral-400 uppercase tracking-wider">
                      one-time
                    </span>
                  </div>
                  <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1.5">
                    <Clock size={13} />
                    <span>{tier.shippingDate}</span>
                  </div>
                </div>

                {/* Feature Bullet Points */}
                <div className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check size={15} className="text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  type="button"
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full py-3.5 px-4 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-sm active:translate-y-px whitespace-nowrap ${
                    tier.popular
                      ? 'bg-amber-400 hover:bg-amber-300 text-black shadow-amber-400/20'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  Configure & Reserve ({getPrice(tier)})
                </button>
                <div className="text-[11px] text-center text-neutral-400 mt-2">
                  Zero risk · Fully refundable until dispatch
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Guarantee and Shipping Badges */}
        <div className="flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-neutral-400 pt-8 border-t border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Truck size={16} className="text-neutral-300" />
            <span>Complimentary Insured Global Express Shipping</span>
          </div>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-neutral-300" />
            <span>30-Day In-Studio Trial Guarantee</span>
          </div>
          <span aria-hidden="true" className="text-neutral-700">·</span>
          <div>
            <button
              type="button"
              onClick={() => setShowMatrix(!showMatrix)}
              className="text-amber-400 hover:underline font-medium"
            >
              {showMatrix ? 'Hide Specification Matrix ↑' : 'View Full Technical Comparison ↓'}
            </button>
          </div>
        </div>

        {/* Full Specification Comparison Matrix (Toggleable) */}
        {showMatrix && (
          <div className="mt-8 p-6 rounded-2xl bg-[#121417] border border-white/10 overflow-x-auto animate-fadeIn">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-neutral-400 font-mono uppercase">
                  <th className="py-3 px-4">Hardware Specification</th>
                  <th className="py-3 px-4">Solo Edition</th>
                  <th className="py-3 px-4 text-amber-400 font-semibold">Studio Kit</th>
                  <th className="py-3 px-4">Atelier Duo</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06] text-neutral-300">
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Chassis Finish</td>
                  <td className="py-3 px-4">Anodized Space Charcoal / Silver</td>
                  <td className="py-3 px-4 text-amber-300">All Finishes + Raw Brass Options</td>
                  <td className="py-3 px-4">Custom Dual Finish Mix</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Encoders</td>
                  <td className="py-3 px-4">2x Knurled Aluminum (64 Detents)</td>
                  <td className="py-3 px-4 text-amber-300">2x Aluminum + 2x Solid Brass</td>
                  <td className="py-3 px-4">4x Aluminum + 4x Solid Brass</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Display Module</td>
                  <td className="py-3 px-4">4.3" 300 PPI Monochromatic E-Paper</td>
                  <td className="py-3 px-4 text-amber-300">4.3" 300 PPI Monochromatic E-Paper</td>
                  <td className="py-3 px-4">4.3" 300 PPI Monochromatic E-Paper (×2)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Charging Dock</td>
                  <td className="py-3 px-4">USB-C Cable only</td>
                  <td className="py-3 px-4 text-amber-300">Solid American Walnut Qi Dock</td>
                  <td className="py-3 px-4">2x Solid Walnut Qi Docks</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">Warranty Coverage</td>
                  <td className="py-3 px-4">1-Year Standard</td>
                  <td className="py-3 px-4 text-amber-300">3-Year Zero-Hassle</td>
                  <td className="py-3 px-4">Lifetime Replacement</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-white">API & Local SDK</td>
                  <td className="py-3 px-4">Rust / Python / C SDK</td>
                  <td className="py-3 px-4 text-amber-300">Rust / Python / C SDK</td>
                  <td className="py-3 px-4">Rust / Python / C SDK + Dev Support</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
};
