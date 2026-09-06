"use client";

import {
  AboutSection,
  Footer,
  HeroSection,
  Navbar,
  ProcessSection,
  ReadingPreviewSection,
  TestimonialsSection,
  InfiniteHoroscopeCarousel,
} from "../components";

export default function Home() {
  const scrollToProcess = () => {
    document
      .getElementById("journey-process")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0C0A09] text-[#FAFAF9]">
      <Navbar />

      <main>
        {/* Hero — full viewport */}
        <HeroSection
          onSeeHowItWorks={scrollToProcess}
        />

        {/* Divider */}
        <div className="section-divider mx-8 sm:mx-16 lg:mx-32" />

        {/* Horoscope carousel marquee */}
        <InfiniteHoroscopeCarousel />

        {/* About */}
        <div className="section-divider mx-8 sm:mx-16 lg:mx-32" />
        <AboutSection />

        {/* Process */}
        <div className="section-divider mx-8 sm:mx-16 lg:mx-32" />
        <ProcessSection onStepClick={scrollToProcess} />

        {/* Reading Preview */}
        <div className="section-divider mx-8 sm:mx-16 lg:mx-32" />
        <ReadingPreviewSection />

        {/* Testimonials */}
        <div className="section-divider mx-8 sm:mx-16 lg:mx-32" />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}
