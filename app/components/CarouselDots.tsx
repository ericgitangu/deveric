"use client";

import { motion } from "framer-motion";

interface CarouselDotsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  labels?: string[];
}

export function CarouselDots({
  total,
  current,
  onSelect,
  labels,
}: CarouselDotsProps) {
  return (
    <div
      role="tablist"
      aria-label="Skill carousel navigation"
      className="flex items-center justify-center gap-2 py-4"
    >
      {Array.from({ length: total }).map((_, index) => (
        <button
          key={index}
          role="tab"
          aria-selected={current === index}
          aria-label={labels?.[index] ?? `Slide ${index + 1}`}
          onClick={() => onSelect(index)}
          className="relative p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 rounded-full"
        >
          <motion.div
            initial={false}
            animate={{
              width: current === index ? 16 : 8,
              backgroundColor: current === index ? "#f4f4f5" : "#52525b",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="h-2 rounded-full"
          />
        </button>
      ))}
    </div>
  );
}
