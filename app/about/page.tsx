import React from "react";
import Particles from "../components/particles";
import { Navigation } from "../components/nav";
import { BioSection } from "../components/BioSection";
import { SkillCarousel } from "../components/SkillCarousel";
import { education, experience } from "./data";

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

        {/* Experience: plain server-rendered markup so the full career history
            is in the HTML (the carousel above shows one card at a time). */}
        <section aria-labelledby="experience" className="w-full max-w-3xl mt-20">
          <h2 id="experience" className="text-xl md:text-2xl font-display text-zinc-100 mb-8 text-center">
            Experience
          </h2>
          <ol className="relative border-l border-zinc-800 ml-2 space-y-10">
            {experience.map((role) => (
              <li key={`${role.company}-${role.period}`} className="pl-6">
                <span className="absolute -left-[5px] mt-2 h-2.5 w-2.5 rounded-full bg-zinc-500" aria-hidden="true" />
                <h3 className="text-base md:text-lg font-semibold text-zinc-100">
                  {role.title}
                </h3>
                <p className="text-sm text-zinc-300">{role.company}</p>
                <p className="text-xs text-zinc-500 mb-3">
                  {role.period} · {role.location}
                </p>
                <p className="text-sm text-zinc-400 leading-relaxed">{role.summary}</p>
                {role.highlights.length > 0 && (
                  <ul className="mt-3 space-y-1.5 list-disc pl-4 text-sm text-zinc-400 leading-relaxed marker:text-zinc-600">
                    {role.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="education" className="w-full max-w-3xl mt-16">
          <h2 id="education" className="text-xl md:text-2xl font-display text-zinc-100 mb-6 text-center">
            Education
          </h2>
          <div className="text-center">
            <h3 className="text-base md:text-lg font-semibold text-zinc-100">{education.school}</h3>
            <p className="text-sm text-zinc-300">{education.degree}</p>
            <p className="text-xs text-zinc-500 mb-3">{education.period}</p>
            <ul className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-zinc-400">
              {education.honors.map((h) => (
                <li key={h.label}>
                  {h.href ? (
                    <a
                      href={h.href}
                      target="_blank"
                      rel="noopener"
                      className="underline decoration-zinc-600 underline-offset-4 hover:text-zinc-200"
                    >
                      {h.label}
                    </a>
                  ) : (
                    h.label
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
