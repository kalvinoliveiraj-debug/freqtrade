"use client";

import { motion } from "framer-motion";

export type TabKey = "practice" | "vault";

const TABS: { key: TabKey; label: string; icon: string }[] = [
  { key: "vault", label: "Grammar Vault", icon: "🔐" },
  { key: "practice", label: "Practice", icon: "⚡" },
];

/**
 * Sleek segmented tab control with a Framer Motion "magic pill" that slides
 * between the active tabs via a shared `layoutId`.
 */
export function TabNav({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <div className="mx-auto flex w-full max-w-xs items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
      {TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            className="relative flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors"
            aria-pressed={isActive}
          >
            {isActive && (
              <motion.span
                layoutId="tab-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-neon to-cyber"
                style={{ boxShadow: "0 0 30px -8px rgba(255,61,154,0.7)" }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span
              className={[
                "relative z-10 flex items-center justify-center gap-1.5",
                isActive ? "text-ink-900" : "text-white/60",
              ].join(" ")}
            >
              <span aria-hidden>{tab.icon}</span>
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
