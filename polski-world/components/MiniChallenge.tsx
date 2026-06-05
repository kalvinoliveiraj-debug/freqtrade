"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import type { Challenge } from "@/lib/types";

/**
 * A single-question knowledge check rendered at the foot of every grammar day.
 *
 * Picking the right option fires a satisfying confirmation and (via
 * `onSolved`) lets the parent mark the day complete. Wrong answers give a
 * gentle shake and an explanation, then let the learner try again.
 */
interface MiniChallengeProps {
  challenge: Challenge;
  /** Called the first time the learner answers correctly. */
  onSolved?: () => void;
  /** Accent colour for the day's case. */
  accent: string;
}

type Status = "idle" | "correct" | "wrong";

export function MiniChallenge({ challenge, onSolved, accent }: MiniChallengeProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  function choose(index: number) {
    if (status === "correct") return; // lock once solved
    setSelected(index);
    if (index === challenge.answerIndex) {
      setStatus("correct");
      onSolved?.();
    } else {
      setStatus("wrong");
    }
  }

  // Render the prompt with the blank visually emphasised.
  const promptParts = challenge.prompt.split("___");

  return (
    <div className="glass mt-2 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/50">
        <span aria-hidden>⚡</span> Mini-challenge
      </div>

      <p className="text-lg font-semibold leading-snug text-white/90">
        {promptParts[0]}
        <span
          className="mx-1 inline-block min-w-[2.5rem] rounded-md border-b-2 px-2 text-center align-baseline"
          style={{ borderColor: accent, color: accent }}
        >
          {status === "correct" ? challenge.options[challenge.answerIndex] : "?"}
        </span>
        {promptParts[1] ?? ""}
      </p>
      <p className="mt-1 text-sm text-white/45">{challenge.hint}</p>

      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {challenge.options.map((opt, i) => {
          const isAnswer = i === challenge.answerIndex;
          const isPicked = selected === i;
          const showCorrect = status !== "idle" && isAnswer;
          const showWrong = status === "wrong" && isPicked && !isAnswer;

          return (
            <motion.button
              key={opt}
              type="button"
              onClick={() => choose(i)}
              whileTap={{ scale: 0.95 }}
              animate={showWrong ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
              transition={{ duration: 0.4 }}
              disabled={status === "correct"}
              className={[
                "rounded-xl border px-3 py-2.5 text-sm font-semibold transition-colors",
                showCorrect
                  ? "border-lime/60 bg-lime/15 text-lime"
                  : showWrong
                    ? "border-red-400/60 bg-red-500/15 text-red-300"
                    : "border-white/10 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10",
              ].join(" ")}
            >
              {opt}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 16 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="overflow-hidden"
          >
            <div
              className={[
                "rounded-xl border p-3 text-sm",
                status === "correct"
                  ? "border-lime/40 bg-lime/10 text-lime/90"
                  : "border-amber-400/40 bg-amber-500/10 text-amber-200/90",
              ].join(" ")}
            >
              <span className="mr-1 font-bold">
                {status === "correct" ? "Dobrze! ✅" : "Prawie! 🤏"}
              </span>
              {challenge.explanation}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
