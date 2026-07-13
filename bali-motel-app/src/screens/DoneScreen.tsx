import { CheckCircle2, Phone } from "lucide-react";
import { PrimaryButton } from "../components/BottomBar";
import { MOTEL_PHONE_DISPLAY, MOTEL_PHONE_TEL } from "../config";
import type { Booking } from "../types";

interface DoneScreenProps {
  booking: Booking;
  onNewBooking: () => void;
}

export function DoneScreen({ booking, onNewBooking }: DoneScreenProps) {
  const isLigar = booking.confirmMode === "ligar";

  return (
    <div className="screen-enter flex min-h-svh flex-col items-center justify-center px-8 text-center">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border"
        style={{ background: "var(--surface-2)", borderColor: "var(--line)", boxShadow: "var(--shadow-lift)" }}
      >
        <CheckCircle2 size={34} color="var(--accent)" strokeWidth={1.25} />
      </div>

      <h1 className="mt-7 font-display text-[26px] font-medium" style={{ color: "var(--ink)" }}>
        {isLigar ? "Ligação iniciada" : "Solicitação enviada"}
      </h1>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
        {isLigar
          ? `Estamos discando para o Bali Motel para confirmar sua ${booking.suite.name}. Se a ligação não abriu, toque no número abaixo.`
          : `Sua reserva da ${booking.suite.name} foi enviada pelo WhatsApp. Aguarde a confirmação do nosso atendente.`}
      </p>

      {isLigar && (
        <a
          href={`tel:${MOTEL_PHONE_TEL}`}
          className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold"
          style={{ borderColor: "var(--line)", background: "var(--surface)", color: "var(--ink)" }}
        >
          <Phone size={15} color="var(--accent)" />
          {MOTEL_PHONE_DISPLAY}
        </a>
      )}

      <div className="mt-10 w-full">
        <PrimaryButton onClick={onNewBooking}>Fazer nova reserva</PrimaryButton>
      </div>
    </div>
  );
}
