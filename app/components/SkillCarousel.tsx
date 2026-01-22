"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { skillAreas } from "@/about/data";
import { SkillCard } from "./SkillCard";
import { CarouselDots } from "./CarouselDots";
import { useHapticSnackbar } from "@/context/HapticSnackbarContext";

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

export function SkillCarousel() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [isAutoScrollPaused, setIsAutoScrollPaused] = useState(false);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { triggerHaptic } = useHapticSnackbar();

  const pauseAutoScroll = useCallback(() => {
    setIsAutoScrollPaused(true);
    if (pauseTimeoutRef.current) {
      clearTimeout(pauseTimeoutRef.current);
    }
    pauseTimeoutRef.current = setTimeout(() => {
      setIsAutoScrollPaused(false);
    }, 10000); // Resume after 10s
  }, []);

  const paginate = useCallback(
    (newDirection: number) => {
      triggerHaptic("navigation");
      pauseAutoScroll();
      setPage((prev) => {
        const [currentPage] = prev;
        const nextPage = currentPage + newDirection;
        if (nextPage >= 0 && nextPage < skillAreas.length) {
          return [nextPage, newDirection];
        } else if (nextPage < 0) {
          return [skillAreas.length - 1, newDirection];
        } else {
          return [0, newDirection];
        }
      });
    },
    [triggerHaptic, pauseAutoScroll]
  );

  const goToPage = useCallback((index: number) => {
    triggerHaptic("click");
    pauseAutoScroll();
    setPage((prev) => [index, index > prev[0] ? 1 : -1]);
  }, [triggerHaptic, pauseAutoScroll]);

  const goNext = useCallback(() => paginate(1), [paginate]);
  const goPrev = useCallback(() => paginate(-1), [paginate]);

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: goNext,
    onSwipedRight: goPrev,
    preventScrollOnSwipe: true,
    trackMouse: false,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    if (isAutoScrollPaused || skillAreas.length <= 1) {
      return;
    }

    const totalSkills = skillAreas.length;
    const intervalId = setInterval(() => {
      setPage(([currentPage]) => {
        const nextPage = (currentPage + 1) % totalSkills;
        return [nextPage, 1];
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isAutoScrollPaused]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  const currentSkill = skillAreas[page];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Skills showcase"
      className="w-full max-w-lg mx-auto"
    >
      {/* Carousel Container */}
      <div
        {...handlers}
        className="relative overflow-hidden touch-pan-y"
        style={{ minHeight: "380px" }}
      >
        {/* Arrow Buttons - visible on md+ */}
        <button
          onClick={goPrev}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 items-center justify-center
            bg-zinc-800/80 hover:bg-zinc-700 rounded-full
            text-zinc-400 hover:text-zinc-100
            transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
          aria-label="Previous skill"
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
          aria-label="Next skill"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slides */}
        <div className="px-4 md:px-14">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
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
              <SkillCard skill={currentSkill} isActive />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Dots */}
      <CarouselDots
        total={skillAreas.length}
        current={page}
        onSelect={goToPage}
        labels={skillAreas.map((s) => s.shortTitle)}
      />

      {/* Mobile swipe hint */}
      <p className="text-center text-sm text-zinc-200 md:hidden mt-2 animate-text-shine">
        Swipe left or right to navigate
      </p>

      {/* Desktop keyboard hint */}
      <p className="hidden md:block text-center text-sm text-zinc-200 mt-2 animate-text-shine">
        Use arrow keys or click to navigate
      </p>
    </div>
  );
}
