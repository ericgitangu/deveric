"use client";

import Link from "next/link";
import { useHapticSnackbar } from "@/context/HapticSnackbarContext";

interface HapticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  showToast?: boolean;
  toastMessage?: string;
}

export function HapticLink({
  href,
  children,
  className = "",
  external = false,
  showToast = false,
  toastMessage,
}: HapticLinkProps) {
  const { triggerHaptic, showSnackbar } = useHapticSnackbar();

  const handleClick = () => {
    triggerHaptic("navigation");
    if (showToast && toastMessage) {
      showSnackbar(toastMessage, "info");
    }
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}
