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
    <div className="flex min-h-svh flex-col pb-8">
      <header className="px-5 pt-[max(1.5rem,env(safe-area-inset-top))]">
        <div className="flex items-start justify-between">
          <div>
            <span
              className="inline-flex items-center gap-1 text-xs font-medium"
              style={{ color: "var(--ink-muted)" }}
            >
              <MapPin size={13} />
              {MOTEL_LOCATION}
            </span>
            <h1 className="mt-1 font-display text-[28px] font-medium leading-tight" style={{ color: "var(--ink)" }}>
              {MOTEL_NAME}
            </h1>
          </div>
          <ThemeSwitcher />
        </div>

        <p className="mt-3 text-sm" style={{ color: "var(--ink-muted)" }}>
          Escolha sua suíte e reserve em poucos toques. Discrição e conforto, do jeito que você espera.
        </p>

        <div className="mt-5">
          <FlowToggle flow={flow} onChange={onFlowChange} />
        </div>
      </header>

      <main className="mt-6 flex flex-col gap-4 px-5">
        {SUITES.map((suite) => {
          const price = flow === "agora" ? suite.price.agora : suite.price.pernoite;
          return (
            <button
              key={suite.id}
              type="button"
              onClick={() => onSelectSuite(suite)}
              className="flex gap-4 rounded-2xl border p-3 text-left transition-transform active:scale-[0.98]"
              style={{ borderColor: "var(--line)", background: "var(--surface)" }}
            >
              <SuiteVisual hue={suite.hue} className="h-24 w-24 shrink-0" rounded="rounded-xl" />
              <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="truncate font-display text-base font-medium" style={{ color: "var(--ink)" }}>
                      {suite.name}
                    </h2>
                    <StarRating rating={suite.rating} />
                  </div>
                  <span
                    className="mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] font-medium"
                    style={{ background: "var(--surface-2)", color: "var(--ink-muted)" }}
                  >
                    {suite.tag}
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-[11px]" style={{ color: "var(--ink-muted)" }}>
                    {flow === "agora" ? `${AGORA_DURACAO_HORAS}h a partir de` : "diária a partir de"}
                  </span>
                  <span className="font-display text-lg font-semibold" style={{ color: "var(--ink)" }}>
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
