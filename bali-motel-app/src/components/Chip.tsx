import type { ReactNode } from "react";

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium"
      style={{ borderColor: "var(--line)", color: "var(--ink-muted)" }}
    >
      {children}
    </span>
  );
}
