import { Header } from '../components/Header';
import { Hero } from '../components/landing/Hero';
import { TopConditions } from '../components/landing/TopConditions';
import { NearbyDoctorsPublic } from '../components/landing/NearbyDoctorsPublic';
import { LabTests } from '../components/landing/LabTests';
import { HealthcareCategories } from '../components/landing/HealthcareCategories';
import { AIHelpSection } from '../components/landing/AIHelpSection';
import { CTASection } from '../components/landing/CTASection';
import { Footer } from '../components/landing/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Top Conditions */}
        <TopConditions />
        
        {/* Healthcare Categories */}
        <HealthcareCategories />
        
        {/* Nearby Doctors */}
        <NearbyDoctorsPublic />
        
        {/* Lab Tests */}
        <LabTests />
        
        {/* AI Help Section */}
        <AIHelpSection />
        
        {/* CTA Section */}
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}