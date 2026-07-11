import type { ReactNode } from "react";
import { MessageCircle, PhoneCall } from "lucide-react";
import { ScreenHeader } from "../components/ScreenHeader";
import { BottomBar, PrimaryButton } from "../components/BottomBar";
import { AGORA_DURACAO_HORAS } from "../config";
import type { Booking, ConfirmMode, Flow, Suite } from "../types";

interface ConfirmScreenProps {
  suite: Suite;
  flow: Flow;
  date: string;
  time: string;
  name: string;
  whatsapp: string;
  confirmMode: ConfirmMode;
  onNameChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  onConfirmModeChange: (mode: ConfirmMode) => void;
  onBack: () => void;
  onSend: (booking: Booking) => void;
}

export function ConfirmScreen({
  suite,
  flow,
  date,
  time,
  name,
  whatsapp,
  confirmMode,
  onNameChange,
  onWhatsappChange,
  onConfirmModeChange,
  onBack,
  onSend,
}: ConfirmScreenProps) {
  const price = flow === "agora" ? suite.price.agora : suite.price.pernoite;
  const canSend = name.trim() !== "" && (confirmMode === "mensagem" || whatsapp.trim() !== "");

  function handleSend() {
    if (!canSend) return;
    onSend({
      suite,
      flow,
      date: flow === "agendar" ? date : null,
      time: flow === "agendar" ? time : null,
      name: name.trim(),
      whatsapp: whatsapp.trim(),
      confirmMode,
    });
  }

  return (
    <div className="screen-enter flex min-h-svh flex-col">
      <ScreenHeader title="Confirmar reserva" onBack={onBack} />

      <main className="flex-1 overflow-y-auto px-5 pb-6">
        <div
          className="rounded-2xl border p-4"
          style={{ borderColor: "var(--line)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
        >
          <h2 className="font-display text-lg font-medium" style={{ color: "var(--ink)" }}>
            {suite.name}
          </h2>
          <dl className="mt-3 flex flex-col gap-2 text-sm">
            <Row label="Período" value={flow === "agora" ? `Agora · ${AGORA_DURACAO_HORAS}h` : "Pernoite"} />
            {flow === "agendar" && date && <Row label="Data" value={formatDate(date)} />}
            {flow === "agendar" && time && <Row label="Horário" value={time} />}
            <Row label="Valor" value={`R$ ${price}`} strong />
          </dl>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <Field label="Seu nome">
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Como podemos te chamar"
              className="w-full bg-transparent text-sm outline-none placeholder:opacity-60"
              style={{ color: "var(--ink)" }}
            />
          </Field>
          <Field label="WhatsApp">
            <input
              type="tel"
              inputMode="tel"
              value={whatsapp}
              onChange={(e) => onWhatsappChange(e.target.value)}
              placeholder="(85) 90000-0000"
              className="w-full bg-transparent text-sm outline-none placeholder:opacity-60"
              style={{ color: "var(--ink)" }}
            />
          </Field>
        </div>

        <div className="mt-6">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--ink-muted)" }}>
            Como prefere confirmar?
          </h3>
          <div className="mt-3 flex flex-col gap-2.5">
            <ModeOption
              active={confirmMode === "mensagem"}
              icon={<MessageCircle size={18} />}
              title="Enviar mensagem"
              description="Abre o WhatsApp com sua reserva pronta para enviar."
              onClick={() => onConfirmModeChange("mensagem")}
            />
            <ModeOption
              active={confirmMode === "ligar"}
              icon={<PhoneCall size={18} />}
              title="Pedir que me liguem"
              description="Nosso atendente liga para confirmar os detalhes."
              onClick={() => onConfirmModeChange("ligar")}
            />
          </div>
        </div>
      </main>

      <BottomBar>
        <PrimaryButton onClick={handleSend} disabled={!canSend}>
          {confirmMode === "mensagem" ? <MessageCircle size={18} /> : <PhoneCall size={18} />}
          {confirmMode === "mensagem" ? "Enviar reserva por WhatsApp" : "Solicitar retorno"}
        </PrimaryButton>
      </BottomBar>
    </div>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <dt style={{ color: "var(--ink-muted)" }}>{label}</dt>
      <dd
        className={strong ? "font-display text-base font-semibold tabular-nums" : "font-medium"}
        style={{ color: "var(--ink)" }}
      >
        {value}
      </dd>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label
      className="flex flex-col gap-1 rounded-2xl border px-4 py-3"
      style={{ borderColor: "var(--line)", background: "var(--surface)", boxShadow: "var(--shadow-card)" }}
    >
      <span className="text-[11px] font-medium" style={{ color: "var(--ink-muted)" }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function ModeOption({
  active,
  icon,
  title,
  description,
  onClick,
}: {
  active: boolean;
  icon: ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-start gap-3 rounded-2xl border p-4 text-left transition-transform duration-150 active:scale-[0.98]"
      style={{
        borderColor: active ? "var(--accent)" : "var(--line)",
        background: "var(--surface)",
        boxShadow: active ? "var(--shadow-accent)" : "var(--shadow-card)",
      }}
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full"
        style={{
          background: active ? "var(--accent)" : "var(--surface-2)",
          color: active ? "var(--accent-ink)" : "var(--ink-muted)",
        }}
      >
        {icon}
      </span>
      <span>
        <span className="block text-sm font-semibold" style={{ color: "var(--ink)" }}>
          {title}
        </span>
        <span className="mt-0.5 block text-xs" style={{ color: "var(--ink-muted)" }}>
          {description}
        </span>
      </span>
    </button>
  );
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}
