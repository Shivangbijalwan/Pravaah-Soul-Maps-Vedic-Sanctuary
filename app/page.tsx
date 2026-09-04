"use client";

import {
  AboutSection,
  Footer,
  HeroSection,
  Navbar,
  ProcessSection,
  InfiniteHoroscopeCarousel,
} from "../components";

export default function Home() {
  const scrollToProcess = () => {
    document
      .getElementById("journey-process")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-abyss text-cream">
      <Navbar />

      <main>
        <HeroSection
          onBeginJourney={scrollToProcess}
          onSeeHowItWorks={scrollToProcess}
        />

        <InfiniteHoroscopeCarousel />
        <AboutSection />
        <ProcessSection onStepClick={scrollToProcess} />
      </main>

      <Footer onOpenBirthModal={scrollToProcess} />
    </div>
  );
}

