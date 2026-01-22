"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight, Filter, ExternalLink } from "lucide-react";
import {
  certifications,
  domains,
  linkedInCertificationsUrl,
  type CertificationDomain,
  type CertificationAuthority,
} from "@/certifications/data";
import { CertificationCard } from "./CertificationCard";
import { CarouselDots } from "./CarouselDots";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
  }),
};

const uniqueAuthorities = Array.from(
  new Set(certifications.map((c) => c.authority))
) as CertificationAuthority[];

type FilterType = "all" | "featured" | CertificationDomain | CertificationAuthority;

export function CertificationCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [filter, setFilter] = useState<FilterType>("featured");
  const [filterMode, setFilterMode] = useState<"domain" | "authority">("domain");

  const filteredCerts = useMemo(() => {
    if (filter === "all") return certifications;
    if (filter === "featured") return certifications.filter((c) => c.featured);
    if (domains.includes(filter as CertificationDomain)) {
      return certifications.filter((c) => c.domain === filter);
    }
    return certifications.filter((c) => c.authority === filter);
  }, [filter]);

  // Reset page when filter changes
  useEffect(() => {
    setPage([0, 0]);
  }, [filter]);

  const paginate = useCallback(
    (newDirection: number) => {
      const nextPage = page + newDirection;
      if (nextPage >= 0 && nextPage < filteredCerts.length) {
        setPage([nextPage, newDirection]);
      } else if (nextPage < 0) {
        setPage([filteredCerts.length - 1, newDirection]);
      } else {
        setPage([0, newDirection]);
      }
    },
    [page, filteredCerts.length]
  );

  const goToPage = useCallback((index: number) => {
    setPage((prev) => [index, index > prev[0] ? 1 : -1]);
  }, []);

  const goNext = useCallback(() => paginate(1), [paginate]);
  const goPrev = useCallback(() => paginate(-1), [paginate]);

  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  const currentCert = filteredCerts[page];
  const filterOptions =
    filterMode === "domain" ? domains : uniqueAuthorities;

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Certifications showcase"
      className="w-full max-w-2xl mx-auto"
    >
      {/* Filter Controls */}
      <div className="mb-6 space-y-4">
        {/* Filter Mode Toggle */}
        <div className="flex items-center justify-center gap-2">
          <Filter className="w-4 h-4 text-zinc-500" />
          <div className="flex bg-zinc-800 rounded-lg p-1">
            <button
              onClick={() => {
                setFilterMode("domain");
                setFilter("featured");
              }}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                filterMode === "domain"
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              By Domain
            </button>
            <button
              onClick={() => {
                setFilterMode("authority");
                setFilter("all");
              }}
              className={`px-3 py-1 text-xs rounded-md transition-colors ${
                filterMode === "authority"
                  ? "bg-zinc-700 text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              By Authority
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2">
          {filterMode === "domain" && (
            <button
              onClick={() => setFilter("featured")}
              className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                filter === "featured"
                  ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/50"
                  : "bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-transparent"
              }`}
            >
              Featured
            </button>
          )}
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
              filter === "all"
                ? "bg-zinc-600 text-zinc-100 border border-zinc-500"
                : "bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-transparent"
            }`}
          >
            All ({certifications.length})
          </button>
          {filterOptions.map((option) => {
            const count = certifications.filter((c) =>
              filterMode === "domain" ? c.domain === option : c.authority === option
            ).length;
            return (
              <button
                key={option}
                onClick={() => setFilter(option as FilterType)}
                className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                  filter === option
                    ? "bg-zinc-600 text-zinc-100 border border-zinc-500"
                    : "bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-transparent"
                }`}
              >
                {option} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Carousel Container */}
      <div
        {...handlers}
        className="relative overflow-hidden touch-pan-y"
        style={{ minHeight: "320px" }}
      >
        {/* Arrow Buttons */}
        <button
          onClick={goPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 items-center justify-center
            bg-zinc-800/80 hover:bg-zinc-700 rounded-full
            text-zinc-400 hover:text-zinc-100
            transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          aria-label="Previous certification"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={goNext}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 items-center justify-center
            bg-zinc-800/80 hover:bg-zinc-700 rounded-full
            text-zinc-400 hover:text-zinc-100
            transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          aria-label="Next certification"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slides */}
        <div className="px-4 md:px-14">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            {currentCert && (
              <motion.div
                key={`${filter}-${page}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
              >
                <CertificationCard certification={currentCert} isActive />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots - show max 10 */}
      {filteredCerts.length <= 15 && (
        <CarouselDots
          total={filteredCerts.length}
          current={page}
          onSelect={goToPage}
          labels={filteredCerts.map((c) => c.name)}
        />
      )}

      {/* Counter for large lists */}
      {filteredCerts.length > 15 && (
        <div className="text-center text-sm text-zinc-500 py-4">
          {page + 1} of {filteredCerts.length}
        </div>
      )}

      {/* Navigation hints */}
      <p className="text-center text-xs text-zinc-500 md:hidden mt-2">
        Swipe left or right to navigate
      </p>
      <p className="hidden md:block text-center text-xs text-zinc-500 mt-2">
        Use arrow keys or click to navigate
      </p>

      {/* View all on LinkedIn */}
      <div className="text-center mt-6">
        <a
          href={linkedInCertificationsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
        >
          <span>View all certifications on LinkedIn</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
