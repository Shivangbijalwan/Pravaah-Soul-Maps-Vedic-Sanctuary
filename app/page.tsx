"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  AboutSection,
  Footer,
  HeroSection,
  Navbar,
  ProcessSection,
  ReadingPreviewSection,
  TestimonialsSection,
  InfiniteHoroscopeCarousel,
  BirthCoordinatesModal,
} from "../components";

export default function Home() {
  const router = useRouter();
  const [isBirthModalOpen, setIsBirthModalOpen] = useState(false);

  const openReadingForm = () => setIsBirthModalOpen(true);

  const submitReading = async (data: {
    fullName: string;
    birthDate: string;
    birthTime: string;
    birthPlace: string;
  }) => {
    const response = await fetch("/api/reading", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.fullName,
        dob: data.birthDate,
        time: data.birthTime,
        place: data.birthPlace,
      }),
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || "Unable to generate your reading.");
    }

    sessionStorage.setItem("latestReading", JSON.stringify(result));
    router.push("/discover");
  };

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
          onBeginJourney={openReadingForm}
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

      <Footer onOpenBirthModal={openReadingForm} />

      <BirthCoordinatesModal
        isOpen={isBirthModalOpen}
        onClose={() => setIsBirthModalOpen(false)}
        onSubmitCoordinates={submitReading}
      />
    </div>
  );
}
