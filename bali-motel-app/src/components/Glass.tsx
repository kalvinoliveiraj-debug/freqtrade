import type { ReactNode } from "react";

export function GlassButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/30 text-white backdrop-blur-md transition-transform active:scale-90"
    >
      {children}
    </button>
  );
}

export function GlassChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
      {children}
    </span>
  );
}
