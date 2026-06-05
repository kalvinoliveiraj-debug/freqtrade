"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { CASE_META } from "@/lib/grammarData";
import type { GrammarDay } from "@/lib/types";
import { Highlight } from "./Highlight";
import { MiniChallenge } from "./MiniChallenge";
import { TransformationPanel } from "./TransformationPanel";

/**
 * The elegant detail modal that opens when a timeline node is tapped.
 *
 * Layout: case header → bite-sized concept cards → animated declension
 * panels → mini-challenge. Solving the challenge marks the day complete.
 */
interface GrammarModalProps {
  day: GrammarDay | null;
  isComplete: boolean;
  onClose: () => void;
  onSolved: (day: number) => void;
  onToggleComplete: (day: number) => void;
}

export function GrammarModal({
  day,
  isComplete,
  onClose,
  onSolved,
  onToggleComplete,
}: GrammarModalProps) {
  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!day) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [day, onClose]);

  const meta = day ? CASE_META[day.caseKey] : null;
  const accent = meta?.color ?? "#22d3ee";

  return (
    <AnimatePresence>
      {day && meta && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-ink-900/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Day ${day.day}: ${day.title}`}
            initial={{ y: "6%", opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "6%", opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="glass relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-b-none rounded-t-3xl border-white/10 shadow-card sm:rounded-3xl"
            style={{ boxShadow: `0 0 0 1px ${accent}33, 0 30px 80px -30px ${accent}66` }}
          >
            {/* Glow header strip */}
            <div
              className="sticky top-0 z-10 border-b border-white/10 bg-ink-800/80 px-6 py-5 backdrop-blur-xl"
              style={{
                backgroundImage: `radial-gradient(600px 120px at 0% 0%, ${accent}22, transparent 70%)`,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="chip"
                      style={{ borderColor: `${accent}55`, color: accent }}
                    >
                      Day {day.day}
                    </span>
                    <span className="chip text-white/70">
                      {meta.label} · {meta.english}
                    </span>
                  </div>
                  <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-white">
                    <span className="mr-2">{day.icon}</span>
                    {day.title}
                  </h2>
                  <p className="mt-1 text-sm text-white/45">{meta.question}</p>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/15"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="space-y-5 p-6">
              {/* Concept cards */}
              <div className="grid gap-3">
                {day.cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <div className="flex items-center gap-2 text-sm font-bold text-white/90">
                      <span className="text-lg" aria-hidden>
                        {card.icon}
                      </span>
                      {card.title}
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                      {card.body}
                    </p>
                    {card.example && (
                      <div className="mt-3 rounded-xl border border-white/5 bg-ink-900/50 px-4 py-3">
                        <Highlight segments={card.example} size="sm" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Animated declensions */}
              {day.transformations.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-white/40">
                    Watch the ending morph
                  </h3>
                  {day.transformations.map((t, i) => (
                    <TransformationPanel
                      key={t.gloss}
                      transformation={t}
                      accent={accent}
                      delay={0.1 * i}
                    />
                  ))}
                </div>
              )}

              {/* Knowledge check */}
              <MiniChallenge
                challenge={day.challenge}
                accent={accent}
                onSolved={() => onSolved(day.day)}
              />

              {/* Manual completion toggle */}
              <button
                type="button"
                onClick={() => onToggleComplete(day.day)}
                className={[
                  "w-full rounded-2xl border px-4 py-3.5 text-sm font-semibold transition",
                  isComplete
                    ? "border-lime/50 bg-lime/10 text-lime"
                    : "border-white/15 bg-white/5 text-white/75 hover:bg-white/10",
                ].join(" ")}
              >
                {isComplete ? "✓ Day completed — tap to undo" : "Mark this day complete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
