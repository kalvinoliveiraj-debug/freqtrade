import { WHATSAPP_NUMBER } from "../config";
import type { Booking } from "../types";

export function buildWhatsappMessage(booking: Booking): string {
  const { suite, flow, date, time, name, confirmMode } = booking;

  const linhas = [
    `Olá! Quero reservar a *${suite.name}* no Bali Motel.`,
    flow === "agora" ? "Período: agora (3h)" : "Período: pernoite",
    flow === "agendar" && date ? `Data: ${formatDate(date)}` : null,
    flow === "agendar" && time ? `Horário: ${time}` : null,
    name ? `Nome: ${name}` : null,
    confirmMode === "ligar" ? "Prefiro que me liguem para confirmar." : null,
  ].filter((linha): linha is string => Boolean(linha));

  return linhas.join("\n");
}

export function buildWhatsappLink(booking: Booking): string {
  const texto = buildWhatsappMessage(booking);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
}

function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-");
  if (!year || !month || !day) return isoDate;
  return `${day}/${month}/${year}`;
}
