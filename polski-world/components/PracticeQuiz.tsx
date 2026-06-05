"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { QUIZ_BANK, type QuizQuestion } from "@/lib/grammarData";

/**
 * The "Practice" tab: a fast, gamified flashcard quiz that mixes vocabulary
 * with the grammar reflexes trained in the Vault. Tracks a live score and
 * a streak, and celebrates a perfect run.
 */
export function PracticeQuiz() {
  // Shuffle once per mount for variety.
  const deck = useMemo(() => shuffle(QUIZ_BANK), []);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = deck[index];
  const answered = picked !== null;

  function pick(i: number) {
    if (answered) return;
    setPicked(i);
    if (i === q.answerIndex) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  }

  function next() {
    if (index + 1 >= deck.length) {
      setFinished(true);
      return;
    }
    setIndex((n) => n + 1);
    setPicked(null);
  }

  function restart() {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setStreak(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <ResultCard score={score} total={deck.length} onRestart={restart} />
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-24">
      {/* Scoreboard */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3 text-sm">
          <Stat label="Score" value={`${score}`} color="#22d3ee" />
          <Stat label="Streak" value={`${streak}🔥`} color="#ffd166" />
        </div>
        <div className="text-xs font-semibold uppercase tracking-widest text-white/40">
          {index + 1} / {deck.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-white/8">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-neon to-cyber"
          animate={{ width: `${((index + (answered ? 1 : 0)) / deck.length) * 100}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -24, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="glass p-7 sm:p-9"
        >
          <span className="chip border-cyber/40 text-cyber-soft">{q.category}</span>
          <h3 className="mt-4 text-3xl font-black tracking-tight text-white">
            {renderPrompt(q)}
          </h3>
          <p className="mt-2 text-sm italic text-white/45">{q.english}</p>

          <div className="mt-7 grid grid-cols-2 gap-3">
            {q.options.map((opt, i) => {
              const isAnswer = i === q.answerIndex;
              const showCorrect = answered && isAnswer;
              const showWrong = answered && picked === i && !isAnswer;
              return (
                <motion.button
                  key={opt}
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  animate={showWrong ? { x: [0, -6, 6, -4, 4, 0] } : {}}
                  onClick={() => pick(i)}
                  disabled={answered}
                  className={[
                    "rounded-2xl border px-4 py-4 text-lg font-bold transition-colors",
                    showCorrect
                      ? "border-lime/60 bg-lime/15 text-lime"
                      : showWrong
                        ? "border-red-400/60 bg-red-500/15 text-red-300"
                        : "border-white/10 bg-white/5 text-white/85 hover:border-white/30 hover:bg-white/10",
                  ].join(" ")}
                >
                  {opt}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence>
            {answered && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: "auto", marginTop: 20 }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-xl border border-white/10 bg-ink-900/60 p-4 text-sm text-white/70">
                  💡 {q.note}
                </div>
                <button
                  type="button"
                  onClick={next}
                  className="mt-4 w-full rounded-2xl bg-gradient-to-r from-neon to-cyber px-5 py-3.5 text-sm font-bold text-ink-900 transition hover:brightness-110"
                >
                  {index + 1 >= deck.length ? "See results →" : "Next question →"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function renderPrompt(q: QuizQuestion) {
  const parts = q.prompt.split("___");
  if (parts.length === 1) return q.prompt;
  return (
    <>
      {parts[0]}
      <span className="mx-1 rounded-md border-b-2 border-neon px-2 text-neon">?</span>
      {parts[1]}
    </>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5">
      <span className="text-[10px] uppercase tracking-widest text-white/40">
        {label}{" "}
      </span>
      <span className="font-black" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function ResultCard({
  score,
  total,
  onRestart,
}: {
  score: number;
  total: number;
  onRestart: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const perfect = score === total;
  return (
    <div className="mx-auto max-w-md px-4 pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass p-9 text-center"
        style={
          perfect
            ? { boxShadow: "0 0 60px -15px rgba(255,209,102,0.7)" }
            : undefined
        }
      >
        <div className="text-6xl">{perfect ? "🏆" : pct >= 60 ? "🎉" : "💪"}</div>
        <h3 className="mt-4 text-2xl font-black text-white">
          {perfect ? "Perfect run!" : "Quiz complete"}
        </h3>
        <p className="mt-1 text-white/55">
          You scored{" "}
          <span className="font-black text-cyber">
            {score}/{total}
          </span>{" "}
          ({pct}%)
        </p>
        <button
          type="button"
          onClick={onRestart}
          className="mt-7 w-full rounded-2xl bg-gradient-to-r from-neon to-cyber px-5 py-3.5 text-sm font-bold text-ink-900 transition hover:brightness-110"
        >
          Play again ↻
        </button>
      </motion.div>
    </div>
  );
}

/** Fisher–Yates shuffle (non-mutating). */
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
