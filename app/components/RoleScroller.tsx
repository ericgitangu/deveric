"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  { text: "Software Engineer Architect", color: "text-blue-400" },
  { text: "Lead Engineer", color: "text-emerald-400" },
  { text: "Full Stack Developer", color: "text-purple-400" },
  { text: "ML/AI Engineer", color: "text-orange-400" },
  { text: "DevOps Engineer", color: "text-cyan-400" },
  { text: "Cloud Architect", color: "text-pink-400" },
  { text: "Systems Designer", color: "text-yellow-400" },
  { text: "Backend Specialist", color: "text-indigo-400" },
  { text: "Mobile Developer", color: "text-rose-400" },
  { text: "Blockchain Developer", color: "text-violet-400" },
  { text: "Data Engineer", color: "text-teal-400" },
  { text: "Security Engineer", color: "text-red-400" },
  { text: "Platform Engineer", color: "text-lime-400" },
  { text: "API Architect", color: "text-amber-400" },
  { text: "Open Source Contributor", color: "text-sky-400" },
];

export function RoleScroller() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const currentRole = roles[currentIndex];

  return (
    <div className="h-8 overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`absolute inset-0 flex items-center justify-center font-medium ${currentRole.color}`}
        >
          {currentRole.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
