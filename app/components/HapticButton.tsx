"use client";

import { motion } from "framer-motion";
import { useHapticSnackbar } from "@/context/HapticSnackbarContext";

interface HapticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  hapticType?: "click" | "success" | "navigation";
  disabled?: boolean;
  ariaLabel?: string;
}

const variantStyles = {
  primary: `
    bg-blue-600 text-white border-2 border-blue-600
    hover:bg-blue-500 hover:border-blue-500
    shadow-lg shadow-blue-500/25
  `,
  secondary: `
    bg-zinc-800 text-zinc-100 border-2 border-zinc-700
    hover:bg-zinc-700 hover:border-zinc-600
  `,
  outline: `
    bg-transparent text-blue-400 border-2 border-blue-500
    hover:bg-blue-500 hover:text-white
  `,
  ghost: `
    bg-transparent text-zinc-400 border-2 border-transparent
    hover:bg-zinc-800 hover:text-zinc-100
  `,
};

export function HapticButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  hapticType = "click",
  disabled = false,
  ariaLabel,
}: HapticButtonProps) {
  const { triggerHaptic } = useHapticSnackbar();

  const handleClick = () => {
    if (disabled) return;
    triggerHaptic(hapticType);
    onClick?.();
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      onClick={handleClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`
        px-6 py-3 rounded-xl font-medium
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {children}
    </motion.button>
  );
}
