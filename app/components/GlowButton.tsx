"use client";

import { motion } from "framer-motion";
import { useHapticSnackbar } from "@/context/HapticSnackbarContext";

interface GlowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  ariaLabel?: string;
}

export function GlowButton({
  children,
  onClick,
  className = "",
  ariaLabel,
}: GlowButtonProps) {
  const { triggerHaptic } = useHapticSnackbar();

  const handleClick = () => {
    triggerHaptic("success");
    onClick?.();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`relative group ${className}`}
    >
      {/* Animated rotating gradient background */}
      <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-600 via-pink-500 to-blue-600 opacity-75 blur-sm group-hover:opacity-100 animate-gradient-xy transition-opacity duration-500" />

      {/* Coursing border animation */}
      <div className="absolute -inset-[2px] rounded-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-conic from-blue-500 via-purple-500 via-pink-500 via-purple-500 to-blue-500 animate-spin-slow" />
      </div>

      {/* Corner accents */}
      <div className="absolute -top-1 -left-1 w-4 h-4 rounded-tl-xl bg-gradient-to-br from-purple-500 to-transparent opacity-80 animate-pulse shadow-lg shadow-purple-500/50" />
      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-tr-xl bg-gradient-to-bl from-blue-500 to-transparent opacity-80 animate-pulse shadow-lg shadow-blue-500/50" style={{ animationDelay: "0.5s" }} />
      <div className="absolute -bottom-1 -left-1 w-4 h-4 rounded-bl-xl bg-gradient-to-tr from-pink-500 to-transparent opacity-80 animate-pulse shadow-lg shadow-pink-500/50" style={{ animationDelay: "1s" }} />
      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-br-xl bg-gradient-to-tl from-purple-500 to-transparent opacity-80 animate-pulse shadow-lg shadow-purple-500/50" style={{ animationDelay: "1.5s" }} />

      {/* Inner button content */}
      <div className="relative px-8 py-4 rounded-xl bg-black/90 backdrop-blur-sm border border-zinc-800/50 group-hover:bg-black/80 transition-all duration-300">
        {/* Inner glow effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/10 via-purple-600/20 to-blue-600/10 group-hover:from-blue-600/20 group-hover:via-purple-600/30 group-hover:to-blue-600/20 transition-all duration-300" />

        {/* Text content */}
        <span className="relative z-10 flex items-center justify-center gap-2 text-white font-semibold tracking-wide text-shadow-glow">
          {children}
        </span>
      </div>

      {/* Outer glow pulse */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
    </motion.button>
  );
}
