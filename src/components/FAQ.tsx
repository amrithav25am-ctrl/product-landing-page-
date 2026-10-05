import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQItem } from '../types';
import { useScrollReveal } from '../hooks/useScrollReveal';

const FAQ_ITEMS: FAQItem[] = [
  {
    id: '1',
    category: 'Hardware & Longevity',
    question: 'Does Kanso Dial require any ongoing subscription or cloud account?',
    answer:
      'Never. When you purchase Kanso Dial, you own the hardware entirely. There are no monthly fees, locked features, or mandatory cloud logins. The device runs completely on-device firmware and will function indefinitely even if our company ceased to exist tomorrow.',
  },
  {
    id: '2',
    category: 'Display & Performance',
    question: 'How fast is the e-paper refresh rate when turning the dials?',
    answer:
      'We engineered a proprietary partial-refresh waveform for the electrophoretic display. Numerical counter increments and timer dials update at 60 Hz with sub-12ms latency using localized 1-bit monochrome dithering, giving the tactile sensation of instant mechanical feedback with zero ghosting.',
  },
  {
    id: '3',
    category: 'Compatibility',
    question: 'Which operating systems and software tools does it support?',
    answer:
      'Kanso Dial works 100% standalone out of the box (built-in timers, pomodoro intervals, ambient clock, and offline sounds). For computer synchronization (calendar events, active Spotify playback, Git commits, Obsidian task sync), it connects via standard USB HID or Bluetooth LE across macOS (Apple Silicon & Intel), Windows 10/11, and modern Linux distributions without requiring kernel drivers.',
  },
  {
    id: '4',
    category: 'Developer & Customization',
    question: 'Can I write custom widgets or integrate it with my own workflow?',
    answer:
      'Yes. We provide an open-source local SDK in Rust, Python, and TypeScript. You can build custom screens, hook into home automation, query local LLMs, or display stock tickers directly on the high-contrast e-paper display over local serial USB.',
  },
  {
    id: '5',
    category: 'Battery & Power',
    question: 'How does it achieve a 45-day battery life?',
    answer:
      'Electrophoretic e-paper only draws current when micro-capsule pigments flip from black to white. In static mode, power consumption is essentially zero. Combined with an ultra-low-power Nordic nRF5340 dual-core ARM microcontroller and an integrated 1,400 mAh LiFePO4 safe battery cell, a single charge easily lasts 6 to 8 weeks of standard 8-hour workday usage.',
  },
  {
    id: '6',
    category: 'Orders & Guarantee',
    question: 'What is your return policy and warranty on mechanical parts?',
    answer:
      'We offer a 30-day no-questions-asked in-studio trial. If Kanso does not noticeably enhance your daily focus, return it in original condition for a 100% full refund with prepaid return shipping. All units come backed by our comprehensive warranty against encoder drift, bearing wear, or component failure.',
  },
];

export const FAQ: React.FC = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [openId, setOpenId] = useState<string | null>('1');

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-[#0e1012] border-t border-white/[0.06] relative">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto px-4 sm:px-6 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-widest text-amber-400 font-semibold mb-2">
            Answers & Clarifications
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 [text-wrap:balance]">
            Frequently Asked Questions
          </h2>
          <p className="text-base text-neutral-300 leading-relaxed max-w-xl mx-auto [text-wrap:balance]">
            Everything you need to know about craftsmanship, local firmware, and our reservation timeline.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#15171b] border-amber-400/40 shadow-lg shadow-black/40'
                    : 'bg-[#121417] border-white/[0.07] hover:border-white/20'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(item.id)}
                  aria-expanded={isOpen}
                  className="w-full py-4.5 px-6 flex items-center justify-between text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                >
                  <div className="pr-4">
                    <span className="text-[11px] font-mono text-neutral-400 block mb-1">
                      {item.category}
                    </span>
                    <span className="font-semibold text-base text-white tracking-tight">
                      {item.question}
                    </span>
                  </div>
                  <div
                    className={`p-1.5 rounded-full text-neutral-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? 'rotate-180 text-amber-400 bg-amber-400/10' : ''
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* Animated Collapsible Content */}
                <div
                  className={`transition-all duration-300 ease-in-out px-6 overflow-hidden ${
                    isOpen ? 'max-h-96 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <p className="text-sm text-neutral-300 leading-relaxed border-t border-white/[0.06] pt-3.5">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Direct Concierge Prompt */}
        <div className="mt-12 text-center text-xs text-neutral-400">
          Have an engineering or custom fleet inquiry?{' '}
          <a
            href="mailto:concierge@kansodial.com"
            className="text-amber-400 hover:underline font-medium"
          >
            concierge@kansodial.com
          </a>
        </div>
      </div>
    </section>
  );
};
