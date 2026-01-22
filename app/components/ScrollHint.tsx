"use client";

import { motion } from "framer-motion";
import { ChevronDown, Mouse } from "lucide-react";

interface ScrollHintProps {
  onClick?: () => void;
  className?: string;
}

export function ScrollHint({ onClick, className = "" }: ScrollHintProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
      className={`flex flex-col items-center gap-2 cursor-pointer ${className}`}
      onClick={onClick}
      role="button"
      aria-label="Scroll to explore more content"
    >
      {/* Mouse Icon with scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        <Mouse className="w-6 h-6 text-zinc-400" strokeWidth={1.5} />
        {/* Scroll wheel animation */}
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [1, 0.3, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-2 left-1/2 -translate-x-1/2 w-1 h-1.5 bg-zinc-400 rounded-full"
        />
      </motion.div>

      {/* Chevron arrows */}
      <div className="flex flex-col items-center -space-y-1">
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0,
          }}
        >
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 4, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.15,
          }}
        >
          <ChevronDown className="w-4 h-4 text-zinc-500" />
        </motion.div>
      </div>

      {/* Text */}
      <motion.span
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-xs text-zinc-500 tracking-wider uppercase"
      >
        Scroll to explore
      </motion.span>
    </motion.div>
  );
}
