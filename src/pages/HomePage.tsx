import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/home/Hero';
import { Vision } from '../components/home/Vision';
import { WhySection } from '../components/home/WhySection';
import { ConceptSection } from '../components/home/ConceptSection';
import { PricingTable } from '../components/home/PricingTable';
import { Features } from '../components/home/Features';
import { ForfaitCalculator } from '../components/home/ForfaitCalculator';
import { Testimonials } from '../components/home/Testimonials';
import { CTA } from '../components/home/CTA';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Vision />
      <WhySection />
      <ConceptSection />
      <PricingTable />
      <Features />
      <ForfaitCalculator />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};
