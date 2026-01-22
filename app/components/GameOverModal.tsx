"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Send, Loader2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { useHapticSnackbar } from "@/context/HapticSnackbarContext";

interface LeaderboardEntry {
  firstName: string;
  lastName: string;
  score: number;
  rating: number;
  feedback: string;
  timestamp: string;
}

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  onClose: () => void;
  onSubmit: (data: {
    firstName: string;
    lastName: string;
    feedback: string;
    rating: number;
  }) => Promise<void>;
}

export function GameOverModal({
  isOpen,
  score,
  onClose,
  onSubmit,
}: GameOverModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoadingLeaderboard, setIsLoadingLeaderboard] = useState(true);
  const { showSnackbar, triggerHaptic } = useHapticSnackbar();

  // Fetch leaderboard when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchLeaderboard();
    }
  }, [isOpen]);

  const fetchLeaderboard = async () => {
    setIsLoadingLeaderboard(true);
    try {
      const response = await fetch("/api/leaderboard");
      if (response.ok) {
        const data = await response.json();
        setLeaderboard(data.leaderboard || []);
      }
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    } finally {
      setIsLoadingLeaderboard(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim()) {
      triggerHaptic("error");
      showSnackbar("Please enter your first and last name", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit({ firstName, lastName, feedback, rating });
      triggerHaptic("success");
      showSnackbar("Score submitted successfully!", "success");
      // Refresh leaderboard after submission
      await fetchLeaderboard();
    } catch (error) {
      triggerHaptic("error");
      showSnackbar("Failed to submit score", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    triggerHaptic("click");
    setFirstName("");
    setLastName("");
    setFeedback("");
    setRating(0);
    onClose();
  };

  const isGreatAttempt = score === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-zinc-900/95 border border-zinc-700 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 p-6 border-b border-zinc-700">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-1 hover:bg-zinc-700/50 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-zinc-100 mb-2">
                  Game Over!
                </h2>
                {isGreatAttempt ? (
                  <p className="text-lg text-yellow-400 font-medium">
                    Great Attempt! Keep practicing!
                  </p>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Trophy className="w-6 h-6 text-yellow-400" />
                    <span className="text-3xl font-bold text-yellow-400">
                      {score}
                    </span>
                    <span className="text-zinc-400">points</span>
                  </div>
                )}
              </div>
            </div>

            {/* Form Section - Only show if score > 0 */}
            {!isGreatAttempt && (
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-400 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Rate your experience
                  </label>
                  <StarRating rating={rating} onRatingChange={setRating} />
                </div>

                {/* Feedback */}
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-1">
                    Feedback (optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts about the game..."
                    rows={3}
                    className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white font-medium rounded-xl transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Score
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Great Attempt - Play Again Button */}
            {isGreatAttempt && (
              <div className="p-6">
                <p className="text-center text-zinc-400 mb-4">
                  You didn't score any points this time, but don't give up!
                </p>
                <button
                  onClick={handleClose}
                  className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Leaderboard Section */}
            <div className="border-t border-zinc-700 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-zinc-100 mb-4">
                <Trophy className="w-5 h-5 text-yellow-400" />
                Top 5 Players
              </h3>

              {isLoadingLeaderboard ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
                </div>
              ) : leaderboard.length === 0 ? (
                <p className="text-center text-zinc-500 py-4">
                  No scores yet. Be the first!
                </p>
              ) : (
                <div className="space-y-2">
                  {leaderboard.slice(0, 5).map((entry, index) => (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 rounded-lg ${
                        index === 0
                          ? "bg-yellow-500/10 border border-yellow-500/30"
                          : index === 1
                          ? "bg-zinc-400/10 border border-zinc-400/30"
                          : index === 2
                          ? "bg-amber-600/10 border border-amber-600/30"
                          : "bg-zinc-800/50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold ${
                            index === 0
                              ? "bg-yellow-500 text-black"
                              : index === 1
                              ? "bg-zinc-400 text-black"
                              : index === 2
                              ? "bg-amber-600 text-black"
                              : "bg-zinc-700 text-zinc-400"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-zinc-100">
                            {entry.firstName} {entry.lastName.charAt(0)}.
                          </p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: entry.rating || 0 }).map(
                              (_, i) => (
                                <span key={i} className="text-yellow-400 text-xs">
                                  ★
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-zinc-100">
                        {entry.score}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
