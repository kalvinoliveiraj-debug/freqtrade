"use client";

import { motion } from "framer-motion";
import { Highlight } from "./Highlight";
import type { Transformation } from "@/lib/types";

/**
 * The animated "before → after" declension panel.
 *
 * Shows the dictionary form on the left and the declined form on the right,
 * with the changing suffix popping in via Framer Motion so the learner *sees*
 * the `a → ę` morph happen.
 */
export function TransformationPanel({
  transformation,
  accent,
  delay = 0,
}: {
  transformation: Transformation;
  accent: string;
  delay?: number;
}) {
  const t = transformation;
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="glass overflow-hidden p-5"
    >
      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
        {/* FROM */}
        <div className="flex-1 text-center">
          <div className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-white/40">
            {t.fromLabel}
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5">
            <Highlight segments={t.from} size="lg" />
          </div>
        </div>

        {/* ARROW */}
        <motion.div
          aria-hidden
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: delay + 0.1, type: "spring", stiffness: 300 }}
          className="mx-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xl font-black"
          style={{ color: accent, boxShadow: `0 0 28px -6px ${accent}` }}
        >
          →
        </motion.div>

        {/* TO */}
        <div className="flex-1 text-center">
          <div
            className="mb-2 text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: accent }}
          >
            {t.toLabel}
          </div>
          <div
            className="rounded-2xl border px-4 py-5"
            style={{
              borderColor: `${accent}55`,
              background:
                "linear-gradient(180deg, rgba(255,61,154,0.06), rgba(255,255,255,0.02))",
            }}
          >
            <Highlight segments={t.to} size="lg" animateSuffix />
          </div>
        </div>
      </div>

      <p className="mt-4 text-center text-sm italic text-white/55">{t.gloss}</p>
    </motion.div>
  );
}
