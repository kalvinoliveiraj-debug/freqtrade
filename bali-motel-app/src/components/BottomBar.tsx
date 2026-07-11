import type { ReactNode } from "react";

interface BottomBarProps {
  children: ReactNode;
}

export function BottomBar({ children }: BottomBarProps) {
  return (
    <div
      className="sticky bottom-0 border-t px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-4"
      style={{ borderColor: "var(--line)", background: "var(--bg)" }}
    >
      {children}
    </div>
  );
}

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}

export function PrimaryButton({ children, onClick, disabled, type = "button" }: PrimaryButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-[15px] font-semibold transition-opacity active:opacity-80 disabled:opacity-40"
      style={{ background: "var(--accent)", color: "var(--accent-ink)" }}
    >
      {children}
    </button>
  );
}
