import type { LucideIcon } from "lucide-react";

interface AmenityTokenProps {
  icon: LucideIcon;
  label: string;
}

export function AmenityToken({ icon: Icon, label }: AmenityTokenProps) {
  return (
    <div className="flex w-[72px] shrink-0 flex-col items-center gap-2 text-center">
      <span
        className="grid h-12 w-12 place-items-center rounded-full border"
        style={{ borderColor: "var(--line)", background: "var(--surface-2)" }}
      >
        <Icon size={18} color="var(--ink)" strokeWidth={1.5} />
      </span>
      <span className="text-[11px] leading-tight" style={{ color: "var(--ink-muted)" }}>
        {label}
      </span>
    </div>
  );
}
