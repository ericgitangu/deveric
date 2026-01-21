import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";
import { BioSection } from "../components/BioSection";
import { SkillCarousel } from "../components/SkillCarousel";

export default function About() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <Navigation />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={500}
      />

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center px-4 py-16 md:py-24">
        {/* Title */}
        <h1 className="text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text mb-8">
          About
        </h1>

        {/* Divider */}
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mb-12" />

        {/* Bio Section */}
        <div className="animate-fade-in mb-12">
          <BioSection />
        </div>

        {/* Skills Section */}
        <section className="w-full animate-fade-in">
          <h2 className="text-center text-xl md:text-2xl font-display text-zinc-100 mb-8">
            Areas of Expertise
          </h2>
          <SkillCarousel />
        </section>
      </main>
    </div>
  );
}
