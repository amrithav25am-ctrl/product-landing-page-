import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#090a0b] border-t border-white/[0.08] py-16 text-neutral-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-4">
            <span className="font-display text-lg tracking-wider font-bold text-white uppercase block mb-3">
              Kanso Dial
            </span>
            <p className="text-neutral-400 leading-relaxed max-w-sm mb-4">
              Tactile desktop focus consoles engineered for undistracted human thought. Designed in Copenhagen and San Francisco.
            </p>
            <div className="text-[11px] text-neutral-500 font-mono">
              ISO 9001 Certified Assembly · RoHS & CE Compliant
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div className="md:col-span-2">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono mb-3">
              Product
            </div>
            <ul className="space-y-2">
              <li><a href="#showcase" className="hover:text-white transition-colors">Console Simulator</a></li>
              <li><a href="#engineering" className="hover:text-white transition-colors">Hardware Architecture</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Editions</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Specs</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono mb-3">
              Developers & Open Source
            </div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">Rust HID SDK</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Python Local Client</a></li>
              <li><a href="#" className="hover:text-white transition-colors">E-Paper Waveform Specs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">CAD Step Files (.step)</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-semibold text-white uppercase tracking-wider text-[11px] font-mono mb-3">
              Customer Studio Support
            </div>
            <p className="text-neutral-400 mb-2 leading-relaxed">
              Batch 02 delivery updates and concierge technical support available Monday–Friday.
            </p>
            <a
              href="mailto:support@kansodial.com"
              className="text-amber-400 hover:underline font-mono text-[11px]"
            >
              support@kansodial.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © 2026 Kanso Instruments Inc. All rights reserved. Zero cookies tracked.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Terms of Reservation</a>
            <a href="#" className="hover:text-neutral-300 transition-colors">Open Source Licenses</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
