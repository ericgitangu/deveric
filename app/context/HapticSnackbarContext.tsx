"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useHaptics } from "@/hooks/useHaptics";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarMessage {
  id: string;
  message: string;
  severity: SnackbarSeverity;
  duration?: number;
}

interface HapticSnackbarContextType {
  showSnackbar: (
    message: string,
    severity?: SnackbarSeverity,
    duration?: number
  ) => void;
  triggerHaptic: (type: SnackbarSeverity | "click" | "navigation") => void;
}

const HapticSnackbarContext = createContext<HapticSnackbarContextType | null>(
  null
);

const severityConfig: Record<
  SnackbarSeverity,
  { icon: React.ElementType; bg: string; border: string; text: string }
> = {
  success: {
    icon: CheckCircle,
    bg: "bg-emerald-900/90",
    border: "border-emerald-500",
    text: "text-emerald-100",
  },
  error: {
    icon: XCircle,
    bg: "bg-red-900/90",
    border: "border-red-500",
    text: "text-red-100",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-900/90",
    border: "border-amber-500",
    text: "text-amber-100",
  },
  info: {
    icon: Info,
    bg: "bg-blue-900/90",
    border: "border-blue-500",
    text: "text-blue-100",
  },
};

export function HapticSnackbarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const haptics = useHaptics();

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  }, []);

  const showSnackbar = useCallback(
    (
      message: string,
      severity: SnackbarSeverity = "info",
      duration: number = 4000
    ) => {
      const id = `${Date.now()}-${Math.random()}`;

      // Trigger haptic based on severity
      switch (severity) {
        case "success":
          haptics.success();
          break;
        case "error":
          haptics.error();
          break;
        case "warning":
          haptics.warning();
          break;
        case "info":
          haptics.info();
          break;
      }

      setSnackbars((prev) => [...prev, { id, message, severity, duration }]);

      // Auto remove after duration
      setTimeout(() => {
        removeSnackbar(id);
      }, duration);
    },
    [haptics, removeSnackbar]
  );

  const triggerHaptic = useCallback(
    (type: SnackbarSeverity | "click" | "navigation") => {
      switch (type) {
        case "success":
          haptics.success();
          break;
        case "error":
          haptics.error();
          break;
        case "warning":
          haptics.warning();
          break;
        case "info":
          haptics.info();
          break;
        case "click":
          haptics.click();
          break;
        case "navigation":
          haptics.navigation();
          break;
      }
    },
    [haptics]
  );

  return (
    <HapticSnackbarContext.Provider value={{ showSnackbar, triggerHaptic }}>
      {children}

      {/* Snackbar Container */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {snackbars.map((snackbar) => {
            const config = severityConfig[snackbar.severity];
            const Icon = config.icon;

            return (
              <motion.div
                key={snackbar.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className={`
                  pointer-events-auto
                  flex items-center gap-3 px-4 py-3
                  ${config.bg} ${config.text}
                  border ${config.border}
                  rounded-xl backdrop-blur-sm
                  shadow-lg min-w-[280px] max-w-[400px]
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium flex-1">
                  {snackbar.message}
                </span>
                <button
                  onClick={() => {
                    haptics.click();
                    removeSnackbar(snackbar.id);
                  }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </HapticSnackbarContext.Provider>
  );
}

export function useHapticSnackbar() {
  const context = useContext(HapticSnackbarContext);
  if (!context) {
    throw new Error(
      "useHapticSnackbar must be used within a HapticSnackbarProvider"
    );
  }
  return context;
}
