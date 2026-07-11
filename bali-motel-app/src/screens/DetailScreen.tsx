import { Calendar, ChevronLeft, Clock, Star } from "lucide-react";
import { SuiteVisual } from "../components/SuiteVisual";
import { GlassButton, GlassChip } from "../components/Glass";
import { AmenityToken } from "../components/AmenityToken";
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
    <div className="screen-enter flex min-h-svh flex-col" style={{ background: "var(--bg)" }}>
      <div className="relative h-[42vh] min-h-[280px] w-full shrink-0">
        <SuiteVisual hue={suite.hue} variant="hero" className="absolute inset-0" rounded="rounded-none" />
        <div className="absolute inset-x-5 top-[max(1.25rem,env(safe-area-inset-top))] flex items-center justify-between">
          <GlassButton ariaLabel="Voltar" onClick={onBack}>
            <ChevronLeft size={20} />
          </GlassButton>
          <GlassChip>
            <Star size={12} fill="currentColor" />
            {suite.rating.toFixed(1)}
          </GlassChip>
        </div>
      </div>

      <main
        className="relative -mt-6 flex-1 overflow-y-auto rounded-t-[28px] px-5 pb-6 pt-6"
        style={{ background: "var(--bg)", boxShadow: "var(--shadow-lift)" }}
      >
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          {suite.tag}
        </span>
        <h2 className="mt-2 font-display text-[28px] font-medium leading-tight" style={{ color: "var(--ink)" }}>
          {suite.name}
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          {suite.description}
        </p>

        <div className="mt-6 flex gap-4 overflow-x-auto pb-1">
          {suite.amenities.map((id) => {
            const meta = AMENITY_META[id];
            return <AmenityToken key={id} icon={meta.icon} label={meta.label} />;
          })}
        </div>

        {flow === "agendar" && (
          <div className="mt-7">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
              Data e horário
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <label
                className="flex items-center gap-2 rounded-2xl border px-4 py-3.5"
                style={{ borderColor: "var(--line)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
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
                className="flex items-center gap-2 rounded-2xl border px-4 py-3.5"
                style={{ borderColor: "var(--line)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
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
          className="mt-7 flex items-center justify-between rounded-2xl border px-4 py-4"
          style={{ borderColor: "var(--line)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
        >
          <span className="text-sm" style={{ color: "var(--ink-muted)" }}>
            {flow === "agora" ? `Check-in agora · ${AGORA_DURACAO_HORAS}h` : "Pernoite"}
          </span>
          <span className="font-display text-xl font-semibold tabular-nums" style={{ color: "var(--ink)" }}>
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
