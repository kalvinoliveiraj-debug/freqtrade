"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useProgress } from "@/lib/useProgress";
import { GrammarVault } from "./GrammarVault";
import { PracticeQuiz } from "./PracticeQuiz";
import { TabNav, type TabKey } from "./TabNav";

/**
 * Top-level client shell for Polski World.
 *
 * Owns the active tab and the shared progress store, and animates the
 * cross-fade between the "Grammar Vault" and "Practice" views with Framer
 * Motion. Kept as a single client component so the App Router page stays a
 * thin server entry.
 */
export function PolskiWorld() {
  const [tab, setTab] = useState<TabKey>("vault");
  const progress = useProgress();

  return (
    <div className="relative min-h-screen">
      {/* Faint moving grid texture over the global aurora background. */}
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid-faint [background-size:42px_42px] opacity-[0.35]" />

      {/* ---- Sticky brand + tab header ---- */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-900/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-neon to-cyber text-lg font-black text-ink-900"
              aria-hidden
            >
              PW
            </span>
            <div>
              <div className="text-base font-black leading-tight tracking-tight">
                Polski <span className="text-gradient">World</span>
              </div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-white/40">
                Learn Polish · A1
              </div>
            </div>
          </div>
          <TabNav active={tab} onChange={setTab} />
        </div>
      </header>

      {/* ---- Animated view switch ---- */}
      <main className="pt-10">
        <AnimatePresence mode="wait">
          <motion.section
            key={tab}
            initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {tab === "vault" ? (
              <GrammarVault progress={progress} />
            ) : (
              <PracticeQuiz />
            )}
          </motion.section>
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/5 py-8 text-center text-xs text-white/30">
        Polski World · Grammar Vault — built for curious minds learning Polish 🇵🇱
      </footer>
    </div>
  );
}
