"use client";

type HapticIntensity = "light" | "medium" | "heavy";
type HapticPattern = "success" | "error" | "warning" | "info" | "click" | "navigation";

interface HapticOptions {
  intensity?: HapticIntensity;
  pattern?: HapticPattern;
}

const vibrationPatterns: Record<HapticPattern, number[]> = {
  success: [50, 30, 50], // Two short pulses
  error: [100, 50, 100, 50, 100], // Three longer pulses
  warning: [75, 50, 75], // Two medium pulses
  info: [30], // Single short pulse
  click: [10], // Very short tap
  navigation: [20, 10, 20], // Quick double tap
};

const intensityMultiplier: Record<HapticIntensity, number> = {
  light: 0.5,
  medium: 1,
  heavy: 1.5,
};

export function useHaptics() {
  const vibrate = (options: HapticOptions = {}) => {
    const { intensity = "medium", pattern = "click" } = options;

    // Check if vibration API is supported
    if (typeof navigator === "undefined" || !navigator.vibrate) {
      return false;
    }

    const basePattern = vibrationPatterns[pattern];
    const multiplier = intensityMultiplier[intensity];

    // Apply intensity multiplier to vibration durations
    const adjustedPattern = basePattern.map((duration) =>
      Math.round(duration * multiplier)
    );

    try {
      navigator.vibrate(adjustedPattern);
      return true;
    } catch {
      return false;
    }
  };

  const success = (intensity: HapticIntensity = "medium") =>
    vibrate({ pattern: "success", intensity });

  const error = (intensity: HapticIntensity = "heavy") =>
    vibrate({ pattern: "error", intensity });

  const warning = (intensity: HapticIntensity = "medium") =>
    vibrate({ pattern: "warning", intensity });

  const info = (intensity: HapticIntensity = "light") =>
    vibrate({ pattern: "info", intensity });

  const click = (intensity: HapticIntensity = "light") =>
    vibrate({ pattern: "click", intensity });

  const navigation = (intensity: HapticIntensity = "light") =>
    vibrate({ pattern: "navigation", intensity });

  return {
    vibrate,
    success,
    error,
    warning,
    info,
    click,
    navigation,
  };
}
