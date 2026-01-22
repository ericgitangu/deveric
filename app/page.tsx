"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import Particles from "./components/particles";
import Image from "next/image";
import { Button, Tooltip, Snackbar, Alert } from "@mui/material";
import { ScrollHint } from "./components/ScrollHint";
import { BioSection } from "./components/BioSection";
import { SkillCarousel } from "./components/SkillCarousel";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Certifications", href: "/certifications" },
  { name: "Contact", href: "/contact" },
  { name: "Blog", href: "/blog" },
  { name: "Journal", href: "/journal" },
  { name: "Fun", href: "/fun" },
];

export default function Home() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("info");
  const aboutSectionRef = useRef<HTMLDivElement>(null);

  const handleButtonClick = () => {
    const resumeLink = "https://resume.ericgitangu.com";
    window.open(resumeLink, "_blank", "noopener,noreferrer");
    setSnackbarMessage("Opening interactive resume with AI chatbot!");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      {/* Particles Background - fixed position */}
      <Particles
        className="fixed inset-0 -z-10"
        quantity={500}
        twinkle
        constellation
      />

      {/* Hero Section - Full Viewport */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4">
        {/* Navigation Menu */}
        <nav className="absolute top-0 left-0 right-0 py-8 animate-fade-in">
          <ul className="flex items-center justify-center gap-4 flex-wrap">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-slate-400 hover:text-zinc-300"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>

        {/* Decorative Gradient Line */}
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

        {/* Main Heading */}
        <h1 className="flex z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text">
          deveric{" "}
          <span aria-hidden="true">
            <Image
              style={{ borderRadius: "50%", marginTop: "-1rem" }}
              src="/favicon.png"
              width={75}
              height={75}
              alt="Eric Gitangu's photo"
            />
          </span>
        </h1>

        {/* Decorative Gradient Line */}
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

        {/* Executive Summary */}
        <div className="my-8 mx-8 text-center animate-fade-in max-w-2xl">
          <h2 className="text-sm md:text-base text-slate-400">
            I'm Eric Gitangu <span className="font-semibold">(Deveric)</span>, an
            experienced engineering leader skilled in architecting scalable
            systems, driving technical strategy, and building high-performing
            teams and solutions.
          </h2>
        </div>

        {/* Interactive Resume Button - Prominent */}
        <div className="animate-fade-in">
          <Tooltip title="View my interactive resume with AI chatbot">
            <Button
              variant="contained"
              color="primary"
              onClick={handleButtonClick}
              sx={{
                paddingX: 5,
                paddingY: 2,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: "12px",
                textTransform: "none",
                backgroundColor: "#3b82f6",
                border: "2px solid #3b82f6",
                boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: "#3b82f6",
                  borderColor: "#3b82f6",
                  transform: "scale(1.05)",
                  boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)",
                },
                transition: "all 0.3s ease",
              }}
              aria-label="View my Interactive Resume"
            >
              View Interactive Resume
            </Button>
          </Tooltip>
        </div>

        {/* Scroll Hint */}
        <div className="mt-8">
          <ScrollHint onClick={scrollToAbout} />
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutSectionRef}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16"
      >
        {/* Section Title */}
        <h2 className="text-3xl md:text-5xl text-transparent bg-white text-edge-outline font-display bg-clip-text mb-8 animate-fade-in">
          About Me
        </h2>

        {/* Divider */}
        <div className="w-full max-w-md h-px bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0 mb-12" />

        {/* Bio Section */}
        <div className="animate-fade-in mb-16">
          <BioSection />
        </div>

        {/* Skills Section */}
        <div className="w-full animate-fade-in">
          <h3 className="text-center text-xl md:text-2xl font-display text-zinc-100 mb-8">
            Areas of Expertise
          </h3>
          <SkillCarousel />
        </div>

        {/* Secondary CTA */}
        <div className="mt-16 animate-fade-in">
          <Tooltip title="View my interactive resume with AI chatbot">
            <Button
              variant="outlined"
              onClick={handleButtonClick}
              sx={{
                paddingX: 4,
                paddingY: 1.5,
                fontWeight: "bold",
                borderRadius: "8px",
                textTransform: "none",
                color: "#3b82f6",
                borderColor: "#3b82f6",
                "&:hover": {
                  backgroundColor: "#3b82f6",
                  color: "white",
                  borderColor: "#3b82f6",
                },
                transition: "all 0.3s ease",
              }}
              aria-label="View my Interactive Resume"
            >
              Explore My Full Resume
            </Button>
          </Tooltip>
        </div>
      </section>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}
