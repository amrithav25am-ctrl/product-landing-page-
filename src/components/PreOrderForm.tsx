import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import { ProductFinish } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { TIERS } from './Pricing';

interface PreOrderFormProps {
  selectedTierId: string;
  onTierChange: (id: string) => void;
}

export const PreOrderForm: React.FC<PreOrderFormProps> = ({
  selectedTierId,
  onTierChange,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });

  // Form State
  const [finish, setFinish] = useState<ProductFinish>('charcoal');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [addWalnutDock, setAddWalnutDock] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(true);

  // Errors & Submission
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reservationCode, setReservationCode] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  const currentTier = TIERS.find((t) => t.id === selectedTierId) || TIERS[1];

  // Calculate total price
  const basePrice = currentTier.priceUsd;
  const dockPrice = addWalnutDock && currentTier.id === 'solo' ? 65 : 0;
  const totalPrice = basePrice + dockPrice;

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Please enter your full legal name';
    if (!email.trim()) {
      newErrors.email = 'Please provide a valid delivery contact email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email format';
    }
    if (!agreedTerms) {
      newErrors.agreedTerms = 'You must acknowledge the Batch 02 terms to proceed';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const randomSeq = Math.floor(1000 + Math.random() * 9000);
      setReservationCode(`KD-B2-${randomSeq}`);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://kansodial.com/reserve?ref=${reservationCode}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFullName('');
    setEmail('');
  };

  return (
    <section id="reserve" className="py-24 bg-[#0c0d0e] relative border-t border-white/[0.08]">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Direct Studio Reservation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3 [text-wrap:balance]">
            Configure Your Kanso Console
          </h2>
          <p className="text-sm text-neutral-300 max-w-lg mx-auto [text-wrap:balance]">
            Select your aerospace finish, reserve your numbered unit in Batch 02, and receive priority dispatch tracking.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-[#131518] rounded-2xl border border-white/10 p-6 sm:p-10 shadow-2xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Finish Selection */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-3">
                  01. Select Anodized Chassis & Dial Finish
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  {/* Finish Option 1: Space Charcoal */}
                  <button
                    type="button"
                    onClick={() => setFinish('charcoal')}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      finish === 'charcoal'
                        ? 'border-amber-400 bg-white/[0.06] shadow-sm ring-1 ring-amber-400'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#1e2024] border border-white/20 shadow-inner" />
                      <div>
                        <div className="text-xs font-semibold text-white">Space Charcoal</div>
                        <div className="text-[11px] text-neutral-400">Deep Anodized Matte</div>
                      </div>
                    </div>
                    {finish === 'charcoal' && <Check size={16} className="text-amber-400" />}
                  </button>

                  {/* Finish Option 2: Monolith Silver */}
                  <button
                    type="button"
                    onClick={() => setFinish('silver')}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      finish === 'silver'
                        ? 'border-amber-400 bg-white/[0.06] shadow-sm ring-1 ring-amber-400'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#d0d3d8] border border-white/20 shadow-inner" />
                      <div>
                        <div className="text-xs font-semibold text-white">Monolith Silver</div>
                        <div className="text-[11px] text-neutral-400">Bead-Blasted 6061</div>
                      </div>
                    </div>
                    {finish === 'silver' && <Check size={16} className="text-amber-400" />}
                  </button>

                  {/* Finish Option 3: Patina Brass */}
                  <button
                    type="button"
                    onClick={() => setFinish('brass')}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                      finish === 'brass'
                        ? 'border-amber-400 bg-white/[0.06] shadow-sm ring-1 ring-amber-400'
                        : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#b89758] border border-white/20 shadow-inner" />
                      <div>
                        <div className="text-xs font-semibold text-white">Warm Patina Brass</div>
                        <div className="text-[11px] text-neutral-400">Aged Ceramic Luster</div>
                      </div>
                    </div>
                    {finish === 'brass' && <Check size={16} className="text-amber-400" />}
                  </button>
                </div>
              </div>

              {/* Step 2: Hardware Tier Selector */}
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-400 font-mono mb-3">
                  02. Selected Hardware Edition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {TIERS.map((tier) => (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => onTierChange(tier.id)}
                      className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        selectedTierId === tier.id
                          ? 'border-amber-400 bg-white/[0.06] ring-1 ring-amber-400'
                          : 'border-white/10 bg-white/[0.02] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold text-white">{tier.name}</span>
                          {selectedTierId === tier.id && <Check size={15} className="text-amber-400" />}
                        </div>
                        <div className="text-[11px] text-neutral-400 leading-tight">
                          {tier.tagline}
                        </div>
                      </div>
                      <div className="font-mono-numeric font-bold text-base text-amber-400 mt-3">
                        ${tier.priceUsd}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Optional Add-on for Solo tier */}
              {selectedTierId === 'solo' && (
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="walnutDock"
                      checked={addWalnutDock}
                      onChange={(e) => setAddWalnutDock(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-400 bg-black/40 border-neutral-600 focus:ring-amber-400 focus:ring-offset-0"
                    />
                    <label htmlFor="walnutDock" className="text-xs text-neutral-200 cursor-pointer">
                      <span className="font-semibold text-white">Add Solid American Walnut Qi Dock</span> (+$65)
                      <span className="block text-[11px] text-neutral-400">
                        Magnetic fast inductive desk pad with embedded brass weights
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Customer Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Full Legal Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    placeholder="e.g. Henrik Vestergaard"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors outline-none"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Delivery Notification Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="henrik@studio.design"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors outline-none"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300 mb-1.5">
                    Shipping Region / Country
                  </label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-white/10 text-white text-xs focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors outline-none"
                  >
                    <option value="United States">United States (Free Express Dispatch)</option>
                    <option value="United Kingdom">United Kingdom (Free Express Dispatch)</option>
                    <option value="Germany">Germany / European Union (Free Express Dispatch)</option>
                    <option value="Japan">Japan / Asia-Pacific (Free Express Dispatch)</option>
                    <option value="Canada">Canada (Free Express Dispatch)</option>
                    <option value="Australia">Australia & New Zealand (Free Express Dispatch)</option>
                    <option value="Other">Worldwide Other (Insured Courier)</option>
                  </select>
                </div>
              </div>

              {/* Agreement checkbox */}
              <div>
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    id="agreedTerms"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded text-amber-400 bg-black/40 border-neutral-600 focus:ring-amber-400 focus:ring-offset-0"
                  />
                  <label htmlFor="agreedTerms" className="text-[11px] text-neutral-400 leading-snug cursor-pointer">
                    I understand Batch 02 will be produced in a limited sequence of 500 units with targeted fulfillment in November 2026. Pre-orders are 100% refundable at any time prior to shipment.
                  </label>
                </div>
                {errors.agreedTerms && (
                  <p className="text-[11px] text-rose-400 mt-1">{errors.agreedTerms}</p>
                )}
              </div>

              {/* Total Calculation & Submit CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-neutral-400 uppercase font-mono">
                    Total Due Today
                  </div>
                  <div className="font-display text-3xl font-extrabold text-white font-mono-numeric">
                    ${totalPrice}{' '}
                    <span className="text-xs font-normal text-emerald-400 font-sans">
                      (Free Global Courier)
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 disabled:opacity-50 rounded-md transition-all duration-200 shadow-md shadow-amber-400/20 active:translate-y-px flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Securing Allocation...
                    </span>
                  ) : (
                    <>
                      <span>Lock In Batch 02 Reservation</span>
                      <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Instant Order Confirmation Screen */
            <div className="py-8 text-center animate-fadeIn">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={32} />
              </div>

              <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
                Batch 02 Reservation Confirmed
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome to Quiet Craft, {fullName}.
              </h3>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-6">
                Your hardware allocation has been logged. A formal confirmation dispatch with your build sheet has been sent to <span className="text-white font-semibold">{email}</span>.
              </p>

              {/* Receipt Summary Card */}
              <div className="max-w-md mx-auto p-5 rounded-xl bg-white/[0.03] border border-white/10 text-left mb-8 font-mono text-xs space-y-2">
                <div className="flex justify-between pb-2 border-b border-white/10 text-neutral-400">
                  <span>RESERVATION CODE</span>
                  <span className="text-amber-400 font-bold">{reservationCode}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Product Edition</span>
                  <span className="text-white font-semibold">{currentTier.name}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Anodized Finish</span>
                  <span className="text-white font-semibold capitalize">{finish}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Target Fulfillment</span>
                  <span className="text-white font-semibold">{currentTier.shippingDate}</span>
                </div>
                <div className="flex justify-between text-neutral-300">
                  <span>Delivery Region</span>
                  <span className="text-white font-semibold">{country}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-white/10 text-neutral-200 font-bold">
                  <span>Total Paid</span>
                  <span className="text-amber-400">${totalPrice} USD</span>
                </div>
              </div>

              {/* Referral Share Perk */}
              <div className="max-w-md mx-auto p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 mb-8 flex items-center justify-between">
                <div className="text-left text-xs">
                  <div className="text-amber-400 font-semibold">Priority Batch Bump</div>
                  <div className="text-neutral-400 text-[11px]">
                    Share with a colleague to move up 25 fulfillment slots
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="px-3 py-1.5 rounded bg-amber-400 text-black font-semibold text-xs flex items-center gap-1.5 hover:bg-amber-300 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check size={13} /> Copied
                    </>
                  ) : (
                    <>
                      <Copy size={13} /> Copy Link
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-neutral-400 hover:text-white underline transition-colors"
              >
                Configure another unit or edit reservation
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
