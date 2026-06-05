"use client";

import { motion } from "framer-motion";
import type { Segment } from "@/lib/types";

/**
 * The syntax-highlighting engine for Polish words.
 *
 * Renders an array of {@link Segment}s, colouring the *stable base* calmly and
 * making the *changing suffix* glow in neon pink. This is the single visual
 * idea that makes declensions click for beginners — the eye is drawn straight
 * to the part of the word that moves.
 */

interface HighlightProps {
  segments: Segment[];
  /** Larger, hero treatment for transformation panels. */
  size?: "sm" | "md" | "lg";
  /** Animate the suffix in with a pop (used inside transformations). */
  animateSuffix?: boolean;
  className?: string;
}

const sizeMap = {
  sm: "text-base",
  md: "text-2xl",
  lg: "text-4xl sm:text-5xl",
} as const;

export function Highlight({
  segments,
  size = "md",
  animateSuffix = false,
  className = "",
}: HighlightProps) {
  return (
    <span
      className={`font-semibold tracking-tight ${sizeMap[size]} ${className}`}
    >
      {segments.map((seg, i) => {
        if (seg.type === "muted") {
          return (
            <span key={i} className="font-normal text-white/45">
              {seg.text}
            </span>
          );
        }
        if (seg.type === "base") {
          return (
            <span key={i} className="text-white">
              {seg.text}
            </span>
          );
        }
        // suffix — the star of the show
        const suffix = (
          <span
            className="bg-gradient-to-r from-neon to-neon-soft bg-clip-text font-extrabold text-transparent"
            style={{ textShadow: "0 0 22px rgba(255,61,154,0.55)" }}
          >
            {seg.text}
          </span>
        );
        return animateSuffix ? (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 6, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 420, damping: 18, delay: 0.15 }}
            className="inline-block"
          >
            {suffix}
          </motion.span>
        ) : (
          <span key={i}>{suffix}</span>
        );
      })}
    </span>
  );
}
