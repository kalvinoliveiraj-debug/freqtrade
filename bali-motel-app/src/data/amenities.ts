import { Wifi, Tv, Waves, Snowflake, CarFront, type LucideIcon } from "lucide-react";
import type { AmenityId } from "../types";

export const AMENITY_META: Record<AmenityId, { label: string; icon: LucideIcon }> = {
  wifi: { label: "Wi-Fi", icon: Wifi },
  tv: { label: "Smart TV", icon: Tv },
  jacuzzi: { label: "Jacuzzi", icon: Waves },
  ar: { label: "Ar-condicionado", icon: Snowflake },
  garagem: { label: "Garagem privativa", icon: CarFront },
};
