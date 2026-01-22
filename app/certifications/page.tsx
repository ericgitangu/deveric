"use client";

import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";
import { CertificationCarousel } from "../components/CertificationCarousel";
import { linkedInSkillsUrl } from "./data";

export default function Certification() {
  return (
    <div className="relative min-h-screen bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <Navigation />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={300}
      />

      <main className="relative z-10 flex flex-col items-center px-4 py-16 md:py-24">
        {/* Title */}
        <h1 className="text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text mb-8">
          Certifications
        </h1>

        {/* Divider */}
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mb-8" />

        {/* Subtitle */}
        <p className="text-center text-zinc-400 max-w-xl mb-8 animate-fade-in">
          Professional certifications and courses from leading tech companies and
          universities, demonstrating continuous learning and expertise across
          multiple domains.
        </p>

        {/* Certification Carousel */}
        <div className="w-full animate-fade-in">
          <CertificationCarousel />
        </div>

        {/* Skills Link */}
        <div className="mt-12 text-center animate-fade-in">
          <p className="text-sm text-zinc-400">
            View my verified and endorsed{" "}
            <a
              href={linkedInSkillsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              skillsets on LinkedIn
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
}
