import { Palmtree, Waves, Leaf } from "lucide-react";
import type { SuiteHue } from "../types";

const HUE_GLOW: Record<SuiteHue, string> = {
  gold: "rgba(201, 162, 75, 0.35)",
  teal: "rgba(69, 145, 138, 0.38)",
  moss: "rgba(107, 143, 92, 0.35)",
};

const HUE_ICON: Record<SuiteHue, typeof Palmtree> = {
  gold: Palmtree,
  teal: Waves,
  moss: Leaf,
};

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.35'/%3E%3C/svg%3E\")";

interface SuiteVisualProps {
  hue: SuiteHue;
  rounded?: string;
  className?: string;
}

export function SuiteVisual({ hue, rounded = "rounded-2xl", className = "" }: SuiteVisualProps) {
  const Icon = HUE_ICON[hue];

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${className}`}
      style={{
        background: `radial-gradient(120% 100% at 85% 0%, ${HUE_GLOW[hue]}, transparent 60%), linear-gradient(150deg, var(--surface-2), var(--bg))`,
      }}
    >
      <div
        className="absolute inset-0 mix-blend-overlay opacity-40"
        style={{ backgroundImage: GRAIN }}
      />
      <Icon
        className="absolute -bottom-4 -right-4 opacity-[0.14]"
        color="var(--ink)"
        size={128}
        strokeWidth={1}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.18) 100%)",
        }}
      />
    </div>
  );
}
