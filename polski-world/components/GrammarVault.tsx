"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { CASE_META, GRAMMAR_DAYS } from "@/lib/grammarData";
import type { GrammarDay } from "@/lib/types";
import type { ProgressApi } from "@/lib/useProgress";
import { GrammarModal } from "./GrammarModal";

/**
 * The Grammar Vault: a vertical "Day 0 → Day 30" timeline / skill-tree.
 *
 * Nodes alternate left/right of a glowing central spine. A scroll-linked
 * progress beam fills the spine as you travel. Each node opens {@link GrammarModal}.
 */
export function GrammarVault({ progress }: { progress: ProgressApi }) {
  const [openDay, setOpenDay] = useState<GrammarDay | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked fill for the central spine.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.4"],
  });
  const beam = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  const pct = Math.round((progress.count / GRAMMAR_DAYS.length) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 pb-24">
      {/* Roadmap header + live progress */}
      <VaultHeader pct={pct} count={progress.count} onReset={progress.reset} />

      <div ref={containerRef} className="relative mt-10">
        {/* Central spine */}
        <div className="absolute left-6 top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-white/8 sm:left-1/2" />
        {/* Animated progress beam */}
        <motion.div
          style={{ scaleY: beam, transformOrigin: "top" }}
          className="absolute left-6 top-0 h-full w-[3px] -translate-x-1/2 rounded-full bg-gradient-to-b from-neon via-purple-400 to-cyber sm:left-1/2"
        />

        {/* Start cap */}
        <div className="relative mb-10 flex justify-center">
          <span className="chip border-white/15 bg-ink-700 text-white/60">
            🚀 Day 0 · Start your journey
          </span>
        </div>

        <ol className="space-y-6 sm:space-y-3">
          {GRAMMAR_DAYS.map((day, i) => (
            <TimelineNode
              key={day.day}
              day={day}
              index={i}
              complete={progress.ready && progress.isComplete(day.day)}
              onOpen={() => setOpenDay(day)}
            />
          ))}
        </ol>

        {/* Finish cap */}
        <div className="relative mt-10 flex justify-center">
          <span
            className="chip border-gold/40 text-gold"
            style={{ boxShadow: "0 0 40px -10px rgba(255,209,102,0.7)" }}
          >
            🏆 Day 30 · A1 Grammar mastered
          </span>
        </div>
      </div>

      <GrammarModal
        day={openDay}
        isComplete={openDay ? progress.isComplete(openDay.day) : false}
        onClose={() => setOpenDay(null)}
        onSolved={progress.markComplete}
        onToggleComplete={progress.toggle}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function VaultHeader({
  pct,
  count,
  onReset,
}: {
  pct: number;
  count: number;
  onReset: () => void;
}) {
  return (
    <div className="glass relative overflow-hidden p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-neon/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-cyber/20 blur-3xl" />

      <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="chip border-neon/40 text-neon-soft">🔐 Grammar Vault</span>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            <span className="text-gradient">30 Days</span> to Polish cases
          </h2>
          <p className="mt-2 max-w-md text-sm text-white/55">
            A guided skill-tree from Nominative to full verb conjugation. Tap any
            node, watch the endings morph, and pass the check to light it up.
          </p>
        </div>

        {/* Radial-ish progress readout */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-3xl font-black text-white">
              {count}
              <span className="text-base font-semibold text-white/40">/30</span>
            </div>
            <div className="text-xs uppercase tracking-widest text-white/40">
              days done
            </div>
          </div>
          <div className="relative grid h-16 w-16 place-items-center">
            <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="url(#vaultGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${pct} 100`}
                style={{ transition: "stroke-dasharray 0.6s ease" }}
              />
              <defs>
                <linearGradient id="vaultGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#ff3d9a" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute text-xs font-bold text-white">{pct}%</span>
          </div>
        </div>
      </div>

      {count > 0 && (
        <button
          type="button"
          onClick={onReset}
          className="relative mt-5 text-xs font-medium text-white/35 underline-offset-4 hover:text-white/70 hover:underline"
        >
          Reset progress
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */

function TimelineNode({
  day,
  index,
  complete,
  onOpen,
}: {
  day: GrammarDay;
  index: number;
  complete: boolean;
  onOpen: () => void;
}) {
  const meta = CASE_META[day.caseKey];
  // Alternate sides on desktop; always right of the spine on mobile.
  const left = index % 2 === 0;

  const card = useMemo(
    () => (
      <motion.button
        type="button"
        onClick={onOpen}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.98 }}
        className="group glass w-full p-4 text-left transition-shadow"
        style={
          complete
            ? { boxShadow: `0 0 0 1px ${meta.color}66, 0 0 35px -10px ${meta.color}` }
            : undefined
        }
      >
        <div className="flex items-center gap-3">
          <span
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-lg"
            style={{
              background: `${meta.color}1a`,
              border: `1px solid ${meta.color}40`,
            }}
            aria-hidden
          >
            {day.icon}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-white/40">
                Day {day.day}
              </span>
              {day.milestone && (
                <span
                  className="rounded-full px-1.5 py-0.5 text-[10px] font-bold"
                  style={{ background: `${meta.color}22`, color: meta.color }}
                >
                  ★ milestone
                </span>
              )}
            </div>
            <div className="truncate text-sm font-bold text-white">{day.title}</div>
            <div className="truncate text-xs text-white/45">
              {meta.label} · {meta.english}
            </div>
          </div>
          {complete && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 18 }}
              className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime/20 text-xs text-lime"
              aria-label="Completed"
            >
              ✓
            </motion.span>
          )}
        </div>
        <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-white/45 group-hover:text-white/60">
          {day.teaser}
        </p>
      </motion.button>
    ),
    [complete, day, meta, onOpen],
  );

  return (
    <li className="relative">
      <div
        className={[
          "grid items-center gap-x-6 sm:grid-cols-[1fr_auto_1fr]",
          "pl-16 sm:pl-0",
        ].join(" ")}
      >
        {/* Left slot (desktop) */}
        <div className={left ? "sm:block" : "sm:invisible sm:hidden sm:h-0"}>
          {left && (
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {card}
            </motion.div>
          )}
        </div>

        {/* Spine dot */}
        <div className="absolute left-6 -translate-x-1/2 sm:static sm:left-auto sm:translate-x-0">
          <NodeDot color={meta.color} complete={complete} milestone={day.milestone} />
        </div>

        {/* Right slot (desktop) + the only slot on mobile */}
        <div className={left ? "hidden sm:block" : ""}>
          {!left && (
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              {card}
            </motion.div>
          )}
          {/* On mobile, left-side cards still render here under the spine */}
          {left && <div className="sm:hidden">{card}</div>}
        </div>
      </div>
    </li>
  );
}

function NodeDot({
  color,
  complete,
  milestone,
}: {
  color: string;
  complete: boolean;
  milestone?: boolean;
}) {
  return (
    <span className="relative grid place-items-center">
      {complete && (
        <span
          className="absolute h-7 w-7 animate-pulse-glow rounded-full"
          style={{ background: `${color}55`, filter: "blur(4px)" }}
        />
      )}
      <span
        className="relative z-10 grid h-5 w-5 place-items-center rounded-full border-2"
        style={{
          borderColor: color,
          background: complete ? color : "#0c0a1f",
          boxShadow: milestone ? `0 0 18px -2px ${color}` : undefined,
        }}
      >
        {milestone && !complete && (
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        )}
      </span>
    </span>
  );
}
