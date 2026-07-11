import { CheckCircle2 } from "lucide-react";
import { PrimaryButton } from "../components/BottomBar";
import type { Booking } from "../types";

interface DoneScreenProps {
  booking: Booking;
  onNewBooking: () => void;
}

export function DoneScreen({ booking, onNewBooking }: DoneScreenProps) {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-8 text-center">
      <div
        className="grid h-16 w-16 place-items-center rounded-full"
        style={{ background: "var(--surface-2)" }}
      >
        <CheckCircle2 size={32} color="var(--accent)" strokeWidth={1.5} />
      </div>

      <h1 className="mt-6 font-display text-2xl font-medium" style={{ color: "var(--ink)" }}>
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
