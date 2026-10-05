import React, { useState } from 'react';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Showcase } from './components/Showcase';
import { Features } from './components/Features';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { PreOrderForm } from './components/PreOrderForm';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedTierId, setSelectedTierId] = useState('studio');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectTier = (tierId: string) => {
    setSelectedTierId(tierId);
    scrollToSection('reserve');
  };

  return (
    <div className="min-h-screen bg-[#0c0d0e] text-[#e6e8eb] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      {/* Scroll Depth Progress Bar */}
      <ScrollProgressBar />

      {/* 1-Row 3-Zone Top Navigation */}
      <Navbar onPreOrderClick={() => scrollToSection('reserve')} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero with Animated Headline & Product Frame */}
        <Hero
          onPreOrderClick={() => scrollToSection('reserve')}
          onExploreShowcase={() => scrollToSection('showcase')}
        />

        {/* Interactive Virtual Console & Macro Showcase */}
        <Showcase />

        {/* Asymmetric Bento Grid Hardware Breakdown */}
        <Features />

        {/* Filterable Quantified Testimonials & Outlined Outcomes */}
        <Testimonials />

        {/* Pricing Tables, Currency Toggle, & Spec Comparison */}
        <Pricing onSelectTier={handleSelectTier} />

        {/* Interactive FAQ Accordion */}
        <FAQ />

        {/* Finish Configurator & High-Converting Reservation Form */}
        <PreOrderForm
          selectedTierId={selectedTierId}
          onTierChange={setSelectedTierId}
        />
      </main>

      {/* Quiet Production Footer */}
      <Footer />
    </div>
  );
}
