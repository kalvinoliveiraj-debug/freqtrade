import { Star } from "lucide-react";

export function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium" style={{ color: "var(--ink-muted)" }}>
      <Star size={13} fill="var(--gold)" color="var(--gold)" />
      {rating.toFixed(1)}
    </span>
  );
}
