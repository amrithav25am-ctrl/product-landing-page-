export type ProductFinish = 'charcoal' | 'silver' | 'brass';

export type FocusMode = 'pomodoro' | 'soundscape' | 'tasks' | 'code';

export interface PreOrderData {
  fullName: string;
  email: string;
  country: string;
  finish: ProductFinish;
  tierId: string;
  addChargingDock: boolean;
}

export interface PricingTier {
  id: string;
  name: string;
  tagline: string;
  priceUsd: number;
  priceEur: number;
  priceGbp: number;
  popular?: boolean;
  features: string[];
  shippingDate: string;
  batchCountRemaining: number;
}

export interface Testimonial {
  id: string;
  quote: string;
  highlight: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  category: 'engineering' | 'design' | 'writing';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}
