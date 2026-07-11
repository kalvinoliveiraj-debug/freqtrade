import { MapPin } from "lucide-react";
import { SUITES } from "../data/suites";
import { MOTEL_NAME, MOTEL_LOCATION, AGORA_DURACAO_HORAS } from "../config";
import { SuiteVisual } from "../components/SuiteVisual";
import { ThemeSwitcher } from "../components/ThemeSwitcher";
import { FlowToggle } from "../components/FlowToggle";
import { StarRating } from "../components/StarRating";
import type { Flow, Suite } from "../types";

interface HomeScreenProps {
  flow: Flow;
  onFlowChange: (flow: Flow) => void;
  onSelectSuite: (suite: Suite) => void;
}

export function HomeScreen({ flow, onFlowChange, onSelectSuite }: HomeScreenProps) {
  return (
    <div className="screen-enter flex min-h-svh flex-col pb-10">
      <header className="px-5 pt-[max(1.75rem,env(safe-area-inset-top))]">
        <div className="flex items-start justify-between">
          <div>
            <span
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--accent)" }}
            >
              <MapPin size={12} />
              {MOTEL_LOCATION}
            </span>
            <h1 className="mt-2 font-display text-[34px] font-medium leading-[1.05] tracking-tight" style={{ color: "var(--ink)" }}>
              {MOTEL_NAME}
            </h1>
          </div>
          <ThemeSwitcher />
        </div>

        <p className="mt-3 max-w-[30ch] text-[15px] leading-relaxed" style={{ color: "var(--ink-muted)" }}>
          Escolha sua suíte e reserve em poucos toques. Discrição e conforto, do jeito que você espera.
        </p>

        <div className="mt-6" style={{ filter: "drop-shadow(var(--shadow-card))" }}>
          <FlowToggle flow={flow} onChange={onFlowChange} />
        </div>
      </header>

      <main className="mt-7 flex flex-col gap-4 px-5">
        {SUITES.map((suite, i) => {
          const price = flow === "agora" ? suite.price.agora : suite.price.pernoite;
          return (
            <button
              key={suite.id}
              type="button"
              onClick={() => onSelectSuite(suite)}
              className="rise-in flex gap-4 rounded-[22px] border p-3 text-left transition-transform duration-200 active:scale-[0.98]"
              style={{
                borderColor: "var(--line)",
                background: "var(--surface)",
                boxShadow: "var(--shadow-card)",
                animationDelay: `${i * 90}ms`,
              }}
            >
              <SuiteVisual hue={suite.hue} className="h-28 w-28 shrink-0" rounded="rounded-2xl" />
              <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="truncate font-display text-[17px] font-medium" style={{ color: "var(--ink)" }}>
                      {suite.name}
                    </h2>
                    <StarRating rating={suite.rating} />
                  </div>
                  <span
                    className="mt-1.5 inline-block text-[11px] font-semibold uppercase tracking-[0.14em]"
                    style={{ color: "var(--accent)" }}
                  >
                    {suite.tag}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="font-display text-lg italic" style={{ color: "var(--ink-muted)" }}>
                    {flow === "agora" ? `${AGORA_DURACAO_HORAS}h` : "diária"}
                  </span>
                  <span className="tabular-nums font-display text-xl font-semibold" style={{ color: "var(--ink)" }}>
                    R$ {price}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </main>
    </div>
  );
}
