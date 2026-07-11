import type { Flow } from "../types";

interface FlowToggleProps {
  flow: Flow;
  onChange: (flow: Flow) => void;
}

export function FlowToggle({ flow, onChange }: FlowToggleProps) {
  return (
    <div
      className="relative grid grid-cols-2 rounded-full p-1"
      style={{ background: "var(--surface-2)" }}
    >
      <span
        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full transition-transform duration-300 ease-out"
        style={{
          background: "var(--accent)",
          transform: flow === "agora" ? "translateX(0)" : "translateX(calc(100% + 8px))",
        }}
      />
      {(["agora", "agendar"] as Flow[]).map((f) => (
        <button
          key={f}
          type="button"
          onClick={() => onChange(f)}
          className="relative z-10 rounded-full py-2.5 text-sm font-semibold"
          style={{ color: flow === f ? "var(--accent-ink)" : "var(--ink-muted)" }}
        >
          {f === "agora" ? "Agora" : "Agendar"}
        </button>
      ))}
    </div>
  );
}
