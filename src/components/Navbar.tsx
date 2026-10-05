import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { toggleHapticSound, isHapticSoundEnabled } from '../utils/audio';

interface NavbarProps {
  onPreOrderClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onPreOrderClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleHapticSound();
    setSoundOn(newState);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0d0e]/85 backdrop-blur-md border-b border-white/[0.08] shadow-lg shadow-black/20 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="font-display text-lg tracking-wider font-bold text-white hover:text-amber-400 transition-colors uppercase whitespace-nowrap shrink-0"
        >
          Kanso Dial
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          <a href="#showcase" className="hover:text-white transition-colors">
            Console
          </a>
          <a href="#engineering" className="hover:text-white transition-colors">
            Hardware
          </a>
          <a href="#testimonials" className="hover:text-white transition-colors">
            Outcomes
          </a>
          <a href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-white transition-colors">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={handleSoundToggle}
            aria-label={soundOn ? 'Mute mechanical clicks' : 'Enable mechanical clicks'}
            className="p-2 text-neutral-400 hover:text-neutral-200 transition-colors rounded-lg border border-white/10 hover:border-white/20 bg-white/[0.03]"
            title={soundOn ? 'Tactile clicks ON' : 'Tactile clicks MUTED'}
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            type="button"
            onClick={onPreOrderClick}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-md transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-amber-400/20 active:translate-y-px"
          >
            <span>Pre-order $289</span>
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#111215] border-b border-white/10 px-6 py-4 flex flex-col gap-3.5 text-sm font-medium animate-fadeIn">
          <a
            href="#showcase"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Console Simulator
          </a>
          <a
            href="#engineering"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Hardware Specs
          </a>
          <a
            href="#testimonials"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Tested Outcomes
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            Pricing & Editions
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="text-neutral-300 hover:text-white py-1"
          >
            FAQ
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onPreOrderClick();
            }}
            className="w-full mt-2 py-2.5 text-xs font-semibold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-md text-center"
          >
            Pre-order Kanso Dial ($289)
          </button>
        </div>
      )}
    </header>
  );
};
