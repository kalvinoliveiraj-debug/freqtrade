import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "../components/BottomBar";
import type { Booking } from "../types";

interface DoneScreenProps {
  booking: Booking;
  onNewBooking: () => void;
}

export function DoneScreen({ booking, onNewBooking }: DoneScreenProps) {
  return (
    <div className="screen-enter flex min-h-svh flex-col items-center justify-center px-8 text-center">
      <div
        className="grid h-20 w-20 place-items-center rounded-full border"
        style={{ background: "var(--surface-2)", borderColor: "var(--line)", boxShadow: "var(--shadow-lift)" }}
      >
        <CheckCircle2 size={34} color="var(--accent)" strokeWidth={1.25} />
      </div>

      <h1 className="mt-7 font-display text-[26px] font-medium" style={{ color: "var(--ink)" }}>
        Solicitação enviada
      </h1>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-muted)" }}>
        {booking.confirmMode === "mensagem"
          ? `Sua reserva da ${booking.suite.name} foi enviada pelo WhatsApp. Aguarde a confirmação do nosso atendente.`
          : `Recebemos seu pedido para a ${booking.suite.name}. Nosso atendente vai te ligar em breve para confirmar.`}
      </p>

      <div className="mt-10 w-full">
        <PrimaryButton onClick={onNewBooking}>Fazer nova reserva</PrimaryButton>
      </div>
    </div>
  );
}
