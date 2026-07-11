import { Calendar, Clock } from "lucide-react";
import { SuiteVisual } from "../components/SuiteVisual";
import { ScreenHeader } from "../components/ScreenHeader";
import { Chip } from "../components/Chip";
import { StarRating } from "../components/StarRating";
import { BottomBar, PrimaryButton } from "../components/BottomBar";
import { AMENITY_META } from "../data/amenities";
import { AGORA_DURACAO_HORAS } from "../config";
import type { Flow, Suite } from "../types";

interface DetailScreenProps {
  suite: Suite;
  flow: Flow;
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export function DetailScreen({
  suite,
  flow,
  date,
  time,
  onDateChange,
  onTimeChange,
  onBack,
  onContinue,
}: DetailScreenProps) {
  const price = flow === "agora" ? suite.price.agora : suite.price.pernoite;
  const canContinue = flow === "agora" || (date !== "" && time !== "");

  return (
    <div className="flex min-h-svh flex-col">
      <ScreenHeader title={suite.name} onBack={onBack} />

      <main className="flex-1 overflow-y-auto px-5 pb-6">
        <SuiteVisual hue={suite.hue} className="h-56 w-full" />

        <div className="mt-4 flex items-center justify-between">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ background: "var(--surface-2)", color: "var(--ink-muted)" }}
          >
            {suite.tag}
          </span>
          <StarRating rating={suite.rating} />
        </div>

        <h2 className="mt-3 font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
          {suite.name}
        </h2>
        <p className="mt-2 text-[15px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          {suite.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {suite.amenities.map((id) => {
            const meta = AMENITY_META[id];
            const Icon = meta.icon;
            return (
              <Chip key={id}>
                <Icon size={13} />
                {meta.label}
              </Chip>
            );
          })}
        </div>

        {flow === "agendar" && (
          <div className="mt-6">
            <h3 className="text-sm font-semibold" style={{ color: "var(--ink)" }}>
              Data e horário
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label
                className="flex items-center gap-2 rounded-2xl border px-4 py-3"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <Calendar size={16} color="var(--ink-muted)" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => onDateChange(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none [color-scheme:dark]"
                  style={{ color: "var(--ink)" }}
                />
              </label>
              <label
                className="flex items-center gap-2 rounded-2xl border px-4 py-3"
                style={{ borderColor: "var(--line)", background: "var(--surface)" }}
              >
                <Clock size={16} color="var(--ink-muted)" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => onTimeChange(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none [color-scheme:dark]"
                  style={{ color: "var(--ink)" }}
                />
              </label>
            </div>
          </div>
        )}

        <div
          className="mt-6 flex items-center justify-between rounded-2xl border px-4 py-3.5"
          style={{ borderColor: "var(--line)", background: "var(--surface)" }}
        >
          <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {flow === "agora" ? `Check-in agora · ${AGORA_DURACAO_HORAS}h` : "Pernoite"}
          </span>
          <span className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>
            R$ {price}
          </span>
        </div>
      </main>

      <BottomBar>
        <PrimaryButton onClick={onContinue} disabled={!canContinue}>
          Continuar
        </PrimaryButton>
      </BottomBar>
    </div>
  );
}
